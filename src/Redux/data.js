import { handleRequestSort, getDates } from 'data/functions'
import {
	getDevices, getWaterUsage, getReadingUsage, getBenchmarkUsage, getPriceList,
	getTotalVolumeData, getDevicesV2, getMinATemperatureData, getMinWTemperatureData,
	getMinFlowData,
	getMaxFlowData
} from 'data/devices'
import { /* genBenchmark, genArcData, genWR, genMinATemp,  genMaxF, genMinF, genBarData, */ genNBarData, genMinATemp } from 'data/model'
import moment from 'moment'
// import { colors } from 'variables/colors'
import { getLatLongFromAddress, getWeather } from 'data/weather'
import { colors } from 'variables/colors'
// import { genBenchmarkAll } from 'data/model'

const sData = 'sortData'
const GETDevice = 'devices'
const deviceData = 'deviceData'
// const rawDataStore = 'storeOldData'
const middleChartData = 'middleChartData'
const barData = 'barData'
const averageData = 'averageData'
const pData = 'priceData'
const wData = 'weatherData'
const sDevice = 'selectDevice'

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

export const getAllDevices = async () => {
	return async (dispatch) => {
		let devices = await getDevices()
		dispatch({
			type: GETDevice,
			payload: devices
		})
		dispatch({
			type: 'selectDevice',
			// payload: devices ? devices.map(d => d.id) : []
			payload: devices.length > 0 ? [devices[0].id, devices[1].id, devices[2].id] : []
		})
	}
}
/**
 * Get Weather Data for the Line Graph
 */
export const getWeatherData = async () => {
	return async (dispatch, getState) => {
		let userExP = getState().settings.user.aux.sentiWaterworks.extendedProfile

		let from = getState().dateTime.period.from.clone()
		let to = getState().dateTime.period.to.clone()
		let dates = getDates(from, to)

		if (dates.length < 16 && userExP.address) {
			let adrs = userExP.address.split(' ')
			let address = `${adrs[0]} ${userExP.postnr} ${userExP.city}`
			let coords = await getLatLongFromAddress(address)
			let weather = await Promise.all(dates.map((d) => getWeather(d, coords.lat, coords.long))).then(rs => rs.map(r => r.daily.data[0]))
			let finalData = weather.map(w => ({
				date: moment(w.time),
				icon: w.icon,
				description: w.summary
			}))
			dispatch({
				type: wData,
				payload: finalData
			})
		}
		else {
			dispatch({
				type: wData,
				payload: []
			})
		}
	}
}
/**
 * Get Admin devices
 */
export const getAdminDevices = async () => {
	return async dispatch => {

		/**
		 * Get the devices for the admin
		 */
		let devices = await getDevicesV2()
		dispatch({
			type: GETDevice,
			payload: devices
		})
		await dispatch({
			type: sDevice,
			payload: devices.map(d => d.uuid)
		})
	}
}
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
 * Get & Generate data for all graphs
 */
