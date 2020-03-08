import { handleRequestSort } from 'data/functions'
import { getDevices, getWaterUsage, getReadingUsage, getBenchmarkUsage, /* getDevicesData */ } from 'data/devices'
import { genBenchmark, genArcData, genWR, genMinATemp, genMinWTemp, genMaxF, genMinF, genBarData, genNBarData } from 'data/model'
import moment from 'moment'
import { colors } from 'variables/colors'
// import { genBenchmarkAll } from 'data/model'

const sData = 'sortData'
const GETDevice = 'devices'
const deviceData = 'deviceData'
// const rawDataStore = 'storeOldData'
const middleChartData = 'middleChartData'
const barData = 'barData'

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
export const getNData = async () => {
	return async (dispatch, getState) => {
		let orgId = getState().settings.user.org.uuid
		let from = getState().dateTime.period.from.clone().subtract(1, 'day').startOf('day')
		let to = getState().dateTime.period.to.clone().endOf('day')
		let subtr = moment(to).diff(moment(from), 'day')
		let prevFrom = moment(from).subtract(subtr, 'day')

		let prevTo = moment(from)
		if (moment().diff(moment(to), 'day') === 0) {
			prevTo = moment(from)
		}
		let currentPeriodData = {},
			previousPeriodData = {}
		let finalData = {
			waterusage: [],
			temperature: [],
			waterflow: [],
			readings: []
		}
		let waterUsageData = await getWaterUsage(from, to)
		waterUsageData = waterUsageData.filter(d => d.did === waterUsageData[0].did)
		let waterUsagePrevData = await getWaterUsage(prevFrom, prevTo)
		waterUsagePrevData = waterUsagePrevData.filter(d => d.did === waterUsagePrevData[0].did)
		let readingsData = await getReadingUsage(prevFrom, to)
		readingsData = readingsData.filter(d => d.uuid === readingsData[0].uuid)
		let benchmarkData = await getBenchmarkUsage(orgId, from.add(1, 'day'), to)
		//#region WaterUsage
		if (waterUsageData.length > 0) {

			currentPeriodData.waterusage = waterUsageData.map(d => ({ value: d.averageFlowPerDay, date: d.t }))
			previousPeriodData.waterusage = waterUsagePrevData.map(d => ({ value: d.averageFlowPerDay, date: moment(d.t).add(subtr, 'day') }))

		}
		if (benchmarkData.length > 0) {
			// let prevB = benchmarkData.filter(f => moment(f.time) >= prevFrom && moment(f.time) <= prevTo)
			currentPeriodData.benchmark = benchmarkData.map(d => ({ value: d.averageFlowPerDay, date: d.d }))

			// previousPeriodData = {
			// 	benchmark: prevB.map(d => ({ value: d.averageFlowPerDay, date: d.t }))
			// }
		}
		//#endregion
		//#region Readings
		if (readingsData) {
			let currentRD = readingsData.filter(f => moment(f.t) >= from && moment(f.t) <= to)
			let prevRD = readingsData.filter(f => moment(f.t) >= prevFrom && moment(f.t) <= prevTo)
			currentPeriodData.readings = currentRD.map(d => ({ value: d.val, date: d.t }))
			previousPeriodData.readings = prevRD.map(d => ({ value: d.val, date: moment(d.d).add(subtr, 'day') }))

		}
		//#endregion
		//#region temperature
		//#endregion
		//#region waterFlow
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
		//#endregion

		//#region Gen Arc Data

		let finalMiddleData = {
			current: {
				waterUsage: 0
			},
			previous: {
				waterUsage: 0
			}
		}
		let middleData = waterUsageData.reduce((total, d) => {
			total = total + d.averageFlowPerDay
			return total
		}, 0)
		let prevMiddleData = waterUsagePrevData.reduce((total, d) => {
			total = total + d.averageFlowPerDay || 0
			return total
		}, 0)
		finalMiddleData = {
			current: parseFloat(middleData).toFixed(3),
			previous: parseFloat(prevMiddleData).toFixed(3)
		}
		//#endregion
		//#region Generate bars Data

		let finalBarData = genNBarData(currentPeriodData.waterusage, currentPeriodData.benchmark)
		console.log(finalBarData)

		//#endregion
		//#region Dispatch the data
		dispatch({
			type: deviceData,
			payload: finalData
		})

		dispatch({
			type: middleChartData,
			payload: finalMiddleData
		})
		dispatch({
			type: barData,
			payload: finalBarData
		})
		//#endregion

	}
}
export const getData = async () => {
	return async (dispatch, getState) => {
		let from = getState().dateTime.period.from.clone()
		let to = getState().dateTime.period.to.clone().endOf('day')
		let filterDevices = getState().appState.selectedDevices
		let noOfDevices = getState().data.devices.length
		let fromM1 = from.clone().subtract(1, 'day')
		let subtr = moment(to).diff(moment(from), 'day')
		let prevFrom = moment(from).subtract(1, 'day').subtract(subtr, 'day')

		let prevTo = moment(from)
		if (moment().diff(moment(to), 'day') === 0) {
			prevTo = moment(fromM1)
		}
		let rawData, prevRawData, currentPeriodData, benchMarkData, previousPeriodData, middleData,
			prevMiddleData,
			finalData = {
				waterusage: [],
				temperature: [],
				waterflow: [],
				readings: []
			},
			finalMiddleData = {
				current: {
					waterUsage: 0
				},
				previous: {
					waterUsage: 0
				}
			},
			finalBarData = {
				waterusage: [],
				readings: [],
				temperature: [],
				waterflow: []
			}

		/**
		 * TODO: Filter the data of devices here ONCE instead of 4 times inside model
		 */
		// let completeRawData = await getDevicesData(prevFrom, to)
		let completeRawData = []

		if (completeRawData) {

			rawData = completeRawData.filter(f => moment(f.time) >= fromM1 && moment(f.time) <= to)
			prevRawData = completeRawData.filter(f => moment(f.time) >= prevFrom && moment(f.time) <= prevTo)

			//#region Current Period
			currentPeriodData = {
				// waterUsage: genWR(rawData, filterDevices),
				temperature: {
					ambient: genMinATemp(rawData, filterDevices),
					water: genMinWTemp(rawData, filterDevices)
				},
				waterFlow: {
					maxFlow: genMaxF(rawData, filterDevices),
					minFlow: genMinF(rawData, filterDevices)
				},
				...currentPeriodData
			}
			benchMarkData = genBenchmark(rawData, noOfDevices, filterDevices.length)

			//#endregion
			//#region Previous period

			prevRawData.forEach(d => {
				d.time = moment(d.time).add(subtr, 'day')
			})

			previousPeriodData = {
				waterUsage: genWR(prevRawData, filterDevices),
				temperature: {
					ambient: genMinATemp(prevRawData, filterDevices),
					water: genMinWTemp(prevRawData, filterDevices)
				},
				waterFlow: {
					maxFlow: genMaxF(prevRawData, filterDevices),
					minFlow: genMinF(prevRawData, filterDevices)
				}
			}
			// currentPeriodData = genData(rawData, filterDevices)
			// previousPeriodData = genData(prevRawData, filterDevices, true, subtr)

			//#endregion
			/**
			 * TODO: Do not call the API for another set of data, filter it based on from
			 */

			let rawArcData = currentPeriodData.waterUsage
			let prevRawArcData = previousPeriodData.waterUsage/* .filter(f => moment(f.created) > prevFrom) */

			middleData = genArcData(rawArcData, filterDevices)
			prevMiddleData = genArcData(prevRawArcData, filterDevices)
			finalData = {
				waterusage: [
					{
						name: 'waterusageL',
						median: true,
						data: currentPeriodData.waterUsage,
						color: 'orange'
					},
					{
						name: 'waterusageP',
						prev: true,
						hidden: true,
						noMedianLegend: true,
						median: true,
						data: previousPeriodData.waterUsage
					},
					{
						name: 'benchmark',
						hidden: true,
						noArea: true,
						dashed: true,
						data: benchMarkData,
						color: 'yellow'
					}
				],
				temperature: [
					{
						name: 'tempAmbient',
						median: true,
						data: currentPeriodData.temperature.ambient,
						color: 'red'
					},
					{
						name: 'tempAmbientPrev',
						prev: true,
						hidden: true,
						noMedianLegend: true,
						median: true,
						data: previousPeriodData.temperature.ambient
					},
					{
						name: 'tempWater',
						median: true,
						data: currentPeriodData.temperature.water,
						color: 'blue'
					},

					{
						name: 'tempWaterPrev',
						prev: true,
						hidden: true,
						noMedianLegend: true,
						median: true,
						data: previousPeriodData.temperature.water
					}
				],
				waterflow: [
					{
						name: 'maxFlow',
						median: true,
						data: currentPeriodData.waterFlow.maxFlow,
						color: 'lightBlue'
					},
					{
						name: 'maxFlowPrev',
						prev: true,
						hidden: true,
						noMedianLegend: true,
						median: true,
						data: previousPeriodData.waterFlow.maxFlow
					},
					{
						name: 'minFlow',
						median: true,
						data: currentPeriodData.waterFlow.minFlow,
						color: 'purple'
					},
					{
						name: 'minFlowPrev',
						prev: true,
						hidden: true,
						smallArea: true,
						noMedianLegend: true,
						median: true,
						data: previousPeriodData.waterFlow.minFlow
					}
				]

			}
			if (filterDevices.length < 11) {
				let devices = getState().data.devices
				let dataLines = filterDevices.map((dev, i) => ({
					name: "" + devices[devices.findIndex(d => d.id === dev)].name,
					color: colors[i],
					noArea: true,
					data: rawData.filter(d => d.value && d.device_id === dev).map(d => ({ value: d.value, date: moment(d.created).startOf('day') }))
				}))
				finalData.readings = dataLines
				// finalData.readings = [
				// 	{
				// 		name: 'readingL',
				// 		// median: true,
				// 		color: 'yellow',
				// 		data: rawData.filter(d => d.value && d.device_id === filterDevices[0]).map(d => ({ value: d.value, date: moment(d.created).startOf('day') }))
				// 	}
				// ]
			}
			else {
				finalData.readings = []
			}
			//#endregion
			//#region Middle Widget Final Data

			finalMiddleData = {
				current: middleData,
				previous: prevMiddleData
			}

			//#endregion
			//#region Bar Chart Final Data
			finalBarData = genBarData(currentPeriodData, previousPeriodData)
			//#endregion
		}
		//#region Dispatch the calculated data
		dispatch({
			type: deviceData,
			payload: finalData
		})

		dispatch({
			type: middleChartData,
			payload: finalMiddleData
		})
		dispatch({
			type: barData,
			payload: finalBarData
		})
		//#endregion
	}
}
const initialState = {
	barData: {},
	devices: [],
	data: {},
	middleChartData: {
		current: {
			waterusage: 0
		},
		previous: {
			waterusage: 0
		}
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
		case middleChartData:
			return Object.assign({}, state, { middleChartData: payload })
		default:
			return state
	}
}