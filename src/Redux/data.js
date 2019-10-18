import { handleRequestSort } from 'data/functions'
import { getDevices, /* getDevicesData */ } from 'data/devices'
// import { genBenchmarkAll } from 'data/model'

const sData = 'sortData'
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
			type: deviceData,
			payload: devices
		})
		dispatch({
			type: 'selectDevice',
			payload: devices.map(d => d.id)
		})
	}
}
export const getData = async () => {
	return async (dispatch, getState) => {
		// let data = await getDevicesData()
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
		case deviceData:
			return Object.assign({}, state, { devices: payload })
		default:
			return state;
	}
}