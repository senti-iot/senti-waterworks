// import { demoData } from './demodata'
import moment from 'moment';

const genWaterUsage = (deviceData) => {
	let data = {}
	var dataByDay = deviceData.reduce((dataByMonth, datum) => {
		var date = moment(datum.date);
		var value = datum.value
		// var day = date.format('DD');
		// var month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
		// var year = date.getFullYear();
		// var group = year + '-' + month + '-' + day + ' 00:00:00';
		let group = date.format('YYYY-MM-DD 00:00:00').toString()
		// dataByMonth[group] = dataByMonth[group] || {};
		// dataByMonth[group].totalValue = (dataByMonth[group].totalValue || 0) + value;
		// dataByMonth[group].count = (dataByMonth[group].count || 0) + 1;
		data[group] = data[group] || {};
		data[group].totalValue = (data[group].totalValue || 0) + value;
		data[group].count = (data[group].count || 0) + 1;
		return data;
	}, {});
	let finalResult = {};
	let index = Object.keys(dataByDay)//?
	index.forEach((d, i) => {
		if (i !== 0) {
			finalResult[d] = (dataByDay[d].totalValue - dataByDay[index[i - 1]].totalValue).toFixed(3);
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
	let finalResult = {};
	Object.keys(dataByDay).forEach(d => {
		finalResult[d] = (dataByDay[d].totalValue / dataByDay[d].count).toFixed(3);
	});
	return finalResult;

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
		maxFlow: genReading(deviceData.filter(d => d.data.maxFlow !== undefined).map(d => ({ value: d.data.maxFlow, date: d.date }))),
		minFlow: genReading(deviceData.filter(d => d.data.minFlow !== undefined).map(d => ({ value: d.data.minFlow, date: d.date })))
	}
	data.temperature = genReading(deviceData.filter(d => d.data.minWTemp !== undefined).map(d => ({ value: d.data.minWTemp, date: d.date })))
	return data
}

// genBenchmarkAll(demoData)//?