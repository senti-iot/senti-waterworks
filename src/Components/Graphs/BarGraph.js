import React, { useRef, useEffect, useCallback } from 'react'
import d3Bar from './classes/d3Bar'
import { useEventListener, useLocalization, useSelector } from 'Hooks'

import ItemG from 'Components/Containers/ItemG'
import useBarStyles from 'Components/Custom/Styles/barStyles'
import BarLegend from 'Components/Graphs/BarLegend'
import CircularLoader from 'Components/Loaders/CircularLoader'
let bars = null



const BarGraph = props => {
	//Hooks
	const classes = useBarStyles()
	const barsChartContainer = useRef(React.createRef())
	const t = useLocalization()

	//Const
	const { chart, loading } = props

	//Redux
	const barsData = useSelector(s => [...(s.data.barData ? s.data.barData[chart].map(d => ({
		className: classes[d ? d.className : ''],
		type: t(d.type),
		value: d.value,
		unit: d.unit
	})) : [])])
	//State

	//useCallbacks
	const handleRedraw = useCallback(
		() => {
			if (bars) {
				setTimeout(() => {
					bars.destroy()
					bars.draw(barsChartContainer.current)
				}, 300)
			}
		},
		[],
	)
	//useEventListener
	useEventListener('resize', handleRedraw)
	//useEffects
	useEffect(() => {
		const genNewBar = () => {

			let barProps = {
				barsData: barsData,
				classes: classes,
				id: 'bars',
				t: t
			}
			// draw()
			if (bars) {
				bars.destroy()
			}
			else {
				bars = new d3Bar(barsChartContainer.current, barProps)
			}
		}
		if (!bars && !props.loading)
			genNewBar()
		else {
			if (bars && !props.loading) {
				bars.destroy()
				bars.draw(barsChartContainer.current)
			}
		}
		return () => {
			if (bars) {
				bars.destroy()
			}
			bars = null
		}

	}, [barsData, classes, props.loading, t])
	//Handlers

	return (
		loading ? <CircularLoader fill /> : <ItemG container style={{ width: '100%', height: '100%' }} >
			<div style={{ height: 75, width: '100%' }}><BarLegend data={barsData} /></div>
			<div style={{ width: '100%', height: 'calc(100% - 100px)' }} id={"bars"} ref={barsChartContainer} />
		</ItemG>
	)
}

export default BarGraph
