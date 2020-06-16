import { handleRequestSort, getDates } from 'data/functions'
import {
	getDevices, getWaterUsage, getReadingUsage, getBenchmarkUsage,
	getTotalVolumeData, getDevicesV2, getMinATemperatureData, getMinWTemperatureData,
	getMinFlowData,
	getMaxFlowData
} from 'data/devices'
import { /* genBenchmark, genArcData, genWR, genMinATemp,  genMaxF, genMinF, genBarData, */ genNBarData, genMinATemp } from 'data/model'
import moment from 'moment'
// import { colors } from 'variables/colors'
import { getLatLongFromAddress, getWeather } from 'data/weather'
import { colors } from 'variables/colors'
import { setArcData } from 'Redux/charts/arcData'
import { setPriceUsageData } from 'Redux/charts/priceUsageData'
import { setLineData } from 'Redux/charts/lineData'
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

export const getAllDevices = async () => {
	return async (dispatch) => {
		let devices = await getDevices()
		dispatch({
			type: GETDevice,
			payload: devices
		})
		dispatch({
			type: 'selectDevice',
			// payload: devices ? devices.map(d => d.id) : []
			payload: devices.length > 0 ? [devices[0].id, devices[1].id, devices[2].id] : []
		})
	}
}
/**
 * Get Weather Data for the Line Graph
 */
