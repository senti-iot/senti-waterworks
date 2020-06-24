import * as d3 from 'd3'
import moment from 'moment'
import hexToRgba from 'hex-to-rgba'
import { colors } from '@material-ui/core'
import { ClearDay, ClearNight, Cloudy, Fog, PartlyCloudyDay, PartlyCloudyNight, Rain, Sleet, Snow, Wind, } from 'variables/icons'
import { store } from 'Providers'

const getMedianLineData = (data) => {
	let medianValues = []
	if (data.length > 0) {
		let sum = data.map(d => d.value).reduce((total, val) => parseFloat(total) + parseFloat(val))
		let avrg = parseFloat((sum / data.length).toFixed(3))
		medianValues = [{ date: data[0].date, value: avrg }, { date: data[data.length - 1].date, value: avrg }]
	}

	return medianValues
}

const getMax = (arr) => {
	if (arr.length > 0) {
		let max = Math.max(...arr.map(d => d.value))
		if (max < 1) {
			return max + 0.1
		}
		if (max < 5) {
			return max + 1
		}
		if (max > 100000) {

			return max + 10000
		}
		if (max > 10000) {
			return max + 1000
		}
		if (max > 1000) {
			return max + 500
		}
		if (max > 100) {
			return max + 200
		}
		if (max > 5) {
			return max + 10
		}
	}
}
const getMin = (arr) => {
	if (arr.length > 0) {
		let min = Math.min(...arr.map(d => d.value))
		if (min > 1) {
			// min = min - 0.1
			min = 0
		}
		if (min > 5) {
			// min = min - 1
			min = 0
		}
		if (min > 100) {
			min = min - 100
		}
		if (min > 1000) {
			min = min - 1000
		}
		if (min > 10000) {
			min = min - 10000
		}
		if (min > 100000) {
			min = min - 100000
		}
		// min = min - 10

		// return min > 1 ? min - 10 : min - 0.1
		// alert('min' + min)
		return min > 0 ? Math.floor(min) : 0
	}
}
class d3LineFS {

