import React, { useRef, useEffect } from 'react'
import { generateArcData } from './demoData'
import { makeStyles } from '@material-ui/styles'
import { colors } from '@material-ui/core'
import d3Arc from './classes/d3Arc'
import { usePrevious, useSelector, useLocalization } from 'Hooks'
import { T } from 'Components'

const arcStyles = makeStyles(theme => ({
	arc: {
		transform: 'translate(-50%, -50%) rotate(180deg)',
		transformOrigin: 'center'
	},
	innerArc: {
		fill: 'rgba(255,255,255, 0.1)'
	},
	outerArc: {
		// fill: props => colors[props.color][600]
	},
	outerArcG: {
		fill: colors['green'][500]
	},
	outerArcR: {
		fill: colors['red'][500]
	},
	label: {

	},
	textContainer: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		// top: 0,
		// left: 0,
		transformOrigin: 'center',
		transform: 'translate(-50%, -50%)',
		display: 'flex',
		flexFlow: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	prevText: {
		color: 'rgba(255,255,255, 0.5)'
	},
	totalUsage: {
		marginLeft: 16, marginTop: 16, fontWeight: 600, letterSpacing: 1, height: 32
	},
	totalUsageM: {
		marginLeft: 16, marginBottom: 16, height: 32
	},
}))

let arc = null
function formatNumber(num) {
	return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
const ArcGraph = (props) => {
	const t = useLocalization()
	let arcData = useRef(generateArcData())
	// let arcData = useRef(900)
	let arcPrevData = useRef(generateArcData())
	// let arcPrevData = useRef(1000)
	const arcChartContainer = useRef(null)
	const colorTheme = useSelector((state) => state.settings.colorTheme)
	const classes = arcStyles({ color: colorTheme })
	const period = 'month'
	const unit = () => {
		switch (props.chart) {
			case 'waterusage':
				return 'm3'
			case 'temperature':
				return '\u2103'
			case 'waterflow':
				return 'L'
			case 'readings':
				return 'm3'
			default:
				break;
		}
	}
	const prevId = usePrevious(props.id)

	useEffect(() => {
		if ((props.id !== prevId) && arc) {
			arcData.current = generateArcData()
			arc.destroy()
			arc = new d3Arc(arcChartContainer.current, {
				id: props.id,
				arcData: arcData.current, arcPrevData: arcPrevData.current, /* setTooltip: setValue,
				setMedianTooltip: setMedianValue */
			}, classes);

		}
	}, [classes, prevId, props.id])
	useEffect(() => {
		if ((arcChartContainer.current && !arc)) {
			arcData.current = generateArcData()
			arc = new d3Arc(arcChartContainer.current, {
				id: props.id,
				arcData: arcData.current, arcPrevData: arcPrevData.current, /* setTooltip: setValue,
				setMedianTooltip: setMedianValue */
			}, classes);

		}
	}, [classes, arcData, prevId, props.id]);
	useEffect(() => {
		let resizeTimer;
		const handleResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function () {
				arc.destroy()
				arc = new d3Arc(arcChartContainer.current, {
					id: props.id,
					arcData: arcData.current, arcPrevData: arcPrevData.current, /*  setTooltip: setValue,
					setMedianTooltip: setMedianValue */
				}, classes);
				// setWidth(arcChartContainer.current.clientWidth);
				// setHeight(arcChartContainer.current.clientHeight);
			}, 300);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [classes, arcData, props.id]);

	return (
		<div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-between', height: '100%', width: '100%' }}>

			{/* // <div style={{ width: 'calc(100% - ', height: '100%', position: 'relative' }}> */}
			<T variant={'h5'} className={classes.totalUsage} style={{}}>{t('charts.totalUsage')}</T>
			<div id={props.id} ref={arcChartContainer} style={{ width: '100%', height: '100%', /* minHeight: 250, */ position: 'relative' }} >
				<div className={classes.textContainer}>
					<T>{t(`charts.periods.${period}`)}</T>
					<T variant='h5'>{`${formatNumber(arcData.current)} ${unit()}`}</T>
					<T variant='h5' className={classes.prevText}>{`/${formatNumber(arcPrevData.current)} ${unit()}`}</T>
				</div>
			</div>
			<T className={classes.totalUsageM}>{arcData.current > arcPrevData.current ? t('charts.totalUsageMessages.more') : t('charts.totalUsageMessages.less')}</T>
		</div>

	)
}

export default ArcGraph
