import React, { useRef, useEffect, useState } from 'react'
import { /* lineData,  */prevLineData, generateData } from './demoData'
import * as d3 from 'd3'
import { makeStyles } from '@material-ui/styles'
import { T } from 'Components'
import { /* Collapse, */ colors, Paper } from '@material-ui/core'
import hexToRgba from 'hex-to-rgba'
import moment from 'moment'
// const _ = require('lodash')

// const isWeekend = (date) => {
// 	return moment(date, 'YYYY-MM-DD HH:mm:ss').day() === 6 || moment(date).day() === 0 ? true : false
// }

const lineStyles = makeStyles(theme => ({
	hiddenMedianLine: {
		stroke: '#fff',
		opacity: 0,
		strokeWidth: '5px'
	},
	lineWeekend: {
		fill: 'none',
		stroke: colors['red'][500],
		strokeWidth: '3px'
	},
	line: {
		fill: 'none',
		stroke: colors['orange'][500],
		strokeWidth: '3px'
	},
	line2: {
		fill: 'rgba(255,255,255, 0.1)',
	},
	dot: {
		fill: colors['orange'][500],
	},
	dotLabel: {
		fill: colors['orange'][500],
	},
	tooltip: {
		position: "absolute",
		textAlign: "center",
		width: '200px',
		height: '200px',
		background: theme.palette.type === 'light' ? '#eee' : '#424242',
		border: 0,
		borderRadius: 4,
		zIndex: -1,
		transition: '300ms all ease'
	},
	medianTooltip: {
		position: "absolute",
		textAlign: "center",
		width: '72px',
		height: '36px',
		background: theme.palette.type === 'light' ? '#eee' : '#424242',
		border: 0,
		borderRadius: 4,
		zIndex: -1,
		transition: '300ms all ease'
	},
	area: {
		fill: hexToRgba(colors['orange'][500], 0.3),
	}
}))


// const DASH_LENGTH = 2
// const DASH_SEPARATOR_LENGTH = 2

const getMedianLineData = (data, prevData) => {
	console.log(data)
	let sum = data.map(d => d.nps).reduce((total, val) => total + val)
	console.log(sum)
	// sum.reduce()
	let avrg = Math.round(sum / data.length)
	let medianValues = [{ date: data[0].date, nps: avrg }, { date: prevData[prevData.length - 1].date, nps: avrg }]
	return medianValues
}


