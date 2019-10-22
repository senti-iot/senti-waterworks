// import demoData from './demodata.json'
import moment from 'moment';

const genWaterUsage = (deviceData) => {
	let data = {}
	var dataByDay = deviceData.reduce((dataByMonth, datum) => {
		var date = moment(datum.date);
		var value = datum.value
		let group = date.format('YYYY-MM-DD 00:00:00').toString()
		data[group] = data[group] || {};
		data[group].totalValue = (data[group].totalValue || 0) + value;
		data[group].count = (data[group].count || 0) + 1;
		return data;
	}, {})
	// console.log(dataByDay)
	// let avgS = dataByDay.forEach(d => {
	// 	d.totalValue = d.totalValue / d.count
	// })
	let finalResult = [];
	let index = Object.keys(dataByDay)
	index.forEach((d, i) => {
		if (i !== index.length - 1) {
			finalResult.push({
				date: d,
				value: (
					(dataByDay[index[i + 1]].totalValue / dataByDay[index[i + 1]].count) -
					(dataByDay[d].totalValue / dataByDay[d].count))
					.toFixed(3)
			})
		}
	});
	return finalResult;

}

const genReading = (deviceData) => {
	let data = {}
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
			value: (dataByDay[d].totalValue / dataByDay[d].count).toFixed(3)
		})
	});
	return fResult;

}

export const genBenchmarkAll = (deviceData) => {
	let data = {
		waterUsage: [],
		temperature: [],
		waterFlow: [],
		reading: []
	}
	data.reading = genReading(deviceData.filter(d => d.data.value).map(d => ({ value: d.data.value, date: d.created })))
	data.waterUsage = genWaterUsage(deviceData.filter(d => d.data.value).map(d => ({ value: d.data.value, date: d.created })))
	data.waterFlow = {
		maxFlow: genReading(deviceData.filter(d => d.data.maxFlow !== undefined).map(d => ({ value: d.data.maxFlow, date: d.created }))),
		minFlow: genReading(deviceData.filter(d => d.data.minFlow !== undefined).map(d => ({ value: d.data.minFlow, date: d.created })))
	}
	let minATemp = deviceData.filter(d => d.data.minATemp !== undefined)//?
	data.temperature = {
		water: genReading(deviceData.filter(d => d.data.minWTemp !== undefined).map(d => ({ value: d.data.minWTemp, date: d.created }))),
		ambient: genReading(minATemp.map(d => ({ value: d.data.minATemp, date: d.created })))
	}
	return data
}

// genBenchmarkAll(demoData)//?