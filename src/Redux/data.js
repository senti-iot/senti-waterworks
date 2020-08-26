import { handleRequestSort, getDates } from 'data/functions'
import {
	/* getDevices, */ getWaterUsageByDay, getReadingUsage, getBenchmarkUsageByDay, getBenchmarkUsageByHour,
	getTotalVolumeData, getDevicesV2, getMinATemperatureData, getMinWTemperatureData,
	getMinFlowData,
	getMaxFlowData,
	getWaterUsageByHour
} from 'data/devices'
import moment from 'moment'
// import { colors } from 'variables/colors'
import { getLatLongFromAddress, getWeather } from 'data/weather'
import { setArcData } from 'Redux/charts/arcData'
import { setPriceUsageData } from 'Redux/charts/priceUsageData'
import { setLineData } from 'Redux/charts/lineData'
import { setBarData } from 'Redux/charts/barData'
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

// export const getAllDevices = async () => {
// 	return async (dispatch) => {
// 		let devices = await getDevices()
// 		dispatch({
// 			type: GETDevice,
// 			payload: devices
// 		})
// 		dispatch({
// 			type: 'selectDevice',
// 			// payload: devices ? devices.map(d => d.id) : []
// 			payload: devices.length > 0 ? [devices[0].id, devices[1].id, devices[2].id] : []
// 		})
// 	}
// }
/**
 * Get Weather Data for the Line Graph
 */
export const getWeatherData = async () => {
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
			payload: devices
		})
		await dispatch({
			type: sDevice,
			payload: devices.map(d => d.uuid)
		})
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
			temperatureAPrevData, minFlowData, minFlowPrevData, maxFlowData, maxFlowPrevData, readingsData

		if (selectedDevices.length !== devices.length) {
			let uuids = selectedDevices.map(s => s)
			waterUsageData = await getTotalVolumeData(orgId, suFrom.clone().subtract(1, 'day'), suTo, uuids)
			waterUsagePrevData = await getTotalVolumeData(orgId, prevFrom.clone().subtract(1, 'day'), prevTo, uuids)
			benchmarkData = await getBenchmarkUsageByDay(orgId, from, suTo, uuids)

			temperatureWData = await getMinWTemperatureData(orgId, suFrom, suTo, uuids)
			temperatureWPrevData = await getMinWTemperatureData(orgId, prevFrom, prevTo, uuids)
			temperatureAData = await getMinATemperatureData(orgId, suFrom, suTo, uuids)
			temperatureAPrevData = await getMinATemperatureData(orgId, prevFrom, prevTo, uuids)

			minFlowData = await getMinFlowData(orgId, suFrom, suTo, uuids)
			minFlowPrevData = await getMinFlowData(orgId, prevFrom, prevTo, uuids)
			maxFlowData = await getMaxFlowData(orgId, suFrom, suTo, uuids)
			maxFlowPrevData = await getMaxFlowData(orgId, prevFrom, prevTo, uuids)

			readingsData = await getReadingUsage(suFrom, suTo, uuids)

		}
		else {
			waterUsageData = await getTotalVolumeData(orgId, suFrom.clone().subtract(1, 'day'), suTo)
			waterUsagePrevData = await getTotalVolumeData(orgId, prevFrom.clone().subtract(1, 'day'), prevTo)
			benchmarkData = await getBenchmarkUsageByDay(orgId, from, suTo)

			temperatureWData = await getMinWTemperatureData(orgId, suFrom, suTo)
			temperatureWPrevData = await getMinWTemperatureData(orgId, prevFrom, prevTo)
			temperatureAData = await getMinATemperatureData(orgId, suFrom, suTo)
			temperatureAPrevData = await getMinATemperatureData(orgId, prevFrom, prevTo)

			minFlowData = await getMinFlowData(orgId, suFrom, suTo)
			minFlowPrevData = await getMinFlowData(orgId, prevFrom, prevTo)
			maxFlowData = await getMaxFlowData(orgId, suFrom, suTo)
			maxFlowPrevData = await getMaxFlowData(orgId, prevFrom, prevTo)

			readingsData = await getReadingUsage(suFrom, suTo)
		}
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
		let orgId = getState().settings.user.org.uuid
		console.log('Ce pula mea', getState().dateTime.period)
		let from = getState().dateTime.period.from.clone()
		let to = getState().dateTime.period.to.clone()
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

		let waterUsageData = timeType > 1 ?  await getWaterUsageByDay(from, to) : await getWaterUsageByHour(from, to)
		let waterUsagePrevData = timeType > 1 ? await getWaterUsageByDay(prevFrom, prevTo) : await getWaterUsageByHour(prevFrom, prevTo)
		let readingsData = await getReadingUsage(from.clone().add(1, 'day'), to)
		let benchmarkData = timeType > 1 ? await getBenchmarkUsageByDay(orgId, from, to) : await getBenchmarkUsageByHour(orgId, from, to)

		await dispatch(await getWeatherData())
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
			await dispatch(await userData())
			return
		}

	}
}

const initialState = {
	haveData: false,
	barData: {},
	devices: [],
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