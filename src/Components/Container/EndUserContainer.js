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
import { getNData, getAdminDevices, setHaveData, setUnitHasChanged } from 'Redux/data'
import { usePrevious } from 'Hooks/index'
import { makeStyles, /* Hidden */ } from '@material-ui/core'
import BarsContainer from 'Components/Custom/Bars/BarsContainer'
import FullScreenMainChart from 'Components/Custom/MainChart/FullScreenMainChart'

const styles = makeStyles(theme => ({
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
	const period = useSelector(s => s.dateTime.period)
	const isSuperUser = useSelector(s => s.auth.isSuperUser)
	const isSWAdmin = useSelector(s => s.auth.privileges.indexOf('waterworks.admin') > -1 ? true : false)
	const haveData = useSelector(s => s.data.haveData)
	const unitHasChanged = useSelector(s => s.data.unitHasChanged)
	//State
	const [chart, setChart] = useState('waterusage')
	const [loading, setLoading] = useState(true)


	//Const

	//useCallbacks
	const prevPeriod = usePrevious(period)
	const prevSelectedDevices = usePrevious(selectedDevices)

	//useEffects
	useEffect(() => {

		if (prevPeriod && period !== prevPeriod && !loading) {
			setLoading(true)
			dispatch(setHaveData(false))
		}
		if ((selectedDevices.length !== prevSelectedDevices.length || selectedDevices[0] !== prevSelectedDevices[0]) && !loading) {
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
		if (loading && !haveData) {

			const getDevices = async () => dispatch(await getAdminDevices())
			const getNewData = async () => dispatch(await getNData())
			const loadData = async () => {
				if ((isSuperUser || isSWAdmin) && devices.length === 0) {
					await getDevices()
				}
				// await getDeviceData()
				await getNewData()
				setLoading(false)
			}
			loadData()
		}
		else {
			setLoading(false)
		}
	}, [devices.length, dispatch, haveData, isSWAdmin, isSuperUser, loading])

	//Handlers

	return <GridContainer style={{ height: '100%' }}>
		<ItemG xs={12} md={9} container style={{ height: "100%" }}>
			<ItemG xs={12} style={{ height: "80%" }}>
				<BPaper>
					<MainChart loading={loading} chart={chart} setChart={setChart} />
				</BPaper>

			</ItemG>
			<ItemG xs={12} container style={{ height: "20%" }}>
				<ItemG xs={6} style={{ height: '100%' }}>
					<BPaper ref={usageRef}>
						<Usage parentRef={usageRef} />
					</BPaper>
				</ItemG>
				<ItemG xs={6} style={{ height: '100%' }}>
					<BPaper ref={priceRef}>
						<PriceChart parentRef={priceRef} />
					</BPaper>
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
	</GridContainer>
}
EndUserContainer.whyDidYouRender = true

export default EndUserContainer