import React, { useRef, useEffect, useCallback } from 'react'
import d3Bar from './classes/d3Bar'
import { useEventListener } from 'Hooks'

import ItemG from 'Components/Containers/ItemG'
import useBarStyles from 'Components/Custom/Styles/barStyles'
let bars = null



const BarGraph = () => {
	//Hooks
	const classes = useBarStyles()
	const barsChartContainer = useRef(null)
	//Redux

	//State

	//Const
	const barsData = [
		{ letter: "A", value: 100 },
		{ letter: "B", value: 200 },
		{ letter: "C", value: 50 },
		{ letter: "D", value: 400 }
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
			<div style={{ height: 75 }}>Legend</div>
			<div style={{ width: '100%', height: 'calc(100% - 75px)' }} id={"bars"} ref={barsChartContainer} />
		</ItemG>
	)
}

export default BarGraph