export const getWeatherData = async () => {
	return async (dispatch, getState) => {
		let userExP = getState().settings.user.aux.sentiWaterworks.extendedProfile

		let from = getState().dateTime.period.from.clone()
		let to = getState().dateTime.period.to.clone()
		let dates = getDates(from, to)

		if (dates.length < 16 && userExP.address) {
			let adrs = userExP.address.split(' ')
			let address = `${adrs[0]} ${userExP.postnr} ${userExP.city}`
			let coords = await getLatLongFromAddress(address)
			let weather = await Promise.all(dates.map((d) => getWeather(d, coords.lat, coords.long))).then(rs => rs.map(r => r.daily.data[0]))
			let finalData = weather.map(w => ({
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
 * Unit Conversion
 * @param {number} value
 * @param {string} unit
 */
const uC = (value, unit) => {
	switch (unit) {
		case 'm3':
			return value
		case 'l':
			return value * 1000

		default:
			return value
	}
}
/**
 * Generate Data for graph
 */
export const genMainGraphData = async () => {
	return async (dispatch, getState) => {

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
		let prevFrom = moment(from).subtract(subtr, 'day').add(1, 'day')
		let prevTo = moment(from).add(1, 'day')
		let noOfAdults = getState().settings.user.aux.sentiWaterworks.extendedProfile.noOfAdults
		let noOfChildren = getState().settings.user.aux.sentiWaterworks.extendedProfile.noOfChildren
		let noOfPersons = noOfAdults + noOfChildren
		let mUnit = getState().settings.mUnit
		let currentPeriodData = {},
			previousPeriodData = {}


		let finalBarData = {
			waterusage: [],
			readings: [],
			perPerson: [],
			average: []
		}
		let selectedDevices = getState().appState.selectedDevices
		let devices = getState().data.devices
		let suTo = to.clone()/* .subtract(1, 'day') */
		let suFrom = from.clone()/* .add(1, 'day') */
		let waterUsageData, waterUsagePrevData, benchmarkData, temperatureWData, temperatureWPrevData, temperatureAData,
			temperatureAPrevData, minFlowData, minFlowPrevData, maxFlowData, maxFlowPrevData, readingsData

		if (selectedDevices.length !== devices.length) {
			let uuids = selectedDevices.map(s => s)
			waterUsageData = await getTotalVolumeData(orgId, suFrom, suTo, uuids)
			waterUsagePrevData = await getTotalVolumeData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'), uuids)
			benchmarkData = await getBenchmarkUsage(orgId, from, suTo, uuids)

			temperatureWData = await getMinWTemperatureData(orgId, suFrom, suTo, uuids)
			temperatureWPrevData = await getMinWTemperatureData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'), uuids)
			temperatureAData = await getMinATemperatureData(orgId, suFrom, suTo, uuids)
			temperatureAPrevData = await getMinATemperatureData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'), uuids)

			minFlowData = await getMinFlowData(orgId, suFrom, suTo, uuids)
			minFlowPrevData = await getMinFlowData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'), uuids)
			maxFlowData = await getMaxFlowData(orgId, suFrom, suTo, uuids)
			maxFlowPrevData = await getMaxFlowData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'), uuids)

			readingsData = await getReadingUsage(suFrom, suTo, uuids)

		}
		else {
			waterUsageData = await getTotalVolumeData(orgId, suFrom, suTo)
			waterUsagePrevData = await getTotalVolumeData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'))
			benchmarkData = await getBenchmarkUsage(orgId, from, suTo)

			temperatureWData = await getMinWTemperatureData(orgId, suFrom, suTo)
			temperatureWPrevData = await getMinWTemperatureData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'))
			temperatureAData = await getMinATemperatureData(orgId, suFrom, suTo)
			temperatureAPrevData = await getMinATemperatureData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'))

			minFlowData = await getMinFlowData(orgId, suFrom, suTo)
			minFlowPrevData = await getMinFlowData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'))
			maxFlowData = await getMaxFlowData(orgId, suFrom, suTo)
			maxFlowPrevData = await getMaxFlowData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'))

			readingsData = await getReadingUsage(suFrom, suTo)
		}
		//#region Line Data
		dispatch(await setLineData({
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
		/**
		 * TODO
		 */
		// finalBarData = genNBarData(currentPeriodData.waterusage, currentPeriodData.benchmark, noOfPersons, mUnit, true)

		//#endregion
		// dispatch({
		// 	type: deviceData,
		// 	payload: finalData
		// })

		// dispatch({
		// 	type: middleChartData,
		// 	payload: finalMiddleData
		// })
		dispatch({
			type: barData,
			payload: finalBarData
		})

		// dispatch({
		// 	type: averageData,
		// 	payload: finalAverageData
		// })
		// dispatch({
		// 	type: pData,
		// 	payload: finalPriceData
		// })


	}

export const userData = () => {
	return async (dispatch, getState) => {
		let orgId = getState().settings.user.org.uuid
		let from = getState().dateTime.period.from.clone().subtract(1, 'day')
		let to = getState().dateTime.period.to.clone().add(1, 'day')
		let mdc = getState().settings.maxDailyConsumption
		let subtr = moment(to).diff(moment(from), 'day')
		let prevFrom = moment(from).subtract(subtr, 'day').add(1, 'day')
		let prevTo = moment(from).add(1, 'day')
		let noOfAdults = getState().settings.user.aux.sentiWaterworks.extendedProfile.noOfAdults
		let noOfChildren = getState().settings.user.aux.sentiWaterworks.extendedProfile.noOfChildren
		let noOfPersons = noOfAdults + noOfChildren
		let mUnit = getState().settings.mUnit

		let currentPeriodData = {},
			previousPeriodData = {}
		let finalData = {
			waterusage: [],
			temperature: [],
			waterflow: [],
			readings: []
		}

		let finalBarData = {
			waterusage: [],
			readings: [],
			perPerson: [],
			average: []
		}


		if (moment().diff(moment(to), 'day') === 0) {
			prevTo = moment(from)
		}

		let waterUsageData = await getWaterUsage(from, to)
		let waterUsagePrevData = await getWaterUsage(prevFrom, prevTo)
		let readingsData = await getReadingUsage(from.clone().add(1, 'day'), to)
		let benchmarkData = await getBenchmarkUsage(orgId, from, to)

		//#region WaterUsage
		if (waterUsageData.length > 0) {

			currentPeriodData.waterusage = waterUsageData.map(d => ({ value: uC(d.averageFlowPerDay, mUnit), date: d.d }))
			previousPeriodData.waterusage = waterUsagePrevData.map(d => ({ value: uC(d.averageFlowPerDay, mUnit), date: moment(d.d).add(subtr - 1, 'day') }))

		}
		if (benchmarkData.length > 0) {
			currentPeriodData.benchmark = benchmarkData.map(d => ({ value: uC(d.averageFlowPerDay, mUnit), date: d.d }))
		}
		//#endregion
		//#region Readings
		if (readingsData) {
			currentPeriodData.readings = readingsData.map(d => ({ value: d.val, date: d.t }))

		}
		//#endregion

		//#region Final Data Creation

		if (currentPeriodData.waterusage) {
			finalData.waterusage.push({
				name: 'waterusageL',
				median: true,
				data: currentPeriodData.waterusage,
				color: 'orange'
			})
		}
		if (previousPeriodData.waterusage) {
			finalData.waterusage.push({
				name: 'waterusageP',
				prev: true,
				hidden: true,
				noMedianLegend: true,
				median: true,
				data: previousPeriodData.waterusage
			})
		}
		if (currentPeriodData.benchmark) {
			finalData.waterusage.push({
				name: 'benchmark',
				hidden: true,
				noArea: true,
				dashed: true,
				data: currentPeriodData.benchmark,
				color: 'yellow'
			})

		}
		if (currentPeriodData.readings) {
			finalData.readings.push({
				name: 'readingL',
				color: 'yellow',
				noArea: true,
				data: currentPeriodData.readings
			})
		}
		if (mdc > 0) {
			let fMdc = mUnit === 'm3' ? mdc / 1000 : mdc
			finalData.waterusage.push({
				name: 'maxDailyConsumption',
				noArea: true,
				hidden: true,
				onlyMedian: true,
				noTooltip: true,
				color: 'red',
				data: [{
					date: moment(from).add(1, 'day'), value: fMdc
				}, { date: moment(to).subtract(1, 'day'), value: fMdc }]
			})
		}
		//#endregion

		//#region Gen Arc Data

		dispatch(await setArcData(waterUsageData, waterUsagePrevData))

		//#endregion
		//#region Generate bars Data

		finalBarData = genNBarData(currentPeriodData.waterusage, currentPeriodData.benchmark, noOfPersons, mUnit)

		//#endregion
		//#region Generate Average Data

		dispatch(await setPriceUsageData(waterUsageData, benchmarkData))

		//#endregion

		//#region Get Weather Data

		dispatch(await getWeatherData())

		//#endregion

		//#region Dispatch the data
		dispatch({
			type: deviceData,
			payload: finalData
		})

		dispatch({
			type: barData,
			payload: finalBarData
		})

		//#endregion

	}
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