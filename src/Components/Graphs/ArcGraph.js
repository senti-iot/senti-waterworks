import React, { useRef, useEffect } from 'react'
import d3Arc from './classes/d3Arc'
import { usePrevious, useSelector, useLocalization } from 'Hooks'
import arcStyles, { TextContainer, ArcContainer, Arc, TotalUsageText, DataText } from 'Components/Custom/Styles/arcGraphStyles'
import { formatShortNumber } from 'data/functions'

let arc = null


const ArcGraph = (props) => {
	//Hooks
	const t = useLocalization()

	//Redux
	const arcData = useSelector(s => s.arcData.current)
	const arcPrevData = useSelector(s => s.arcData.previous)
	console.log(arcData, arcPrevData)
	// const arcData = useSelector(s => s.data.middleChartData.current)
	// const arcPrevData = useSelector(s => s.data.middleChartData.previous)
	const period = useSelector(s => s.dateTime.period)
	const mUnit = useSelector(s => s.settings.mUnit)
	const colorTheme = useSelector((state) => state.settings.colorTheme)

	//State

	//Const
	const classes = arcStyles({ color: colorTheme })

	//Refs
	const arcChartContainer = useRef(null)

	//useCallbacks

	//useEffects

	//Handlers

	// const [arcData, setArcData] = useState(generateArcData())


	const unit = () => {
		switch (props.chart) {
			case 'waterusage':
				return mUnit === 'm3' ? 'm³' : 'L'
			// case 'temperature':
			// 	return '\u2103'
			// case 'waterflow':
			// 	return 'L'
			// case 'readings':
			// 	return 'm3'
			default:
				return 'm³'
		}
	}

	const prevId = usePrevious(props.id)
	// useWhyDidYouUpdate('props', props)
	// useWhyDidYouUpdate('state', { arcData: arcData.toString() })
	useEffect(() => {
		const genNewArc = () => {
			let arcProps = {
				id: props.id,
				arcData: arcData,
				arcPrevData: arcPrevData,
				t: t,
				classes: classes
			}
			arc = new d3Arc(arcChartContainer.current, arcProps)
		}
		if (arc) {
			arc.destroy()
			genNewArc()
		}
		//eslint-disable-next-line
	}, [])

	useEffect(() => {
		const genNewArc = () => {
			let arcProps = {
				id: props.id,
				arcData: arcData,
				arcPrevData: arcPrevData,
				t: t,
				classes: classes
			}
			arc = new d3Arc(arcChartContainer.current, arcProps)
		}
		if ((arcChartContainer.current && !arc)) {
			genNewArc()
		}
		let resizeTimer
		const handleResize = () => {
			clearTimeout(resizeTimer)
			resizeTimer = setTimeout(() => {
				arc.destroy()
				genNewArc()
			}, 300)
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}

	}, [arcData, arcPrevData, classes, prevId, props.id, t])

	const displayTime = () => {
		switch (period.timeType) {
			case 1:
				return t('filters.dateOptions.thisWeek')
			case 2:
				return t('filters.dateOptions.7days')
			case 3:
				return t('filters.dateOptions.monthToDate')
			case 4:
				return t('filters.dateOptions.yearToDate')
			default:
				break
		}
	}
	return (
		<ArcContainer>

			<TotalUsageText variant={'h5'}>{period.from && period.to ? displayTime() : null}</TotalUsageText>
			<Arc id={props.id} ref={arcChartContainer}>
				<TextContainer >
					<DataText title={arcData} variant='h5'>{`${formatShortNumber(arcData)} ${unit()}`}</DataText>
					<DataText title={arcPrevData} variant='h5' prev>{`(${formatShortNumber(arcPrevData)} ${unit()})`}</DataText>
				</TextContainer>
			</Arc>
		</ArcContainer>

	)
}

export default ArcGraph
