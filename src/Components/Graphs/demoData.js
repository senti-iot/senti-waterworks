const lineData = []

lineData.push({ date: new Date(2019, 1, 1), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 2), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 3), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 4), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 5), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 6), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 7), nps: Math.random() * 100 });
lineData.push({ date: new Date(2019, 1, 8), nps: Math.random() * 100 });



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

prevLineData.push({ date: new Date(2019, 9, 1), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 2), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 3), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 4), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 5), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 6), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 7), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 8), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 9), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 10), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 11), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 12), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 13), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 14), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 15), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 16), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 17), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 18), nps: Math.random() * 100 });
prevLineData.push({ date: new Date(2019, 9, 25), nps: Math.random() * 100 });


export {
	generateData,
	lineData,
	prevLineData
}