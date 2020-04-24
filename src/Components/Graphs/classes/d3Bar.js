import * as d3 from 'd3'
import { formatShortNumber } from 'data/functions'
// import moment from 'moment';

// const getMedianLineData = (data, prevData) => {
// 	let sum = data.map(d => d.nps).reduce((total, val) => total + val)
// 	// sum.reduce()
// 	let avrg = Math.round(sum / data.length)
// 	let medianValues = [{ date: data[0].date, nps: avrg }, { date: prevData[prevData.length - 1].date, nps: avrg }]
// 	return medianValues
// }

// const toUppercase = str => str.charAt(0).toUpperCase() + str.slice(1);
// const getMax = (arr) => {
// 	return Math.max(...arr.map(d => d.nps))
// }
class d3Arc {

	containerEl
	props
	svg
	g
	margin = { top: 100, right: 20, bottom: 50, left: 20 }

	constructor(containerEl, props) {

		/**
		 * Props & Data
		 */
		this.containerEl = containerEl
		this.props = props
		const { barsData } = props
		/**
		 * Constants
		 */

		var margin = this.margin

		/**
		 * Get the height and width from the main container
		 */

		this.height = containerEl.clientHeight
		this.width = containerEl.clientWidth

		this.height = this.height - margin.top - margin.bottom
		this.width = this.width - margin.left - margin.right



		/**
		 * Generate the scales
		 */
		this.x = d3.scaleBand().padding(0.1)
		this.y = d3.scaleLinear()

		/**
		 * Generate the domains
		 */

		this.x.domain(barsData.map((d) => { return d.type }))
		this.y.domain([0, d3.max(barsData, (d) => { return d.value })])

		/**
		 * Draw the bars and the axis
		 */

		this.draw(containerEl)

	}
	rcolor = (name) => {
		const { classes } = this.props
		return classes[name]
	}
	draw = (containerEl) => {
		const { barsData, id } = this.props

		this.height = containerEl.clientHeight
		this.width = containerEl.clientWidth
		const { width, margin, height } = this


		this.height = this.height - margin.top - margin.bottom
		this.width = this.width - margin.left - margin.right
		/**
		 * Append the SVG to the main container
		 */
		this.container = d3.select(`#${id}`)

		this.svg = this.container.append("svg")
			.attr("id", 'svg' + id)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height)

		// .attr("width", width + margin.left + margin.right)
		// .attr("height", height + margin.top + margin.bottom)
		/**
		 * Append the group of bars to the svg
		 */

		this.g = this.svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

		// ENTER
		var bounds = d3.select('#bars').node().getBoundingClientRect(),
			rWidth = bounds.width - this.margin.left - this.margin.right,
			rHeight = bounds.height - this.margin.top - this.margin.bottom
		this.x.rangeRound([0, rWidth])
		this.y.rangeRound([rHeight, 25]) //25 is the label

		//#region Generate Bars
		var bars = this.g.selectAll(".bar")
			.data(barsData)
		console.log(barsData)
		if (barsData.length === 4) {
			bars
				.enter().append("rect")

				.attr("class", d => { return d.className + ' .bar' })
				.attr("x", (d, i) => { return i > 2 ? this.x(d.type) - (this.x.bandwidth() / 4) : this.x(d.type) + (this.x.bandwidth() / 4) })
				.attr("y", (d) => { return this.y(parseFloat(d.value)) })
				.attr("width", (d) => d.hidden ? this.x.bandwidth() / 2 : this.x.bandwidth())
				.attr("height", (d) => { return d.hidden ? 0 : rHeight - this.y(d.value) + 3 })
		}
		else {
			bars
				.enter().append("rect")

				.attr("class", d => { return d.className + ' .bar' })
				.attr("x", (d, i) => { return this.x(d.type) })
				.attr("y", (d) => { return this.y(parseFloat(d.value)) })
				.attr("width", (d) => d.hidden ? (this.x.bandwidth() / 2) : this.x.bandwidth())
				.attr("height", (d) => { return d.hidden ? 0 : rHeight - this.y(d.value) + 3 })
		}

		//#endregion


		this.g.select(".axis--y")
			.call(d3.axisLeft(this.y).ticks(1, "%"))

		this.generateXAxis()
		this.generateLabels()

		// EXIT
		bars.exit()
			.remove()
	}
	generateLabels = () => {
		const { classes, barsData } = this.props

		if (barsData.length === 4) {
			this.g.selectAll(".text")
				.data(barsData)
				.enter()
				.append("text")
				.attr('text-anchor', 'middle')
				.attr("class", `label ${classes.textLabel}`)
				.attr("x", (d, i) => { return i > 2 ? this.x(d.type) + this.x.bandwidth() / 4 : this.x(d.type) + this.x.bandwidth() / 2 + this.x.bandwidth() / 4 })
				.attr("y", (d) => { return this.y(d.value) })
				.attr("dy", "-.3em")
				.text((d) => { return d.hidden ? '' : `${formatShortNumber(d.value)} ${d.unit}` })
		}
		else {

			this.g.selectAll(".text")
				.data(barsData)
				.enter()
				.append("text")
				.attr('text-anchor', 'middle')
				.attr("class", `label ${classes.textLabel}`)
				.attr("x", (d, i) => { return this.x(d.type) + this.x.bandwidth() / 2 })
				.attr("y", (d) => { return this.y(d.value) })
				.attr("dy", "-.3em")
				.text((d) => { return d.hidden ? '' : `${formatShortNumber(d.value)} ${d.unit}` })
		}
	}
	generateXAxis = () => {
		const { classes } = this.props
		var bounds = d3.select('#bars').node().getBoundingClientRect(),
			rHeight = bounds.height - this.margin.top - this.margin.bottom
		this.xAxis = this.g.append("g")
			.attr("class", `axis axis--x ${classes.xAxis}`)
		this.g.select(".axis--x")
			.attr("transform", "translate(0," + rHeight + ")")
			.call(d3.axisBottom(this.x).ticks(0))

		this.xAxis.selectAll('text')
			.attr('dy', '1.5em')
			.attr('font-size', 12)
			.attr('class', `${classes.axisLabel}`)
		this.xAxis.selectAll('path')
			.attr('class', `${classes.xAxisPath}`)
		this.xAxis.selectAll('line')
			.attr('class', `${classes.xAxisLine}`)


	}
	redraw = () => {
		this.destroy()
		this.draw()
		this.generateXAxis()
		this.generateLabels()
	}
	destroy = (id) => {
		this.container.select('svg').remove()
	}

}

export default d3Arc