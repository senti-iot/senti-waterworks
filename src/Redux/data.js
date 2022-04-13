import { handleRequestSort, getDates } from 'data/functions'
import {
	/* getDevices, */ getWaterUsageByDay, getReadingUsage, getBenchmarkUsageByDay, getBenchmarkUsageByHour, getDevicesV2,
	/* getTotalVolumeData, getMinATemperatureData, getMinWTemperatureData, getMinFlowData, getMaxFlowData, */
	getWaterUsageByHour,
	getBenchmarkUsageByUUIDs,
	getCachedTotalVolumeData,
	getCachedMinWTemperatureData,
	getCachedMinATemperatureData,
	getCachedMaxFlowData,
	getCachedMinFlowData,
	getCachedReadingData
} from 'data/devices'
import moment from 'moment'
// import { colors } from 'variables/colors'
import { getLatLongFromAddress, getWeather } from 'data/weather'
import { setArcData } from 'Redux/charts/arcData'
import { setPriceUsageData } from 'Redux/charts/priceUsageData'
import { setLineData } from 'Redux/charts/lineData'
import { setBarData } from 'Redux/charts/barData'
import { getFullInstallation, getInstallation, getInstallations, getUserInstallations } from 'data/installations'
import { getAllUsers } from 'data/users'
import { getAlarmsV1, getAlarmV1, getNotificationsV1 } from 'data/alarms'
// import { genBenchmarkAll } from 'data/model'

const sData = 'sortData'
const GETDevice = 'devices'
const deviceData = 'deviceData'
// const rawDataStore = 'storeOldData'
const middleChartData = 'middleChartData'
const barData = 'barData'
const averageData = 'averageData'
const pData = 'priceData'
const wData = 'weatherData'
const sDevice = 'selectDevice'
const hData = 'receivedData'
const uhcData = 'unitHasChanged'
const changeUnit = 'changeMeasurementUnit'
const GetInst = 'getInstallations'
const GetUsers = 'getUsers'
const getUserInstallation = 'getUserInstallation'
const gAlarms = 'getAlarms'
const gAlarm = 'getAlarm'
const gNotifs = 'getNotifications'
const gInst = 'getInstallation'
// const gNotif = 'getNotifications'


export const setUnitHasChanged = () => {
	return dispatch => {
		dispatch({
			type: uhcData,
			// payload: false
		})
	}
}

export const setHaveData = d => {
	return dispatch => {
		dispatch({
			type: hData,
			payload: d
		})
	}
}
export const sortData = (key, property, order) => {
	return (dispatch, getState) => {
		let data = getState().data[key]
		let sortedData = handleRequestSort(property, order, data)
		let newArr = []
		newArr = sortedData
		dispatch({
			type: sData,
			payload: {
				key,
				sortedData: newArr
			}
		})

	}
}
/**
 * Get User installation
 */
export const getUserInst = async () => {
	return async (dispatch, getState) => {
		let userUUID = getState().settings.user?.uuid
		let data = await getFullInstallation(userUUID)

		dispatch({
			type: getUserInstallation,
			payload: data
		})
	}
}


/**
 * Get Weather Data for the Line Graph
 */
/* export const getWeatherData = async () => {
	return async (dispatch, getState) => {
		let userExP = getState().settings.user.aux.sentiWaterworks.extendedProfile

		let from = getState().dateTime.period.from.clone()
		let to = getState().dateTime.period.to.clone()
		let dates = getDates(from, to)
		let timeType = getState().dateTime.period.timeType
		if (userExP.address) {
			let adrs = userExP.address.split(' ')
			let address = `${adrs[0]} ${userExP.postnr} ${userExP.city}`
			let coords = await getLatLongFromAddress(address)
			let weather = await Promise.all(dates.map((d) => getWeather(d, coords.lat, coords.long))).then(rs => rs)
			let fWeather = []
			// .map(r => r.daily.data[0])
			if (timeType > 1) {
				fWeather = weather.map(r => r.daily.data[0])
			}
			else {
				fWeather = weather[0]?.hourly?.data
			}
			let finalData = fWeather.map(w => ({
				date: moment(w.time),
				icon: w.icon,
				description: w.summary
			}))
			dispatch({
				type: wData,
				payload: finalData
			})
		}
		else {
			dispatch({
				type: wData,
				payload: []
			})
		}
	}
} */
export const getWeatherData = async () => {
	return async (dispatch, getState) => {
		let userExP = getState().settings.user?.aux.sentiWaterworks.extendedProfile
		let from = getState().dateTime.period.from?.clone()
		let to = getState().dateTime.period.to?.clone()
		let dates = getDates(from, to)
		let timeType = getState().dateTime.period.timeType
		if (userExP.address) {
			let adrs = userExP.address.split(' ')
			let address = `${adrs[0]} ${userExP.postnr} ${userExP.city}`
			let coords = await getLatLongFromAddress(address)
			if (coords && coords.lat !== 0 && coords.long !== 0) {
				let weather = await Promise.all(dates.map((d) => getWeather(d, coords.lat, coords.long))).then(rs => rs)
				let fWeather = []
				// .map(r => r.daily.data[0])
				console.log(weather)
				if (weather) {

					if (timeType > 1) {
						fWeather = weather.map(r => r ? r.daily.data[0] : null)
					}
					else {
						fWeather = weather[0]?.hourly?.data
					}
					console.log(fWeather)
					if (fWeather) {

						let finalData = fWeather.map(w => ({
							date: moment(w.time),
							icon: w.icon,
							description: w.summary
						}))
						dispatch({
							type: wData,
							payload: finalData
						})
					}
				}
			}
		}
		else {
			dispatch({
				type: wData,
				payload: []
			})
		}
	}
}
/**
 * Get installation
 */
