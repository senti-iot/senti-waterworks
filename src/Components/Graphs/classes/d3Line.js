import * as d3 from 'd3';

const getMedianLineData = (data, prevData) => {
	console.log(data)
	let sum = data.map(d => d.nps).reduce((total, val) => total + val)
	console.log(sum)
	// sum.reduce()
	let avrg = Math.round(sum / data.length)
	let medianValues = [{ date: data[0].date, nps: avrg }, { date: prevData[prevData.length - 1].date, nps: avrg }]
	return medianValues
}


class d3Line {

	containerEl;
	props;
	svg;

	constructor(containerEl, props, classes) {

		this.containerEl = containerEl;
		this.props = props;
		const { lineData, prevLineData, setTooltip, setMedianTooltip } = props
		// const lineData = props.lineData
		// const prevLineData = props.prevLineData
		// const
		// const classes = props.classes
		var margin = { top: 50, right: 75, bottom: 75, left: 75 };

		//Get the height and width from the container
		var height = containerEl.clientHeight;
		var width = containerEl.clientWidth;

		height = height - margin.top - margin.bottom;
		width = width - margin.left - margin.right;

		//Append the SVG to the container
		this.container = d3.select(`#${props.id}`)

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
		this.x.domain(d3.extent([...lineData, ...prevLineData], function (d) { return d.date; }));
		this.y.domain([0, 100]);

		//Define the area for the values
		var valueArea = d3.area()
			.x((d) => { return this.x(d.date) })
			.y0(this.y(0))
			.y1((d) => { return this.y(d.nps) })

		var valueLine = d3.line()
			.x((d) => this.x(d.date))
			.y(d => this.y(d.nps))


		this.svg.append("path")
			.data([prevLineData])
			.attr("class", classes.line2)
			.attr("d", valueArea);

		this.svg.append("path")
			.data([lineData])
			.attr("class", classes.area)
			.attr("d", valueArea);

		this.svg.append('path')
			.data([lineData])
			.attr('class', classes.line)
			.attr('d', valueLine)

		var medianTooltip = d3.select(`#${props.id}medianTooltip`)
			.attr("class", classes.medianTooltip)
			.style("opacity", 0);

		let medianLine = this.svg.append('path')
			.data([getMedianLineData(lineData, prevLineData)])
			.attr('class', classes.lineWeekend)
			.attr('d', valueLine)
			.attr('stroke-dasharray', ("3, 3"))

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


		var xAxis_woy = d3.axisBottom(this.x).tickFormat(d3.timeFormat("%d %b'%y")).tickValues([...lineData.map(d => d.date)]);

		//Add the X axis
		this.svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis_woy);

		//  Add the Y Axis
		this.svg.append("g").call(d3.axisLeft(this.y));
		// Define the tooltip
		var div = d3.select(`#${props.id}tooltip`)
			.attr("class", classes.tooltip)
			.style("opacity", 0);


		// Add the mouseover
		// var formatTime = d3.timeFormat("%e %B");

		// Add the dots
		this.svg.selectAll(".dot")
			.data(lineData)
			.enter()
			.append("circle") // Uses the enter().append() method
			.attr("class", classes.dot) // Assign a class for styling
			.attr("cx", (d) => { return this.x(d.date) })
			.attr("cy", (d) => { return this.y(d.nps) })
			.attr("r", 5)
			.on("mouseover", function (d) {
				div.transition()
					.duration(200)
					.style("opacity", 1)
					.style('z-index', 1040);
				div.style("left", (d3.event.pageX) - 235 + "px")
					.style("top", (d3.event.pageY) - 250 + "px");

				setTooltip(d)

			}).on("mouseout", function (d) {
				// setExpand(false)
				div.transition()
					.duration(500)
					.style('z-index', -1)
					.style("opacity", 0);
			}).on('click', function (d) {
				// setExpand(true)
			});
		// init other vis elements like scales and axes here.
	}

	updateThings = (props) => { /*...*/ }

	destroy = (id) => {
		this.container.select('svg').remove()
	}

}

export default d3Line;