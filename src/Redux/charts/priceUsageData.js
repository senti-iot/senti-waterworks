import { getPriceList } from 'data/devices'

/**
 * Actions
 */
const SetPriceData = 'setPriceData'
const SetUsageData = 'setUsageData'
/**
 * Dispatchers
 */
const dispSetPriceData = (data, loading) => ({
	type: SetPriceData,
	payload: { price: data, loading: loading }
})
const dispSetUsageData = (data, loading) => ({
	type: SetUsageData,
	payload: { usage: data, loading: loading }
})
/**
 * Middleware
 */

/**
 * Set Arc Data
 * @param {Array} wsUsage
 */
export const setPriceUsageData = async (wsUsage, benchmarkData) =>
	async (dispatch, getState) => {
		let usageData = {}, priceData = {}
		let orgId = getState().settings.user?.org.uuid
		let price = await getPriceList(orgId)

		let priceList = price ? price : {
			waterTotal: 0,
			sewageTotal: 0
		}
		let middleData = wsUsage.reduce((total, d) => {
			total = total + (d.averageFlowPerDay || d.totalFlowPerDay)
			return total
		}, 0)

		let benchmarkSum = benchmarkData.reduce((total, d) => {
			total = total + (d.averageFlowPerDay || d.totalFlowPerDay)
			return total
		}, 0)

		let avgValue = parseFloat(middleData / wsUsage.length).toFixed(3)
		let bavgValue = parseFloat(benchmarkSum / wsUsage.length).toFixed(3)

		usageData.waterusagem3 = avgValue
		usageData.waterusageL = avgValue * 1000
		usageData.benchmarkm3 = bavgValue
		usageData.benchmarkL = bavgValue * 1000

		dispatch(dispSetUsageData(usageData, false))

		priceData.waterusage = parseFloat(priceList.waterTotal * middleData).toFixed(2).replace('.', ',')
		priceData.sewage = parseFloat(priceList.sewageTotal * middleData).toFixed(2).replace('.', ',')
		priceData.total = parseFloat((priceList.waterTotal * middleData) + (priceList.sewageTotal * middleData)).toFixed(2).replace('.', ',')

		dispatch(dispSetPriceData(priceData, false))


	}
/**
 * Initial state
 */
const initialState = {
	loading: true,
	price: {
		waterusage: 0,
		sewage: 0,
		total: 0
	},
	usage: {
		waterusagem3: 0,
		waterusageL: 0,
		benchmarkm3: 0,
		benchmarkL: 0
	},

}

export const priceUsageData = (state = initialState, { type, payload }) => {
	switch (type) {

		case SetUsageData:
			return Object.assign({}, state, payload)
		case SetPriceData:
			return Object.assign({}, state, payload)
		default:
			return state
	}
}

