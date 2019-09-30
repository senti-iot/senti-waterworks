import React, { useRef, useEffect, useState } from 'react'
import { /* lineData,  */prevLineData, generateData } from './demoData'
import * as d3 from 'd3'
import { makeStyles } from '@material-ui/styles'
import { T } from 'Components'
import { Collapse } from '@material-ui/core'

const lineStyles = makeStyles(theme => ({
	line: {
		fill: 'rgba(255,255,255, 0.3)',
		stroke: '#fff',
		strokeWidth: '3px'
	},
	line2: {
		fill: 'rgba(0,0,0, 0.7)',
		// stroke: '#eee'
	},
	dot: {
		fill: '#fff',
	},
	dotLabel: {
		fill: '#fff',
	},
	tooltip: {
		position: "absolute",
		textAlign: "center",
		width: 'auto',
		minWidth: '60px',
		height: 'auto',
		background: "lightsteelblue",
		border: 0,
		borderRadius: 8,
		transition: '300ms all ease'
		// pointerEvents: "none",
	}
}))


const LineGraph = (props) => {
	const lineData = generateData()
	const lineChartContainer = useRef(null)
	const classes = lineStyles()
	const [value, setValue] = useState({ nps: null, date: null })
	const [expand, setExpand] = useState(false)
	let lastId = useRef('initial')
	useEffect(() => {
		console.log(lineChartContainer.current, console.log(props.id))
		if (lineChartContainer.current && lastId.current !== props.id) {
			var margin = { top: 25, right: 25, bottom: 25, left: 25 };

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
			var valuearea = d3.area()
				.x(function (d) { return x(d.date) })
				.y0(y(0))
				.y1(function (d) { return y(d.nps) })
			// .curve(d3.curveMonotoneX);

			// var valueline = d3.area()
			// 	.x(function (d) { return x(d.date); })
			// 	.y0(y(0))
			// 	.y1(function (d) { return y(d.nps); })
			// 	// .curve(d3.curveMonotoneX);

			//Add the values
			svg.append("path")
				.data([prevLineData])
				.attr("class", classes.line2)
				.attr("d", valuearea);

			svg.append("path")
				.data([lineData])
				.attr("class", classes.line)
				.attr("d", valuearea);

			//Define the X axis and format the dates, number of ticks and the tick values
			var xAxis_woy = d3.axisBottom(x).ticks(11).tickFormat(d3.timeFormat("%d %b'%y")).tickValues([...lineData.map(d => d.date), ...prevLineData.map(d => d.date)]);

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
						.style("opacity", .9);
					div.style("left", (d3.event.pageX) - 35 + "px")
						.style("top", (d3.event.pageY) - 50 + "px");
					setValue(d)
				}).on("mouseout", function (d) {
					setExpand(false)
					div.transition()
						.duration(500)
						.style("opacity", 0);
				}).on('click', function (d) {
					setExpand(true)
				});
			var oldSvg = d3.select(`#${lastId.current}`)
			oldSvg.remove()
			console.log('oldSvg', oldSvg)
			lastId.current = props.id
		}
		else {
			// console.log(svg)
		}
	}, [lineChartContainer, classes, props.id, lineData, lastId])
	return (
		<div style={{ width: '100%', height: '100%' }}>
			<div id={props.id + 'tooltip'}>
				<T>
					{value.nps}
				</T>
				<Collapse in={expand}>
					<div>
						<T>
							{value.nps}
						</T>
						<T>
							{value.nps}
						</T>
						<T>
							{value.nps}
						</T>	<T>
							{value.nps}
						</T>	<T>
							{value.nps}
						</T>
					</div>
				</Collapse>
			</div>
			<div id={props.id} ref={lineChartContainer} style={{ width: '100%', height: '100%' }}></div>
		</div>
	)
}

export default LineGraph
