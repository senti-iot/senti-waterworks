import { genMinATemp } from 'data/model'
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
export const genLines = (currentPeriodData, previousPeriodData) => {
	return async (dispatch, getState) => {
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
		let { waterUsageData, waterUsagePrevData, benchmarkData,
			temperatureWData, temperatureWPrevData, temperatureAData, temperatureAPrevData,
			minFlowData, minFlowPrevData,
			maxFlowData, maxFlowPrevData,
			readingsData } = data
		let currentPeriodData = {}, previousPeriodData = {}
		//#region Water Usage
		if (waterUsageData.length > 0) {

			currentPeriodData.waterusage = waterUsageData.map(d => ({ value: uC(d.totalFlowPerDay, mUnit), date: d.d }))
			previousPeriodData.waterusage = waterUsagePrevData.map(d => ({ value: uC(d.totalFlowPerDay, mUnit), date: moment(d.d) }))

		}
		if (benchmarkData.length > 0) {
			currentPeriodData.benchmark = benchmarkData.map(d => ({ value: uC(d.averageFlowPerDay, mUnit), date: d.d }))
		}
		if (readingsData) {
			currentPeriodData.readings = readingsData.map(d => ({ value: d.val, date: d.t, uuid: d.uuid }))

		}
		//#endregion

		//#region Temperature
		if (temperatureWData.length > 0) {
			currentPeriodData.minWtemp = genMinATemp(temperatureWData)
		}
		if (temperatureWPrevData.length > 0) {
			previousPeriodData.minWtemp = genMinATemp(temperatureWPrevData.map(d => ({ ...d, t: moment(d.t) })))
		}
		if (temperatureAData.length > 0) {
			currentPeriodData.minAtemp = genMinATemp(temperatureAData)
		}
		if (temperatureAPrevData.length > 0) {
			previousPeriodData.minAtemp = genMinATemp(temperatureAPrevData.map(d => ({ ...d, t: moment(d.t) })))
		}
		//#endregion
		//#region WaterFlow
		if (minFlowData.length > 0) {
			currentPeriodData.minFlow = genMinATemp(minFlowData)
		}
		if (minFlowPrevData.length > 0) {
			previousPeriodData.minFlow = genMinATemp(minFlowPrevData.map(d => ({ ...d, t: moment(d.t) })))
		}
		if (maxFlowData.length > 0) {
			currentPeriodData.maxFlow = genMinATemp(maxFlowData)
		}
		if (maxFlowPrevData.length > 0) {
			previousPeriodData.maxFlow = genMinATemp(maxFlowPrevData.map(d => ({ ...d, t: moment(d.t) })))
		}
		//#endregion
		dispatch(await genLines(currentPeriodData, previousPeriodData))
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

