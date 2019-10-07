import React, { useContext, useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'Hooks';
import { getSettings } from 'Redux/settings';
import { CircularLoader } from 'Components';
import ArcGraph from 'Components/Graphs/ArcGraph';
import DevicesWidget from 'Components/Custom/Devices/DevicesWidget';

const ChartContainer = (props) => {
	const classes = props.classes
	const [chart, setChart] = useState('waterusage')

	return <GridContainer style={{ height: '100%' }}>
		<ItemG xs={9} >
			<Paper className={classes.gridItemBackground}>
				<ChartsContainer chart={chart} setChart={setChart} />
			</Paper>
		</ItemG>
		<ItemG xs={3}>
			<ItemG container direction={'row'} style={{ height: '100%', width: '100%' }}>
				<ItemG xs={12} style={{ height: '30%' }}>
					<Paper className={classes.gridItemBackground}>
						<div>Test1</div>
						{/* <div style={{ height: 100, width: 100 }} /> */}
					</Paper>

				</ItemG>
				<ItemG xs={12} style={{ height: '45%' }}>
					<Paper className={classes.gridItemBackground}>
						<ArcGraph chart={chart} id={`arc-graph-${chart}`} />
					</Paper>

				</ItemG>
				<ItemG xs={12} style={{ height: '25%' }}>
					<Paper className={classes.gridItemBackground}>
						<DevicesWidget />
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
	const [loading, setLoading] = useState(true)
	const redux = {
		getSettings: async () => dispatch(await getSettings())
	}
	const classes = containerStyles({ color: colorTheme })
	useEffect(() => {
		setHeader('Header Title')
	}, [setHeader])
	useEffect(() => {
		const loadSettings = async () => {
			await redux.getSettings()
			setLoading(false)
			// 	 console.log(loading)
			// 	// console.log(loading)
		}
		loadSettings()
		// const settings = await loadSettings()
	}, [loading, redux])
	return (
		cookie.load('SESSION') ?
			<div>
				<Header title={props.title} />
				{!loading ?
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
					: <CircularLoader />}
			</div>
			: <Redirect from={window.location.pathname} to={{
				pathname: '/login', state: {
					prevURL: window.location.pathname
				}
			}} />
	)
}

export default Container
