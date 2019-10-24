import * as d3 from 'd3';
import moment from 'moment';

const getMedianLineData = (data, prevData) => {
	let sum = data.map(d => d.value).reduce((total, val) => parseFloat(total) + parseFloat(val))
	// sum.reduce()
	let avrg = Math.round(sum / data.length)
	let medianValues = []
	if (prevData.length > 1)
		medianValues = [{ date: data[0].date, value: avrg }, { date: prevData[prevData.length - 1].date, value: avrg }]
	else {
		medianValues = [{ date: data[0].date, value: avrg }, { date: data[data.length - 1].date, value: avrg }]
	}
	return medianValues
}

const toUppercase = str => str.charAt(0).toUpperCase() + str.slice(1);
const getMax = (arr) => {
	return Math.max(...arr.map(d => d.value))
}
class d3Line {

	containerEl;
	props;
	svg;

	constructor(containerEl, props, classes) {

		this.containerEl = containerEl;
		this.props = props;
		const { lineData, prevLineData, setTooltip, secondaryLinePrevData, secondaryLineData, secondaryLine } = props
		var margin = { top: 50, right: 75, bottom: 75, left: 75 };

		//Get the height and width from the container
		var height = containerEl.clientHeight;
		var width = containerEl.clientWidth;

		height = height - margin.top - margin.bottom;
		width = width - margin.left - margin.right;

		//Append the SVG to the container
		this.container = d3.select(`#${props.id}`)
		window.d3 = d3
		this.svg = this.container.append("svg")
			.attr("id", 'svg' + props.id)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// Set the this.svg ranges
		this.x = d3.scaleTime().range([0, width]);
		// var x = d3.scaleTime().range([0, width]);
		this.y = d3.scaleLinear().range([height, 0]);
		// var y = d3.scaleLinear().range([height, 0]);

		//Set the graph ranges
		if (!secondaryLine) {
			this.x.domain(d3.extent([...lineData, ...prevLineData], function (d) {
				return moment(d.date).valueOf();
			}));

			this.y.domain([0, getMax(lineData) + 10]);
		}
		else {
			this.x.domain(d3.extent([...lineData, ...prevLineData, ...secondaryLineData, ...secondaryLinePrevData], function (d) {
				return moment(d.date).valueOf();
			}));
			this.y.domain([0, getMax([...lineData, ...secondaryLineData]) + 10]);
		}

		//Define the area for the values
		var valueArea = d3.area()
			.x((d) => { return this.x(moment(d.date).valueOf()) })
			.y0(this.y(0))
			.y1((d) => { return this.y(d.value) })

		var valueLine = d3.line()
			.x((d) => this.x(moment(d.date).valueOf()))
			.y(d => this.y(d.value))


		//Previous Data - Area
		this.svg.append("path")
			.data([prevLineData])
			.attr("class", classes.line2)
			.attr("d", valueArea);

		// Current Data area
		this.svg.append("path")
			.data([lineData])
			.attr("class", classes.area)
			.attr("d", valueArea);

		// Current Data line
		this.svg.append('path')
			.data([lineData])
			.attr('class', classes.line)
			.attr('d', valueLine)
		if (!secondaryLine)
			this.generateMedian(valueLine, props, classes)

		//#region secondaryLine
		if (props.secondaryLine) {
			var valueSecArea = d3.area()
				.x((d) => { return this.x(moment(d.date).valueOf()) })
				.y0(this.y(Math.min(...secondaryLineData.map(d => d.value))))
				.y1((d) => { return this.y(d.value) })
			this.svg.append("path")
				.data([secondaryLinePrevData])
				.attr("class", classes.line2)
				.attr("d", valueSecArea);

			// Current Data area
			this.svg.append("path")
				.data([secondaryLineData])
				.attr("class", classes.secondaryArea)
				.attr("d", valueSecArea);

			// Current Data line
			this.svg.append('path')
				.data([secondaryLineData])
				.attr('class', classes.secondLine)
				.attr('d', valueLine)
			// Add the dots
			this.svg.selectAll(".dot")
				.data(secondaryLineData)
				.enter()
				.append("circle") // Uses the enter().append() method
				.attr("class", classes.secondaryDot) // Assign a class for styling
				.attr("cx", (d) => { return this.x(moment(d.date).valueOf()) })
				.attr("cy", (d) => { return this.y(d.value) })
				.attr("r", 5)
				.on("mouseover", function (d) {
					d3.select(this).attr("r", 8);
					div.transition()
						.duration(200)
						.style("opacity", 1)
						.style('z-index', 1040);
					div.style("left", (d3.event.pageX) - 235 + "px")
						.style("top", (d3.event.pageY) - 250 + "px");

					setTooltip(d)

				}).on("mouseout", function () {
					d3.select(this).attr("r", 6)
					div.transition()
						.duration(500)
						.style('z-index', -1)
						.style("opacity", 0);
				}).on('click', function () {
					// setExpand(true)
				});

		}

		//#region Ticks
		var xAxis_woy = d3.axisBottom(this.x)
			// .ticks(Math.round(lineData.length / 5))
			.tickFormat(d3.timeFormat("%d"))
			.tickValues([...lineData.map((d, i) => {
				switch (true) {
					case i === 0:
					case i === lineData.length - 1:
						return moment(d.date).valueOf()
					case lineData.length > 7:
						return (i + 1) % 5 ? null : moment(d.date).valueOf()
					case lineData.length <= 7:
						return moment(d.date).valueOf()
					default:
						return null;
				}
			})]);

		//Add the X axis
		let xAxis = this.svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis_woy);


