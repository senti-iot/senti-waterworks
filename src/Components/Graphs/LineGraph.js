import React, { useRef, useState, useEffect } from 'react'
import d3Line from './classes/d3Line'
import { usePrevious, useSelector, useLocalization, useDispatch } from 'Hooks'
import Tooltip from './Tooltip'
import lineStyles from 'Components/Custom/Styles/lineGraphStyles'
import MedianTooltip from './MedianTooltip'
import Legend from './Legend'
import CircularLoader from 'Components/Loaders/CircularLoader'
import d3LineFS from 'Components/Graphs/classes/d3LineFullScreen'
import { setGraphLine, setGraphLines } from 'Redux/appState'
import { useCallback } from 'react'

let line = null

const LineGraph = (props) => {
	console.log(line)
	//Hooks
	const t = useLocalization()
	const classes = lineStyles()
	const dispatch = useDispatch()
	//Redux
	const deviceData = useSelector(s => s.lineData)
	const weatherData = useSelector(s => s.data.weatherData)
	const period = useSelector(s => s.dateTime.period)
	const mUnit = useSelector(s => s.settings.mUnit)
	const fsLG = useSelector(s => s.appState.fullScreenLineChart)
	const graphLines = useSelector(s => s.appState.lines)
	//State
	const lineChartContainer = useRef(React.createRef())
	const [value, setValue] = useState({ value: null, date: null })
	const [medianValue, setMedianValue] = useState({ value: null, date: null })

	//usePrevious
	const prevId = usePrevious(props.id)
	let prevData = usePrevious(deviceData)
	let prevLoading = usePrevious(props.loading)
	let prevFullScreen = usePrevious(fsLG)
	//Const

	//useCallbacks

	//useEffects
	const setLines = useCallback((lineState) => {
		dispatch(setGraphLines(lineState))
	}, [dispatch])
	const setLine = useCallback((id, value) => {
		dispatch(setGraphLine(id, value))
	}, [dispatch])

	useEffect(() => {

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
			/**
		 * Generate state in redux
		 * */
			let lineState = {}
			if (deviceData[props.id] &&
				(Object.keys(graphLines).length === 0 || Object.keys(graphLines).length !== Object.keys(lineState).length)) {

				deviceData[props.id].forEach(line => {
					if (!line.noMedianLegend && line.median) {
						lineState['Median' + line.name] = true
						lineState['L' + line.name] = line.hidden ? true : false
						lineState['MedianfsLG' + line.name] = line.hidden ? true : false
						lineState['LfsLG' + line.name] = line.hidden ? true : false
						// this.setState('Median' + line.name, true)
						// this.setState('L' + line.name, line.hidden ? true : false)
					}
					else {
						lineState['L' + line.name] = line.hidden ? true : false
						lineState['LfsLG' + line.name] = line.hidden ? true : false
						// this.setState('L' + line.name, line.hidden ? true : false)
					}
				})
				setLines(lineState)
			}
			let cProps = {
				unit: unitType(),
				id: props.id,
				data: deviceData,
				setLine: setLine,
				setTooltip: setValue,
				setMedianTooltip: setMedianValue,
				period: period,
				t: t,
				weatherData: weatherData,
				fsLG: props.fullScreen
			}
			if (props.fullScreen) {
				line = new d3LineFS(lineChartContainer.current, cProps, classes)
			}
			else {
				line = new d3Line(lineChartContainer.current, cProps, classes)
			}


		}

		if ((props.id !== prevId) && line && lineChartContainer.current) {
			// line.destroy()
			genNewLine()
		}
		if ((lineChartContainer.current && !line && !props.loading) || ((prevLoading !== props.loading) && !props.loading)) {
			genNewLine()
		}

		let resizeTimer
		const handleResize = () => {
			clearTimeout(resizeTimer)
			resizeTimer = setTimeout(() => {

				// if (line) {
				// 	line.destroy()
				// }
				genNewLine()
			}, 300)
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
			// line = null
			// setLines({})
		}

	}, [classes, setLine, prevId, props.id, deviceData, t, period, prevData, props.loading, prevLoading, weatherData, mUnit, fsLG, graphLines, setLines, prevFullScreen, props.fullScreen])

	//Handlers

	return (
		props.loading ? <CircularLoader fill /> :
			<div style={{ width: '100%', height: '100%' }}>
				<Tooltip fs={props.fullScreen} tooltip={value} id={props.id} unit={mUnit} />
				<MedianTooltip fs={props.fullScreen} tooltip={medianValue} id={props.id} unit={mUnit} />
				<svg id={props.fullScreen ? props.id + 'fsLG' : props.id} ref={lineChartContainer}
					style={{
						width: '100%',
						height: '90%',
						minHeight: 300
					}}>

				</svg>
				<Legend graphLines={graphLines} fullScreen={props.fullScreen} id={props.id} data={deviceData} />
			</div>
	)
}

export default LineGraph