export const gInstallation = async (uuid) => {
	return async (dispatch, getState) => {
		let installation = await getInstallation(uuid)
		dispatch({
			type: gInst,
			payload: installation

		})
	}
}
/**
 * Get User Installations
 */
export const getUInstallation = async () => {
	return async (dispatch, getState) => {
		let userUUID = getState().settings.user?.uuid
		let installations = await getUserInstallations(userUUID)
		dispatch({
			type: GetInst,
			payload: installations ? installations : []
		})
	}
}
/**
 * Get Admin Installations
 */
export const getAdminInstallations = async () => {
	return async (dispatch, getState) => {
		let orgUUID = getState().settings.user?.org.uuid
		let installations = await getInstallations(orgUUID)
		dispatch({
			type: GetInst,
			payload: installations ? installations : []
		})
	}
}
/**
 * Get Admin users
 */
export const getAdminUsers = async () => {
	return async dispatch => {

		/**
		 * Get the users for the admin
		 */
		let users = await getAllUsers()
		dispatch({
			type: GetUsers,
			payload: users
		})

	}
}
/**
 * Get Admin devices
 */
export const getAdminDevices = async () => {
	return async dispatch => {

		/**
		 * Get the devices for the admin
		 */
		let devices = await getDevicesV2()
		dispatch({
			type: GETDevice,
			payload: devices ? devices : []
		})
		await dispatch({
			type: sDevice,
			payload: devices ? devices.map(d => d.uuid) : []
		})
	}
}
/**
 * getAllNotifications
 */
export const getAllNotifications = async () => {
	return async (dispatch, getState) => {
		let userUUID = getState().settings.user?.uuid
		if (userUUID) {
			let notifs = await getNotificationsV1(userUUID)
			dispatch({
				type: gNotifs,
				payload: notifs ? notifs : []
			})
		}
	}
}
/**
 * Get Alarm
 */
export const getAlarm = async (uuid) => {
	return async dispatch => {
		let alarm = await getAlarmV1(uuid)
		dispatch({
			type: gAlarm,
			payload: alarm
		})
	}
}
/**
 * Get Alarms
 */
export const getAlarms = async () => {
	return async (dispatch, getState) => {
		let userUUID = getState().settings?.user?.uuid
		if (userUUID) {
			let alarms = await getAlarmsV1(userUUID)
			dispatch({
				type: gAlarms,
				payload: alarms ? alarms : []
			})
		}
	}
}
/**
 * Generate Admin Data
 *
 */
