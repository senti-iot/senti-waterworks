import { genLineData } from 'data/model'
import moment from 'moment'
import { colors } from 'variables/colors'

/**
 * Actions
 */
const SetLineData = 'setLineData'
/**
 * Dispatchers
 */
const dispSetLineData = (data, loading) => ({
	type: SetLineData,
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
 * Generate the lines
 */
export const genLines = (currentPeriodData, previousPeriodData, isUser) => {
	return async (dispatch, getState) => {
		let mdc = getState().settings.maxDailyConsumption
		let from = getState().dateTime.period.from.clone()
		let to = getState().dateTime.period.to.clone()
		let mUnit = getState().settings.mUnit

		let finalData = {
			waterusage: [],
			temperature: [],
			waterflow: [],
			readings: []
		}
		let selectedDevices = getState().appState.selectedDevices

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

		if (currentPeriodData.minWtemp) {
			finalData.temperature.push({
				name: 'tempWater',
				median: true,
				data: currentPeriodData.minWtemp.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()),
				color: 'blue'

			})
		}

		if (currentPeriodData.minAtemp) {
			finalData.temperature.push({
				name: 'tempAmbient',
				median: true,
				data: currentPeriodData.minAtemp.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()),
				color: 'red'

			})
		}
		if (previousPeriodData.minWtemp) {
			finalData.temperature.push({
				name: 'tempWaterPrev',
				prev: true,
				hidden: true,
				noMedianLegend: true,
				median: true,
				data: previousPeriodData.minWtemp.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
			})
		}
		if (previousPeriodData.minAtemp) {
			finalData.temperature.push({
				name: 'tempAmbientPrev',
				prev: true,
				hidden: true,
				noMedianLegend: true,
				median: true,
				data: previousPeriodData.minAtemp.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
			})
		}

		if (currentPeriodData.minFlow) {
			finalData.waterflow.push({
				name: 'minFlow',
				median: true,
				data: currentPeriodData.minFlow.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()),
				color: 'purple'
			})
		}
		if (currentPeriodData.maxFlow) {
			finalData.waterflow.push({
				name: 'maxFlow',
				median: true,
				data: currentPeriodData.maxFlow.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()),
				color: 'lightBlue'
			})
		}
		if (previousPeriodData.minFlow) {
			finalData.waterflow.push({
				name: 'minFlowPrev',
				prev: true,
				hidden: true,
				smallArea: true,
				noMedianLegend: true,
				median: true,
				data: previousPeriodData.minFlow.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
			})
		}
		if (previousPeriodData.maxFlow) {
			finalData.waterflow.push({
				name: 'maxFlowPrev',
				prev: true,
				hidden: true,
				noMedianLegend: true,
				median: true,
				data: previousPeriodData.maxFlow.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
			})
		}
		if (mdc > 0) {
			let fMdc = mUnit === 'm3' ? mdc / 1000 : mdc
			finalData.waterusage.push({
				name: 'maxDailyConsumption',
				noArea: true,
				hidden: true,
				onlyMedian: true,
				noTooltip: true,
				color: 'red',
				data: [{
					date: moment(from).add(1, 'day'), value: fMdc
				}, { date: moment(to).subtract(1, 'day'), value: fMdc }]
			})
		}
		if (isUser) {
			if (currentPeriodData.readings.length > 0) {
				finalData.readings.push({
					name: 'readingL',
					color: 'yellow',
					noArea: true,
					data: currentPeriodData.readings
				})
			}
		}
		else {
			if (currentPeriodData.readings.length > 0 && selectedDevices.length < 11) {
				let devices = getState().data.devices
				let dataLines = selectedDevices.map((dev, i) => {
					return ({
						name: "" + devices[devices.findIndex(d => d.uuid === dev)].name,
						color: colors[i],
						noArea: true,
						data: currentPeriodData.readings.filter(d => d.value && d.uuid === dev).map(d => ({ value: d.value, date: d.date }))
					})
				})

				finalData.readings.push(...dataLines)
			}

		}

		//#endregion
		dispatch(await dispSetLineData(finalData))
	}
}
/**
 * Map the data
 * @param {Obj} Data
 */
