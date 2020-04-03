import React, { useRef, useState, useLayoutEffect } from 'react'
import d3Line from './classes/d3Line'
import { usePrevious, useSelector, useLocalization } from 'Hooks'
import Tooltip from './Tooltip'
import lineStyles from 'Components/Custom/Styles/lineGraphStyles'
import MedianTooltip from './MedianTooltip'
import Legend from './Legend'
import CircularLoader from 'Components/Loaders/CircularLoader'
import d3LineFS from 'Components/Graphs/classes/d3LineFullScreen'

let line = null

const LineGraph = (props) => {
	//Hooks
	const t = useLocalization()
	const classes = lineStyles()

	//Redux
	const deviceData = useSelector(s => s.data.deviceData)
	const weatherData = useSelector(s => s.data.weatherData)
	const period = useSelector(s => s.dateTime.period)
	const mUnit = useSelector(s => s.settings.mUnit)
	const fsLG = useSelector(s => s.appState.fullScreenLineChart)

	//State
	const lineChartContainer = useRef(React.createRef())
	const [value, setValue] = useState({ value: null, date: null })
	const [medianValue, setMedianValue] = useState({ value: null, date: null })

	//usePrevious
	const prevId = usePrevious(props.id)
	let prevData = usePrevious(deviceData)
	let prevLoading = usePrevious(props.loading)

	//Const

	//useCallbacks

	//useEffects

	useLayoutEffect(() => {
		const unitType = () => {
			switch (props.id) {
				case 'waterusage':
					return mUnit === 'm3' ? 'm³' : 'L'
				case 'temperature':
					return '°C'
				case 'waterflow':
					return 'l/t'
				case 'readings':
					return 'm³'
				default:
					break
			}
		}
		const genNewLine = () => {
			let cProps = {
				unit: unitType(),
				id: props.id,
				data: deviceData,
				setTooltip: setValue,
				setMedianTooltip: setMedianValue,
				period: period,
				t: t,
				weatherData: weatherData,
				fsLG: props.fullScreen
			}
			line = props.fullScreen ? new d3LineFS(lineChartContainer.current, cProps, classes) : new d3Line(lineChartContainer.current, cProps, classes)

		}
		if ((props.id !== prevId) && line) {
			line.destroy()
			genNewLine()
		}
		if ((lineChartContainer.current && !line && !props.loading) || ((prevLoading !== props.loading) && !props.loading)) {
			// line.destroy()
			genNewLine()
			// line.destroy()
			// genNewLine()
			// setTimeout(() => {

			// }, 100);
			// clearTimeout(debounce)
		}
		if ((fsLG && props.fullScreen && lineChartContainer.current) && line) {
			line.destroy()
			genNewLine()
		}
		// if (prevData !== deviceData) {
		// 	line.destroy()
		// 	genNewLine()
		// }
		let resizeTimer
		const handleResize = () => {
			clearTimeout(resizeTimer)
			resizeTimer = setTimeout(() => {
				if (line) {
					line.destroy()
				}
				genNewLine()
			}, 300)
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
			// line.destroy()
			// line = null
		}
	}, [classes, prevId, props.id, deviceData, t, period, prevData, props.loading, prevLoading, weatherData, mUnit, fsLG, props.fullScreen])

	//Handlers

	return (
		props.loading ? <CircularLoader fill /> :
			<div style={{ width: '100%', height: '100%'/* , minHeight: 300 */ }}>
				<Tooltip fs={props.fullScreen} tooltip={value} id={props.id} unit={mUnit} />
				<MedianTooltip fullScreen={props.fullScreen} tooltip={medianValue} id={props.id} unit={mUnit} />
				<svg id={props.fullScreen ? props.id + 'fsLG' : props.id} ref={lineChartContainer}
					style={{
						width: '100%',
						height: '90%',
						// minHeight: 500
					}}>

				</svg>
				<Legend fullScreen={props.fullScreen} id={props.id} data={deviceData} />
			</div>
	)
}

export default LineGraph