export const getNData = async () => {
	return async (dispatch, getState) => {
		let orgId = getState().settings.user.org.uuid
		let from = getState().dateTime.period.from.clone().subtract(1, 'day')
		let to = getState().dateTime.period.to.clone().add(1, 'day')
		let mdc = getState().settings.maxDailyConsumption
		let subtr = moment(to).diff(moment(from), 'day')
		let prevFrom = moment(from).subtract(subtr, 'day').add(1, 'day')
		let prevTo = moment(from).add(1, 'day')
		let noOfAdults = getState().settings.user.aux.sentiWaterworks.extendedProfile.noOfAdults
		let noOfChildren = getState().settings.user.aux.sentiWaterworks.extendedProfile.noOfChildren
		let noOfPersons = noOfAdults + noOfChildren
		let mUnit = getState().settings.mUnit
		let isSuperUser = getState().auth.isSuperUser
		let isSWAdmin = getState().auth.privileges.indexOf('waterworks.admin') > -1 ? true : false
		let currentPeriodData = {},
			previousPeriodData = {}
		let finalData = {
			waterusage: [],
			temperature: [],
			waterflow: [],
			readings: []
		}
		let finalMiddleData = {
			current: {
				waterUsage: 0
			},
			previous: {
				waterUsage: 0
			}
		}
		let finalAverageData = {
			waterusagem3: 0,
			waterusageL: 0,
			benchmarkm3: 0,
			benchmarkL: 0
		}
		let finalPriceData = {
			waterusage: 0,
			sewage: 0
		}
		let finalBarData = {
			waterusage: [],
			readings: [],
			perPerson: [],
			average: []
		}
		if (isSuperUser || isSWAdmin) {
			let selectedDevices = getState().appState.selectedDevices
			let devices = getState().data.devices
			let suTo = to.clone().subtract(1, 'day')
			let suFrom = from.clone().add(1, 'day')
			let waterUsageData
			let waterUsagePrevData
			let benchmarkData
			let temperatureWData
			let temperatureWPrevData
			let temperatureAData
			let temperatureAPrevData
			let minFlowData
			let minFlowPrevData
			let maxFlowData
			let maxFlowPrevData
			let readingsData
			if (selectedDevices.length !== devices.length) {
				let uuids = selectedDevices.map(s => s)
				waterUsageData = await getTotalVolumeData(orgId, suFrom, suTo, uuids)
				waterUsagePrevData = await getTotalVolumeData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'), uuids)
				benchmarkData = await getBenchmarkUsage(orgId, from, suTo, uuids)

				temperatureWData = await getMinWTemperatureData(orgId, suFrom, suTo, uuids)
				temperatureWPrevData = await getMinWTemperatureData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'), uuids)
				temperatureAData = await getMinATemperatureData(orgId, suFrom, suTo, uuids)
				temperatureAPrevData = await getMinATemperatureData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'), uuids)

				minFlowData = await getMinFlowData(orgId, suFrom, suTo, uuids)
				minFlowPrevData = await getMinFlowData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'), uuids)
				maxFlowData = await getMaxFlowData(orgId, suFrom, suTo, uuids)
				maxFlowPrevData = await getMaxFlowData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'), uuids)

				readingsData = await getReadingUsage(suFrom, suTo, uuids)

			}
			else {
				waterUsageData = await getTotalVolumeData(orgId, suFrom, suTo)
				waterUsagePrevData = await getTotalVolumeData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'))
				benchmarkData = await getBenchmarkUsage(orgId, from, suTo)

				temperatureWData = await getMinWTemperatureData(orgId, suFrom, suTo)
				temperatureWPrevData = await getMinWTemperatureData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'))
				temperatureAData = await getMinATemperatureData(orgId, suFrom, suTo)
				temperatureAPrevData = await getMinATemperatureData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'))

				minFlowData = await getMinFlowData(orgId, suFrom, suTo)
				minFlowPrevData = await getMinFlowData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'))
				maxFlowData = await getMaxFlowData(orgId, suFrom, suTo)
				maxFlowPrevData = await getMaxFlowData(orgId, prevFrom.clone().add(1, 'day'), prevTo.clone().subtract(1, 'day'))

				readingsData = await getReadingUsage(suFrom, suTo)
			}


			let price = await getPriceList(orgId)



			let priceList = price ? price : {
				waterTotal: 0,
				sewageTotal: 0
			}
			//#region Water Usage
			if (waterUsageData.length > 0) {

				currentPeriodData.waterusage = waterUsageData.map(d => ({ value: uC(d.totalFlowPerDay, mUnit), date: d.d }))
				previousPeriodData.waterusage = waterUsagePrevData.map(d => ({ value: uC(d.totalFlowPerDay, mUnit), date: moment(d.d).add(subtr - 1, 'day') }))

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
				previousPeriodData.minWtemp = genMinATemp(temperatureWPrevData.map(d => ({ ...d, t: moment(d.t).add(subtr - 1, 'day') })))
			}
			if (temperatureAData.length > 0) {
				currentPeriodData.minAtemp = genMinATemp(temperatureAData)
			}
			if (temperatureAPrevData.length > 0) {
				previousPeriodData.minAtemp = genMinATemp(temperatureAPrevData.map(d => ({ ...d, t: moment(d.t).add(subtr - 1, 'day') })))
			}
			//#endregion
			//#region WaterFlow
			if (minFlowData.length > 0) {
				currentPeriodData.minFlow = genMinATemp(minFlowData)
			}
			if (minFlowPrevData.length > 0) {
				previousPeriodData.minFlow = genMinATemp(minFlowPrevData.map(d => ({ ...d, t: moment(d.t).add(subtr - 1, 'day') })))
			}
			if (maxFlowData.length > 0) {
				currentPeriodData.maxFlow = genMinATemp(maxFlowData)
			}
			if (maxFlowPrevData.length > 0) {
				previousPeriodData.maxFlow = genMinATemp(maxFlowPrevData.map(d => ({ ...d, t: moment(d.t).add(subtr - 1, 'day') })))
			}
			//#endregion

			//#region Final Line Data Creation
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

			//#region Arc Data
			let middleData = waterUsageData.reduce((total, d) => {
				total = total + d.totalFlowPerDay || 0
				return total
			}, 0)
			let prevMiddleData = waterUsagePrevData.reduce((total, d) => {
				total = total + d.totalFlowPerDay || 0
				return total
			}, 0)
			finalMiddleData = {
				current: parseFloat(uC(middleData, mUnit)).toFixed(3),
				previous: parseFloat(uC(prevMiddleData, mUnit)).toFixed(3)
			}

			//#endregion

			//#region Price & DailyUsage


			let avgValue = parseFloat(middleData / waterUsageData.length).toFixed(3)
			finalAverageData.waterusagem3 = avgValue
			finalAverageData.waterusageL = avgValue * 1000
			let benchmarkSum = benchmarkData.reduce((total, d) => {
				total = total + d.averageFlowPerDay
				return total
			}, 0)
			let bavgValue = parseFloat(benchmarkSum / waterUsageData.length).toFixed(3)
			finalAverageData.benchmarkm3 = bavgValue
			finalAverageData.benchmarkL = bavgValue * 1000

			finalPriceData = {
				waterusage: parseFloat(priceList.waterTotal * middleData).toFixed(2).replace('.', ','),
				sewage: parseFloat(priceList.sewageTotal * middleData).toFixed(2).replace('.', ','),
			}
			finalPriceData.total = parseFloat((priceList.waterTotal * middleData) + (priceList.sewageTotal * middleData)).toFixed(2).replace('.', ',')


			//#endregion

			//#region Final bar Data
			finalBarData = genNBarData(currentPeriodData.waterusage, currentPeriodData.benchmark, noOfPersons, mUnit, true)

			//#endregion
			dispatch({
				type: deviceData,
				payload: finalData
			})

			dispatch({
				type: middleChartData,
				payload: finalMiddleData
			})
			dispatch({
				type: barData,
				payload: finalBarData
			})

			dispatch({
				type: averageData,
				payload: finalAverageData
			})
			dispatch({
				type: pData,
				payload: finalPriceData
			})
			return
		}

		if (moment().diff(moment(to), 'day') === 0) {
			prevTo = moment(from)
		}

		let waterUsageData = await getWaterUsage(from, to)
		let waterUsagePrevData = await getWaterUsage(prevFrom, prevTo)
		let readingsData = await getReadingUsage(from.clone().add(1, 'day'), to)
		let benchmarkData = await getBenchmarkUsage(orgId, from, to)
		let price = await getPriceList(orgId)
		// let totalData = await getTotalVolumeData(orgId, from, to)


		let priceList = price ? price : {
			waterTotal: 0,
			sewageTotal: 0
		}
		//#region WaterUsage
		if (waterUsageData.length > 0) {

			currentPeriodData.waterusage = waterUsageData.map(d => ({ value: uC(d.averageFlowPerDay, mUnit), date: d.d }))
			previousPeriodData.waterusage = waterUsagePrevData.map(d => ({ value: uC(d.averageFlowPerDay, mUnit), date: moment(d.d).add(subtr - 1, 'day') }))

		}
		if (benchmarkData.length > 0) {
			// let prevB = benchmarkData.filter(f => moment(f.time) >= prevFrom && moment(f.time) <= prevTo)
			currentPeriodData.benchmark = benchmarkData.map(d => ({ value: uC(d.averageFlowPerDay, mUnit), date: d.d }))

			// previousPeriodData = {
			// 	benchmark: prevB.map(d => ({ value: d.averageFlowPerDay, date: d.t }))
			// }
		}
		//#endregion
		//#region Readings
		if (readingsData) {
			currentPeriodData.readings = readingsData.map(d => ({ value: d.val, date: d.t }))

		}
		//#endregion
		//#region temperature
		//#endregion
		//#region waterFlow
		//#endregion
		//#region Final Data Creation
		if (mdc > 0) {
			let fMdc = mUnit === 'm3' ? mdc / 1000 : mdc
			finalData.waterusage.push({
				name: 'maxDailyConsumption',
				label: 'settings.chart.maxDailyConsumption',
				noArea: true,
				// dashed: true,
				onlyMedian: true,
				// noMedianLegend: true,
				noLegend: true,
				color: 'red',
				data: [{
					date: moment(from).add(1, 'day'), value: fMdc
				}, { date: moment(to).subtract(1, 'day'), value: fMdc }]
			})
		}
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
		if (currentPeriodData.readings) {
			finalData.readings.push({
				name: 'readingL',
				color: 'yellow',
				noArea: true,
				data: currentPeriodData.readings
			})
		}
		//#endregion

		//#region Gen Arc Data


		let middleData = waterUsageData.reduce((total, d) => {
			total = total + d.averageFlowPerDay
			return total
		}, 0)
		let prevMiddleData = waterUsagePrevData.reduce((total, d) => {
			total = total + d.averageFlowPerDay || 0
			return total
		}, 0)
		finalMiddleData = {
			current: parseFloat(uC(middleData, mUnit)).toFixed(3),
			previous: parseFloat(uC(prevMiddleData, mUnit)).toFixed(3)
		}
		//#endregion
		//#region Generate bars Data

		finalBarData = genNBarData(currentPeriodData.waterusage, currentPeriodData.benchmark, noOfPersons, mUnit)

		//#endregion
		//#region Generate Average Data
		let avgValue = parseFloat(middleData / waterUsageData.length).toFixed(3)
		finalAverageData.waterusagem3 = avgValue
		finalAverageData.waterusageL = avgValue * 1000
		let benchmarkSum = benchmarkData.reduce((total, d) => {
			total = total + d.averageFlowPerDay
			return total
		}, 0)
		let bavgValue = parseFloat(benchmarkSum / waterUsageData.length).toFixed(3)
		finalAverageData.benchmarkm3 = bavgValue
		finalAverageData.benchmarkL = bavgValue * 1000

		//#endregion
		//#region Price Data

		finalPriceData = {
			waterusage: parseFloat(priceList.waterTotal * middleData).toFixed(2).replace('.', ','),
			sewage: parseFloat(priceList.sewageTotal * middleData).toFixed(2).replace('.', ','),
		}
		finalPriceData.total = parseFloat((priceList.waterTotal * middleData) + (priceList.sewageTotal * middleData)).toFixed(2).replace('.', ',')

		//#endregion

		//#region Get Weather Data
		await dispatch(await getWeatherData())
		//#endregion

		//#region Dispatch the data
		dispatch({
			type: deviceData,
			payload: finalData
		})

		dispatch({
			type: middleChartData,
			payload: finalMiddleData
		})
		dispatch({
			type: barData,
			payload: finalBarData
		})

		dispatch({
			type: averageData,
			payload: finalAverageData
		})
		dispatch({
			type: pData,
			payload: finalPriceData
		})
		//#endregion

	}
}

