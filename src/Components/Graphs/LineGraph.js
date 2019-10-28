import React, { useRef, useEffect, useState, useCallback } from 'react'
import { T } from 'Components'
import { /* Collapse, */ Paper } from '@material-ui/core'
import d3Line from './classes/d3Line'
import { usePrevious, useSelector, useLocalization } from 'Hooks'
import Tooltip from './Tooltip'
import lineStyles from 'Components/Custom/Styles/lineGraphStyles'

let line = null

const LineGraph = (props) => {
	const lineChartContainer = useRef(null)
	const t = useLocalization()
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
	}, [deviceData, props.id])
	const selectSecondData = useCallback(() => {
		switch (props.id) {
			case 'temperature':
				return deviceData.temperature.ambient
			case 'waterflow':
				return deviceData.waterFlow.maxFlow
			default:
				return [];
		}
	}, [deviceData, props.id])
	useEffect(() => {
		const genNewLine = () => {
			let cProps = {
				id: props.id,
				data: deviceData,
				setTooltip: setValue,
				setMedianTooltip: setMedianValue,
				t: t
			}
			line = new d3Line(lineChartContainer.current, cProps, classes);
		}
		if ((props.id !== prevId) && line) {
			line.destroy()
			genNewLine()
		}
		if ((lineChartContainer.current && !line)) {
			genNewLine()
		}
		let resizeTimer;
		const handleResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function () {
				line.destroy()
				genNewLine()
			}, 300);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [classes, prevId, props.id, selectData, selectSecondData, deviceData, t])

	return (
		<div style={{ width: '100%', height: '100%', }}>
			<Tooltip tooltip={value} id={props.id} />
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
