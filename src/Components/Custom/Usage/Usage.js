/* eslint-disable indent */
import React, { useState } from 'react'
import { Grid, Dialog, IconButton, Collapse } from '@material-ui/core'
// import GridContainer from 'Components/Containers/GridContainer'
import ItemG from 'Components/Containers/ItemG'
import { BPaper, AppPaper } from 'Styles/containerStyle'
import { CallMade, /* HelpOutline */ } from 'variables/icons'
import SlideT from 'Components/Transitions/SlideT'
import UsageOverview from './UsageOverview'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import { useLocalization } from 'Hooks'
// import PopperBubble from './PopperBubble'
import T from 'Components/Typography/T'
import { formatNumber, formatShortNumber } from 'data/functions'
import usageStyle from 'Styles/usageStyle'
import { HeaderText } from 'Components/Custom/Styles/arcGraphStyles'
import CircularLoader from 'Components/Loaders/CircularLoader'

const Usage = props => {
	const t = useLocalization()
	//Hooks

	const classes = usageStyle()
	// const [anchorEl, setAnchorEl] = useState(null)
	// const [popperOpen, setPopperOpen] = useState(false)

	//Redux
	const loading = useSelector(s => s.priceUsageData.loading)
	const avgData = useSelector(s => s.priceUsageData.usage)
	const oneDayUsage = useSelector(s => s.priceUsageData.oneDayUsage)
	const sInst = useSelector(s => s.appState.selectedInstallations.length)
	const mUnit = useSelector(s => s.settings.mUnit)
	const colorTheme = useSelector((state) => state.settings.colorTheme)

	//State
	const [fsDialogOpen, setFsDialogOpen] = useState(false)

	//Const

	//useEffects

	//Handlers
	const unit = () => {
		return mUnit === 'm3' ? 'm³' : 'L'
		// switch (props.chart) {
		// 	case 'waterusage':
		// 		return mUnit === 'm3' ? 'm³' : 'L'
		// 	default:
		// 		return 'm³'
		// }
	}

	const columnClasses = (index) => {
		return cx({
			[classes.itemG]: false,
			[classes.leftColumnStyle]: index === 0,
			[classes.rightColumnStyle]: index === 1,
			[classes.hiddenColumnStyle]: index === 3

		})
	}
	const handleOnClose = () => {
		setFsDialogOpen(false)
	}

	return (
		<>
			<Grid container className={classes.container}>
				{sInst < 2 ? (
					<ItemG xs={4} className={sInst < 2 ? columnClasses(0) : columnClasses(3)}>
						<Collapse in={sInst < 2}
							classes={{
								entered: classes.clientInfoCont,
								wrapper: classes.clientInfoCont,
							}}
						>
							<ItemG container style={{ height: '100%' }}>
								<ItemG xs container style={{ maxWidth: '100%' }}>
									<HeaderText variant={'h6'}>{t('usage.dashboardOneDay.title')}</HeaderText>
								</ItemG>
								{!loading ? (
									<>
										<ItemG container style={{ maxWidth: '100%' }}>
											<T>{`${t('usage.dashboardOneDay.subtitle')}: ${oneDayUsage.reading !== undefined ? formatNumber(oneDayUsage.reading) : '-'} m³`}</T>
										</ItemG>
										<ItemG container alignItems={'flex-end'} style={{ maxWidth: '100%', display: 'flex' }}>
											{oneDayUsage.reading !== undefined ? (
												<T variant="body2" className={classes.cubicValue}>
													{(mUnit === 'm3' ? formatShortNumber(oneDayUsage.value, 2, t) : formatShortNumber(oneDayUsage.value * 1000, 0, t))}
													<span className={classes.cubicValueUnit}>
														{unit()}
													</span>
												</T>
											) : <></>}
										</ItemG>
									</>
								) : <CircularLoader fill />}
							</ItemG>
						</Collapse>
					</ItemG>
				) : null}
				<ItemG container xs={sInst < 2 ? 4 : 6} className={sInst < 2 ? columnClasses(1) : columnClasses(0)}>
					<ItemG container style={{ maxWidth: '100%' }}>
						<HeaderText variant={'h6'}>{t('usage.dashboardUsage.dailyConsumption')}</HeaderText>
					</ItemG>

					{!loading ? (
						<ItemG container alignItems={'flex-end'} style={{ maxWidth: '100%' }}>
							<T variant="body2" className={classes.cubicValue}>
								{(mUnit === 'm3' ? formatShortNumber(avgData.waterusagem3, 2, t) : formatShortNumber(avgData.waterusageL, 0, t))}
								<span className={classes.cubicValueUnit}>
									{unit()}
								</span>
							</T>
						</ItemG>
					) : <CircularLoader fill />}
				</ItemG>
				<ItemG container xs={sInst < 2 ? 4 : 6} className={columnClasses(1)}>
					<ItemG container style={{ maxWidth: '100%' }}>
						<HeaderText variant={'h6'}>{t('usage.dashboardUsage.comparison')}</HeaderText>
					</ItemG>

					{!loading ? (
						<ItemG container alignItems={'flex-end'} style={{ maxWidth: '100%' }}>
							<T variant="body2" className={classes.cubicValue} style={{ color: '#F7DC00' }}>
								{(mUnit === 'm3' ?
									formatShortNumber(avgData.benchmarkm3, 2, t) :
									formatShortNumber(avgData.benchmarkL, 0, t))}
								<span className={classes.cubicValueUnit}>
									{unit()}
								</span>
							</T>
						</ItemG>
					) : <CircularLoader fill />}
				</ItemG>
				<IconButton size="small" className={classes.callMade} onClick={() => setFsDialogOpen(true)}>
					<CallMade />
				</IconButton>

				<Dialog
					fullScreen
					hideBackdrop
					className={classes.dialogRoot}
					open={fsDialogOpen}
					TransitionComponent={SlideT}
					onClose={handleOnClose}
					keepMounted
					disablePortal
				>
					<AppPaper color={colorTheme} style={{ padding: 30 }}>
						<BPaper style={{ padding: 0 }}>
							<UsageOverview closeDialog={setFsDialogOpen} />
						</BPaper>
					</AppPaper>
				</Dialog>
			</Grid>
		</>
	)
}

export default Usage