//#region OLD GET DATA
// export const getData = async () => {
// 	return async (dispatch, getState) => {
// 		let from = getState().dateTime.period.from.clone()
// 		let to = getState().dateTime.period.to.clone().endOf('day')
// 		let filterDevices = getState().appState.selectedDevices
// 		let noOfDevices = getState().data.devices.length
// 		let fromM1 = from.clone().subtract(1, 'day')
// 		let subtr = moment(to).diff(moment(from), 'day')
// 		let prevFrom = moment(from).subtract(1, 'day').subtract(subtr, 'day')

// 		let prevTo = moment(from)
// 		if (moment().diff(moment(to), 'day') === 0) {
// 			prevTo = moment(fromM1)
// 		}
// 		let rawData, prevRawData, currentPeriodData, benchMarkData, previousPeriodData, middleData,
// 			prevMiddleData,
// 			finalData = {
// 				waterusage: [],
// 				temperature: [],
// 				waterflow: [],
// 				readings: []
// 			},
// 			finalMiddleData = {
// 				current: {
// 					waterUsage: 0
// 				},
// 				previous: {
// 					waterUsage: 0
// 				}
// 			},
// 			finalBarData = {
// 				waterusage: [],
// 				readings: [],
// 				temperature: [],
// 				waterflow: []
// 			}

