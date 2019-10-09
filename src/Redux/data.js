import { handleRequestSort } from 'data/functions'

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
let fakeDevice = {
	nId: 0,
	address: "fakestreet",
	guid: "56970DF",
	id: "348580",
	type: "fakeDevice",
	active: true
}
export const getData = () => {
	return dispatch => {
		let data = []
		let i
		for (i = 0; i < 30; i++) {
			data.push({
				nId: i,
				address: fakeDevice.address + i,
				guid: fakeDevice.guid + i,
				id: fakeDevice.id + i,
				type: fakeDevice.type + i,
				active: i % 3 === 0 ? true : false
			})
		}
		dispatch({
			type: deviceData,
			payload: data
		})
		dispatch({
			type: 'selectDevice',
			payload: data.map(d => d.id)
		})
	}
}
const initialState = {
	devices: []
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