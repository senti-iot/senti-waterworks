import React, { useRef, useEffect, useState } from 'react'
import { /* lineData,  */prevLineData, generateData } from './demoData'
// import * as d3 from 'd3'
import { makeStyles } from '@material-ui/styles'
import { T } from 'Components'
import { /* Collapse, */ colors, Paper } from '@material-ui/core'
import hexToRgba from 'hex-to-rgba'
import moment from 'moment'
import d3Line from './classes/d3Line'
import { usePrevious } from 'Hooks'
// const _ = require('lodash')

// const isWeekend = (date) => {
// 	return moment(date, 'YYYY-MM-DD HH:mm:ss').day() === 6 || moment(date).day() === 0 ? true : false
// }

const lineStyles = makeStyles(theme => ({
	axis: {
		stroke: 'none'
	},
	axisText: {
		fill: 'currentColor',
		fontWeight: 600,
		fontSize: '1rem'
	},
	axisTick: {
		fill: 'currentColor',
		fontWeight: 600,
		fontSize: '0.75rem'
	},
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


let line = null

const LineGraph = (props) => {
	let lineData = useRef(generateData())
	const lineChartContainer = useRef(null)
	const classes = lineStyles()
	const [value, setValue] = useState({ nps: null, date: null })
	const [medianValue, setMedianValue] = useState({ nps: null, date: null })
	const prevId = usePrevious(props.id)
	// const [expand, setExpand] = useState(false)
	// const [width, setWidth] = useState(900);
	// const [height, setHeight] = useState(600);

	useEffect(() => {
		if ((props.id !== prevId) && line) {
			lineData.current = generateData()
			line.destroy()
			line = new d3Line(lineChartContainer.current, {
				id: props.id,
				lineData: lineData.current, prevLineData: prevLineData, setTooltip: setValue,
				setMedianTooltip: setMedianValue
			}, classes);

		}
	}, [classes, prevId, props.id])
	useEffect(() => {
		if ((lineChartContainer.current && !line)) {
			lineData.current = generateData()
			line = new d3Line(lineChartContainer.current, {
				id: props.id,
				lineData: lineData.current, prevLineData: prevLineData, setTooltip: setValue,
				setMedianTooltip: setMedianValue
			}, classes);

		}
	}, [classes, lineData, prevId, props.id]);
	useEffect(() => {
		let resizeTimer;
		const handleResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function () {
				line.destroy()
				line = new d3Line(lineChartContainer.current, {
					id: props.id,
					lineData: lineData.current, prevLineData: prevLineData, setTooltip: setValue,
					setMedianTooltip: setMedianValue
				}, classes);
				// setWidth(lineChartContainer.current.clientWidth);
				// setHeight(lineChartContainer.current.clientHeight);
			}, 300);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [classes, lineData, props.id]);

	return (
		<div style={{ width: '100%', height: '100%', }}>
			<Paper id={props.id + 'tooltip'} style={{ width: '200px', height: '200px' }}>
				<T>
					{` ${moment(value.date).format('LLL')} ${value.nps} `}
				</T>
			</Paper>
			<Paper id={props.id + 'medianTooltip'}>
				<T>
					{` ${medianValue.nps} `}
				</T>
			</Paper>
			<div id={props.id} ref={lineChartContainer} style={{ width: '100%', height: '100%', minHeight: 600, maxHeight: 600 }}></div>
		</div>
	)
}

export default LineGraph