// 		/**
// 		 * TODO: Filter the data of devices here ONCE instead of 4 times inside model
// 		 */
// 		// let completeRawData = await getDevicesData(prevFrom, to)
// 		let completeRawData = []

// 		if (completeRawData) {

// 			rawData = completeRawData.filter(f => moment(f.time) >= fromM1 && moment(f.time) <= to)
// 			prevRawData = completeRawData.filter(f => moment(f.time) >= prevFrom && moment(f.time) <= prevTo)

// 			//#region Current Period
// 			currentPeriodData = {
// 				// waterUsage: genWR(rawData, filterDevices),
// 				temperature: {
// 					ambient: genMinATemp(rawData, filterDevices),
// 					water: genMinWTemp(rawData, filterDevices)
// 				},
// 				waterFlow: {
// 					maxFlow: genMaxF(rawData, filterDevices),
// 					minFlow: genMinF(rawData, filterDevices)
// 				},
// 				...currentPeriodData
// 			}
// 			benchMarkData = genBenchmark(rawData, noOfDevices, filterDevices.length)

// 			//#endregion
// 			//#region Previous period

// 			prevRawData.forEach(d => {
// 				d.time = moment(d.time).add(subtr, 'day')
// 			})

// 			previousPeriodData = {
// 				waterUsage: genWR(prevRawData, filterDevices),
// 				temperature: {
// 					ambient: genMinATemp(prevRawData, filterDevices),
// 					water: genMinWTemp(prevRawData, filterDevices)
// 				},
// 				waterFlow: {
// 					maxFlow: genMaxF(prevRawData, filterDevices),
// 					minFlow: genMinF(prevRawData, filterDevices)
// 				}
// 			}
// 			// currentPeriodData = genData(rawData, filterDevices)
// 			// previousPeriodData = genData(prevRawData, filterDevices, true, subtr)

