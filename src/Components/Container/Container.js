import React, { useContext, useEffect, useState, Fragment } from 'react'
// import { TProvider } from 'Components/Providers/LocalizationProvider';
import { HTitle } from 'App';
import containerStyles from 'Styles/containerStyle';
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
import styled from 'styled-components'
import { bgColors } from '../../Styles/backgroundColors';


const ChartContainer = (props) => {
	// const colorTheme = useSelector((state) => state.settings.colorTheme)
	// const classes = containerStyles({ color: colorTheme })
	// const paperClasses = paperStyles({ color: colorTheme })
	const [chart, setChart] = useState('waterusage')

	// const BPaper = styled(Paper)`
	// position: 'relative';
	// height: 'calc(100% - 32px)';
	// padding: '8px 16px';
	// margin: 8;
	// background: ${props => darken(hexToRgba(colors[props.theme.primary][700], 0.7), 0.5)};
	// `
	const BPaper = styled(Paper)`
	position: relative;
	height: calc(100% - 32px);
	padding: 8px 16px;
	margin: 8px;
	background: ${({ theme }) => theme.boxBackground};
	`;
	return <GridContainer style={{ height: '100%' }}>
		<ItemG xs={9} >
			<BPaper /* className={classes.gridItemBackground} classes={paperClasses} */>
				<MainChart chart={chart} setChart={setChart} />
			</BPaper>
		</ItemG>
		<ItemG xs={3}>
			<ItemG container direction={'row'} style={{ height: '100%' /* width: '100%' */ }}>
				<ItemG xs={12} style={{ height: '25%' }}>
					<BPaper /* className={classes.gridItemBackground} */>
						<DeviceTableWidget />
					</BPaper>

				</ItemG>
				<ItemG xs={12} style={{ height: '50%' }}>
					<BPaper /* className={classes.gridItemBackground} */>
						<ArcGraph chart={chart} id={`arc-graph-${chart}`} />
					</BPaper>

				</ItemG>
				<ItemG xs={12} style={{ height: '25%' }}>
					<BPaper /* className={classes.gridItemBackground} */>
						<DevicesWidget />
					</BPaper>

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
	const AppBackground = styled.div`
	margin-top: 70px;
	height: calc(100vh - 70px);
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;
	background: ${props => bgColors[props.color].background};
	`

	return (
		cookie.load('SESSION') ?
			<Fragment>
				<Header title={props.title} />
				{!loading ?
					<AppBackground color={colorTheme}>
						<Switch>
							<Route path={'/settings'}>
								<Settings classes={classes} />
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
