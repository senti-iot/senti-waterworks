import { handleRequestSort } from 'data/functions'
import { getDevices, getDevicesData, /* getDevicesData */ } from 'data/devices'
import { genBenchmark } from 'data/model'
import moment from 'moment'
// import { genBenchmarkAll } from 'data/model'

const sData = 'sortData'
const GETDevice = 'devices'
const deviceData = 'deviceData'
const rawDataStore = 'storeOldData'
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
// let fakeDevice = {
// 	nId: 0,
// 	address: "fakestreet",
// 	guid: "56970DF",
// 	id: "348580",
// 	type: "fakeDevice",
// 	active: true
// }
export const getAllDevices = async () => {
	return async (dispatch) => {
		let devices = await getDevices()
		dispatch({
			type: GETDevice,
			payload: devices
		})
		dispatch({
			type: 'selectDevice',
			payload: devices ? devices.map(d => d.id) : []
		})
	}
}
export const getData = async () => {
	return async (dispatch, getState) => {
		let from = getState().dateTime.period.from
		let to = getState().dateTime.period.to
		let timeType = getState().dateTime.period.timeType
		let prevData = getState().data.prevData
		let filterDevices = getState().appState.selectedDevices
		let subtr = timeType === 2 ? 1 : 3
		let prevFrom = moment(from).subtract(subtr, 'month')
		let prevTo = moment(to).subtract(subtr, 'month')
		let rawData, prevRawData, currentPeriodData, benchMarkData, previousPeriodData, finalData
		if (prevData.from !== from && to !== prevData.to && prevData.rawData && prevData.filterDevices.length === filterDevices.length) {

			rawData = prevData.rawData
			prevRawData = prevData.prevRawData
			currentPeriodData = genBenchmark(rawData, filterDevices)
			benchMarkData = genBenchmark(rawData)
			previousPeriodData = genBenchmark(prevRawData, filterDevices, true, timeType)
			// let previousPeriodData = genBenchmark(await getDevicesData('2019-10-10', '2019-10-20'))
		}
		else {
			rawData = await getDevicesData(from, to)
			prevRawData = await getDevicesData(prevFrom, prevTo)
			currentPeriodData = genBenchmark(rawData, filterDevices)
			benchMarkData = genBenchmark(rawData)
			previousPeriodData = genBenchmark(prevRawData, filterDevices, true, timeType)
		}
		finalData = {
			waterusage: [
				{
					name: 'waterusageL',
					median: true,
					data: currentPeriodData.waterUsage,
					color: 'red'
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
					data: benchMarkData.waterUsage,
					color: 'yellow'
				}
			],
			temperature: [
				{
					name: 'tempAmbient',
					median: true,
					smallArea: true,
					data: currentPeriodData.temperature.ambient,
					color: 'red'
				},
				{
					name: 'tempWater',
					median: true,
					data: currentPeriodData.temperature.water,
					color: 'blue'
				},
				{
					name: 'tempAmbientPrev',
					prev: true,
					hidden: true,
					noArea: true,
					data: previousPeriodData.temperature.ambient
				},
				{
					name: 'tempWaterPrev',
					prev: true,
					hidden: true,
					noArea: true,
					data: currentPeriodData.temperature.water
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
					name: 'minFlow',
					median: true,
					data: currentPeriodData.waterFlow.minFlow,
					color: 'purple'
				},
				{
					name: 'maxFlowPrev',
					prev: true,
					hidden: true,
					noArea: true,
					data: previousPeriodData.waterFlow.maxFlow
				},
				{
					name: 'minFlowPrev',
					prev: true,
					hidden: true,
					noArea: true,
					data: currentPeriodData.waterFlow.minFlow
				}
			]

		}
		dispatch({
			type: deviceData,
			payload: finalData
		})
		dispatch({
			type: rawDataStore,
			payload: {
				prevRawData, rawData, from, to, filterDevices
			}
		})
		// let benchmark = genBenchmarkAll(data)
		// let data = []
		// let i
		// for (i = 0; i < 30; i++) {
		// 	data.push({
		// 		nId: i,
		// 		address: fakeDevice.address + i,
		// 		guid: fakeDevice.guid + i,
		// 		id: fakeDevice.id + i,
		// 		type: fakeDevice.type + i,
		// 		active: i % 3 === 0 ? true : false
		// 	})
		// }

	}
}
const initialState = {
	devices: [],
	data: {},
	prevData: {
		prevRawData: [],
		rawData: [],
		filterDevices: [],
		from: null,
		to: null
	}
}

export const data = (state = initialState, { type, payload }) => {
	switch (type) {
		case sData:
			return Object.assign({}, state, { [payload.key]: payload.sortedData })
		case GETDevice:
			return Object.assign({}, state, { devices: payload })
		case deviceData:
			return Object.assign({}, state, { deviceData: payload })
		default:
			return state;
	}
}