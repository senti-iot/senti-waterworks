import moment from 'moment'

const changePeriods = 'changeDate'
// const GetSettings = 'getSettings'

/**
 * TimeType = type of ticks for the Chart
 * 0 - Minutes
 * 1 - Hours
 * 2 - Days
 * 3 - Months
 */
// const removePeriod = 'chartRemovePeriod'

export const changeDate = (menuId, to, from, timeType) => {
	return (dispatch) => {
		let period = {
			menuId, to, from, timeType
		}
		dispatch({
			type: changePeriods,
			payload: period
		})
	}
}
/**
 * ChartType:
 * 0 - Pie
 * 1 - Doughnut
 * 2 - Bar
 * 3 - Line
 */
const initialState = {
	period: {
		menuId: 0,
		from: moment().subtract(7, 'day').startOf('day'),
		to: moment().endOf('day'),
		timeType: 2
	},

}

export const dateTime = (state = initialState, action) => {
	switch (action.type) {
		case changePeriods:
			return Object.assign({}, state, { period: action.payload })

		default:
			return state
	}
}