		//Append style
		xAxis.selectAll('path').attr('class', classes.axis)
		xAxis.selectAll('line').attr('class', classes.axis)
		xAxis.selectAll('text').attr('class', classes.axisTick)

		xAxis.append('text')
			.attr('transform', `translate(0,50)`)
			.attr('class', classes.axisText)
			.html(toUppercase(moment(lineData[0].date).format('MMMM')))

		//  Add the Y Axis

		let yAxis = this.svg.append("g").call(d3.axisLeft(this.y));



		yAxis.selectAll('path').attr('class', classes.axis)
		yAxis.selectAll('line').attr('class', classes.axis)
		yAxis.selectAll('text').attr('class', classes.axisTick)

		yAxis.append('text')
			.attr('transform', `translate(-40,${height / 2})`)
			.attr('class', classes.axisText)
			// .html(props.unit)
			.html('m3')

		//#endregion

		// Define the current data tooltip
		var div = d3.select(`#${props.id}tooltip`)
			// .attr("class", classes.tooltip)
			.style("opacity", 0);


		// Add the mouseover
		// var formatTime = d3.timeFormat("%e %B");

		// Add the dots
		this.svg.selectAll(".dot")
			.data(lineData)
			.enter()
			.append("circle") // Uses the enter().append() method
			.attr("class", classes.dot) // Assign a class for styling
			.attr("cx", (d) => { return this.x(moment(d.date).valueOf()) })
			.attr("cy", (d) => { return this.y(d.value) })
			.attr("r", 6)
			.on("mouseover", function (d) {
				d3.select(this).attr("r", 8);
				div.transition()
					.duration(200)
					.style("opacity", 1)
					.style('z-index', 1040);
				div.style("left", (d3.event.pageX) - 235 + "px")
					.style("top", (d3.event.pageY) - 250 + "px");

				setTooltip(d)

			}).on("mouseout", function () {
				// setExpand(false)
				d3.select(this).attr("r", 6)
				div.transition()
					.duration(500)
					.style('z-index', -1)
					.style("opacity", 0);
			}).on('click', function () {
				// setExpand(true)
			});
		// init other vis elements like scales and axes here.
	}

	generateMedian = (valueLine, props, classes) => {
		const { lineData, prevLineData, setMedianTooltip } = props

		//Median tooltip

		var medianTooltip = d3.select(`#${props.id}medianTooltip`)
			.attr("class", classes.medianTooltip)
			.style("opacity", 0);

		//Median line
		let medianLine = this.svg.append('path')
			.data([getMedianLineData(lineData, prevLineData)])
			.attr('class', classes.medianLine)
			.attr('d', valueLine)
			.attr('stroke-dasharray', ("3, 3"))

		// Hidden overlay for Median tooltip
		this.svg.append('path')
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

				setMedianTooltip(d[0])

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


	}
	updateThings = (props) => { /*...*/ }

	destroy = (id) => {
		this.container.select('svg').remove()
	}

}

export default d3Line;