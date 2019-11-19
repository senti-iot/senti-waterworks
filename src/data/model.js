import moment from 'moment';

//#region Main Graph
export const genWaterPerDevice = (data) => {
	let devData = {}
	let final = []
	if (data.length > 0) {
		/**
		 * Reduce the data by Device
		 * {
		 * deviceId : {
		 * 	date:value,
		 * 	date: value
		 * 	...
		 * }
		 * deviceId: {
		 * ...}
		 * ...
		 * }
		 */
		data.forEach(d => {
			devData[d.id] = devData[d.id] || {};
			var date = moment(d.date).format('YYYY-MM-DD HH:mm:ss')
			devData[d.id][date] = devData[d.id][date] || {}
			devData[d.id][date] = d.value
		})
		//Get the device Ids
		let deviceIds = Object.keys(devData)
		/**
		 * Calculate the water usage
		 */
		deviceIds.forEach((d) => {
			//For Each device id, transform the data
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
		//Sum up all data
		deviceIds.forEach((d) => {
			let dates = Object.keys(devData[d])
			dates.forEach((de) => {
				dataByDay[de] = dataByDay[de] || 0
				dataByDay[de] = dataByDay[de] + devData[d][de]
			})
		})
		//Get the average
		// let dates = Object.keys(dataByDay)
		// dates.forEach((de) => {
		// 	dataByDay[de] = dataByDay[de] / countByDate[de]
		// })
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

export const genBenchmark = (deviceData, filter, prev, timeType) => {
	let dData = deviceData
	let data = {
		waterUsage: [],
		temperature: {},
		waterFlow: {},
	}
	if (prev) {
		dData.forEach(d => {
			d.created = moment(d.created).add(timeType === 2 ? 1 : 3, 'month')
		})
	}
	let waterReading, maxFlow, minFlow, minATemp, minWTemp;
	if (filter && filter.length > 0) {
		waterReading = dData.filter(d => d.data.value && filter.indexOf(d.device_id) > -1)
		maxFlow = dData.filter(d => d.data.maxFlow !== undefined && filter.indexOf(d.device_id) > -1)
		minFlow = dData.filter(d => d.data.minFlow !== undefined && filter.indexOf(d.device_id) > -1)
		minATemp = dData.filter(d => d.data.minATemp !== undefined && filter.indexOf(d.device_id) > -1)
		minWTemp = dData.filter(d => d.data.minWTemp !== undefined && filter.indexOf(d.device_id) > -1)
	}
	else {
		waterReading = dData.filter(d => d.data.value)
		maxFlow = dData.filter(d => d.data.maxFlow !== undefined)
		minFlow = dData.filter(d => d.data.minFlow !== undefined)
		minATemp = dData.filter(d => d.data.minATemp !== undefined)
		minWTemp = dData.filter(d => d.data.minWTemp !== undefined)
	}

	data.waterUsage = genWaterPerDevice(waterReading.map(d => ({ id: d.device_id, value: d.data.value, date: d.created })))

	data.waterFlow = {
		maxFlow: genReading(maxFlow.map(d => ({ value: d.data.maxFlow, date: d.created }))),
		minFlow: genReading(minFlow.map(d => ({ value: d.data.minFlow, date: d.created })))
	}

	data.temperature = {
		water: genReading(minWTemp.map(d => ({ value: d.data.minWTemp, date: d.created }))),
		ambient: genReading(minATemp.map(d => ({ value: d.data.minATemp, date: d.created })))
	}

	return data
}
//#endregion

//#region Arc Graph

const sumUpData = (data) => {
	let devData = {}
	if (data.length > 0) {
		// data.reduce((prev, d) => {
		// 	devData[d.id] = devData[d.id] || {};
		// 	var date = moment(d.date).format('YYYY-MM-DD HH:mm:ss')
		// 	devData[d.id][date] = devData[d.id][date] || {}
		// 	devData[d.id][date] = d.value
		// 	return devData
		// })
		data.forEach(d => {
			devData[d.id] = devData[d.id] || {};
			var date = moment(d.date).format('YYYY-MM-DD HH:mm:ss')
			devData[d.id][date] = devData[d.id][date] || {}
			devData[d.id][date] = d.value
		})
		//Get the device Ids
		let deviceIds = Object.keys(devData)
		/**
		 * Calculate the water usage
		 */
		deviceIds.forEach((d) => {
			//For Each device id, transform the data
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
		//Sum up all data
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
		temperature: {
			water: [],
			ambient: []
		},
		waterFlow: {
			minFlow: [],
			maxFlow: []
		},
		reading: []
	}
	let waterReading = deviceData.filter(d => d.data.value && filter.indexOf(d.device_id) > -1)
	data.waterusage = sumUpData(waterReading.map(d => ({ id: d.device_id, value: d.data.value, date: d.created })))

	return data
}

//#endregion
