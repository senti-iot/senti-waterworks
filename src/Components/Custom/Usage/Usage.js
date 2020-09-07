/* eslint-disable indent */
import React, { useState } from 'react'
import { Grid, Dialog, IconButton } from '@material-ui/core'
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
import { formatShortNumber } from 'data/functions'
import usageStyle from 'Styles/usageStyle'
import { FamilyIcon } from 'variables/icons'
import { HeaderText } from 'Components/Custom/Styles/arcGraphStyles'

const Usage = props => {
	const t = useLocalization()
	//Hooks

	const classes = usageStyle()
	// const [anchorEl, setAnchorEl] = useState(null)
	// const [popperOpen, setPopperOpen] = useState(false)

	//Redux
	const avgData = useSelector(s => s.priceUsageData.usage)
	const mUnit = useSelector(s => s.settings.mUnit)
	const colorTheme = useSelector((state) => state.settings.colorTheme)

	//State
	const [fsDialogOpen, setFsDialogOpen] = useState(false)

	//Const

	//useEffects

	//Handlers
	const unit = () => {
		switch (props.chart) {
			case 'waterusage':
				return mUnit === 'm3' ? 'm³' : 'L'
			default:
				return 'm³'
		}
	}

	const columnClasses = (index) => {
		return cx({
			[classes.itemG]: false,
			[classes.leftColumnStyle]: index % 2 === 0,
			[classes.rightColumnStyle]: index % 2 !== 0,

		})
	}
	const handleOnClose = () => {
		setFsDialogOpen(false)
	}
	return (
		<Grid container className={classes.container}>
			<ItemG container xs={4} className={columnClasses(0)}>

				<ItemG xs={4} container style={{ maxWidth: '100%' }}>
					<img src={FamilyIcon} alt="senti-family-icon" className={classes.familyIcon} style={{ color: '#fff' }} />
					<HeaderText variant={'h5'}>{t('usage.dashboardUsage.dailyConsumption')}</HeaderText>
				</ItemG>

				<ItemG xs={8} container alignItems={'flex-end'} justify={'flex-end'} style={{ maxWidth: '100%' }}>
					<T variant="body2" className={classes.cubicValue}>
						{(mUnit === 'm3' ? formatShortNumber(avgData.waterusagem3, 2, t) : formatShortNumber(avgData.waterusageL, 0, t))}
						<span className={classes.cubicValueUnit}>
							{unit()}
						</span>
					</T>
				</ItemG>
			</ItemG>
			<ItemG container xs={4} className={columnClasses(1)}>

				<ItemG xs={4} container style={{ maxWidth: '100%' }}>
					<img src={FamilyIcon} alt="senti-family-icon" className={classes.familyIcon} style={{ color: '#fff' }} />
					<HeaderText variant={'h5'}>{t('usage.dashboardUsage.dailyConsumption')}</HeaderText>
				</ItemG>

				<ItemG xs={8} container alignItems={'flex-end'} justify={'flex-end'} style={{ maxWidth: '100%' }}>
					<T variant="body2" className={classes.cubicValue}>
						{(mUnit === 'm3' ? formatShortNumber(avgData.waterusagem3, 2, t) : formatShortNumber(avgData.waterusageL, 0, t))}
						<span className={classes.cubicValueUnit}>
							{unit()}
						</span>
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={4} className={columnClasses(1)}>
				<div className={classes.flexColumn}>
					<div style={{ display: 'flex' }}>
						<img src={FamilyIcon} alt="senti-family-icon" className={classes.familyIcon} style={{ color: '#fff' }} />
						<T variant="body1" className={classes.headline}>{t('usage.dashboardUsage.comparison')}</T>
					</div>
					<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: 28 }}>
						<T variant="body2" className={classes.cubicValue} style={{ color: '#F7DC00' }}>
							{(mUnit === 'm3' ?
								formatShortNumber(avgData.benchmarkm3, 2, t) :
								formatShortNumber(avgData.benchmarkL, 0, t))}
							<span className={classes.cubicValueUnit}>
								{unit()}
							</span>
						</T>
						{/* <img src={waterdrop} className={classes.blueWaterdrop} alt="senti-waterdrop" /> */}
					</div>
				</div>
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
	)
}

export default Usage