// 			//#endregion
// 			/**
// 			 * TODO: Do not call the API for another set of data, filter it based on from
// 			 */

// 			let rawArcData = currentPeriodData.waterUsage
// 			let prevRawArcData = previousPeriodData.waterUsage/* .filter(f => moment(f.created) > prevFrom) */

// 			middleData = genArcData(rawArcData, filterDevices)
// 			prevMiddleData = genArcData(prevRawArcData, filterDevices)
// 			finalData = {
// 				waterusage: [
// 					{
// 						name: 'waterusageL',
// 						median: true,
// 						data: currentPeriodData.waterUsage,
// 						color: 'orange'
// 					},
// 					{
// 						name: 'waterusageP',
// 						prev: true,
// 						hidden: true,
// 						noMedianLegend: true,
// 						median: true,
// 						data: previousPeriodData.waterUsage
// 					},
// 					{
// 						name: 'benchmark',
// 						hidden: true,
// 						noArea: true,
// 						dashed: true,
// 						data: benchMarkData,
// 						color: 'yellow'
// 					}
// 				],
// 				temperature: [
// 					{
// 						name: 'tempAmbient',
// 						median: true,
// 						data: currentPeriodData.temperature.ambient,
// 						color: 'red'
// 					},
// 					{
// 						name: 'tempAmbientPrev',
// 						prev: true,
// 						hidden: true,
// 						noMedianLegend: true,
// 						median: true,
// 						data: previousPeriodData.temperature.ambient
// 					},
// 					{
// 						name: 'tempWater',
// 						median: true,
// 						data: currentPeriodData.temperature.water,
// 						color: 'blue'
// 					},

