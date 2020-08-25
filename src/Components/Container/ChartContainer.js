import React, { /* useContext, */ useEffect, useState } from 'react'
// import { TProvider } from 'Components/Providers/LocalizationProvider';
// import { HTitle } from 'App';
import { BPaper } from 'Styles/containerStyle'
import GridContainer from 'Components/Containers/GridContainer'
import ItemG from 'Components/Containers/ItemG'
import { MainChart } from 'Components/Custom/MainChart/MainChart'
import { useDispatch, useSelector } from 'Hooks'
import { CircularLoader } from 'Components'
import ArcGraph from 'Components/Graphs/ArcGraph'
import DevicesWidget from 'Components/Custom/Devices/DevicesWidget'
import DeviceTableWidget from 'Components/Custom/DevicesTable/DeviceTableWidget'
import { getData, getNData } from 'Redux/data'
import { usePrevious } from 'Hooks/index'
import { makeStyles } from '@material-ui/core'
import { Redirect } from 'react-router'

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


const ChartContainer = () => {
	//Hooks
	const dispatch = useDispatch()
	const classes = styles()

	//Redux
	const selectedDevices = useSelector(s => s.appState.selectedDevices)
	const period = useSelector(s => s.dateTime.period)
	const isAdmin = useSelector(s => s.auth.isAdmin)
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
		}
		if ((selectedDevices.length !== prevSelectedDevices.length || selectedDevices[0] !== prevSelectedDevices[0]) && !loading) {
			setLoading(true)
		}
	}, [loading, period, prevPeriod, prevSelectedDevices, selectedDevices])
	useEffect(() => {
		if (loading) {
			const getDeviceData = async () => dispatch(await getData())
			const getNewData = async () => dispatch(await getNData())
			const loadData = async () => {
				await getDeviceData()
				await getNewData
				setLoading(false)
			}
			loadData()
		}
	}, [dispatch, loading])

	//Handlers

	return isAdmin ? <GridContainer style={{ height: '100%' }}>
		<ItemG xs={12} md={9} className={classes.screenWidget}>
			<BPaper>
				<MainChart loading={loading} chart={chart} setChart={setChart} />
			</BPaper>
		</ItemG>
		<ItemG xs={12} md={3}>
			<ItemG container direction={'row'} style={{ height: '100%' }}>
				<ItemG xs={12} className={classes.smallWidget}>
					<BPaper>
						<DeviceTableWidget />
					</BPaper>

				</ItemG>
				<ItemG xs={12} style={{ height: '50%' }}>
					<BPaper>
						{loading ? <CircularLoader fill /> :
							<ArcGraph chart={chart} id={`arc-graph-${chart}`} />
						}
					</BPaper>

				</ItemG>
				<ItemG xs={12} className={classes.smallWidget}>
					<BPaper>
						<DevicesWidget />
					</BPaper>
				</ItemG>
			</ItemG>
		</ItemG>

	</GridContainer> : <Redirect to={'/'} />
}
ChartContainer.whyDidYouRender = true

export default ChartContainer