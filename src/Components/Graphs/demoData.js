const lineData = []

lineData.push({ date: new Date(2019, 1, 4), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 11), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 18), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 25), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 2, 4), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 2, 11), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 2, 18), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 2, 25), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 3, 4), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 3, 11), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 3, 18), nps: Math.random() * 100 });


const generateData = () => {
	let lineData = []
	lineData.push({ date: new Date(2019, 1, 4), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 1, 11), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 1, 18), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 1, 25), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 2, 4), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 2, 11), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 2, 18), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 2, 25), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 3, 4), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 3, 11), nps: Math.random() * 100 });
	lineData.push({ date: new Date(2019, 3, 18), nps: Math.random() * 100 });
	return lineData
}


const prevLineData = []

prevLineData.push({ date: new Date(2019, 1, 4), nps: 11 });
prevLineData.push({ date: new Date(2019, 1, 11), nps: 51 });
prevLineData.push({ date: new Date(2019, 1, 18), nps: 66 });
prevLineData.push({ date: new Date(2019, 1, 25), nps: 23 });
prevLineData.push({ date: new Date(2019, 2, 4), nps: 78 });
prevLineData.push({ date: new Date(2019, 2, 11), nps: 13 });
prevLineData.push({ date: new Date(2019, 2, 18), nps: 17 });
prevLineData.push({ date: new Date(2019, 2, 25), nps: 10 });
prevLineData.push({ date: new Date(2019, 3, 4), nps: 29 });
prevLineData.push({ date: new Date(2019, 3, 11), nps: 78 });
prevLineData.push({ date: new Date(2019, 3, 18), nps: 25 });

export {
	generateData,
	lineData,
	prevLineData
}