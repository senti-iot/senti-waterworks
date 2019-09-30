import React, { useState } from 'react'
import { /* GridContainer, */ ItemG } from 'Components'
import ChartsButton from '../ChartsButton/ChartsButton'
import ChartWrapper from '../ChartWrapper.js/ChartWrapper'
// import { Switch, Route, useHistory, useParams } from 'react-router-dom'

const ChartsContainer = (props) => {
	// const classes = chartsContainerStyles()
	// const history = useHistory()
	const [chart, setChart] = useState('waterusage')
	// const params = useParams()
	console.log(`${props.match.url}`)
	// console.log(params)

	return (
		<ItemG container>
			{/* <ItemG xs={12}> */}
			<ItemG xs={12} container justify={'space-evenly'}>
				<ChartsButton onClick={() => setChart('waterusage')} active={chart === 'waterusage' ? true : false}>Vandforbrug</ChartsButton>
				<ChartsButton onClick={() => setChart('temperature')} active={chart === 'temperature' ? true : false}>Temperatur</ChartsButton>
				<ChartsButton onClick={() => setChart('waterflow')} active={chart === 'waterflow' ? true : false}>Gennemstrømning</ChartsButton>
				<ChartsButton onClick={() => setChart('readings')} active={chart === 'readings' ? true : false}>Aflæsninger</ChartsButton>
			</ItemG>
			{/* </ItemG> */}
			<ItemG container xs={12} >
				<ChartWrapper chart={chart} />
				{/* <Switch>
					<Route path={`${props.match.url}waterusage`} render={(rp) => <ChartWrapper {...rp} />} />
					<Route path={`${props.match.url}temperature`} render={(rp) => <ChartWrapper {...rp} />} />
					<Route path={`${props.match.url}waterflow`} render={(rp) => <ChartWrapper {...rp} />} />
					<Route path={`${props.match.url}readings`} render={(rp) => <ChartWrapper {...rp} />} />
				</Switch> */}
			</ItemG>
		</ItemG>
	)
}

export default ChartsContainer
