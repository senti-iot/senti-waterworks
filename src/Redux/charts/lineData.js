/**
 * Actions
 */
const SetArcData = 'setArcData'
/**
 * Dispatchers
 */
const dispSetArcData = (data, loading) => ({
	type: SetArcData,
	payload: { ...data, loading: loading }
})
/**
 * Middleware
 */

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
 * Set Arc Data
 * @param {Array} wsUsage
 */
export const setArcData = async (wsUsage, wsPrevUsage) =>
	async (dispatch, getState) => {
		let mUnit = getState().settings.mUnit
		let middleData = wsUsage.reduce((total, d) => {
			total = total + (d.totalFlowPerDay || d.averageFlowPerDay) || 0
			return total
		}, 0)
		let prevMiddleData = wsPrevUsage.reduce((total, d) => {
			total = total + (d.totalFlowPerDay || d.averageFlowPerDay) || 0
			return total
		}, 0)
		let data = {
			current: parseFloat(uC(middleData, mUnit)).toFixed(3),
			previous: parseFloat(uC(prevMiddleData, mUnit)).toFixed(3)
		}
		dispatch(dispSetArcData(data, false))
	}
/**
 * Initial state
 */
const initialState = {
	loading: true,
	current: 0,
	previous: 0,
}

export const lineData = (state = initialState, { type, payload }) => {
	switch (type) {

		case SetArcData:
			return Object.assign({}, state, payload)

		default:
			return state
	}
}

