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
import Usage from 'Components/Custom/Pavel/Usage'
import PriceChart from 'Components/Custom/Pavel/PriceChart'
import { getData } from 'Redux/data'
import { usePrevious } from 'Hooks/index'
import { makeStyles, Hidden } from '@material-ui/core'
import BarsContainer from 'Components/Custom/Bars/BarsContainer'

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


const EndUserContainer = () => {
	//Hooks
	const dispatch = useDispatch()
	const classes = styles()

	//Redux
	const selectedDevices = useSelector(s => s.appState.selectedDevices)
	const period = useSelector(s => s.dateTime.period)

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
			const loadData = async () => {
				await getDeviceData()
				setLoading(false)
			}
			loadData()
		}
	}, [dispatch, loading])

	//Handlers


	return <GridContainer style={{ height: '100%' }}>
		<Hidden smDown>
			<ItemG xs={12} md={9} container>
				<ItemG xs={12} style={{ height: "80%" }}>
					<BPaper>
						<MainChart loading={loading} chart={chart} setChart={setChart} />
					</BPaper>

				</ItemG>
				<ItemG xs={12} container style={{ height: "20%" }}>
					<ItemG xs={6}>
						<BPaper>
							<Usage />
						</BPaper>
					</ItemG>
					<ItemG xs={6}>
						<BPaper>
							<PriceChart />
						</BPaper>
					</ItemG>
				</ItemG>
			</ItemG>
			<ItemG xs={12} md={3}>
				<ItemG container direction={'row'} style={{ height: '100%' }}>
					<ItemG xs={12} style={{ height: '50%' }} className={classes.smallWidget}>
						<BPaper>
							<BarsContainer chart={chart} />
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
			</ItemG>
		</Hidden>
		<Hidden mdUp>
			<ItemG xs={12} md={9} className={classes.screenWidget}>
				<BPaper>
					<MainChart loading={loading} chart={chart} setChart={setChart} />
				</BPaper>
			</ItemG>

			<ItemG xs={12} style={{ height: '50%' }}>
				<BPaper>
					{loading ? <CircularLoader fill /> :
						<ArcGraph chart={chart} id={`arc-graph-${chart}`} />
					}
				</BPaper>

			</ItemG>

		</Hidden>
	</GridContainer>
}
EndUserContainer.whyDidYouRender = true

export default EndUserContainer