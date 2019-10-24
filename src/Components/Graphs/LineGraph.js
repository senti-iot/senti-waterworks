import React, { useRef, useEffect, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import { T } from 'Components'
import { /* Collapse, */ colors, Paper } from '@material-ui/core'
import hexToRgba from 'hex-to-rgba'
import moment from 'moment'
import d3Line from './classes/d3Line'
import { usePrevious, useSelector } from 'Hooks'

const selectSecondType = chId => {
	switch (chId) {
		case 'waterusage':
			return 'waterUsageLine'
		case 'temperature':
			return 'ambientTempLine'
		case 'waterflow':
			return 'maxFlowLine'
		case 'readings':
			return 'readingLine'
		default:
			break;
	}
}
const selectType = chId => {
	switch (chId) {
		case 'waterusage':
			return 'waterUsageLine'
		case 'temperature':
			return 'waterTempLine'
		case 'waterflow':
			return 'minFlowLine'
		case 'readings':
			return 'readingLine'
		default:
			break;
	}
}
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
		stroke: props => theme.chart[selectType(props.id)],
		strokeWidth: '3px'
	},
	medianLine: {
		fill: 'none',
		stroke: theme.chart.medianLine,
		strokeWidth: '3px'
	},
	line: {
		fill: 'none',
		stroke: props => theme.chart[selectType(props.id)],
		strokeWidth: '3px'
	},
	secondLine: {
		fill: 'none',
		stroke: props => theme.chart[selectSecondType(props.id)],
		strokeWidth: '3px'
	},
	line2: {
		fill: 'rgba(255,255,255, 0.1)',
	},
	dot: {
		fill: props => theme.chart[selectType(props.id)],
	},
	secondaryDot: {
		fill: props => theme.chart[selectSecondType(props.id)],
	},
	dotLabel: {
		fill: colors['orange'][500],
	},
	tooltip: {
		position: "absolute",
		textAlign: "center",
		width: '200px',
		height: '200px',
		// background: theme.palette.type === 'light' ? '#eee' : '#424242',
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
		// background: theme.palette.type === 'light' ? '#eee' : '#424242',
		border: 0,
		borderRadius: 4,
		zIndex: -1,
		transition: '300ms all ease'
	},
	area: {
		fill: ({ id }) => hexToRgba(theme.chart[selectType(id)], 0.1),
	},
	secondaryArea: {
		fill: ({ id }) => hexToRgba(theme.chart[selectSecondType(id)], 0.1),

	}
}))


let line = null
const secondLineSwitch = (chId) => {
	switch (chId) {
		case 'waterusage':
			return false;
		case 'waterflow':
			return true
		case 'temperature':
			return true
		case 'reading':
			return false
		default:
			return false
	}
}
const LineGraph = (props) => {
	const lineChartContainer = useRef(null)
	const classes = lineStyles({ id: props.id })
	const [value, setValue] = useState({ value: null, date: null })
	const [medianValue, setMedianValue] = useState({ value: null, date: null })
	const prevId = usePrevious(props.id)
	// const [expand, setExpand] = useState(false)
	// const [width, setWidth] = useState(900);
	// const [height, setHeight] = useState(600);
	const deviceData = useSelector(s => s.data.deviceData)
	const selectData = useCallback(() => {
		switch (props.id) {
			case 'waterusage':
				return deviceData.waterUsage;
			case 'waterflow':
				return deviceData.waterFlow.minFlow
			case 'temperature':
				return deviceData.temperature.water
			case 'reading':
				return []

			default:
				break;
		}
	}, [deviceData.temperature.water, deviceData.waterFlow.minFlow, deviceData.waterUsage, props.id])
	const selectSecondData = useCallback(() => {
		switch (props.id) {
			case 'temperature':
				return deviceData.temperature.ambient
			case 'waterflow':
				return deviceData.waterFlow.maxFlow
			default:
				return [];
		}
	}, [deviceData.temperature.ambient, deviceData.waterFlow.maxFlow, props.id])
	useEffect(() => {
		if ((props.id !== prevId) && line) {
			line.destroy()
			let cProps = {
				id: props.id,
				lineData: selectData(),
				prevLineData: [],
				setTooltip: setValue,
				secondaryLineData: selectSecondData(),
				secondaryLine: secondLineSwitch(props.id),
				secondaryLinePrevData: [],
				setMedianTooltip: setMedianValue
			}
			line = new d3Line(lineChartContainer.current, cProps, classes);

		}
	}, [classes, prevId, props.id, selectData, selectSecondData])
	useEffect(() => {
		if ((lineChartContainer.current && !line)) {
			line = new d3Line(lineChartContainer.current, {
				id: props.id,
				lineData: selectData(),
				prevLineData: [],
				setTooltip: setValue,
				secondaryLineData: selectSecondData(),
				secondaryLine: secondLineSwitch(props.id),
				secondaryLinePrevData: [],
				setMedianTooltip: setMedianValue
			}, classes);

		}
	}, [classes, prevId, props.id, selectData, selectSecondData]);
	useEffect(() => {
		let resizeTimer;
		const handleResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function () {
				line.destroy()
				line = new d3Line(lineChartContainer.current, {
					id: props.id,
					lineData: selectData(),
					prevLineData: [],
					setTooltip: setValue,
					secondaryLineData: selectSecondData(),
					secondaryLine: secondLineSwitch(props.id),
					secondaryLinePrevData: [],
					setMedianTooltip: setMedianValue
				}, classes);
			}, 300);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [classes, props.id, selectData, selectSecondData]);

	return (
		<div style={{ width: '100%', height: '100%', }}>
			<Paper id={props.id + 'tooltip'} style={{ width: '200px', height: '200px' }}>
				<T>
					{` ${moment(value.date).format('LLL')} ${value.value} `}
				</T>
			</Paper>
			<Paper id={props.id + 'medianTooltip'}>
				<T>
					{` ${medianValue.value} `}
				</T>
			</Paper>
			<div id={props.id} ref={lineChartContainer} style={{ width: '100%', height: '100%', minHeight: 600, maxHeight: 600 }}></div>
		</div>
	)
}

export default LineGraph
