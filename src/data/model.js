import moment from 'moment';

//#region Main Graph
export const genWaterPerDevice = (data) => {
	let devData = {}
	let final = []
	if (data.length > 0) {
		data.forEach(d => {
			devData[d.id] = devData[d.id] || {};
			var date = moment(d.date).format('YYYY-MM-DD HH:mm:ss')
			devData[d.id][date] = devData[d.id][date] || {}
			devData[d.id][date] = d.value
		})
		let deviceIds = Object.keys(devData)
		deviceIds.forEach((d) => {
			let dates = Object.keys(devData[d]).reverse()
			dates.forEach((de, di) => {
				if (di < dates.length - 1 && devData[d][dates[di + 1]] && devData[d][de]) {
					devData[d][de] = devData[d][de] - devData[d][dates[di + 1]]
				}
				else {
					delete devData[d][de]
				}
			})
		})
		var countByDate = {}
		deviceIds.forEach((d) => {
			let dates = Object.keys(devData[d])
			dates.forEach((de) => {
				countByDate[de] = countByDate[de] || 0
				countByDate[de] += 1
			})
		})
		var dataByDay = {}
		deviceIds.forEach((d) => {
			let dates = Object.keys(devData[d])
			dates.forEach((de) => {
				dataByDay[de] = dataByDay[de] || 0
				dataByDay[de] = dataByDay[de] + devData[d][de]
			})
		})
		Object.keys(dataByDay).forEach(k => final.push({ date: k, value: parseFloat(dataByDay[k].toFixed(3)) }))
		final = final.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
	}

	return final
}


export const genReading = (deviceData) => {
	let data = {}
	var dataByDay = deviceData.reduce((d, datum) => {
		var date = moment(datum.date);
		var value = datum.value
		let group = date.format('YYYY-MM-DD 00:00:00').toString()
		data[group] = data[group] || {};
		data[group].totalValue = (data[group].totalValue || 0) + value;
		data[group].count = (data[group].count || 0) + 1;
		return data;
	}, {});
	let fResult = []
	Object.keys(dataByDay).forEach(d => {
		fResult.push({
			date: d,
			value: parseFloat((dataByDay[d].totalValue / dataByDay[d].count).toFixed(3))
		})
	});
	return fResult;
}
export const genBenchmark = (deviceData, noOfDevices, noOfSelectedDevices) => {
	let waterReading = deviceData.filter(d => d.value).map(d => ({ id: d.device_id, value: d.value, date: moment(d.time) }))
	let data = {
		waterUsage: []
	}
	data.waterUsage = genWaterPerDevice(waterReading)
	console.log(noOfDevices, noOfSelectedDevices, noOfDevices - noOfSelectedDevices)
	if (noOfDevices - noOfSelectedDevices !== 0) {
		Object.keys(data.waterUsage).forEach(f => {
			console.log(data.waterUsage[f], f, noOfDevices, noOfDevices - noOfSelectedDevices)
			console.log(data.waterUsage[f].value / noOfDevices, (noOfDevices - noOfSelectedDevices))
			data.waterUsage[f].value = parseFloat(((data.waterUsage[f].value / noOfDevices) * (noOfSelectedDevices)).toFixed(3))
		})
	}
	console.log(data)
	return data
}
export const genData = (deviceData, filter, prev, diff) => {
	let dData = deviceData
	let data = {
		waterUsage: [],
		temperature: {},
		waterFlow: {},
	}
	if (prev) {
		dData.forEach(d => {
			d.time = moment(d.time).add(diff, 'day')
		})
	}
	let waterReading, maxFlow, minFlow, minATemp, minWTemp;
	if (filter && filter.length > 0) {
		waterReading = dData.filter(d => d.value && filter.indexOf(d.device_id) > -1).map(d => ({ id: d.device_id, value: d.value, date: moment(d.time) }))
		maxFlow = dData.filter(d => d.maxFlow && filter.indexOf(d.device_id) > -1)
		minFlow = dData.filter(d => d.minFlow && filter.indexOf(d.device_id) > -1)
		minATemp = dData.filter(d => d.minATemp && filter.indexOf(d.device_id) > -1)
		minWTemp = dData.filter(d => d.minWTemp && filter.indexOf(d.device_id) > -1)
	}
	else {
		waterReading = dData.filter(d => d.value).map(d => ({ id: d.device_id, value: d.value, date: moment(d.time) }))
		maxFlow = dData.filter(d => d.maxFlow)
		minFlow = dData.filter(d => d.minFlow)
		minATemp = dData.filter(d => d.minATemp)
		minWTemp = dData.filter(d => d.minWTemp)
	}

	data.waterUsage = genWaterPerDevice(waterReading)

	data.waterFlow = {
		maxFlow: genReading(maxFlow.map(d => ({ value: d.maxFlow, date: d.time }))),
		minFlow: genReading(minFlow.map(d => ({ value: d.minFlow, date: d.time })))
	}

	data.temperature = {
		water: genReading(minWTemp.map(d => ({ value: d.minWTemp, date: d.time }))),
		ambient: genReading(minATemp.map(d => ({ value: d.minATemp, date: d.time })))
	}
	console.log(data)
	return data
}
//#endregion

//#region Arc Graph

const sumUpData = (data) => {
	let devData = {}
	if (data.length > 0) {
		data.forEach(d => {
			devData[d.id] = devData[d.id] || {};
			var date = moment(d.date).format('YYYY-MM-DD HH:mm:ss')
			devData[d.id][date] = devData[d.id][date] || {}
			devData[d.id][date] = d.value
		})
		let deviceIds = Object.keys(devData)

		deviceIds.forEach((d) => {
			let dates = Object.keys(devData[d]).reverse()
			dates.forEach((de, di) => {

				if (di < dates.length - 1 && devData[d][dates[di + 1]] && devData[d][de]) {
					devData[d][de] = devData[d][de] - devData[d][dates[di + 1]]
				}
				else {
					delete devData[d][de]
				}
			})
		})
		var countByDate = {}
		deviceIds.forEach((d) => {
			let dates = Object.keys(devData[d])
			dates.forEach((de) => {
				countByDate[de] = countByDate[de] || 0
				countByDate[de] += 1
			})
		})
		var dataByDay = {}
		deviceIds.forEach((d) => {
			let dates = Object.keys(devData[d])
			dates.forEach((de) => {
				dataByDay[de] = dataByDay[de] || 0
				dataByDay[de] = dataByDay[de] + devData[d][de]
			})
		})
		let total = 0;
		Object.keys(dataByDay).forEach(d => {
			total = total + dataByDay[d]
		})
		return parseFloat(total.toFixed(3));
	}
}

export const genArcData = (deviceData, filter, timeType) => {
	let data = {
		waterusage: [],
		values: []
	}
	let waterReading = deviceData.filter(d => d.value && filter.indexOf(d.device_id) > -1)
	data.waterusage = sumUpData(waterReading.map(d => ({ id: d.device_id, value: d.value, date: d.time })))
	data.values = waterReading.map(d => ({ id: d.device_id, value: d.value, date: d.time }))
	return data
}
window.genBenchmark = genBenchmark
//#endregion