export const adminData = () =>
	async (dispatch, getState) => {
		let orgId = getState().settings.user.org.uuid
		let from = getState().dateTime.period.from.clone()
		let to = getState().dateTime.period.to.clone()
		let subtr = moment(to).diff(moment(from), 'day')
		let prevFrom = moment(from).subtract(subtr, 'day')
		let prevTo = moment(from)


		let selectedDevices = getState().appState.selectedDevices
		let devices = getState().data.devices
		let suTo = to.clone()
		let suFrom = from.clone()
		let waterUsageData, waterUsagePrevData, benchmarkData, temperatureWData, temperatureWPrevData, temperatureAData,
			temperatureAPrevData, minFlowData, minFlowPrevData, maxFlowData, maxFlowPrevData, readingsData = []

		if (selectedDevices.length !== devices.length) {
			let uuids = selectedDevices.map(s => s)
			let alldeviceUUIDS = devices.map(s => s.uuid)

			waterUsageData = await getCachedTotalVolumeData(orgId, suFrom.clone().subtract(1, 'day'), suTo, uuids)
			waterUsagePrevData = await getCachedTotalVolumeData(orgId, prevFrom.clone().subtract(1, 'day'), prevTo, uuids)
			// benchmarkData = await getBenchmarkUsageByDay(orgId, from, suTo, uuids)
			benchmarkData = await getBenchmarkUsageByUUIDs(alldeviceUUIDS, from, suTo)

			if (selectedDevices.length < 11) {

				temperatureWData = await getCachedMinWTemperatureData(orgId, suFrom, suTo, uuids)
				// temperatureWPrevData = await getCachedMinWTemperatureData(orgId, prevFrom, prevTo, uuids)


				temperatureAData = await getCachedMinATemperatureData(orgId, suFrom, suTo, uuids)
				// temperatureAPrevData = await getCachedMinATemperatureData(orgId, prevFrom, prevTo, uuids)

				minFlowData = await getCachedMinFlowData(orgId, suFrom, suTo, uuids)
				// minFlowPrevData = await getCachedMinFlowData(orgId, prevFrom, prevTo, uuids)

				maxFlowData = await getCachedMaxFlowData(orgId, suFrom, suTo, uuids)
				// maxFlowPrevData = await getCachedMaxFlowData(orgId, prevFrom, prevTo, uuids)

				readingsData = await getCachedReadingData(orgId, suFrom, suTo, uuids)
			}


		}
		else {
			waterUsageData = await getCachedTotalVolumeData(orgId, suFrom.clone().subtract(1, 'day'), suTo)
			waterUsagePrevData = await getCachedTotalVolumeData(orgId, prevFrom.clone().subtract(1, 'day'), prevTo)
			benchmarkData = await getBenchmarkUsageByDay(orgId, from, suTo)

			// temperatureWData = await getCachedMinWTemperatureData(orgId, suFrom, suTo)
			// temperatureWPrevData = await getCachedMinWTemperatureData(orgId, prevFrom, prevTo)


			// temperatureAData = await getCachedMinATemperatureData(orgId, suFrom, suTo)
			// temperatureAPrevData = await getCachedMinATemperatureData(orgId, prevFrom, prevTo)

			// minFlowData = await getMinFlowData(orgId, suFrom, suTo)
			// minFlowPrevData = await getMinFlowData(orgId, prevFrom, prevTo)

			// maxFlowData = await getMaxFlowData(orgId, suFrom, suTo)
			// maxFlowPrevData = await getMaxFlowData(orgId, prevFrom, prevTo)

			// readingsData = await getReadingUsage(suFrom, suTo)

			// temperatureWData = []
			// temperatureWPrevData = []
			// temperatureAData = []
			// temperatureAPrevData = []
			// minFlowData = []
			// minFlowPrevData = []
			// maxFlowData = []
			// maxFlowPrevData = []
			// readingsData = []
		}
		console.log(temperatureWData, temperatureAData)
		//#region Line Data
		dispatch(await setLineData({
			dateDiff: subtr,
			waterUsageData: waterUsageData,
			waterUsagePrevData: waterUsagePrevData,
			benchmarkData: benchmarkData,
			temperatureWData: temperatureWData,
			temperatureWPrevData: temperatureWPrevData,
			temperatureAData: temperatureAData,
			temperatureAPrevData: temperatureAPrevData,
			minFlowData: minFlowData,
			minFlowPrevData: minFlowPrevData,
			maxFlowData: maxFlowData,
			maxFlowPrevData: maxFlowPrevData,
			readingsData: readingsData
		}))
		//#endregion

		//#region Arc Data
		dispatch(await setArcData(waterUsageData, waterUsagePrevData))


		//#endregion

		//#region Price & DailyUsage
		dispatch(await setPriceUsageData(waterUsageData, benchmarkData))

		//#endregion

		//#region Final bar Data

		dispatch(await setBarData(waterUsageData))

		//Dispatch that we have the data

		dispatch({ type: hData, payload: true })
		//#endregion
		// dispatch({
		// 	type: deviceData,
		// 	payload: finalData
		// })

		// dispatch({
		// 	type: middleChartData,
		// 	payload: finalMiddleData
		// })
		// dispatch({
		// 	type: averageData,
		// 	payload: finalAverageData
		// })
		// dispatch({
		// 	type: pData,
		// 	payload: finalPriceData
		// })


	}

/**
 * Generate user data
 */