export const mapLineData = async data => {
	return async (dispatch, getState) => {
		let mUnit = getState().settings.mUnit
		let timeType = getState().dateTime.period.timeType
		let { waterUsageData, waterUsagePrevData, benchmarkData,
			temperatureWData, temperatureWPrevData, temperatureAData, temperatureAPrevData,
			minFlowData, minFlowPrevData,
			maxFlowData, maxFlowPrevData,
			dateDiff,
			readingsData } = data
		let currentPeriodData = {}, previousPeriodData = {}
		//#region Water Usage
		if (waterUsageData && waterUsageData.length > 0) {

			currentPeriodData.waterusage = waterUsageData.map(d => ({ value: uC(d.value, mUnit), date: (d.datetime) }))
			previousPeriodData.waterusage = waterUsagePrevData.map(d => ({ value: uC(d.value, mUnit), date: moment((d.datetime)).add(dateDiff, timeType > 1 ? 'day' : 'hour') }))

		}
		if (benchmarkData && benchmarkData.length > 0) {
			currentPeriodData.benchmark = benchmarkData.map(d => ({ value: uC(d.value, mUnit), date: (d.datetime) }))
		}
		if (readingsData) {
			currentPeriodData.readings = readingsData.map(d => ({ value: d.value, date: d.datetime, uuid: d.uuid }))
		}
		//#endregion

		//#region Temperature
		if (temperatureWData && temperatureWData.length > 0) {
			currentPeriodData.minWtemp = genLineData(temperatureWData)
		}
		if (temperatureWPrevData && temperatureWPrevData.length > 0) {
			previousPeriodData.minWtemp = genLineData(temperatureWPrevData.map(d => ({ ...d, datetime: moment(d.datetime).add(dateDiff, timeType > 1 ? 'day' : 'hour') })))
		}
		if (temperatureAData && temperatureAData.length > 0) {
			currentPeriodData.minAtemp = genLineData(temperatureAData)
		}
		if (temperatureAPrevData && temperatureAPrevData.length > 0) {
			previousPeriodData.minAtemp = genLineData(temperatureAPrevData.map(d => ({ ...d, datetime: moment(d.datetime).add(dateDiff, timeType > 1 ? 'day' : 'hour') })))
		}
		//#endregion
		//#region WaterFlow
		if (minFlowData && minFlowData.length > 0) {
			currentPeriodData.minFlow = genLineData(minFlowData)
		}
		if (minFlowPrevData && minFlowPrevData.length > 0) {
			previousPeriodData.minFlow = genLineData(minFlowPrevData.map(d => ({ ...d, datetime: moment(d.datetime).add(dateDiff, timeType > 1 ? 'day' : 'hour') })))
		}
		if (maxFlowData && maxFlowData.length > 0) {
			currentPeriodData.maxFlow = genLineData(maxFlowData)
		}
		if (maxFlowPrevData && maxFlowPrevData.length > 0) {
			previousPeriodData.maxFlow = genLineData(maxFlowPrevData.map(d => ({ ...d, datetime: moment(d.datetime).add(dateDiff, timeType > 1 ? 'day' : 'hour') })))
		}

		//#endregion
		dispatch(await genLines(currentPeriodData, previousPeriodData, data.isUser))
	}
}
/**
 * Set Arc Data
 * @param {Array} wsUsage
 */
export const setLineData = async (data) =>
	async (dispatch, getState) => {
		await dispatch(await mapLineData(data))

	}
/**
 * Initial state
 */
const initialState = {
	loading: true,
	waterusage: [],
	temperature: [],
	waterflow: [],
	readings: []
}

export const lineData = (state = initialState, { type, payload }) => {
	switch (type) {

		case SetLineData:
			return Object.assign({}, state, payload)

		default:
			return state
	}
}