const LineGraph = (props) => {
	const lineData = generateData()
	const lineChartContainer = useRef(null)
	const classes = lineStyles()
	const [value, setValue] = useState({ nps: null, date: null })
	// const [expand, setExpand] = useState(false)
	let lastId = useRef('initial')
	useEffect(() => {
		if (lineChartContainer.current && lastId.current !== props.id) {
			var margin = { top: 50, right: 50, bottom: 75, left: 50 };

			//Get the height and width from the container
			var height = lineChartContainer.current.clientHeight;
			var width = lineChartContainer.current.clientWidth;

			height = height - margin.top - margin.bottom;
			width = width - margin.left - margin.right;

			//Append the SVG to the container
			var svg = d3.select(`#${props.id}`).append("svg")
				.attr("id", props.id)
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			// Set the svg ranges
			var x = d3.scaleTime().range([0, width]);
			var y = d3.scaleLinear().range([height, 0]);

			//Set the graph ranges
			x.domain(d3.extent([...lineData, ...prevLineData], function (d) { return d.date; }));
			y.domain([0, 100]);

			//Define the area for the values
			var valueArea = d3.area()
				.x(function (d) { return x(d.date) })
				.y0(y(0))
				.y1(function (d) { return y(d.nps) })

			var valueLine = d3.line()
				.x((d) => x(d.date))
				.y(d => y(d.nps))


			svg.append("path")
				.data([prevLineData])
				.attr("class", classes.line2)
				.attr("d", valueArea);

			svg.append("path")
				.data([lineData])
				.attr("class", classes.area)
				.attr("d", valueArea);

			svg.append('path')
				.data([lineData])
				.attr('class', classes.line)
				.attr('d', valueLine)

			var medianTooltip = d3.select(`#${props.id}medianTooltip`)
				.attr("class", classes.medianTooltip)
				.style("opacity", 0);

			let medianLine = svg.append('path')
				.data([getMedianLineData(lineData, prevLineData)])
				.attr('class', classes.lineWeekend)
				.attr('d', valueLine)
				.attr('stroke-dasharray', ("3, 3"))

			svg.append('path')
				.data([getMedianLineData(lineData, prevLineData)])
				.attr('class', classes.hiddenMedianLine)
				.attr('d', valueLine)
				.on("mouseover", function (d) {
					medianLine.transition()
						.duration(100)
						.style('stroke-width', '7px')
					medianTooltip.transition()
						.duration(200)
						.style("opacity", 1)
						.style('z-index', 1040);
					medianTooltip.style("left", (d3.event.pageX) - 82 + "px")
						.style("top", (d3.event.pageY) - 41 + "px");
					setValue(d[0])
				}).on("mouseout", function (d) {
					// setExpand(false)
					medianLine.transition()
						.duration(100)
						.style('stroke-width', '3px')
					medianTooltip.transition()
						.duration(500)
						.style('z-index', -1)
						.style("opacity", 0);
				}).on('click', function (d) {
					// setExpand(true)
				});

			// .attr('stroke', 'url(#bg-gradient)')
			// .attr('stroke-dasharray', function (d) { return getDashArray(d, this) })

			//#region Dashed Section

			// function getDashArray(data, path) {
			// 	const dashedRanges = getDashedRanges(data)
			// 	if (dashedRanges.length === 0) return null

			// 	const lengths = data.map(d => getPathLengthAtX(path, x(d.date)))
			// 	return buildDashArray(dashedRanges, lengths)
			// }

			// function getDashedRanges(data) {
			// 	const hasOpenRange = (arr) => _.last(arr) && !('end' in _.last(arr))
			// 	const lastIndex = data.length - 1

			// 	return _.reduce(data, (res, d, i) => {
			// 		const isRangeStart = !hasOpenRange(res) && isDashed(d)
			// 		if (isRangeStart) res.push({ start: Math.max(0, i - 1) })

			// 		const isRangeEnd = hasOpenRange(res) && (!isDashed(d) || i === lastIndex)
			// 		if (isRangeEnd) res[res.length - 1].end = i

			// 		return res
			// 	}, [])
			// }


			// function getPathLengthAtX(path, x) {
			// 	const EPSILON = 1
			// 	let point
			// 	let target
			// 	let start = 0
			// 	let end = path.getTotalLength()

			// 	// Mad binary search, yo
			// 	while (true) {
			// 		target = Math.floor((start + end) / 2)
			// 		point = path.getPointAtLength(target)

			// 		if (Math.abs(point.x - x) <= EPSILON) break

			// 		if ((target >= end || target <= start) && point.x !== x) {
			// 			break
			// 		}

			// 		if (point.x > x) {
			// 			end = target
			// 		} else if (point.x < x) {
			// 			start = target
			// 		} else {
			// 			break
			// 		}
			// 	}

			// 	return target
			// }


			// function buildDashArray(dashedRanges, lengths) {
			// 	return _.reduce(dashedRanges, (res, { start, end }, i) => {
			// 		const prevEnd = i === 0 ? 0 : dashedRanges[i - 1].end

			// 		const normalSegment = lengths[start] - lengths[prevEnd]
			// 		const dashedSegment = getDashedSegment(lengths[end] - lengths[start])

			// 		return res.concat([normalSegment, dashedSegment])
			// 	}, [])
			// }

			// function getDashedSegment(length) {
			// 	const totalDashLen = DASH_LENGTH + DASH_SEPARATOR_LENGTH
			// 	const dashCount = Math.floor(length / totalDashLen)
			// 	return _.range(dashCount)
			// 		.map(() => DASH_SEPARATOR_LENGTH + ',' + DASH_LENGTH)
			// 		.concat(length - dashCount * totalDashLen)
			// 		.join(',')
			// }

			// function isDashed(d) {
			// 	return isWeekend(d.date)
			// }

			//#endregion

			var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("%d %b'%y")).tickValues([...lineData.map(d => d.date)/* , ...prevLineData.map(d => d.date) */]);

			//Add the X axis
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis_woy);

			//  Add the Y Axis
			svg.append("g").call(d3.axisLeft(y));
			// Define the tooltip
			var div = d3.select(`#${props.id}tooltip`)
				.attr("class", classes.tooltip)
				.style("opacity", 0);


			// Add the mouseover
			// var formatTime = d3.timeFormat("%e %B");

			// Add the dots
			svg.selectAll(".dot")
				.data(lineData)
				.enter()
				.append("circle") // Uses the enter().append() method
				.attr("class", classes.dot) // Assign a class for styling
				.attr("cx", function (d) { return x(d.date) })
				.attr("cy", function (d) { return y(d.nps) })
				.attr("r", 5)
				.on("mouseover", function (d) {
					div.transition()
						.duration(200)
						.style("opacity", 1)
						.style('z-index', 1040);
					div.style("left", (d3.event.pageX) - 235 + "px")
						.style("top", (d3.event.pageY) - 250 + "px");
					setValue(d)
				}).on("mouseout", function (d) {
					// setExpand(false)
					div.transition()
						.duration(500)
						.style('z-index', -1)
						.style("opacity", 0);
				}).on('click', function (d) {
					// setExpand(true)
				});
			var oldSvg = d3.select(`#${lastId.current}`)
			oldSvg.remove()
			lastId.current = props.id
		}
		else {
			// console.log(svg)
		}
		return () => {
			// console.log(classes)
		}
	}, [lineChartContainer.current, props.id, lineData, lastId, classes])
	console.log(value)
	return (
		<div style={{ width: '100%', height: '100%', }}>
			<Paper id={props.id + 'tooltip'} style={{ width: '200px', height: '200px' }}>
				<T>
					{` ${moment(value.date).format('LLL')} ${value.nps} `}
				</T>
			</Paper>
			<Paper id={props.id + 'medianTooltip'}>
				<T>
					{` ${value.nps} `}
				</T>
			</Paper>
			<div id={props.id} ref={lineChartContainer} style={{ width: '100%', height: '100%', minHeight: 600, maxHeight: 600 }}></div>
		</div>
	)
}

export default LineGraph