export const userData = () =>
	async (dispatch, getState) => {
		let orgId = getState().settings.user?.org.uuid
		let from = getState().dateTime.period.from?.clone()
		let to = getState().dateTime.period.to?.clone()
		let installation = getState().data.installation
		let deviceUUID = installation.deviceUUID
		let timeType = getState().dateTime.period.timeType
		let subtr = moment(to).diff(moment(from), timeType > 1 ? 'day' : 'hour')

		let prevFrom = moment(from).subtract(subtr, timeType > 1 ? 'day' : 'hour')
		let prevTo = moment(from)

		// let finalBarData = {
		// 	waterusage: [],
		// 	readings: [],
		// 	perPerson: [],
		// 	average: []
		// }

		let waterUsageData = timeType > 1 ? await getWaterUsageByDay(from, to, deviceUUID ? [deviceUUID] : null) : await getWaterUsageByHour(from, to, deviceUUID ? [deviceUUID] : null)
		let waterUsagePrevData = timeType > 1 ? await getWaterUsageByDay(prevFrom, prevTo) : await getWaterUsageByHour(prevFrom, prevTo)
		let readingsData = await getReadingUsage(from/* .clone().add(1, 'day') */, to)
		let benchmarkData = timeType > 1 ? await getBenchmarkUsageByDay(orgId, from, to) : await getBenchmarkUsageByHour(orgId, from, to)

		// await dispatch(await getWeatherData())
		dispatch(await setLineData({
			timeType: timeType,
			isUser: true,
			dateDiff: subtr,
			waterUsageData: waterUsageData,
			waterUsagePrevData: waterUsagePrevData,
			benchmarkData: benchmarkData,
			readingsData: readingsData
		}))

		//#endregion

		//#region Gen Arc Data

		dispatch(await setArcData(waterUsageData, waterUsagePrevData))

		//#endregion
		//#region Generate bars Data

		dispatch(await setBarData(waterUsageData))

		//#endregion
		//#region Generate Average Data

		dispatch(await setPriceUsageData(waterUsageData, benchmarkData))

		//Dispatch that we have the data

		dispatch({ type: hData, payload: true })

		//#endregion

		//#region Get Weather Data


		//#endregion

		//#region Dispatch the data
		// dispatch({
		// 	type: deviceData,
		// 	payload: finalData
		// })

		// dispatch({
		// 	type: barData,
		// 	payload: finalBarData
		// })

		//#endregion
	}

/**
 * Get & Generate data for all graphs
 */
export const getNData = async () => {
	return async (dispatch, getState) => {
		let isSuperUser = getState().auth.isSuperUser
		let isSWAdmin = getState().auth.privileges.indexOf('waterworks.admin') > -1 ? true : false
		if (isSuperUser || isSWAdmin) {
			await dispatch(await adminData())
			return
		}
		else {
			await dispatch(await getUserInst())
			await dispatch(await userData())
			return
		}

	}
}

const initialState = {
	loggedIn: false,
	unitHasChanged: false,
	haveData: false,
	barData: {},
	devices: [],
	alarms: [],
	alarm: {},
	notifications: [],
	installation: {},
	installations: [],
	users: [],
	data: {},
	priceData: {
		waterusage: 0,
		sewage: 0,
		total: 0
	},
	avgData: {
		waterusagem3: 0,
		waterusageL: 0,
		benchmarkm3: 0,
		benchmarkL: 0
	},
	middleChartData: {
		current: {
			waterusage: 0
		},
		previous: {
			waterusage: 0
		}
	},
	deviceData: {
		waterusage: [],
		temperature: [],
		waterflow: [],
		readings: []
	}
}

export const data = (state = initialState, { type, payload }) => {
	switch (type) {

		case 'RESET_APP':
			return initialState
		case 'loggedIn':
			return Object.assign({}, state, { loggedIn: true })
		case gInst:
			return Object.assign({}, state, { installation: payload })
		case gNotifs:
			return Object.assign({}, state, { notifications: payload })
		case gAlarm:
			return Object.assign({}, state, { alarm: payload })
		case gAlarms:
			return Object.assign({}, state, { alarms: payload })
		case getUserInstallation:
			return Object.assign({}, state, { installation: payload })
		case GetUsers:
			return Object.assign({}, state, { users: payload })
		case GetInst:
			return Object.assign({}, state, { installations: payload })
		case uhcData:
			return Object.assign({}, state, { unitHasChanged: false })
		case changeUnit:
			return Object.assign({}, state, { unitHasChanged: true })
		case hData:
			return Object.assign({}, state, { haveData: payload })
		case sData:
			return Object.assign({}, state, { [payload.key]: payload.sortedData })
		case GETDevice:
			return Object.assign({}, state, { devices: payload })
		case deviceData:
			return Object.assign({}, state, { deviceData: payload })
		case barData:
			return Object.assign({}, state, { barData: payload })
		case averageData:
			return Object.assign({}, state, { avgData: payload })
		case pData:
			return Object.assign({}, state, { priceData: payload })
		case wData:
			return Object.assign({}, state, { weatherData: payload })
		case middleChartData:
			return Object.assign({}, state, { middleChartData: payload })
		default:
			return state
	}
}