import React from 'react'
import LineGraph from 'Components/Graphs/LineGraph'
import { T } from 'Components'

const ChartWrapper = (props) => {
	return (
		<div style={{ width: '100%', height: '100%', minHeight: '600px' }}>
			<T>{props.id}</T>
			<LineGraph id={props.chart} />
		</div>
	)
}

export default ChartWrapper
