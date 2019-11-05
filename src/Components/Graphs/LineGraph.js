import React, { useRef, useEffect, useState } from 'react'
import d3Line from './classes/d3Line'
import { usePrevious, useSelector, useLocalization } from 'Hooks'
import Tooltip from './Tooltip'
import lineStyles from 'Components/Custom/Styles/lineGraphStyles'
import MedianTooltip from './MedianTooltip'
import Legend from './Legend'

let line = null

const LineGraph = (props) => {
	const lineChartContainer = useRef(null)
	// const loading = useRef(false)
	const [value, setValue] = useState({ value: null, date: null })
	const [medianValue, setMedianValue] = useState({ value: null, date: null })
	const deviceData = useSelector(s => s.data.deviceData)

	const t = useLocalization()

	const period = useSelector(s => s.dateTime.period)
	const prevId = usePrevious(props.id)
	const classes = lineStyles({ id: props.id })


	useEffect(() => {
		const genNewLine = () => {
			let cProps = {
				id: props.id,
				data: deviceData,
				setTooltip: setValue,
				setMedianTooltip: setMedianValue,
				period: period,
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
	}, [classes, prevId, props.id, deviceData, t, period])

	return (

		<div style={{ width: '100%', height: '100%'/* , minHeight: 300 */ }}>
			<Tooltip tooltip={value} id={props.id} />
			<MedianTooltip tooltip={medianValue} id={props.id} />
			<div id={props.id} ref={lineChartContainer}
				style={{
					width: '100%',
					height: '90%',
					// minHeight: 500
				}}>

			</div>
			<Legend id={props.id} data={deviceData} />
		</div>
	)
}

export default LineGraph
