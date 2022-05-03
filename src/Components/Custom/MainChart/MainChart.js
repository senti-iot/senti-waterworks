import React, { useState } from 'react'
import { ItemG, DateTimeFilter, DMenu } from 'Components'
import { Hidden, IconButton, Tooltip } from '@material-ui/core'
import LineGraph from 'Components/Graphs/LineGraph'
import { useLocalization, useSelector, useDispatch, } from 'Hooks'
import DateTimeArrows from 'Components/Input/DateTimeArrows'
import DateTimeDays from 'Components/Input/DateTimeDays'
import { ExportModule } from 'Components/ExportModule/ExportModule'
import ChartsButtonContainer from '../ChartsButton/ChartsButtonContainer'
import { DateRange, ImportExport, MoreVert, CallMadeIcon, BarChart, ShowChart } from 'variables/icons'
import styled from 'styled-components'
// import DSelect from 'Components/Input/DSelxect'
import { makeStyles } from '@material-ui/styles'
import DButton from 'Components/Input/DButton'
import { lighten } from '@material-ui/core/styles'
import { setFullScreenLineGraph, changeChartType } from 'Redux/appState'
import cx from 'classnames'
import { Info } from '@material-ui/icons'

const DateRangeIcon = styled(DateRange)`
color: #fff;
`
const MoreVertIcon = styled(MoreVert)`
color: #fff;
`

const useStyles = makeStyles(theme => ({

	root: {
		display: 'flex',
		// justifyContent: 'space-between',
		width: 240,
		textAlign: 'center',
		fontWeight: 500,
		color: '#fff',
		background: theme.activeChartButton,
		borderRadius: 4,
		minWidth: 240,
		"&:hover": {
			background: lighten(theme.activeChartButton, 0.3)
		},
		textTransform: 'none'
	},

	icon: {
		color: '#fff',
		transition: 'all 400ms ease',

	},

	fullScreenIcon: {
		transform: 'rotate(180deg);'
	}

}))
export const MainChart = React.memo((props) => {
	//Hooks
	const t = useLocalization()
	const dispatch = useDispatch()
	const classes = useStyles()
	//Redux
	// const selectedDevices = useSelector(s => s.appState.selectedDevices)
	// const isAdmin = useSelector(s => s.auth.isAdmin)
	const data = useSelector(s => s.lineData)
	const fullScreenLineChart = useSelector(s => s.appState.fullScreenLineChart)
	// const chartType = useSelector(s => s.appState.chartType)


	//State
	const [openExport, setOpenExport] = useState(false)
	//Const
	const { chart, setChart } = props

	//useCallbacks

	//eventHandler


	//useEffects

	//Handlers
	const handleChangeChartType = (index) => {
		dispatch(changeChartType(index))

		// switch (chartType) {
		// 	case 0:
		// 		dispatch(changeChartType(1))
		// 		break
		// 	case 1:
		// 		dispatch(changeChartType(0))
		// 		break
		// 	default:
		// 		break
		// }
		// dispatch(changeChartType(!chartType))
	}
	const handleOpenExport = () => {
		setOpenExport(true)
	}
	const handleCloseExport = () => {
		setOpenExport(false)
	}
	const handleSetChart = (c) => () => setChart(c)

	const handleOpenFullScreen = () => {
		dispatch(setFullScreenLineGraph(!fullScreenLineChart))
	}

	const iconCX = cx({
		[classes.icon]: true,
		[classes.fullScreenIcon]: fullScreenLineChart
	})

	const renderInfoAbout = () => {
		return <Tooltip title={t('filters.devices.max') + '.'}>
			<Info/>
		</Tooltip>
	}
	console.log('data', data)
	return (
		<ItemG container style={{ height: '100%', flexFlow: 'column' }}>
			<Hidden xsDown>
				<ChartsButtonContainer>
					<ItemG container alignItems={'center'} justify={'space-evenly'}>
						<ItemG xs={2} md={2} lg={2} container justify={'flex-start'} alignItems={'center'}>
							<DButton
								value={chart}
								onChange={(value) => {
									handleSetChart(value)()
								}}
								buttonClasses={{
									root: classes.root
								}}
								menuItemClasses={{
									root: classes.menuItem
								}}
								label={<ItemG xs container justify={'center'}>{t(`charts.types.${chart}`)}</ItemG>}
								menuItems={[
									{ label: t('charts.types.waterusage'), value: 'waterusage' },
									{ label: t('charts.types.temperature'), value: 'temperature', disabled: data && !data.temperature.length > 0, showOnlyOnDisabled: true, endIcon: renderInfoAbout() },
									{ label: t('charts.types.waterflow'), value: 'waterflow', disabled: data && !data.waterflow.length > 0, showOnlyOnDisabled: true, endIcon: renderInfoAbout() },
									// { label: t('charts.types.waterTemp'), value: 'waterTemp', disabled: data && !data.waterTemp.length > 0, showOnlyOnDisabled: true, endIcon: renderInfoAbout() },
									// { label: t('charts.types.ambientTemp'), value: 'ambientTemp', disabled: data && !data.ambientTemp.length > 0, showOnlyOnDisabled: true, endIcon: renderInfoAbout() },
									// { label: t('charts.types.maxFlow'), value: 'maxFlow', disabled: data && !data.maxFlow.length > 0, showOnlyOnDisabled: true, endIcon: renderInfoAbout() },
									// { label: t('charts.types.minFlow'), value: 'minFlow', disabled: data && !data.minFlow.length > 0, showOnlyOnDisabled: true, endIcon: renderInfoAbout() },
									{ label: t('charts.types.readings'), value: 'readings', disabled: data && !data.readings.length > 0, showOnlyOnDisabled: true, endIcon: renderInfoAbout() }
								]}
							/>

						</ItemG>
						<ItemG xs={8} md={8} lg={5} container alignItems={'center'} >
							<DateTimeArrows />
						</ItemG>
						<ItemG xs={2} md={2} lg={5} container alignItems={'center'} justify={'flex-end'}>
							<ItemG xs={2} md={2} lg={5} container wrap={"nowrap"} alignItems={'center'} justify={'flex-end'}>
								<Hidden mdDown>
									<DateTimeDays />
								</Hidden>
								<DateTimeFilter icon={<DateRangeIcon />} />
								<DMenu
									icon={<MoreVertIcon />}
									// onChange={handleOpenExport}
									menuItems={[{
										dontShow: false,
										icon: <ImportExport />,
										label: t('actions.export'),
										func: handleOpenExport
									},
									{
										label: t('charts.chartType'),
										dontShow: false,
										dropdown: true,
										options: [{
											id: 1,
											icon: <BarChart />,
											label: t('charts.chartTypes.bar'),
										},
										{
											id: 0,
											icon: <ShowChart />,
											label: t('charts.chartTypes.line'),
										}],
										handleClick: handleChangeChartType
									}]}
								/>
							</ItemG>
							<ItemG>
								<ExportModule open={openExport} /* open={true} */
									handleOpenExport={handleOpenExport}
									handleCloseExport={handleCloseExport}
								/>
							</ItemG>

							<ItemG>
								<IconButton onClick={handleOpenFullScreen}>
									<CallMadeIcon className={iconCX} />
								</IconButton>
							</ItemG>
						</ItemG>
					</ItemG>
				</ChartsButtonContainer>

			</Hidden>

			{/* </ItemG> */}
			<ItemG container style={{ flex: 1 }}>
				<LineGraph fullScreen={props.fullScreen} loading={props.loading} id={chart} />
			</ItemG>

		</ItemG >
	)
})
MainChart.whyDidYouRender = true
// export default MainChart