	containerEl
	props
	svg
	classes
	state = [];
	t
	constructor(containerEl, props, classes) {
		this.t = props.t
		this.classes = classes
		this.setLine = props.setLine
		this.containerEl = containerEl
		this.props = props
		this.period = props.period
		this.margin = { top: 30, right: 50, bottom: 50, left: 50 }
		// let data = props.data ? props.data[props.id] : []
		//Get the height and width from the container
		this.height = containerEl.clientHeight
		this.width = containerEl.clientWidth
		this.weatherData = props.weatherData ? props.weatherData : []
		this.svg = d3.select(`#${props.id + 'fsLG'}`)
		this.state = store.getState().appState.lines
		this.generateXAxis()
		this.generateYAxis()

		//Define the area for the values
		this.valueArea = d3.area()
			.x((d) => { return this.x(moment(d.date).valueOf()) })
			.y0(this.y(0))
			.y1((d) => { return this.y(d.value) })

		this.valueLine = d3.line()
			.x((d) => this.x(moment(d.date).valueOf()))
			.y(d => this.y(d.value))
		this.div = d3.select(`#tooltip${props.id}fsLG`)
			.style("opacity", 0)
		this.medianTooltip = d3.select(`#medianTooltip${this.props.id}fsLG`)
			.style("opacity", 0)

		//#region Ticks

		this.update()
	}
	setState = (key, value, noUpdate) => {
		this.setLine(key, value)
		// this.state[key] = value
		this.state = store.getState().appState.lines
		if (!noUpdate) {

			this.update()
		}

	}
	update = () => {
		//#region Update Y-Axis
		let data = this.props.data ? this.props.data[this.props.id] : []
		let newData = data.filter(f => !this.state['LfsLG' + f.name])
		let allData = [].concat(...newData.map(d => d.data))
		this.y.domain([getMin(allData), getMax(allData)])
		this.yAxis.remove()
		this.svg.selectAll("*").remove()
		this.generateXAxis()
		this.generateYAxis()
		this.generateLines()
		this.generateWeather()
		this.generateMedian()
		this.generateLegend()
		this.generateDots()
	}
	generateYAxis = () => {

		const classes = this.classes
		const height = this.height
		// let data = this.props.data ? this.props.data[this.props.id] : []
		if (this.y === undefined) {
			// let allData = [].concat(...data.map(d => d.data))
			this.y = d3.scaleLinear().range([height - this.margin.bottom, this.margin.top + 15])
		}

		let yAxis = this.yAxis = this.svg.append("g")
			.attr('transform', `translate(${this.margin.left + 28}, 0)`)
			.call(d3.axisLeft(this.y).tickFormat(d => {
				var da_DK = {
					"decimal": ",",
					"thousands": ".",
					"grouping": [3],
					"currency": ["", " dkk"],
				}
				return d3.formatLocale(da_DK).format(',')(d)
			}))

		yAxis.selectAll('path').attr('class', classes.axis)
		// yAxis.selectAll('line').attr('class', classes.yAxisLine).attr('x2', this.width)
		yAxis.selectAll('line').attr('class', classes.axis)
		yAxis.selectAll('text').attr('class', classes.axisTick)

		yAxis.append('text')
			.attr('transform', `translate(-16, ${this.margin.top})`)
			.attr('class', classes.axisText)
			.html(this.props.unit)
	}
	generateXAxis = () => {
		const width = this.width

		this.x = d3.scaleTime().range([this.margin.left + 45, width - this.margin.right])
		let period = this.props.period

		let data = this.props.data ? this.props.data[this.props.id] : []
		let newData = data.filter(f => !this.state['LfsLG' + f.name])
		let allData = [].concat(...newData.map(d => d.data))

		let from = moment.min(allData.map(d => moment(d.date))).startOf('day')
		let to = moment.max(allData.map(d => moment(d.date)))

		this.x.domain([from, to])


		const classes = this.classes
		const height = this.height
		let timeType = period.timeType
		let counter = moment(from)
		let hourTicks = []
		let ticks = []
		let monthTicks = []
		// ticks.push(counter.valueOf())
		let add = 1
		let lb = 0
		if (moment(counter).diff(to, 'day') > 14) {
			add = 3
		}
		/**
		 * Hour tick generator
		 */


		/**
		 * Month tick generator
		 */
		if (timeType === 4) {
			monthTicks.push(counter.valueOf())
			while (moment(counter).diff(to, 'day') < 0) {
				ticks.push(counter.valueOf())
				if (lb === 0) {
					counter.add(14, 'day')
					lb = 1
				}
				else {
					let diff = -1 * moment(counter).diff(moment(counter).endOf('month'), 'days')
					counter.add(diff + 1, 'day')
					lb = 0
				}
				// counter.add(Math.round(moment(counter).daysInMonth() / 2) - 1, 'day')

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
		if (timeType === 1) {
			while (moment(counter).diff(to, 'hour') < 0) {
				hourTicks.push(counter.valueOf())
				counter.add(add, 'hour')
			}
			hourTicks.push(to.valueOf())
		}
		else {
			/**
			 * Day tick generator
			 */
			while (moment(counter).diff(to, 'day') < 0) {
				ticks.push(counter.valueOf())
				counter.add(add, 'day')
			}
			ticks.push(to.valueOf())

			monthTicks.push(counter.valueOf())
			while (moment(counter).diff(to, 'day') < 0) {
				counter.add(add, 'day')
				if (
					monthTicks.findIndex(f => {
						return moment(f).format('MMMM').toLowerCase() === counter.format('MMMM').toLowerCase()
					}) === -1
				) {

					monthTicks.push(counter.valueOf())
				}
			}
			monthTicks.push(to.valueOf())
		}
		/**
			 * Generate Hour axis
			 */
		var xAxis_hours = this.xAxis_hours = d3.axisBottom(this.x)
			// .tickFormat(d3.timeFormat("%d"))
			.tickFormat(f => moment(f).format('HH:mm'))
			.tickValues(hourTicks)

		/**
		 * Append Day Axis
		 */
		this.xAxisHours = this.svg.append("g")
			.attr("transform", `translate(0,  ${(height - this.margin.bottom + 5)})`)
			.call(xAxis_hours)

		/**
 		* Day Axis Styling
 		*/
		this.xAxisHours.selectAll('path').attr('class', classes.axis)
		// this.xAxis.selectAll('line').attr('class', classes.yAxisLine).attr('y2', `-${this.height - this.margin.bottom - 20}`)
		this.xAxisHours.selectAll('line').attr('class', classes.axis)
		this.xAxisHours.selectAll('text').attr('class', classes.axisTick)


		/**
		 * Generate Day axis
		 */
		var xAxis_woy = this.xAxis_days = d3.axisBottom(this.x)
			// .tickFormat(d3.timeFormat("%d"))
			.tickFormat(f => moment(f).format('D'))
			.tickValues(ticks)

		/**
		 * Append Day Axis
		 */
		this.xAxis = this.svg.append("g")
			.attr("transform", `translate(0,  ${(height - this.margin.bottom + 5)})`)
			.call(xAxis_woy)

		/**
 		* Day Axis Styling
 		*/
		this.xAxis.selectAll('path').attr('class', classes.axis)
		// this.xAxis.selectAll('line').attr('class', classes.yAxisLine).attr('y2', `-${this.height - this.margin.bottom - 20}`)
		this.xAxis.selectAll('line').attr('class', classes.axis)
		this.xAxis.selectAll('text').attr('class', classes.axisTick)

		/**
		 * Generate Month Axis
		 */
		var xAxis_months = this.xAxis_months = d3.axisBottom(this.x)
			.tickFormat(d => moment(d).format('MMM'))
			.tickValues(monthTicks)
		/**
		 * Append Month Axis
		 */
		this.xAxisMonths = this.svg.append("g")
			.attr("transform", "translate(-8," + (height - this.margin.bottom + 26) + ")")
			.call(xAxis_months)
		/**
		* Month Axis Styling
		*/
		this.xAxisMonths.selectAll('path').attr('class', classes.axis)
		this.xAxisMonths.selectAll('line').attr('class', classes.axis)
		this.xAxisMonths.selectAll('text').attr('class', classes.axisText)
		// this.xAxis.append('text')
		// 	.attr('transform', `translate(0,50)`)
		// 	.attr('class', classes.axisText)
		// 	.html(toUppercase(moment(ticks[0].date).format('MMMM')))
	}
	generateWeather = () => {
		const classes = this.classes
		const height = this.height
		const margin = this.margin
		const weatherData = this.weatherData

		const getIcon = (icon) => {

			switch (icon) {
				case 'clear-day':
					return ClearDay
				case 'clear-night':
					return ClearNight
				case 'cloudy':
					return Cloudy
				case 'fog':
					return Fog
				case 'partly-cloudy-day':
					return PartlyCloudyDay
				case 'partly-cloudy-night':
					return PartlyCloudyNight
				case 'rain':
					return Rain
				case 'sleet':
					return Sleet
				case 'snow':
					return Snow
				case 'wind':
					return Wind
				default:
					break
			}
		}
		this.xAxis.selectAll('.tick').each(function (d, i) {
			let parent = d3.select(this)
			if (this.nextSibling) {

				if (i % 2 === 0) {
					parent.append('rect')
						.attr('class', classes.axisLineWhite)
						.attr("width", this.nextSibling.getBoundingClientRect().x - this.getBoundingClientRect().x)
						.attr("height", height - margin.bottom - 26)
						.attr('style', `transform: translate(0px, -${height + 5 - margin.bottom - 26}px)`)
					if (weatherData[i]) {
						parent.append("image")
							.attr("xlink:href", getIcon(weatherData[i].icon))
							.attr('class', classes.weatherIcon)
							.attr("x", Math.round(this.nextSibling.getBoundingClientRect().x - this.getBoundingClientRect().x) / 2)
							.attr("y", -(height - margin.bottom - 40))
					}
					// .attr("width", 32)
					// .attr("height", 32)
				}
				else {
					if (weatherData[i])

						parent.append("image")
							.attr("xlink:href", getIcon(weatherData[i].icon))
							.attr('class', classes.weatherIcon)
							.attr("x", Math.round(this.nextSibling.getBoundingClientRect().x - this.getBoundingClientRect().x) / 2)
							.attr("y", -(height - margin.bottom - 40))
					// .attr("width", 32)
					// .attr("height", 32)
				}
				// }
			}
		})
		this.xAxisHours.selectAll('.tick').each(function (d, i) {
			let parent = d3.select(this)
			if (this.nextSibling) {

				if (i % 2 === 0) {
					parent.append('rect')
						.attr('class', classes.axisLineWhite)
						.attr("width", this.nextSibling.getBoundingClientRect().x - this.getBoundingClientRect().x)
						.attr("height", height - margin.bottom - 26)
						.attr('style', `transform: translate(0px, -${height + 5 - margin.bottom - 26}px)`)
					if (weatherData[i]) {
						parent.append("image")
							.attr("xlink:href", getIcon(weatherData[i].icon))
							.attr('class', classes.weatherIcon)
							.attr("x", Math.round(this.nextSibling.getBoundingClientRect().x - this.getBoundingClientRect().x) / 2)
							.attr("y", -(height - margin.bottom - 40))
					}
					// .attr("width", 32)
					// .attr("height", 32)
				}
				else {
					if (weatherData[i])

						parent.append("image")
							.attr("xlink:href", getIcon(weatherData[i].icon))
							.attr('class', classes.weatherIcon)
							.attr("x", Math.round(this.nextSibling.getBoundingClientRect().x - this.getBoundingClientRect().x) / 2)
							.attr("y", -(height - margin.bottom - 40))
					// .attr("width", 32)
					// .attr("height", 32)
				}
				// }
			}
		})
	}
	generateDots = () => {
		let data = this.props.data ? this.props.data[this.props.id] : []
		const setTooltip = this.props.setTooltip
		const width = this.width
		data.forEach((line) => {
			if (line.prev || line.onlyMedian) {
				return
			}
			let tooltipDiv = d3.select(`#tooltipfsLG${this.props.id}`)
			this.svg.selectAll(".dot")
				.data(line.data)
				.enter()
				.append("circle") // Uses the enter().append() method
				.on("mouseover", function (d) {
					d3.select(this).attr("r", 8)
					tooltipDiv.transition()
						.duration(200)
						.style("opacity", 1)
						.style('z-index', 1040)
					let left = d3.event.pageX < 175 ? 245 : d3.event.pageX
					left = d3.event.pageX > width - 175 ? width - 150 : left
					left = left - 150 - 25 //150 - half of the Tooltip, 25 default D3 tooltip
					tooltipDiv.style("left", left + "px")
						.style("top", (d3.event.pageY) - 250 + "px")
					setTooltip(d)

				}).on("mouseout", function () {
					// setExpand(false)
					d3.select(this).attr("r", 6)
					tooltipDiv.transition()
						.duration(500)
						.style('z-index', -1)
						.style("opacity", 0)
				}).on('click', function (d) {
					// setExpand(true)
					// alert(d.date + ' ' + d.value)
				})
				.attr("cx", (d) => { return this.x(moment(d.date).valueOf()) })
				// .attr("class", classes[`${line.name}Dot`]) // Assign a class for styling
				.attr("cy", (d) => { return this.y(d.value) })
				.attr("r", 0)
				.attr("fill", line.color ? colors[line.color][500] : "#fff")
				.attr('opacity', 0)
				.transition()
				.attr("id", `Dots${line.name}`)
				.style("opacity", this.state['LfsLG' + line.name] ? 0 : 1)
				.delay((d, i) => { return i * (1500 / line.data.length) })
				.attr("r", 6)
		})
		// .duration(3000)
	}
	generateLegend = () => {
		let data = this.props.data[this.props.id]
		data.forEach((line) => {
			if (line.median & !line.noMedianLegend) {
				let LegendMCheck = d3.select(`#LegendMedianCheckboxfsLG${line.name}`)

				let LegendM = d3.select(`#LegendMedianfsLG${line.name}`)
				let LegendMLabel = d3.select(`#LegendMedianLabelfsLG${line.name}`)
				LegendMCheck.on('click', () => {

					var active = this.state['MedianfsLG' + line.name] ? false : true,
						newOpacity = active ? 0 : 1, display = active ? 'none' : undefined,
						newColor = active ? 'steelblue' : line.color ? colors[line.color][500] : "#fff"

					// Hide or show the elements

					d3.selectAll(`#MedianfsLG${line.name}`)
						.transition().duration(200)
						.style("opacity", newOpacity)
					d3.selectAll(`#MedianLegendfsLG${line.name}`)
						.transition().duration(200)
						.style("fill", newColor)
					d3.select(`#MedianHfsLG${line.name}`)
						.transition().duration(200)
						.style("display", display)

					// LegendMCheck
					// 	.attr('value', active)
					LegendM
						.style("color", active ? 'rgba(255, 255, 255, 0.3)' : colors[line.color][500])
					LegendMLabel.style("color", active ? 'rgba(255,255,255,0.3)' : '#fff')
					this.setState('MedianfsLG' + line.name, active)
				})
			}

			let Legend = d3.select(`#LegendfsLG${line.name}`)
			let LegendCheck = d3.select(`#LegendCheckboxfsLG${line.name}`)
			let LegendLabel = d3.select(`#LegendLabelfsLG${line.name}`)
			LegendCheck.on('click', () => {
				let active = this.state['LfsLG' + line.name] ? false : true,
					newOpacity = active ? 0 : 1, display = active ? 'none' : undefined
				// Hide or show the elements

				d3.select(`#LfsLG${line.name}`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.selectAll(`#DotsfsLG${line.name}`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.select(`#AreafsLG${line.name}`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.select(`#MAreafsLG${line.name}`)
					.transition().duration(200)
					.style("opacity", newOpacity)
				d3.select(`#HAreafsLG${line.name}`)
					.transition().duration(200)
					.style("display", display)
				// LegendCheck
				// 	.attr('value', active)
				Legend
					.style("color", active ? 'rgba(255,255,255,0.3)' : line.prev ? '#fff' : colors[line.color][500])
				LegendLabel.style("color", active ? 'rgba(255,255,255,0.3)' : '#fff')

				this.setState('LfsLG' + line.name, active)
			})


		})

	}

	generateLines = () => {
		// let period = this.props.period
		let data = this.props.data[this.props.id]
		// data.forEach(d => {
		// 	d.data = d.data.filter(f => moment(f.date).diff(period.from) >= 0)
		// })
		// window.moment = moment
		// window.data = data
		let animArea0 = d3.area()
			.y0(this.height - this.margin.bottom)
			.y1(this.height - this.margin.bottom)
			.x((d) => { return this.x(moment(d.date).valueOf()) })
		data.forEach((line, i) => {
			//#region Generate Line Area
			if (data) {
				if (line.onlyMedian) {
					return
				}
				if (!line.noArea) {
					let defArea = d3.area()
						.x((d) => { return this.x(moment(d.date).valueOf()) })
						// .y0(this.y(((i === 0) || (line.prev) || (!line.smallArea)) ? 0 : min > 1 ? min - 10 : min - 0.1))
						.y0(this.height - this.margin.bottom)
						.y1((d) => { return this.y(d.value) })
					this.svg.append("path")
						.attr('id', 'AreafsLG' + line.name)
						.data([line.data])
						.attr("opacity", this.state['LfsLG' + line.name] ? 0 : 1)
						.attr('fill', line.prev ? 'rgba(255,255,255, 0.1' : hexToRgba(colors[line.color][500], 0.1))
						.attr("d", animArea0)
						.transition()
						.duration(1500)
						.attr("d", defArea)
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
							.attr('id', 'MedianfsLG' + line.name)
							.attr('opacity', this.state[`LfsLG${line.name}`] ? 0 : 1)
							.attr('stroke-dasharray', ("3, 3"))

						// Hidden overlay for Median tooltip
						this.svg.append('path')
							.data([medianData])
							// .attr('class', classes.hiddenMedianLine)
							.attr('stroke', '#fff')
							.attr('opacity', 0)
							.attr('stroke-width', '7px')
							.attr('d', this.valueLine)
							.attr('id', 'HAreafsLG' + line.name)
							.on("mouseover", (d) => {
								if (!this.state[`LfsLG${line.name}`]) {

									medianLine.transition()
										.duration(100)
										.style('stroke-width', '7px')

									medianTooltip.transition()
										.duration(200)
										.style("opacity", 1)
										.style('z-index', 1040)

									medianTooltip.style("left", (d3.event.pageX) - 82 + "px")
										.style("top", (d3.event.pageY) - 41 + "px")

									setMedianTooltip(d[0])
								}

							}).on("mouseout", function () {
								// setExpand(false)
								medianLine.transition()
									.duration(100)
									.style('stroke-width', '4px')
								medianTooltip.transition()
									.duration(500)
									.style('z-index', -1)
									.style("opacity", 0)
							}).on('click', function () {
								// setExpand(true)
							})
					}
				}
				//#endregion
				//#region Generate Line
				if (!line.prev)
					if (line.dashed) {
						//Set up your path as normal
						var path = this.svg.append("path")
							.data([line.data])
							.attr('id', 'LfsLG' + line.name)
							.attr('fill', 'none')
							.attr('stroke', colors[line.color][500])
							.attr('stroke-width', '4px')
							.attr('d', this.valueLine)
							.attr("opacity", this.state['LfsLG' + line.name] ? 0 : 1)

						//Get the total length of the path
						var totalLength = 0
						if (path && path.node())
							totalLength = path.node().getTotalLength()

						/////// Create the required stroke-dasharray to animate a dashed pattern ///////

						//Create a (random) dash pattern
						//The first number specifies the length of the visible part, the dash
						//The second number specifies the length of the invisible part
						var dashing = "6, 6"

						//This returns the length of adding all of the numbers in dashing
						//(the length of one pattern in essence)
						//So for "6,6", for example, that would return 6+6 = 12
						var dashLength =
							dashing
								.split(/[\s,]/)
								.map(function (a) { return parseFloat(a) || 0 })
								.reduce(function (a, b) { return a + b })

						//How many of these dash patterns will fit inside the entire path?
						var dashCount = Math.ceil(totalLength / dashLength)

						//Create an array that holds the pattern as often
						//so it will fill the entire path
						var newDashes = new Array(dashCount).join(dashing + " ")
						//Then add one more dash pattern, namely with a visible part
						//of length 0 (so nothing) and a white part
						//that is the same length as the entire path
						var dashArray = newDashes + " 0, " + totalLength

						/////// END ///////

						//Now offset the entire dash pattern, so only the last white section is
						//visible and then decrease this offset in a transition to show the dashes
						path
							.attr("stroke-dashoffset", totalLength)
							//This is where it differs with the solid line example
							.attr("stroke-dasharray", dashArray)
							.transition().duration(1500)
							.attr("stroke-dashoffset", 0)
					}
					else {

						this.svg.append('path')
							.data([line.data])
							.attr('id', 'LfsLG' + line.name)
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
							.attr("opacity", this.state['LfsLG' + line.name] ? 0 : 1)
							.transition()
							.duration(1500)
							.attr('stroke-dashoffset', 0)
							.transition()
							.duration(100)
							.style("stroke-dasharray", undefined)


						//#endregion
					}
			}
		})
	}

	generateMedian = () => {
		const { setMedianTooltip } = this.props
		const classes = this.classes
		//Median tooltip
		let data = this.props.data[this.props.id]
		var medianTooltip = this.medianTooltip
		data.forEach((line) => {
			if (line.onlyMedian) {
				let medianData = getMedianLineData(line.data)
				let medianLine = this.svg.append('path')
					.data([medianData])
					// .attr('class', classes.medianLine)
					.attr('d', this.valueLine)
					.attr('id', `MedianLfsLG${line.name}`)
					.attr("opacity", this.state['LfsLG' + line.name] ? 0 : 1)
					.attr('stroke-width', '4px')
					.attr('stroke', colors[line.color][500])
					.attr('stroke-dasharray', ("3, 3"))
				// this.svg.append("text")
				// 	.attr("transform", "translate(" + (this.margin.right + 50) + "," + (this.y(line.data[0].value) - 15) + ")")
				// 	.attr("dy", ".35em")
				// 	.attr("text-anchor", "start")
				// 	.attr('style', `font-weight: 500;fill: ${colors[line.color][500]}`)
				// 	// .style("font", "bold")
				// 	// .style("fill", colors[line.color][500])
				// 	.text(this.t(line.label))

				this.svg.append('path')
					.data([medianData])
					.attr('class', classes.hiddenMedianLine)
					.attr('d', this.valueLine)
					.attr('id', `MedianHfsLG${line.name}`)
					.style('display', this.state['MedianfsLG' + line.name] ? 'none' : undefined)
					.on("mouseover", (d) => {
						if (!this.state[`MedianfsLG${line.name}`]) {

							medianLine.transition()
								.duration(100)
								.style('stroke-width', '7px')

							if (line.noTooltip) {

							}
							else {
								medianTooltip.transition()
									.duration(200)
									.style("opacity", 1)
									.style('z-index', 1040)
								medianTooltip.style("left", (d3.event.pageX) - 82 + "px")
									.style("top", (d3.event.pageY) - 41 + "px")

								setMedianTooltip(d[0])
							}
						}

					}).on("mouseout", function () {
						// setExpand(false)
						medianLine.transition()
							.duration(100)
							.style('stroke-width', '4px')
						medianTooltip.transition()
							.duration(500)
							.style('z-index', -1)
							.style("opacity", 0)
					}).on('click', function () {
						// setExpand(true)
					})
			}

			//Median line
			if (line.median & !line.noMedianLegend) {
				let medianData = getMedianLineData(line.data)
				let medianLine = this.svg.append('path')
					.data([medianData])
					// .attr('class', classes.medianLine)
					.attr('d', this.valueLine)
					.attr('id', `MedianLfsLG${line.name}`)
					.attr('opacity', this.state[`MedianfsLG${line.name}`] ? 0 : 1)
					.attr('stroke-width', '4px')
					.attr('stroke', colors[line.color][500])
					.attr('stroke-dasharray', ("3, 3"))

				// Hidden overlay for Median tooltip
				this.svg.append('path')
					.data([medianData])
					.attr('class', classes.hiddenMedianLine)
					.attr('d', this.valueLine)
					.attr('id', `MedianHfsLG${line.name}`)
					.style('display', this.state['MedianfsLG' + line.name] ? 'none' : undefined)
					.on("mouseover", (d) => {
						if (!this.state[`MedianfsLG${line.name}`]) {

							medianLine.transition()
								.duration(100)
								.style('stroke-width', '7px')

							medianTooltip.transition()
								.duration(200)
								.style("opacity", 1)
								.style('z-index', 1040)

							medianTooltip.style("left", (d3.event.pageX) - 82 + "px")
								.style("top", (d3.event.pageY) - 41 + "px")

							setMedianTooltip(d[0])
						}

					}).on("mouseout", function () {
						// setExpand(false)
						medianLine.transition()
							.duration(100)
							.style('stroke-width', '4px')
						medianTooltip.transition()
							.duration(500)
							.style('z-index', -1)
							.style("opacity", 0)
					}).on('click', function () {
						// setExpand(true)
					})
			}
		})

	}
	destroy = () => {
		// this.svg.remove()
		this.svg.selectAll("*").remove()
	}

}
window.d3 = d3
export default d3LineFS