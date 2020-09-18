import moment from 'moment'

//#region Main Graph

// export const genWaterPerDevice = (data) => {
// 	let devData = {}
// 	let final = []
// 	if (data.length > 0) {
// 		data.forEach(d => {
// 			devData[d.id] = devData[d.id] || {}
// 			var date = moment(d.date).format('YYYY-MM-DD HH:mm:ss')
// 			devData[d.id][date] = devData[d.id][date] || {}
// 			devData[d.id][date] = d.value
// 		})
// 		let deviceIds = Object.keys(devData)
// 		var dataByDay = {}
// 		deviceIds.forEach((d) => {
// 			let dates = Object.keys(devData[d]).reverse()
// 			dates.forEach((de, di) => {
// 				if (di < dates.length - 1 && devData[d][dates[di + 1]] && devData[d][de]) {
// 					devData[d][de] = devData[d][de] - devData[d][dates[di + 1]]
// 					dataByDay[de] = dataByDay[de] || 0
// 					dataByDay[de] = dataByDay[de] + devData[d][de]
// 				}
// 				else {
// 					delete devData[d][de]
// 				}
// 			})
// 		})

// 		Object.keys(dataByDay).forEach(k => final.push({ date: k, value: parseFloat(dataByDay[k].toFixed(3)) }))
// 		final = final.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
// 	}
// 	return final
// }


export const genReading = (deviceData) => {
	let data = {}
	var dataByDay = deviceData.reduce((d, datum) => {
		var date = moment(datum.date)
		var value = datum.value
		let group = date.format('YYYY-MM-DD 00:00:00').toString()
		data[group] = data[group] || {}
		data[group].totalValue = (data[group].totalValue || 0) + value
		data[group].count = (data[group].count || 0) + 1
		return data
	}, {})
	let fResult = []
	Object.keys(dataByDay).forEach(d => {
		fResult.push({
			date: d,
			value: parseFloat((dataByDay[d].totalValue / dataByDay[d].count).toFixed(2)) ? parseFloat((dataByDay[d].totalValue / dataByDay[d].count).toFixed(2)) : 0
		})
	})
	console.log('fResult', fResult)
	return fResult
}
export const genLineData = (deviceData, filter, prev, diff) => {
	let lineData
	if (filter && filter.length > 0) {
		lineData = deviceData.filter(d => d.value !== null && filter.indexOf(d.uuid) > -1)
	}
	else {
		lineData = deviceData.filter(d => d.value !== null)
	}
	console.log(lineData)
	lineData = genReading(lineData.map(d => ({ value: d.value, date: d.datetime })))

	return lineData
}
// =======
// export const genMaxF = (deviceData, filter, prev, diff) => {
// 	let maxFlow
// 	if (filter && filter.length > 0) {
// 		maxFlow = deviceData.filter(d => d.maxFlow && filter.indexOf(d.device_id) > -1)
// 	}
// 	else {
// 		maxFlow = deviceData.filter(d => d.maxFlow)
// 	}


// 	maxFlow = genReading(maxFlow.map(d => ({ value: d.maxFlow, date: d.time })))

// 	return maxFlow
// }
// export const genBenchmark = (deviceData, noOfDevices, noOfSelectedDevices) => {
// 	let waterReading = deviceData.filter(d => d.value).map(d => ({ id: d.device_id, value: d.value, date: moment(d.time) }))
// 	// window.bench = deviceData.filter(d => d.value).map(d => ({ id: d.device_id, value: d.value, date: moment(d.time) }))
// 	let data = []
// 	data = genWaterPerDevice(waterReading)
// 	if (noOfDevices - noOfSelectedDevices !== 0) {
// 		Object.keys(data).forEach(f => {
// 			data[f].value = parseFloat(((data[f].value / noOfDevices) * (noOfSelectedDevices)).toFixed(2))
// 		})
// 	}
// 	return data
// >>>>>>> beta
// }
//#endregion


// export const genBenchmark = (deviceData, noOfDevices, noOfSelectedDevices) => {
// 	let waterReading = deviceData.filter(d => d.value).map(d => ({ id: d.device_id, value: d.value, date: moment(d.time) }))
// 	// window.bench = deviceData.filter(d => d.value).map(d => ({ id: d.device_id, value: d.value, date: moment(d.time) }))
// 	let data = []
// 	data = genWaterPerDevice(waterReading)
// 	if (noOfDevices - noOfSelectedDevices !== 0) {
// 		Object.keys(data).forEach(f => {
// 			data[f].value = parseFloat(((data[f].value / noOfDevices) * (noOfSelectedDevices)).toFixed(3))
// 		})
// 	}
// 	return data
// }

// export const genWR = (deviceData, filter, prev, diff) => {
// 	let waterUsage
// 	window.wr = deviceData.filter(d => d.value && filter.indexOf(d.device_id) > -1).map(d => ({ id: d.device_id, value: d.value, date: moment(d.time) }))

// 	if (prev) {
// 		deviceData.forEach(d => {
// 			d.time = moment(d.time).add(diff, 'day')
// 		})
// 	}
// 	if (filter && filter.length > 0) {
// 		waterUsage = deviceData.filter(d => d.value && filter.indexOf(d.device_id) > -1).map(d => ({ id: d.device_id, value: d.value, date: moment(d.time) }))

// 	}
// 	else {
// 		waterUsage = deviceData.filter(d => d.value).map(d => ({ id: d.device_id, value: d.value, date: moment(d.time) }))
// 	}

