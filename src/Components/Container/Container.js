import React, { useContext, useEffect } from 'react'
// import { TProvider } from 'Components/Providers/LocalizationProvider';
import { HTitle } from 'App';
import containerStyles from 'Styles/containerStyle';
import GridContainer from 'Components/Containers/GridContainer';
import ItemG from 'Components/Containers/ItemG';
import { Paper } from '@material-ui/core';
import ChartsContainer from 'Components/Custom/ChartsContainer/ChartsContainer';
import { Switch, Route } from 'react-router-dom'
import Settings from 'Routes/Settings';

const ChartContainer = (props) => {
	const classes = containerStyles({ color: 'blue' })

	return <GridContainer style={{ height: '100%' }}>
		<ItemG xs={9} >

			{/* <Paper className={classes.gridItemBackground}> */}
			{/* {i} */}
			<Paper className={classes.gridItemBackground}>
				<ChartsContainer {...props} />
				{/* <LineGraph id={'linechart3'} /> */}
			</Paper>
		</ItemG>
		<ItemG xs={3}>
			<ItemG container direction={'column'} style={{ height: '100%', width: '100%' }}>
				<ItemG xs={3} style={{ maxWidth: '100%' }}>
					<Paper className={classes.gridItemBackground}>
						{/* <div style={{ height: 100, width: 100 }} /> */}
					</Paper>

				</ItemG>
				<ItemG xs={5} style={{ maxWidth: '100%' }}>
					<Paper className={classes.gridItemBackground}>

					</Paper>

				</ItemG>
				<ItemG xs={4} style={{ maxWidth: '100%' }}>
					<Paper className={classes.gridItemBackground}>
					</Paper>

				</ItemG>
			</ItemG>
		</ItemG>
	</GridContainer>
}


function Container({ ...props }) {
	// const t = useContext(TProvider)
	const setHeader = useContext(HTitle)
	const classes = containerStyles({ color: 'blue' })
	useEffect(() => {
		setHeader('Header Title')
	}, [setHeader])
	// console.log(props)

	return (
		<div className={classes.backgroundColor} style={{ height: 'calc(100vh - 70px)', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
			<Switch>
				{/* <Redirect from={'/'} */}
				<Route path={'/settings'}>
					<Settings />
				</Route>
				<Route path={''}>
					<ChartContainer />
				</Route>
			</Switch>


		</div>
	)
}

export default Container
