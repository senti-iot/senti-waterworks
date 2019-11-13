import React, { useRef, useEffect, useState } from 'react'
import d3Line from './classes/d3Line'
import { usePrevious, useSelector, useLocalization } from 'Hooks'
import Tooltip from './Tooltip'
import lineStyles from 'Components/Custom/Styles/lineGraphStyles'
import MedianTooltip from './MedianTooltip'
import Legend from './Legend'
import CircularLoader from 'Components/Loaders/CircularLoader'

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
	let prevData = usePrevious(deviceData)
	const classes = lineStyles({ id: props.id })
	let prevLoading = usePrevious(props.loading)
	// useEffect(() => {
	// 	const unitType = () => {
	// 		switch (props.id) {
	// 			case 'waterusage':
	// 				return 'm³'
	// 			case 'temperature':
	// 				return '°C'
	// 			case 'waterflow':
	// 				return 'm³/t'
	// 			case 'reading':
	// 				return 'm³'
	// 			default:
	// 				break;
	// 		}
	// 	}
	// 	const genNewLine = () => {
	// 		if (period.from && period.to && deviceData && lineChartContainer.current) {
	// 			let cProps = {
	// 				unit: unitType(),
	// 				id: props.id,
	// 				data: deviceData,
	// 				setTooltip: setValue,
	// 				setMedianTooltip: setMedianValue,
	// 				period: period,
	// 				t: t
	// 			}
	// 			console.log(lineChartContainer.current.clientWidth)
	// 			line = new d3Line(lineChartContainer.current, cProps, classes);
	// 		}
	// 	}
	// 	if (line) {
	// 		line.destroy()
	// 	}
	// 	genNewLine()
	// 	return () => {

	// 	};
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	useEffect(() => {
		const unitType = () => {
			switch (props.id) {
				case 'waterusage':
					return 'm³'
				case 'temperature':
					return '°C'
				case 'waterflow':
					return 'm³/t'
				case 'reading':
					return 'm³'
				default:
					break;
			}
		}
		const genNewLine = () => {
			console.log('generateNewLine', lineChartContainer.current)
			let cProps = {
				unit: unitType(),
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
		if ((lineChartContainer.current && !line && !props.loading) || ((prevLoading !== props.loading) && !props.loading)) {
			// line.destroy()
			genNewLine()
		}
		// if (prevData !== deviceData) {
		// 	line.destroy()
		// 	genNewLine()
		// }
		let resizeTimer;
		const handleResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				line.destroy()
				genNewLine()
			}, 300);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
			// line.destroy()
			// line = null
		};
	}, [classes, prevId, props.id, deviceData, t, period, prevData, props.loading, prevLoading])

	return (
		props.loading ? <CircularLoader /> :
			<div style={{ width: '100%', height: '100%'/* , minHeight: 300 */ }}>
				<Tooltip tooltip={value} id={props.id} />
				<MedianTooltip tooltip={medianValue} id={props.id} />
				<svg id={props.id} ref={lineChartContainer}
					style={{
						width: '100%',
						height: '85%',
						// minHeight: 500
					}}>

				</svg>
				<Legend id={props.id} data={deviceData} />
			</div>
	)
}
LineGraph.whyDidYouUpdate = true
export default LineGraph
