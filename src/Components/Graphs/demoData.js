import moment from 'moment'

const lineData = []

lineData.push({ date: new Date(2019, 1, 1), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 2), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 3), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 4), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 5), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 6), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 7), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 8), nps: Math.random() * 100 });


const generateArcData = () => {
	let arcData = 0
	arcData = Math.random() * 100
	return arcData.toFixed(3)
}
const generateBigData = () => {
	let lineData = []
	lineData.push({ date: new Date(2019, 9, 1), nps: Math.random() * 100 + 50 });
	lineData.push({ date: new Date(2019, 9, 2), nps: Math.random() * 100 + 50 });
	lineData.push({ date: new Date(2019, 9, 3), nps: Math.random() * 100 + 50 });
	lineData.push({ date: new Date(2019, 9, 4), nps: Math.random() * 100 + 50 });
	lineData.push({ date: new Date(2019, 9, 5), nps: Math.random() * 100 + 50 });
	lineData.push({ date: new Date(2019, 9, 6), nps: Math.random() * 100 + 50 });
	lineData.push({ date: new Date(2019, 9, 7), nps: Math.random() * 100 + 50 });
	lineData.push({ date: new Date(2019, 9, 8), nps: Math.random() * 100 + 50 });
	lineData.push({ date: new Date(2019, 9, 9), nps: Math.random() * 100 + 50 });
	lineData.push({ date: new Date(2019, 9, 10), nps: Math.random() * 100 + 50 });
	lineData.push({ date: new Date(2019, 9, 11), nps: Math.random() * 100 + 50 });
	lineData.push({ date: new Date(2019, 9, 12), nps: Math.random() * 100 + 50 });
	lineData.push({ date: new Date(2019, 9, 13), nps: Math.random() * 100 + 50 });

	return lineData
}

const generateData = () => {
	let lineData = []
	lineData.push({ date: new Date(2019, 9, 1), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 9, 2), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 9, 3), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 9, 4), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 9, 5), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 9, 6), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 9, 7), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 9, 8), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 9, 9), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 9, 10), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 9, 11), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 9, 12), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 9, 13), nps: Math.random() * 100 });

	return lineData
}


const prevLineData = []

prevLineData.push({ date: moment(new Date(2019, 9, 1)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 2)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 3)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 4)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 5)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 6)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 7)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 8)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 9)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 10)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 11)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 12)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 13)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 14)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 15)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 16)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 17)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 18)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });
prevLineData.push({ date: moment(new Date(2019, 9, 25)).format('YYYY-MM-DD HH:mm:ss'), nps: Math.random() * 100 });


export {
	generateArcData,
	generateBigData,
	generateData,
	lineData,
	prevLineData
}