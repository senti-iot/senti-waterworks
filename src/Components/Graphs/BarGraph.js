import React, { useRef, useEffect, useCallback } from 'react'
import d3Bar from './classes/d3Bar'
import { useEventListener, useLocalization } from 'Hooks'

import ItemG from 'Components/Containers/ItemG'
import useBarStyles from 'Components/Custom/Styles/barStyles'
import BarLegend from 'Components/Graphs/BarLegend'
let bars = null



const BarGraph = props => {
	//Hooks
	const classes = useBarStyles()
	const barsChartContainer = useRef(null)
	const t = useLocalization()
	//Redux

	//State

	//Const
	const { chart } = props
	const barsData = [
		{ className: classes.A, type: t(`chartTable.${chart}.line1`), value: 100, unit: 'm³' },
		{ className: classes.B, type: t(`chartTable.${chart}.line2`), value: 200, unit: 'm³' },
		{ className: classes.C, type: t(`chartTable.${chart}.line3`), value: 50, unit: 'm³' },
		{ className: classes.D, type: t(`chartTable.${chart}.line4`), value: 400, unit: 'm³' }
	]
	//useCallbacks
	const handleRedraw = useCallback(
		() => {
			if (bars) {
				bars.destroy()
				bars.draw()
				bars.generateXAxis()
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
			}
			// draw()
			if (bars) {
				bars.destroy()
			}
			else {
				bars = new d3Bar(barsChartContainer.current, barProps)
			}
		}
		if (!bars)
			genNewBar()
		return () => {
			if (bars) {
				bars.destroy()
			}
			bars = null
		}

	}, [barsData, classes])
	//Handlers

	return (
		<ItemG container style={{ width: '100%', height: '100%' }} >
			<div style={{ height: 75, width: '100%' }}><BarLegend data={barsData} /></div>
			<div style={{ width: '100%', height: 'calc(100% - 75px)' }} id={"bars"} ref={barsChartContainer} />
		</ItemG>
	)
}

export default BarGraph
