import { monthAvgUUIDsRedux, monthRedux } from 'data/functions'
// import { genLineData } from 'data/model'
import moment from 'moment'
import { ambientColors, colorNames, maxFlowColors, minFlowColors } from 'variables/colors'

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
		// let mdc = getState().settings.maxDailyConsumption
		// let from = getState().dateTime.period.from.clone()
		// let to = getState().dateTime.period.to.clone()
		// let timeType = getState().dateTime.period.timeType.clone()
		// let mUnit = getState().settings.mUnit

		let finalData = {
			waterusage: [],
			waterTemp: [],
			ambientTemp: [],
			maxFlow: [],
			minFlow: [],
			readings: []
		}
		let selectedDevices = getState().appState.selectedDevices

		if (currentPeriodData.waterusage) {
			finalData.waterusage.push({
				name: 'waterusageL',
				median: true,
				data: currentPeriodData.waterusage,
				color: 'orange',
				noArea: true,
				bars: true
			})
		}
		if (previousPeriodData.waterusage) {
			finalData.waterusage.push({
				name: 'waterusageP',
				prev: true,
				hidden: true,
				noMedianLegend: true,
				median: true,
				isLine: true,
				data: previousPeriodData.waterusage
			})
		}
		if (currentPeriodData.benchmark) {
			finalData.waterusage.push({
				name: 'benchmark',
				hidden: true,
				noArea: true,
				dashed: true,
				isLine: true,
				data: currentPeriodData.benchmark,
				color: 'yellow'
			})

		}

		if (currentPeriodData.minWtemp) {
			// finalData.waterTemp.push({
			// 	name: 'tempWater',
			// 	median: true,
			// 	data: currentPeriodData.minWtemp.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()),
			// 	color: 'blue',
			// 	// bars: false

			// })
			if (currentPeriodData.minWtemp.length > 0 && selectedDevices.length < 11) {
				let devices = getState().data.devices
				let dataLines = selectedDevices.map((dev, i) => {
					return ({
						name: devices[devices.findIndex(d => d.uuid === dev)].uuname,
						color: colorNames[i],
						colorValue: i * 100,
						noArea: true,
						bars: true,
						data: currentPeriodData.minWtemp.filter(d => d.value && d.uuid === dev).map(d => ({ value: d.value, date: d.date }))
					})
				})

				finalData.waterTemp.push(...dataLines)
			}
		}
		console.log('currentPeriodData', currentPeriodData)

		if (currentPeriodData.minAtemp) {
			// finalData.ambientTemp.push({
			// 	name: 'tempAmbient',
			// 	median: true,
			// 	data: currentPeriodData.minAtemp.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()),
			// 	color: 'red',
			// 	// bars: false

			// })
			if (currentPeriodData.minAtemp.length > 0 && selectedDevices.length < 11) {
				let devices = getState().data.devices
				let dataLines = selectedDevices.map((dev, i) => {
					return ({
						name: devices[devices.findIndex(d => d.uuid === dev)].uuname,
						color: ambientColors[i],
						// colorValue: i * 100,
						noArea: true,
						bars: true,
						data: currentPeriodData.minAtemp.filter(d => d.value && d.uuid === dev).map(d => ({ value: d.value, date: d.date }))
					})
				})

				finalData.ambientTemp.push(...dataLines)
			}
		}
		console.log('finalData', finalData.ambientTemp)


		if (currentPeriodData.minFlow) {
			// finalData.minFlow.push({
			// 	name: 'minFlow',
			// 	median: true,
			// 	data: currentPeriodData.minFlow.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()),
			// 	color: 'purple'
			// })
			if (currentPeriodData.minFlow.length > 0 && selectedDevices.length < 11) {
				let devices = getState().data.devices
				let dataLines = selectedDevices.map((dev, i) => {
					return ({
						name: devices[devices.findIndex(d => d.uuid === dev)].uuname,
						color: minFlowColors[i],
						// colorValue: i * 100,
						noArea: true,
						bars: true,
						data: currentPeriodData.minFlow.filter(d => d.value && d.uuid === dev).map(d => ({ value: d.value, date: d.date }))
					})
				})

				finalData.minFlow.push(...dataLines)
			}
		}
		if (currentPeriodData.maxFlow) {
			// finalData.maxFlow.push({
			// 	name: 'maxFlow',
			// 	median: true,
			// 	data: currentPeriodData.maxFlow.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()),
			// 	color: 'lightBlue'
			// })
			if (currentPeriodData.maxFlow.length > 0 && selectedDevices.length < 11) {
				let devices = getState().data.devices
				let dataLines = selectedDevices.map((dev, i) => {
					console.log(dev, currentPeriodData.maxFlow)
					return ({
						name: devices[devices.findIndex(d => d.uuid === dev)].uuname,
						color: maxFlowColors[i],
						// colorValue: i * 100,
						noArea: true,
						bars: true,
						data: currentPeriodData.maxFlow.filter(d => d.value && d.uuid === dev).map(d => ({ value: d.value, date: d.date }))
					})
				})

				finalData.maxFlow.push(...dataLines)
			}
		}

		// if (previousPeriodData.minWtemp) {
		// 	finalData.waterTemp.push({
		// 		name: 'tempWaterPrev',
		// 		prev: true,
		// 		hidden: true,
		// 		noMedianLegend: true,
		// 		median: true,
		// 		data: previousPeriodData.minWtemp.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
		// 	})
		// }
		// if (previousPeriodData.minAtemp) {
		// 	finalData.ambientTemp.push({
		// 		name: 'tempAmbientPrev',
		// 		prev: true,
		// 		hidden: true,
		// 		noMedianLegend: true,
		// 		median: true,
		// 		data: previousPeriodData.minAtemp.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
		// 	})

		// }
		// if (previousPeriodData.minFlow) {
		// 	finalData.minFlow.push({
		// 		name: 'minFlowPrev',
		// 		prev: true,
		// 		hidden: true,
		// 		smallArea: true,
		// 		noMedianLegend: true,
		// 		median: true,
		// 		data: previousPeriodData.minFlow.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
		// 	})
		// }

		// if (previousPeriodData.maxFlow) {
		//
		// finalData.maxFlow.push({
		// 	name: 'maxFlowPrev',
		// 	prev: true,
		// 	hidden: true,
		// 	noMedianLegend: true,
		// 	median: true,
		// 	data: previousPeriodData.maxFlow.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
		// })

		// if (mdc > 0) {
		// 	let fMdc = mUnit === 'm3' ? mdc / 1000 : mdc
		// 	finalData.waterusage.push({
		// 		name: 'maxDailyConsumption',
		// 		noArea: true,
		// 		hidden: true,
		// 		onlyMedian: true,
		// 		noTooltip: true,
		// 		color: 'red',
		// 		data: [{
		// 			date: moment(from).clone().add(1, timeType > 1 ? 'day' : 'minute'), value: fMdc
		// 		}, { date: moment(to), value: fMdc }]
		// 	})
		// }
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
						color: colorNames[i],
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
			temperatureWData, temperatureAData,
			minFlowData,
			maxFlowData,
			dateDiff,
			readingsData,
			// temperatureWPrevData,
			// temperatureAPrevData,
			// minFlowPrevData,
			// maxFlowPrevData,
		} = data
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
			// currentPeriodData.minWtemp = genLineData(temperatureWData)
			currentPeriodData.minWtemp = temperatureWData.map(d => ({ value: d.value, date: d.datetime, uuid: d.uuid }))
		}
		console.log('temperatureAData', temperatureAData)
		if (temperatureAData && temperatureAData.length > 0) {
			// currentPeriodData.minAtemp = genLineData(temperatureAData)
			currentPeriodData.minAtemp = temperatureAData.map(d => ({ value: d.value, date: d.datetime, uuid: d.uuid }))
		}



		// if (temperatureWPrevData && temperatureWPrevData.length > 0) {
		// 	previousPeriodData.minWtemp = genLineData(temperatureWPrevData.map(d => ({ ...d, datetime: moment(d.datetime).add(dateDiff, timeType > 1 ? 'day' : 'hour') })))
		// }
		// if (temperatureAPrevData && temperatureAPrevData.length > 0) {
		// 	previousPeriodData.minAtemp = genLineData(temperatureAPrevData.map(d => ({ ...d, datetime: moment(d.datetime).add(dateDiff, timeType > 1 ? 'day' : 'hour') })))
		// }
		//#endregion
		//#region WaterFlow
		if (minFlowData && minFlowData.length > 0) {
			// currentPeriodData.minFlow = genLineData(minFlowData)
			currentPeriodData.minFlow = minFlowData.map(d => ({ value: d.value, date: d.datetime, uuid: d.uuid }))
		}

		if (maxFlowData && maxFlowData.length > 0) {
			// currentPeriodData.maxFlow = genLineData(maxFlowData)
			currentPeriodData.maxFlow = maxFlowData.map(d => ({ value: d.value, date: d.datetime, uuid: d.uuid }))
		}

		// if (minFlowPrevData && minFlowPrevData.length > 0) {
		// 	previousPeriodData.minFlow = genLineData(minFlowPrevData.map(d => ({ ...d, datetime: moment(d.datetime).add(dateDiff, timeType > 1 ? 'day' : 'hour') })))
		// }
		// if (maxFlowPrevData && maxFlowPrevData.length > 0) {
		// 	previousPeriodData.maxFlow = genLineData(maxFlowPrevData.map(d => ({ ...d, datetime: moment(d.datetime).add(dateDiff, timeType > 1 ? 'day' : 'hour') })))
		// }
		if (timeType === 4) {
			currentPeriodData.waterusage = monthRedux(currentPeriodData.waterusage)
			previousPeriodData.waterusage = monthRedux(previousPeriodData.waterusage)
			currentPeriodData.benchmark = monthRedux(currentPeriodData.benchmark)
			currentPeriodData.minWtemp = monthAvgUUIDsRedux(currentPeriodData.minWtemp)
			currentPeriodData.minAtemp = monthAvgUUIDsRedux(currentPeriodData.minAtemp)
			currentPeriodData.minFlow = monthAvgUUIDsRedux(currentPeriodData.minFlow)
			currentPeriodData.maxFlow = monthAvgUUIDsRedux(currentPeriodData.maxFlow)




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
	waterTemp: [],
	ambientTemp: [],
	maxFlow: [],
	minFlow: [],
	readings: []
}

export const lineData = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'RESET_APP':
			return initialState
		case SetLineData:
			return Object.assign({}, state, payload)
		default:
			return state
	}
}

