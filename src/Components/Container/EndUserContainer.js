import React, { /* useContext, */ useEffect, useState, useRef } from 'react'
// import { TProvider } from 'Components/Providers/LocalizationProvider';
// import { HTitle } from 'App';
import { BPaper } from 'Styles/containerStyle'
import GridContainer from 'Components/Containers/GridContainer'
import ItemG from 'Components/Containers/ItemG'
import { MainChart } from 'Components/Custom/MainChart/MainChart'
import { useDispatch, useSelector } from 'Hooks'
import { CircularLoader } from 'Components'
import ArcGraph from 'Components/Graphs/ArcGraph'
import Usage from 'Components/Custom/Usage/Usage'
import PriceChart from 'Components/Custom/Usage/PriceChart'
import { /* getNData, getAdminDevices, */ setHaveData, setUnitHasChanged, /*  getAllNotifications */ } from 'Redux/data'
import { usePrevious } from 'Hooks/index'
import { Collapse, makeStyles, /* Hidden */ } from '@material-ui/core'
import BarsContainer from 'Components/Custom/Bars/BarsContainer'
import FullScreenMainChart from 'Components/Custom/MainChart/FullScreenMainChart'
import TagFilterDialog from 'Components/TagFilterDialog/TagFilterDialog'
// import { getTags } from 'Redux/tagManager'
import { getNData } from 'Redux/data'
import ClientInfo from 'Components/Custom/Users/ClientInfo'

const styles = makeStyles(theme => ({
	chartGrid: {
		height: '80%',
		[theme.breakpoints.down('sm')]: {
			height: 'auto'
		}
	},
	mobileGrid: {
		height: '100%',
		[theme.breakpoints.down('sm')]: {
			height: 'auto',
		}
	},
	smallWidget: {
		height: '25%',
		[theme.breakpoints.down('sm')]: {
			height: '35%'
		}
	},
	screenWidget: {
		[theme.breakpoints.down('sm')]: {
			height: '100%'
		}
	},
	clientInfoCont: {
		height: '100% !important'
	}

}))


const EndUserContainer = props => {
	//Hooks
	const dispatch = useDispatch()
	const classes = styles()
	const usageRef = useRef(null)
	const priceRef = useRef(null)

	//Redux
	const selectedDevices = useSelector(s => s.appState.selectedDevices)
	const devices = useSelector(s => s.data.devices)
	// const devices = useSelector(s => s.data.devices)
	const sDev = useSelector(s => s.appState.selectedDevices.length)
	const period = useSelector(s => s.dateTime.period)
	// const isSuperUser = useSelector(s => s.auth.isSuperUser)
	// const isSWAdmin = useSelector(s => s.auth.privileges.indexOf('waterworks.admin') > -1 ? true : false)
	const haveData = useSelector(s => s.data.haveData)
	const unitHasChanged = useSelector(s => s.data.unitHasChanged)
	const orgSettings = useSelector(s => s.settings.orgSettings)
	//State
	const [chart, setChart] = useState('waterusage')
	const [loading, setLoading] = useState(true)


	//Const

	//useCallbacks
	const prevPeriod = usePrevious(period)
	const prevSelectedDevices = usePrevious(selectedDevices)

	//useEffects
	useEffect(() => {
		// console.log('useEffects triggered')
		if (prevPeriod && period !== prevPeriod && !loading) {
			// console.log('period')
			setLoading(true)
			dispatch(setHaveData(false))
		}
		if ((selectedDevices.length !== prevSelectedDevices.length || selectedDevices[0] !== prevSelectedDevices[0]) && !loading) {
			// console.log('Device Length')
			// console.log('Different number of devices')
			if (selectedDevices.length > 11) {
				setChart('waterusage')
			}
			setLoading(true)
			dispatch(setHaveData(false))
		}
		const reloadData = async () => {
			await dispatch(setHaveData(false))
			setLoading(true)
			dispatch(setUnitHasChanged())
		}
		if (unitHasChanged) {
			reloadData()
		}

	}, [dispatch, haveData, loading, period, prevPeriod, prevSelectedDevices, selectedDevices, unitHasChanged])

	useEffect(() => {
		if (!haveData && loading && devices.length > 0) {
			const getNewData = async () => dispatch(await getNData())
			const loadData = async () => {
				await getNewData()
				setLoading(false)
			}
			loadData()
		}
		return async() => {
			await dispatch(setHaveData(false))
		}
	}, [dispatch, loading, haveData, devices.length])


	//Handlers

	return <GridContainer  className={classes.mobileGrid}>
		<ItemG xs={12} md={9} container className={classes.mobileGrid}>
			<ItemG xs={12} className={classes.chartGrid}>
				<BPaper>
					<MainChart loading={loading} chart={chart} setChart={setChart} />
				</BPaper>

			</ItemG>
			<ItemG xs={12} container style={{ height: "20%" }}>
				<ItemG xs style={{ height: '100%' }}>
					<BPaper ref={usageRef}>
						<Usage parentRef={usageRef} />
					</BPaper>
				</ItemG>
				{orgSettings.priceInfo === 0 ? null : <ItemG xs={4} style={{ height: '100%' }}>
					<BPaper ref={priceRef}>
						<PriceChart parentRef={priceRef} />
					</BPaper>
				</ItemG>}
				<ItemG xs={sDev < 2 ? 3 : 0} style={{ height: "100%", width: sDev < 2 ? "100%" : '0px' }}>
					<Collapse in={sDev < 2} style={{ height: "100%" }} classes={{
						entered: classes.clientInfoCont,
						wrapper: classes.clientInfoCont,
					}}>
						<BPaper>
							<ClientInfo/>
						</BPaper>
					</Collapse>
				</ItemG>
			</ItemG>
		</ItemG>
		<ItemG xs={12} md={3} container style={{ height: "100%" }}>
			<ItemG xs={12} style={{ height: '50%' }} className={classes.smallWidget}>
				<BPaper>
					<BarsContainer loading={loading} chart={chart} />
				</BPaper>
			</ItemG>
			<ItemG xs={12} style={{ height: '50%' }}>
				<BPaper>
					{loading ? <CircularLoader fill /> :
						<ArcGraph chart={chart} id={`arc-graph-${chart}`} />
					}
				</BPaper>

			</ItemG>
		</ItemG>
		<FullScreenMainChart loading={loading} chart={chart} setChart={setChart} />
		<TagFilterDialog/>
	</GridContainer>
}
EndUserContainer.whyDidYouRender = true

export default EndUserContainer