// 	waterUsage = genWaterPerDevice(waterUsage)

// 	return waterUsage
// }
//#region Arc Graph

const sumUpData = (data) => {
	let total = 0
	if (data)
		Object.keys(data).forEach(d => {
			total = total + data[d].value
		})
	return parseFloat(total.toFixed(2))

}

export const genArcData = (deviceData) => {
	// let data = {}
	let data = {
		waterusage: 0
		// values: []
	}
	data.waterusage = sumUpData(deviceData)
	// data.values = waterReading.map(d => ({ id: d.device_id, value: d.value, date: d.time }))
	return data
}
//#endregion


//#region Bar Graph
const getValues = arr => arr ? arr.map(a => (a.value)) : []

export const genBarData = (currentData, prevData, noOfPersons) => {
	let waterusage = []

	//#region WaterUsage/Reading
	let values = getValues(currentData.waterusage)
	/**
	 * Min WaterUsage
	 */
	let minUsage = {}
	minUsage.className = 'waterUsageA'
	minUsage.value = parseFloat(values.reduce((min, p) => p < min ? p : min, values[0])).toFixed(2)
	minUsage.unit = 'm³'
	minUsage.type = 'chartTable.waterusage.line1'
	waterusage.push(minUsage)
	/**
	 *  Max WaterUsage
	 */
	let maxUsage = {}
	maxUsage.className = 'waterUsageB'
	maxUsage.value = parseFloat(values.reduce((max, p) => p > max ? p : max, values[0])).toFixed(2)
	maxUsage.unit = 'm³'
	maxUsage.type = 'chartTable.waterusage.line2'
	waterusage.push(maxUsage)
	/**
	 * Average
	 */
	let average = {}
	average.className = 'waterUsageC'
	average.value = parseFloat((values.reduce((a, b) => a + b, 0) / values.length).toFixed(2))
	average.unit = 'm³'
	average.type = 'chartTable.waterusage.line3'
	waterusage.push(average)
	/**
	 * Usage Per person
	 */
	let nOP = noOfPersons > 0 ? noOfPersons : 1
	let perPerson = {}
	perPerson.className = 'waterUsageD'
	perPerson.value = parseFloat(((values.reduce((a, b) => a + b, 0) / values.length) / nOP).toFixed(2))
	perPerson.unit = 'm³'
	perPerson.type = 'chartTable.waterusage.line4'
	waterusage.push(perPerson)
	//#endregion

	return {
		waterusage: waterusage,
		readings: waterusage,
		temperature: [],
		waterflow: []
	}

}
export const genNBarData = (waterusageData, noOfPersons, unit, admin) => {
	let waterusage = []

	//#region WaterUsage/Reading
	let values = getValues(waterusageData)
	// let benchmarkValues = getValues(benchmarkData)
	if (values.length > 0) {
		/**
	 	* Min WaterUsage
	 	*/
		let minUsage = {}
		minUsage.className = 'waterUsageA'
		minUsage.value = parseFloat(values.reduce((min, p) => p < min ? p : min, values[0]).toFixed(3))
		minUsage.value = unit === 'm3' ? minUsage.value : minUsage.value * 1000
		minUsage.unit = unit === 'm3' ? 'm³' : 'L'
		minUsage.type = 'chartTable.waterusage.line1'
		waterusage.push(minUsage)

		/**
		 *  Max WaterUsage
		 */
		let maxUsage = {}
		maxUsage.className = 'waterUsageB'
		maxUsage.value = parseFloat(values.reduce((max, p) => p > max ? p : max, values[0]).toFixed(3))
		maxUsage.value = unit === 'm3' ? maxUsage.value : maxUsage.value * 1000
		maxUsage.unit = unit === 'm3' ? 'm³' : 'L'
		maxUsage.type = 'chartTable.waterusage.line2'
		waterusage.push(maxUsage)

		/**
		 * Empty bar
		 */
		if (!admin) {
			let fake = {}
			fake.className = 'waterUsageB'
			fake.value = 0
			fake.unit = ''
			fake.type = ''
			fake.hidden = true
			waterusage.push(fake)
		}
		/**
		 * Average
		 */
		let average = {}
		average.className = 'waterUsageC'
		average.value = parseFloat((values.reduce((a, b) => a + b, 0) / values.length).toFixed(3))
		average.value = unit === 'm3' ? average.value : average.value * 1000
		average.unit = unit === 'm3' ? 'm³' : 'L'
		average.type = 'chartTable.waterusage.line3'
		waterusage.push(average)
		/**
		 * Usage Per person
		 */
		if (!admin) {
			let nOP = noOfPersons > 0 ? noOfPersons : 1
			let perPerson = {}
			perPerson.className = 'waterUsageD'
			perPerson.value = parseFloat(((values.reduce((a, b) => a + b, 0) / values.length) / nOP).toFixed(3))
			perPerson.value = unit === 'm3' ? perPerson.value : perPerson.value * 1000
			perPerson.unit = unit === 'm3' ? 'm³' : 'L'
			perPerson.type = 'chartTable.waterusage.line4'
			waterusage.push(perPerson)
		}
		//#endregion
		return {
			waterusage: waterusage,
			readings: waterusage,
			temperature: [],
			waterflow: []
		}
	}
	else {
		return {
			waterusage: [],
			readings: [],
			temperature: [],
			waterflow: []
		}
	}


}