// 					{
// 						name: 'tempWaterPrev',
// 						prev: true,
// 						hidden: true,
// 						noMedianLegend: true,
// 						median: true,
// 						data: previousPeriodData.temperature.water
// 					}
// 				],
// 				waterflow: [
// 					{
// 						name: 'maxFlow',
// 						median: true,
// 						data: currentPeriodData.waterFlow.maxFlow,
// 						color: 'lightBlue'
// 					},
// 					{
// 						name: 'maxFlowPrev',
// 						prev: true,
// 						hidden: true,
// 						noMedianLegend: true,
// 						median: true,
// 						data: previousPeriodData.waterFlow.maxFlow
// 					},
// 					{
// 						name: 'minFlow',
// 						median: true,
// 						data: currentPeriodData.waterFlow.minFlow,
// 						color: 'purple'
// 					},
// 					{
// 						name: 'minFlowPrev',
// 						prev: true,
// 						hidden: true,
// 						smallArea: true,
// 						noMedianLegend: true,
// 						median: true,
// 						data: previousPeriodData.waterFlow.minFlow
// 					}
// 				]

// 			}
// 			if (filterDevices.length < 11) {
// 				let devices = getState().data.devices
// 				let dataLines = filterDevices.map((dev, i) => ({
// 					name: "" + devices[devices.findIndex(d => d.id === dev)].name,
// 					color: colors[i],
// 					noArea: true,
// 					data: rawData.filter(d => d.value && d.device_id === dev).map(d => ({ value: d.value, date: moment(d.created).startOf('day') }))
// 				}))
// 				finalData.readings = dataLines
// 				// finalData.readings = [
// 				// 	{
// 				// 		name: 'readingL',
// 				// 		// median: true,
// 				// 		color: 'yellow',
// 				// 		data: rawData.filter(d => d.value && d.device_id === filterDevices[0]).map(d => ({ value: d.value, date: moment(d.created).startOf('day') }))
// 				// 	}
// 				// ]
// 			}
// 			else {
// 				finalData.readings = []
// 			}
// 			//#region Middle Widget Final Data

// 			finalMiddleData = {
// 				current: middleData,
// 				previous: prevMiddleData
// 			}

// 			//#endregion
// 			//#region Bar Chart Final Data
// 			finalBarData = genBarData(currentPeriodData, previousPeriodData)
// 			//#endregion
// 		}

// 		//#region Dispatch the calculated data
// 		dispatch({
// 			type: deviceData,
// 			payload: finalData
// 		})

// 		dispatch({
// 			type: middleChartData,
// 			payload: finalMiddleData
// 		})
// 		dispatch({
// 			type: barData,
// 			payload: finalBarData
// 		})
// 		//#endregion
// 	}
// }
//#endregion

const initialState = {
	barData: {},
	devices: [],
	data: {},
	priceData: {
		waterusage: 0,
		sewage: 0,
		total: 0
	},
	avgData: {
		waterusagem3: 0,
		waterusageL: 0,
		benchmarkm3: 0,
		benchmarkL: 0
	},
	middleChartData: {
		current: {
			waterusage: 0
		},
		previous: {
			waterusage: 0
		}
	},
	deviceData: {
		waterusage: [],
		temperature: [],
		waterflow: [],
		readings: []
	}
}

export const data = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'RESET_APP':
			return initialState
		case sData:
			return Object.assign({}, state, { [payload.key]: payload.sortedData })
		case GETDevice:
			return Object.assign({}, state, { devices: payload })
		case deviceData:
			return Object.assign({}, state, { deviceData: payload })
		case barData:
			return Object.assign({}, state, { barData: payload })
		case averageData:
			return Object.assign({}, state, { avgData: payload })
		case pData:
			return Object.assign({}, state, { priceData: payload })
		case wData:
			return Object.assign({}, state, { weatherData: payload })
		case middleChartData:
			return Object.assign({}, state, { middleChartData: payload })
		default:
			return state
	}
}