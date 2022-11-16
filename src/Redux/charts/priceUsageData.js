import { getPriceList } from 'data/waterworks'
import moment from 'moment'
/**
 * Actions
 */
const SetPriceData = 'setPriceData'
const SetUsageData = 'setUsageData'
const SetOrgSettings = 'setOrgSettings'
const SetOneDay = 'setOneDay'
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
export const setPriceUsageData = async (wsUsage, benchmarkData, oneDayReading) =>
	console.log('oneDayReading', oneDayReading));
	async (dispatch, getState) => {
		let usageData = {}, priceData = {}, oneDayUsage = {}
		let orgId = getState().settings.user?.org.uuid
		let price = await getPriceList(orgId)

		let settings = price?.settings ? price.settings : {}

		dispatch({
			type: SetOrgSettings,
			payload: settings
		})

		let priceList = price ? price : {
			waterTotal: 0,
			sewageTotal: 0
		}
		let middleData = wsUsage.reduce((total, d) => {
			total = total + d.value
			return total
		}, 0)

		let benchmarkSum = benchmarkData.reduce((total, d) => {
			total = total + d.value
			return total
		}, 0)

		if (oneDayReading?.length > 0) {
			let sortArr = oneDayReading.sort((a, b) => moment(b.datetime).valueOf() - moment(a.datetime).valueOf())
			oneDayUsage.value = sortArr[0].value - sortArr[1].value
			oneDayUsage.reading = sortArr[0].value
		}

		/**
		 * Change from datapoints to number of days
		 * @Andrei
		 */
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

		dispatch({
			type: SetOneDay,
			payload: { oneDayUsage }
		})

	}
/**
 * Initial state
 */
const initialState = {
	loading: true,
	prevPrice: {
		waterusage: 0,
		sewage: 0,
		total: 0
	},
	oneDayUsage: {
		value: null,
	},
	price: {
		waterusage: 0,
		sewage: 0,
		total: 0
	},
	prevUsage: {
		waterusagem3: 0,
		waterusageL: 0,
		benchmarkm3: 0,
		benchmarkL: 0
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
		case 'RESET_APP':
			return initialState
		case SetOneDay:
			return Object.assign({}, state, payload)
		case SetUsageData:
			return Object.assign({}, state, payload)
		case SetPriceData:
			return Object.assign({}, state, payload)
		default:
			return state
	}
}

