import moment from 'moment';


const genWaterPerDevice = (data) => {
	let devData = {}
	data.reduce((prev, d) => {
		devData[d.id] = devData[d.id] || {};
		var date = moment(d.date).format('YYYY-MM-DD HH:mm:ss')
		devData[d.id][date] = devData[d.id][date] || {}
		devData[d.id][date] = d.value
		return devData
	})
	let deviceIds = Object.keys(devData)
	deviceIds.forEach((d) => {
		let dates = Object.keys(devData[d])
		dates.forEach((de, di) => {

			if (di < dates.length - 1 && devData[d][dates[di + 1]] && devData[d][de]) {
				devData[d][de] = devData[d][dates[di + 1]] - devData[d][de]
			}
			else {
				delete devData[d][de]
			}
		})
	})

	var dataByDay = {}
	deviceIds.forEach((d, ) => {
		let dates = Object.keys(devData[d])
		dates.forEach((de) => {
			dataByDay[de] = dataByDay[de] || 0
			dataByDay[de] = dataByDay[de] + devData[d][de]
		})
	})
	let final = []
	Object.keys(dataByDay).forEach(k => final.push({ date: k, value: parseFloat(dataByDay[k].toFixed(3)) }))
	final = final.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
	return final
}


const genReading = (deviceData) => {
	let data = {}
	// var avgDataPerDevice = deviceData.reduce(())
	var dataByDay = deviceData.reduce((dataByMonth, datum) => {
		var date = moment(datum.date);
		var value = datum.value
		let group = date.format('YYYY-MM-DD 00:00:00').toString()
		data[group] = data[group] || {};
		data[group].totalValue = (data[group].totalValue || 0) + value;
		data[group].count = (data[group].count || 0) + 1;
		return data;
	}, {});
	// let finalResult = {};
	let fResult = []
	Object.keys(dataByDay).forEach(d => {
		// finalResult[d] = (dataByDay[d].totalValue / dataByDay[d].count).toFixed(3);
		fResult.push({
			date: d,
			value: parseFloat((dataByDay[d].totalValue / dataByDay[d].count).toFixed(3))
		})
	});
	return fResult;

}

export const genBenchmark = (deviceData, prev, timeType) => {
	let dData = deviceData
	let data = {
		waterUsage: [],
		temperature: [],
		waterFlow: [],
		// reading: []
	}
	if (prev) {
		dData.forEach(d => {
			d.created = moment(d.created).add(1, timeType === 2 ? 'month' : 'year')
		})
	}
	let waterReading = dData.filter(d => d.data.value)
	// data.reading = genReading(waterReading.map(d => ({ value: d.data.value, date: d.created })))
	data.waterUsage = genWaterPerDevice(waterReading.map(d => ({ id: d.device_id, value: d.data.value, date: d.created })))

	let maxFlow = dData.filter(d => d.data.maxFlow !== undefined)
	let minFlow = dData.filter(d => d.data.minFlow !== undefined)
	data.waterFlow = {
		maxFlow: genReading(maxFlow.map(d => ({ value: d.data.maxFlow, date: d.created }))),
		minFlow: genReading(minFlow.map(d => ({ value: d.data.minFlow, date: d.created })))
	}

	let minATemp = dData.filter(d => d.data.minATemp !== undefined)
	let minWTemp = dData.filter(d => d.data.minWTemp !== undefined)
	data.temperature = {
		water: genReading(minWTemp.map(d => ({ value: d.data.minWTemp, date: d.created }))),
		ambient: genReading(minATemp.map(d => ({ value: d.data.minATemp, date: d.created })))
	}
	return data
}


// genBenchmark(model, true, 2)//?