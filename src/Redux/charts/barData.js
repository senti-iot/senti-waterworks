import { genNBarData } from 'data/model'

/**
 * Actions
 */
const SetBarData = 'SetBarData'
/**
 * Dispatchers
 */
const dispSetBarData = (data, loading) => ({
	type: SetBarData,
	payload: { ...data, loading: loading }
})
/**
 * Middleware
 */

/**
 * Set Arc Data
 * @param {Array} wsUsage
 */
export const setBarData = async (wsUsage, wsUsagePerson) =>
	async (dispatch, getState) => {
		let mUnit = getState().settings.mUnit
		let barData = genNBarData(wsUsage, wsUsagePerson, mUnit)

		dispatch(dispSetBarData(barData, false))
	}
/**
 * Initial state
 */
const initialState = {
	loading: true
}

export const barData = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'RESET_APP':
			return initialState
		case SetBarData:
			return Object.assign({}, state, payload)

		default:
			return state
	}
}

