import * as d3 from 'd3';
import moment from 'moment';

const getMedianLineData = (data) => {
	let sum = data.map(d => d.value).reduce((total, val) => parseFloat(total) + parseFloat(val))
	// sum.reduce()
	let avrg = Math.round(sum / data.length)
	let medianValues = []

	medianValues = [{ date: data[0].date, value: avrg }, { date: data[data.length - 1].date, value: avrg }]

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
	classes;
	state = [];
	t;
	constructor(containerEl, props, classes) {
		this.t = props.t;
		this.classes = classes;
		this.containerEl = containerEl;
		this.props = props;
		var margin = this.margin = { top: 50, right: 75, bottom: 75, left: 75 };
		let data = props.data[props.id]

		//Get the height and width from the container
		var height = this.height = containerEl.clientHeight;
		var width = this.width = containerEl.clientWidth;

		height = height - margin.top - margin.bottom;
		width = width - margin.left - margin.right;
		// this.generateLines()
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
		// if (!secondaryLine) {
		let allData = [].concat(...data.map(d => d.data))

		this.x.domain(d3.extent(allData, function (d) {
			return moment(d.date).valueOf();
		}));

		this.y.domain([0, getMax(allData) + 10]);

		//Define the area for the values
		this.valueArea = d3.area()
			.x((d) => { return this.x(moment(d.date).valueOf()) })
			.y0(this.y(0))
			.y1((d) => { return this.y(d.value) })

		this.valueLine = d3.line()
			.x((d) => this.x(moment(d.date).valueOf()))
			.y(d => this.y(d.value))
		this.div = d3.select(`#${props.id}tooltip`)
			.style("opacity", 0);


		//#region Ticks
		var xAxis_woy = d3.axisBottom(this.x)
			// .ticks(Math.round(lineData.length / 5))
			.tickFormat(d3.timeFormat("%d"))
			.tickValues([...allData.map((d, i) => {
				switch (true) {
					case i === 0:
					case i === allData.length - 1:
						return moment(d.date).valueOf()
					case allData.length > 7:
						return (i + 1) % 5 ? null : moment(d.date).valueOf()
					case allData.length <= 7:
						return moment(d.date).valueOf()
					default:
						return null;
				}
			})]);

		// //Add the X axis
		this.xAxis = this.svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis_woy);


		// //Append style
		this.xAxis.selectAll('path').attr('class', classes.axis)
		this.xAxis.selectAll('line').attr('class', classes.axis)
		this.xAxis.selectAll('text').attr('class', classes.axisTick)

		this.xAxis.append('text')
			.attr('transform', `translate(0,50)`)
			.attr('class', classes.axisText)
			.html(toUppercase(moment(allData[0].date).format('MMMM')))

		// //  Add the Y Axis

		let yAxis = this.svg.append("g").call(d3.axisLeft(this.y));



		yAxis.selectAll('path').attr('class', classes.axis)
		yAxis.selectAll('line').attr('class', classes.axis)
		yAxis.selectAll('text').attr('class', classes.axisTick)

		yAxis.append('text')
			.attr('transform', `translate(-40,${height / 2})`)
			.attr('class', classes.axisText)
			// .html(props.unit)
			.html('m3')

		this.generateLegend()
		this.generateLines()
		this.generateDots()
		this.generateMedian()
	}
	generateDots = () => {
		let data = this.props.data[this.props.id]
		const setTooltip = this.props.setTooltip
		const classes = this.classes
		data.forEach((line) => {
			if (line.prev) {
				return
			}
			let tooltipDiv = this.div
			this.svg.selectAll(".dot")
				.data(line.data)
				.enter()
				.append("circle") // Uses the enter().append() method
				.on("mouseover", function (d) {
					d3.select(this).attr("r", 8);
					tooltipDiv.transition()
						.duration(200)
						.style("opacity", 1)
						.style('z-index', 1040);
					tooltipDiv.style("left", (d3.event.pageX) - 235 + "px")
						.style("top", (d3.event.pageY) - 250 + "px");

					setTooltip(d)

				}).on("mouseout", function () {
					// setExpand(false)
					d3.select(this).attr("r", 6)
					tooltipDiv.transition()
						.duration(500)
						.style('z-index', -1)
						.style("opacity", 0);
				}).on('click', function () {
					// setExpand(true)
				})
				.attr("cx", (d) => { return this.x(moment(d.date).valueOf()) })
				.attr("class", classes.dot) // Assign a class for styling
				.attr("cy", (d) => { return this.y(d.value) })
				.attr("r", 0)
				.transition()
				.attr("id", `${line.name}Dots`)
				.style("opacity", line.hidden ? 0 : 1)
				.delay(function (d, i) { return i * 150 })
				.attr("r", 6)
		})
		// .duration(3000)
	}
	generateLegend = () => {
		const t = this.t;
		let data = this.props.data[this.props.id]
		let counter = 0;
		data.forEach((line, i) => {
			this.state[line.name] = line.hidden
			this.xAxis.append("text")
				.attr("x", 300 + 100 * (i + counter))
				.attr("y", 50)
				.attr("id", `${line.name}Legend`)
				.attr("class", "legend")
				.style("fill", this.state[line.name] ? 'steelblue' : "#fff")
				.style('cursor', 'pointer')
				.on("click", () => {
					// Determine if current line is visible
					var active = this.state[line.name] ? false : true,
						newOpacity = active ? 0 : 1, newColor = active ? 'steelblue' : '#fff';

					// Hide or show the elements

					d3.select(`#${line.name}`)
						.transition().duration(200)
						.style("opacity", newOpacity)
					d3.selectAll(`#${line.name}Dots`)
						.transition().duration(200)
						.style("opacity", newOpacity)
					d3.select(`#${line.name}Legend`)
						.transition().duration(200)
						.style("fill", newColor)
					d3.select(`#${line.name}Area`)
						.transition().duration(200)
						.style("opacity", newOpacity)
					this.state[line.name] = active;
				})
				.text(t(`charts.names.${line.name}`));
			if (line.median) {
				counter += 1
				this.state[line.name + 'Median'] = 0
				this.xAxis.append("text")
					.attr("x", 300 + 100 * (i + counter))
					.attr("y", 50)
					.attr("id", `${line.name}MedianLegend`)
					.attr("class", "legend")
					.style("fill", this.state[line.name + 'Median'] ? 'steelblue' : "#fff")
					.style('cursor', 'pointer')
					.on("click", () => {
						// Determine if current line is visible
						var active = this.state[line.name + 'Median'] ? false : true,
							newOpacity = active ? 0 : 1, display = active ? 'none' : undefined, newColor = active ? 'steelblue' : '#fff';

						// Hide or show the elements

						d3.selectAll(`#${line.name}MedianL`)
							.transition().duration(200)
							.style("opacity", newOpacity)
						d3.selectAll(`#${line.name}MedianLegend`)
							.transition().duration(200)
							.style("fill", newColor)
						d3.select(`#${line.name}MedianH`)
							.transition().duration(200)
							.style("display", display)

						this.state[line.name + 'Median'] = active;
					})
					.text(t(`charts.names.${line.name}`) + 'Avg');
			}
		})
	}
	generateLines = () => {
		const classes = this.classes
		let data = this.props.data[this.props.id]
		data.forEach((line, i) => {

			//#region Generate Line Area
			if (!line.noArea) {
				let defArea = d3.area()
					.x((d) => { return this.x(moment(d.date).valueOf()) })
					.y0(this.y(((i === 0) || (line.prev)) ? 0 : Math.min(...line.data.map(d => d.value))))
					.y1((d) => { return this.y(d.value) })
				this.svg.append("path")
					.attr('id', line.name + 'Area')
					.data([line.data])
					.attr("opacity", line.hidden ? 0 : 1)
					.attr("class", line.prev ? classes.prevArea : classes[line.name + 'Area'])
					.attr("d", defArea);
			}
			//#endregion
			//#region Generate Line
			if (!line.prev)
				this.svg.append('path')
					.data([line.data])
					.attr('id', line.name)
					.attr('class', classes[line.name])
					.attr('d', this.valueLine)
					.attr("stroke-dasharray", function () {
						return this.getTotalLength()
					})
					.attr("stroke-dashoffset", function () {
						return this.getTotalLength()
					})
					.style("stroke-dasharray", line.dashed ? "3, 3" : undefined)
					.attr("opacity", line.hidden ? 0 : 1)
					.transition()
					.duration(1500)
					.attr('stroke-dashoffset', 0)

			//#endregion
		})

	}

	generateMedian = () => {
		const { setMedianTooltip } = this.props
		const classes = this.classes
		//Median tooltip
		let data = this.props.data[this.props.id]
		var medianTooltip = d3.select(`#${this.props.id}medianTooltip`)
			.attr("class", classes.medianTooltip)
			.style("opacity", 0);
		data.forEach((line) => {

			//Median line
			if (line.median) {
				let medianData = getMedianLineData(line.data)
				let medianLine = this.svg.append('path')
					.data([medianData])
					.attr('class', classes.medianLine)
					.attr('d', this.valueLine)
					.attr('id', `${line.name}MedianL`)
					.style('opacity', 0)
					.attr('stroke-dasharray', ("3, 3"))

				// Hidden overlay for Median tooltip
				this.svg.append('path')
					.data([medianData])
					.attr('class', classes.hiddenMedianLine)
					.attr('d', this.valueLine)
					.attr('id', `${line.name}MedianH`)
					.on("mouseover", function (d) {
						console.log(d)
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

					}).on("mouseout", function () {
						// setExpand(false)
						medianLine.transition()
							.duration(100)
							.style('stroke-width', '3px')
						medianTooltip.transition()
							.duration(500)
							.style('z-index', -1)
							.style("opacity", 0);
					}).on('click', function () {
						// setExpand(true)
					});
			}
		})

	}
	updateThings = (props) => { /*...*/ }

	destroy = (id) => {
		this.container.select('svg').remove()
	}

}

export default d3Line;