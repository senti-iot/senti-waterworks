import React, { useContext, useEffect, useState } from 'react'
// import { TProvider } from 'Components/Providers/LocalizationProvider';
import { HTitle } from 'App';
import containerStyles, { paperStyles } from 'Styles/containerStyle';
import GridContainer from 'Components/Containers/GridContainer';
import ItemG from 'Components/Containers/ItemG';
import { Paper } from '@material-ui/core';
import MainChart from 'Components/Custom/MainChart/MainChart';
import { Switch, Route, Redirect } from 'react-router-dom'
import Settings from 'Routes/Settings';
import Header from 'Components/Header';
import cookie from 'react-cookies';
import { useDispatch, useSelector } from 'Hooks';
import { getSettings } from 'Redux/settings';
import { CircularLoader } from 'Components';
import ArcGraph from 'Components/Graphs/ArcGraph';
import DevicesWidget from 'Components/Custom/Devices/DevicesWidget';
import DeviceTableWidget from 'Components/Custom/DevicesTable/DeviceTableWidget';
import { getData } from 'Redux/data';

const ChartContainer = (props) => {
	const colorTheme = useSelector((state) => state.settings.colorTheme)
	const classes = containerStyles({ color: colorTheme })
	const paperClasses = paperStyles({ color: colorTheme })
	const [chart, setChart] = useState('waterusage')

	return <GridContainer style={{ height: '100%' }}>
		<ItemG xs={9} >
			<Paper className={classes.gridItemBackground} classes={paperClasses}>
				<MainChart chart={chart} setChart={setChart} />
			</Paper>
		</ItemG>
		<ItemG xs={3}>
			<ItemG container direction={'row'} style={{ height: '100%' /* width: '100%' */ }}>
				<ItemG xs={12} style={{ height: '25%' }}>
					<Paper className={classes.gridItemBackground}>
						<DeviceTableWidget />
					</Paper>

				</ItemG>
				<ItemG xs={12} style={{ height: '50%' }}>
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
	const colorTheme = useSelector((state) => state.settings.colorTheme)
	const classes = containerStyles({ color: colorTheme })
	const setHeader = useContext(HTitle)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)

	setHeader('Header Title')

	useEffect(() => {

		const getSetting = async () => dispatch(await getSettings())
		const getDevices = async () => dispatch(await getData())
		const loadSettings = async () => {
			await getSetting()
			await getDevices()
			setLoading(false)
		}
		loadSettings()
	}, [dispatch])

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
