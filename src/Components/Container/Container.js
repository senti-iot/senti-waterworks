import React, { useContext, useEffect, useLayoutEffect } from 'react'
// import { TProvider } from 'Components/Providers/LocalizationProvider';
import { HTitle } from 'App';
import containerStyles from 'Styles/containerStyle';
import GridContainer from 'Components/Containers/GridContainer';
import ItemG from 'Components/Containers/ItemG';
import { Paper } from '@material-ui/core';
import ChartsContainer from 'Components/Custom/ChartsContainer/ChartsContainer';
import { Switch, Route, Redirect } from 'react-router-dom'
import Settings from 'Routes/Settings';
import Header from 'Components/Header';
import cookie from 'react-cookies';
import { useDispatch, useSelector, useWhyDidYouUpdate } from 'Hooks';
import { getSettings } from 'Redux/settings';

const ChartContainer = (props) => {
	const classes = props.classes

	return <GridContainer style={{ height: '100%' }}>
		<ItemG xs={9} >
			<Paper className={classes.gridItemBackground}>
				<ChartsContainer {...props} />
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
	// const history = useHistory()
	const colorTheme = useSelector((state) => state.settings.colorTheme)
	const setHeader = useContext(HTitle)
	const dispatch = useDispatch()
	const redux = {
		getSettings: async () => dispatch(await getSettings())
	}
	const classes = containerStyles({ color: colorTheme })
	useEffect(() => {
		setHeader('Header Title')
	}, [setHeader])
	useLayoutEffect(() => {
		async function loadSettings() {
			await redux.getSettings()
		}
		loadSettings()
	})
	useWhyDidYouUpdate('Container', props)
	return (
		cookie.load('SESSION') ?
			<div>
				<Header title={props.title} />
				<div className={classes.backgroundColor} style={{ marginTop: 70, height: 'calc(100vh - 70px)', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
					<Switch>
						<Route path={'/settings'}>
							<Settings classes={classes} />
						</Route>
						<Route exact path={'/'}>
							<ChartContainer classes={classes} />
						</Route>
					</Switch>

				</div>
			</div>
			: <Redirect from={window.location.pathname} to={{
				pathname: '/login', state: {
					prevURL: window.location.pathname
				}
			}} />
	)
}

export default Container
