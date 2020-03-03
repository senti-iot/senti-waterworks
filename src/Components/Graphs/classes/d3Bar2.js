import * as d3 from 'd3'

class d3Bars {

	svg
	theData
	x
	y
	margin
	height
	width

	constructor(containerEl, props) {
		var height = this.height = containerEl.clientHeight
		var width = this.width = containerEl.clientWidth
		this.container = d3.select(`#bars`)

		let margin = this.margin = { top: 20, right: 20, bottom: 30, left: 40 }
		let svg = this.svg = this.container.append("svg")
			.attr("id", 'svg' + props.id)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)

		this.x = d3.scaleBand().padding(0.1)
		this.y = d3.scaleLinear()
		this.theData = props.data

		console.log(svg)
		var g = this.g = svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

		g.append("g")
			.attr("class", "axis axis--x")

		g.append("g")
			.attr("class", "axis axis--y")

		g.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
			.text("Frequency")

	}

	// DRAWING

	draw() {
		let { height, width, x, y, g, theData } = this
		// var bounds = svg.node().getBoundingClientRect(),
		// 	width = bounds.width - margin.left - margin.right,
		// 	height = bounds.height - margin.top - margin.bottom

		x.rangeRound([0, width])
		y.rangeRound([height, 0])

		g.select(".axis--x")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x))

		g.select(".axis--y")
			.call(d3.axisLeft(y).ticks(10, "%"))

		var bars = g.selectAll(".bar")
			.data(theData)

		// ENTER
		console.log(bars)
		bars
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function (d) { return x(d.letter) })
			.attr("y", function (d) { return y(d.frequency) })
			.attr("width", x.bandwidth())
			.attr("height", function (d) { return height - y(d.frequency) })

		// UPDATE
		bars.attr("x", function (d) { return x(d.letter) })
			.attr("y", function (d) { return y(d.frequency) })
			.attr("width", x.bandwidth())
			.attr("height", function (d) { return height - y(d.frequency) })

		// EXIT
		bars.exit()
			.remove()

	}

	// LOADING DATA

	loadData() {
		let { x, y, theData } = this
		x.domain(theData.map(function (d) { return d.letter }))
		y.domain([0, d3.max(theData, function (d) { return d.frequency })])

		this.draw()
	}
}

export default d3Bars