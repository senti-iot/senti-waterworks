import * as d3 from 'd3';
import moment from 'moment';
import hexToRgba from 'hex-to-rgba';
import { colors } from '@material-ui/core';

const getMedianLineData = (data) => {
	let medianValues = []
	if (data.length > 0) {
		let sum = data.map(d => d.value).reduce((total, val) => parseFloat(total) + parseFloat(val))
		let avrg = parseFloat((sum / data.length).toFixed(3))
		medianValues = [{ date: data[0].date, value: avrg }, { date: data[data.length - 1].date, value: avrg }]
	}

	return medianValues
}

// const toUppercase = str => str.charAt(0).toUpperCase() + str.slice(1);
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
		this.period = props.period;
		var margin = this.margin = { top: 50, right: 50, bottom: 75, left: 50 };
		let data = props.data ? props.data[props.id] : []

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
			.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
			// .attr("width", width)
			// .attr("height", height)
			.append("g")
			.attr("transform", "translate(" + 63 + "," + 63 + ")")

		// Set the this.svg ranges
		this.x = d3.scaleTime().range([0, width - margin.left]);
		// var x = d3.scaleTime().range([0, width]);
		this.y = d3.scaleLinear().range([height, 0]);
		// var y = d3.scaleLinear().range([height, 0]);

		//Set the graph ranges
		// if (!secondaryLine) {
		let allData = [].concat(...data.map(d => d.data))
		let period = this.props.period

		// this.x.domain(d3.extent(allData, function (d) {
		// 	return moment(d.date).valueOf();
		// }));
		this.x.domain([period.from, period.to])
		this.y.domain([0, getMax(allData) + 1]);

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
		this.medianTooltip = d3.select(`#${this.props.id}medianTooltip`)
			.style("opacity", 0);

		//#region Ticks

		this.generateXAxis()
		// //  Add the Y Axis

		let yAxis = this.svg.append("g").call(d3.axisLeft(this.y));



		yAxis.selectAll('path').attr('class', classes.axis)
		yAxis.selectAll('line').attr('class', classes.axis)
		yAxis.selectAll('text').attr('class', classes.axisTick)

		yAxis.append('text')
			.attr('transform', `translate(-40,${height / 2})`)
			.attr('class', classes.axisText)
			// .html(props.unit)
			.html('m³')
		data.forEach(line => {
			if (!line.noMedianLegend && line.median) {
				this.state[line.name + 'Median'] = true
				this.state[line.name] = line.hidden
			}
			else {
				this.state[line.name] = line.hidden
			}
		})
		this.generateLines()
		this.generateDots()
		this.generateMedian()
		this.generateLegend()
	}
	generateXAxis = () => {
		let period = this.props.period
		const classes = this.classes
		const height = this.height
		let from = moment(period.from).startOf('day')
		let to = period.to.startOf('day')
		let timeType = period.timeType
		let counter = moment(from)
		let ticks = []
		let monthTicks = []
		// ticks.push(counter.valueOf())
		let add = 1
		if (moment(counter).diff(to, 'day') > 14) {

			add = 3
		}
		if (timeType === 4) {
			monthTicks.push(counter.valueOf())
			let lb = 0
			while (moment(counter).diff(to, 'day') < 0) {
				ticks.push(counter.valueOf())
				if (moment().format('MMMM')) {

				}
				if (lb === 0) {
					counter.add(16, 'day')
					lb = 1
				}
				else {
					counter.add(15, 'day')
					lb = 0
				}
				if (
					monthTicks.findIndex(f => {
						return moment(f).format('MMMM').toLowerCase() === counter.format('MMMM').toLowerCase()
					}) === -1
				) {

					monthTicks.push(counter.valueOf())
				}
			}
			ticks.push(to.valueOf())
			monthTicks.push(to.valueOf())
		}
		else {

			monthTicks.push(counter.valueOf())
			while (moment(counter).diff(to, 'day') < 0) {
				ticks.push(counter.valueOf())
				counter.add(add, 'day')
				if (
					monthTicks.findIndex(f => {
						return moment(f).format('MMMM').toLowerCase() === counter.format('MMMM').toLowerCase()
					}) === -1
				) {

					monthTicks.push(counter.valueOf())
				}
			}
			ticks.push(to.valueOf())
			monthTicks.push(to.valueOf())
		}

		var xAxis_woy = d3.axisBottom(this.x)
			.tickFormat(d3.timeFormat("%d"))
			.tickValues(ticks);

		// //Add the X axis
		this.xAxis = this.svg.append("g")
			.attr("transform", "translate(0," + (height - this.margin.top - this.margin.bottom + 5) + ")")
			.call(xAxis_woy);


		// //Append style
		this.xAxis.selectAll('path').attr('class', classes.axis)
		this.xAxis.selectAll('line').attr('class', classes.axis)
		this.xAxis.selectAll('text').attr('class', classes.axisTick)

		var xAxis_months = d3.axisBottom(this.x)
			.tickFormat(d => moment(d).format('MMM'))
			.tickValues(monthTicks)
		this.xAxisMonths = this.svg.append("g")
			.attr("transform", "translate(-8," + (height - this.margin.top - this.margin.bottom + 21) + ")")
			.call(xAxis_months);
		this.xAxisMonths.selectAll('path').attr('class', classes.axis)
		this.xAxisMonths.selectAll('line').attr('class', classes.axis)
		this.xAxisMonths.selectAll('text').attr('class', classes.axisText)
		// this.xAxis.append('text')
		// 	.attr('transform', `translate(0,50)`)
		// 	.attr('class', classes.axisText)
		// 	.html(toUppercase(moment(ticks[0].date).format('MMMM')))
	}
	generateDots = () => {
		let data = this.props.data[this.props.id]
		const setTooltip = this.props.setTooltip
		data.forEach((line) => {
			if (line.prev) {
				return
			}
			let tooltipDiv = d3.select(`#${this.props.id}tooltip`)
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
				}).on('click', function (d) {
					// setExpand(true)
					// alert(d.date + ' ' + d.value)
				})
				.attr("cx", (d) => { return this.x(moment(d.date).valueOf()) })
				// .attr("class", classes[`${line.name}Dot`]) // Assign a class for styling
				.attr("cy", (d) => { return this.y(d.value) })
				.attr("r", 0)
				.attr("fill", line.color ? colors[line.color][500] : "#fff")
				.transition()
				.attr("id", `${line.name}Dots`)
				.style("opacity", line.hidden ? 0 : 1)
				.delay((d, i) => { return i * (1500 / line.data.length) })
				.attr("r", 6)
		})
		// .duration(3000)
	}
	generateLegend = () => {
		let data = this.props.data[this.props.id]
		data.forEach((line) => {

			if (line.median & !line.noMedianLegend) {
				let LegendMCheck = d3.select(`#${line.name}LegendMedianCheckbox`)
				let LegendM = d3.select(`#${line.name}LegendMedian`)
				let LegendMLabel = d3.select(`#${line.name}LegendMedianLabel`)
				LegendMCheck.on('click', () => {

					var active = this.state[line.name + 'Median'] ? false : true,
						newOpacity = active ? 0 : 1, display = active ? 'none' : undefined,
						newColor = active ? 'steelblue' : line.color ? colors[line.color][500] : "#fff";

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

					LegendMCheck
						.attr('value', active)
					LegendM
						.style("color", active ? 'rgba(255, 255, 255, 0.3)' : colors[line.color][500])
					LegendMLabel.style("color", active ? 'rgba(255,255,255,0.3)' : '#fff')
					this.state[line.name + 'Median'] = active;
				})
			}

			let Legend = d3.select(`#${line.name}Legend`)
			let LegendCheck = d3.select(`#${line.name}LegendCheckbox`)
			let LegendLabel = d3.select(`#${line.name}LegendLabel`)
			LegendCheck.on('click', () => {
				let active = this.state[line.name] ? false : true,
					newOpacity = active ? 0 : 1, display = active ? 'none' : undefined;

				// Hide or show the elements

				d3.select(`#${line.name}`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.selectAll(`#${line.name}Dots`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.select(`#${line.name}Area`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.select(`#${line.name}MArea`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.select(`#${line.name}HArea`)
					.transition().duration(200)
					.style("display", display)
				LegendCheck
					.attr('value', active)
				Legend
					.style("color", active ? 'rgba(255,255,255,0.3)' : line.prev ? '#fff' : colors[line.color][500])
				LegendLabel.style("color", active ? 'rgba(255,255,255,0.3)' : '#fff')

				this.state[line.name] = active
			})


		})

	}

	generateLines = () => {
		let period = this.props.period
		let data = this.props.data[this.props.id]
		data.forEach(d => {
			d.data = d.data.filter(f => moment(f.date).diff(period.from) >= 0)
		})
		window.moment = moment
		window.data = data
		let animArea0 = d3.area()
			.y0(this.height - this.margin.bottom - this.margin.top)
			.y1(0)
			.x((d) => { return this.x(moment(d.date).valueOf()) })
		data.forEach((line, i) => {

			//#region Generate Line Area
			if (!line.noArea) {
				let defArea = d3.area()
					.x((d) => { return this.x(moment(d.date).valueOf()) })
					.y0(this.y(((i === 0) || (line.prev) || (!line.smallArea)) ? 0 : Math.min(...line.data.map(d => d.value))))
					.y1((d) => { return this.y(d.value) })
				this.svg.append("path")
					.attr('id', line.name + 'Area')
					.data([line.data])
					.attr("opacity", line.hidden ? 0 : 1)
					.attr('fill', line.prev ? 'rgba(255,255,255, 0.1' : hexToRgba(colors[line.color][500], 0.1))
					// .attr("class", line.prev ? classes.prevArea : classes[line.name + 'Area'])
					.attr("d", animArea0)
					.transition()
					.duration(1500)
					.attr("d", defArea);
				if (line.noMedianLegend) {
					let setMedianTooltip = this.props.setMedianTooltip
					var medianTooltip = this.medianTooltip
					let medianData = getMedianLineData(line.data)
					let medianLine = this.svg.append('path')
						.data([medianData])
						.attr('fill', 'none')
						.attr('stroke', 'rgba(255,255,255, 0.1)')
						.attr('stroke-width', '4px')
						// .attr('class', classes.medianLinePrev)
						.attr('d', this.valueLine)
						.attr('id', line.name + 'MArea')
						.style('opacity', 0)
						.attr('stroke-dasharray', ("3, 3"))

					// Hidden overlay for Median tooltip
					this.svg.append('path')
						.data([medianData])
						// .attr('class', classes.hiddenMedianLine)
						.attr('stroke', '#fff')
						.attr('opacity', 0)
						.attr('stroke-width', '7px')
						.attr('d', this.valueLine)
						.attr('id', line.name + 'HArea')
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

						}).on("mouseout", function () {
							// setExpand(false)
							medianLine.transition()
								.duration(100)
								.style('stroke-width', '4px')
							medianTooltip.transition()
								.duration(500)
								.style('z-index', -1)
								.style("opacity", 0);
						}).on('click', function () {
							// setExpand(true)
						});
				}
			}
			//#endregion
			//#region Generate Line
			if (!line.prev)
				this.svg.append('path')
					.data([line.data])
					.attr('id', line.name)
					// .attr('class', classes[line.name])
					.attr('fill', 'none')
					.attr('stroke', colors[line.color][500])
					.attr('stroke-width', '4px')
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
		var medianTooltip = this.medianTooltip
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
					.style('display', line.hidden ? 'none' : undefined)
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

					}).on("mouseout", function () {
						// setExpand(false)
						medianLine.transition()
							.duration(100)
							.style('stroke-width', '4px')
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
	destroy = () => {
		this.container.select('svg').remove()
	}

}

export default d3Line;