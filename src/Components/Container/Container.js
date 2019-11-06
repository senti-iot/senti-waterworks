import React, { useContext, useEffect, useState, Fragment } from 'react'
// import { TProvider } from 'Components/Providers/LocalizationProvider';
import { HTitle } from 'App';
import { BPaper, AppBackground } from 'Styles/containerStyle';
import GridContainer from 'Components/Containers/GridContainer';
import ItemG from 'Components/Containers/ItemG';
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
import { getAllDevices } from 'Redux/data';


const ChartContainer = () => {

	const [chart, setChart] = useState('waterusage')

	return <GridContainer style={{ height: '100%' }}>
		<ItemG xs={9} >
			<BPaper>
				<MainChart chart={chart} setChart={setChart} />
			</BPaper>
		</ItemG>
		<ItemG xs={3}>
			<ItemG container direction={'row'} style={{ height: '100%' }}>
				<ItemG xs={12} style={{ height: '25%' }}>
					<BPaper>
						<DeviceTableWidget />
					</BPaper>

				</ItemG>
				<ItemG xs={12} style={{ height: '50%' }}>
					<BPaper>
						<ArcGraph chart={chart} id={`arc-graph-${chart}`} />
					</BPaper>

				</ItemG>
				<ItemG xs={12} style={{ height: '25%' }}>
					<BPaper>
						<DevicesWidget />
					</BPaper>
				</ItemG>
			</ItemG>
		</ItemG>
	</GridContainer>
}


function Container({ ...props }) {
	const colorTheme = useSelector((state) => state.settings.colorTheme)
	// const classes = containerStyles({ color: colorTheme })
	const setHeader = useContext(HTitle)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)

	setHeader('Header Title')

	useEffect(() => {

		const getSetting = async () => dispatch(await getSettings())
		const getDevices = async () => dispatch(await getAllDevices())
		// const getDeviceData = async () => dispatch(await getData())
		const loadSettings = async () => {
			await getSetting()
			await getDevices()
			// await getDeviceData()
			setLoading(false)
		}
		loadSettings()
	}, [dispatch])

	return (
		cookie.load('SESSION') ?
			<Fragment>
				<Header title={props.title} />
				{!loading ?
					<AppBackground color={colorTheme}>
						<Switch>
							<Route path={'/settings'}>
								<Settings />
							</Route>
							<Route exact path={'/'}>
								<ChartContainer />
							</Route>
						</Switch>
					</AppBackground>
					: <CircularLoader />}
			</Fragment>
			: <Redirect from={window.location.pathname} to={{
				pathname: '/login', state: {
					prevURL: window.location.pathname
				}
			}} />
	)
}

export default Container
