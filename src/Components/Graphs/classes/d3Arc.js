import * as d3 from 'd3';
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

	containerEl;
	props;
	svg;

	constructor(containerEl, props) {
		const classes = props.classes
		this.containerEl = containerEl;
		this.props = props;
		const { arcData, arcPrevData } = props
		var margin = { top: 30, right: 10, bottom: 30, left: 10 };

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
		// .append("g")
		// .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		//Calculate the angles for the inner Arc
		let innerArcS, innerArcE, outerArcS, outerArcE = 0
		innerArcS = 0
		innerArcE = (Math.PI * 265) / 180 // Always this value
		outerArcS = 0
		outerArcE = (((arcData * 100) / arcPrevData) * 265) / 100
		if (outerArcE > 295) {
			outerArcE = 295
		}
		window.width = width
		window.height = height
		let median = Math.round((width + height) / 2)
		var innerArc = d3.arc()
			.innerRadius(`${(median / 3) - 25}`)
			.outerRadius(`${(median / 3) - 10}`)
			.startAngle(innerArcS) //converting from degs to radians
			.endAngle(innerArcE) //just radians
		var outerArc = d3.arc()
			.innerRadius(`${(median / 3) - 5}`)
			.outerRadius(`${(median / 3) + 10}`)
			.startAngle(outerArcS)
			.endAngle((Math.PI * outerArcE) / 180)

		this.svg.append("path")
			.attr("d", innerArc)
			.attr('class', classes.arc + " " + classes.innerArc)

		this.svg.append("path")
			.attr("d", outerArc)
			.attr('class', `${classes.arc} ${classes.outerArc} ${arcData < arcPrevData ? classes.outerArcG : classes.outerArcR}`)

		// .attr("transform", `translate(-50%, -50%); rotate(180deg)`)
		// .attr('transform-origin', "center")
	}

	destroy = (id) => {
		this.container.select('svg').remove()
	}

}

export default d3Arc;