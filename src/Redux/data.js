import { handleRequestSort } from 'data/functions'
import { getDevices, getDevicesData, /* getDevicesData */ } from 'data/devices'
import { genBenchmark } from 'data/model'
// import { genBenchmarkAll } from 'data/model'

const sData = 'sortData'
const GETDevice = 'devices'
const deviceData = 'deviceData'

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

		let currentPeriodData = genBenchmark(await getDevicesData('2019-10-10', '2019-10-20'))
		let previousPeriodData = genBenchmark(await getDevicesData('2019-10-10', '2019-10-20'))
		console.log(previousPeriodData)
		let finalData = {
			waterusage: [
				{
					name: 'waterusageL',
					median: true,
					data: currentPeriodData.waterUsage
				},
				{
					name: 'waterusageP',
					prev: true,
					hidden: true,
					data: previousPeriodData.waterUsage
				},
				{
					name: 'benchmark',
					hidden: true,
					noArea: true,
					dashed: true,
					data: currentPeriodData.waterUsage
				}
			],
			temperature: [
				{
					name: 'tempAmbient',
					median: true,
					data: currentPeriodData.temperature.ambient
				},
				{
					name: 'tempWater',
					median: true,
					data: currentPeriodData.temperature.water
				},
				{
					name: 'tempAmbient',
					prev: true,
					hidden: true,
					noArea: true,
					data: previousPeriodData.temperature.ambient
				},
				{
					name: 'tempWater',
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
					data: currentPeriodData.waterFlow.maxFlow
				},
				{
					name: 'minFlow',
					median: true,
					data: currentPeriodData.waterFlow.minFlow
				},
				{
					name: 'maxFlow',
					prev: true,
					hidden: true,
					noArea: true,
					data: previousPeriodData.waterFlow.maxFlow
				},
				{
					name: 'minFlow',
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
	data: {}
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