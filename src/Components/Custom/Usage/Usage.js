/* eslint-disable indent */
import React, { useState } from 'react'
import { Grid, Dialog, IconButton, Paper } from '@material-ui/core'
import GridContainer from 'Components/Containers/GridContainer'
import ItemG from 'Components/Containers/ItemG'
import { BPaper, AppPaper } from 'Styles/containerStyle'
import { CallMade, /* HelpOutline */ } from 'variables/icons'
import SlideT from 'Components/Transitions/SlideT'
import FullscreenDialog from './FullscreenDialog'
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
	const [fsDialogOpen, setFsDialogOpen] = useState(true)

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
		<Grid container className={classes.container}> {/* ref */}
			<ItemG container xs={6} className={columnClasses(0)}>

				<ItemG xs={4} container style={{ maxWidth: '100%' }}>
					<img src={FamilyIcon} alt="senti-family-icon" className={classes.familyIcon} style={{ color: '#fff' }} />
					<HeaderText variant={'h5'}>{t('usage.dashboardUsage.dailyConsumption')}</HeaderText>
				</ItemG>

				<ItemG xs={8} container alignItems={'flex-end'} justify={'flex-end'} style={{ maxWidth: '100%' }}>
					<T variant="body2" className={classes.cubicValue}>
						{(mUnit === 'm3' ? formatShortNumber(avgData.waterusagem3, 2) : formatShortNumber(avgData.waterusageL, 0))}
						<span className={classes.cubicValueUnit}>
							{unit()}
						</span>
					</T>
				</ItemG>
			</ItemG>
			<ItemG xs={6} className={columnClasses(1)}>
				<div className={classes.flexColumn}>
					<div style={{ display: 'flex' }}>
						<img src={FamilyIcon} alt="senti-family-icon" className={classes.familyIcon} style={{ color: '#fff' }} />
						<T variant="body1" className={classes.headline}>{t('usage.dashboardUsage.comparison')}</T>
					</div>
					<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: 28 }}>
						<T variant="body2" className={classes.cubicValue} style={{ color: '#F7DC00' }}>
							{(mUnit === 'm3' ? formatShortNumber(avgData.benchmarkm3) : formatShortNumber(avgData.benchmarkL, 0))}
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

			{/* <Dialog
				fullScreen
				hideBackdrop // hides the dark overlay and makes it 'clickable-through'
				className={classes.dialogRoot}
				open={fsDialogOpen}
				onChange={() => setFsDialogOpen(false)}
				TransitionComponent={SlideT}
				onClose={handleOnClose}
				PaperProps={{
					style: {
						// colors converted from hexadecimal to RGBA in order to have an opacity effect
						background: 'linear-gradient(to bottom,rgba(7,96,167,.8),rgba(1,39,96,.8))'
					}
				}}
			>
				<Paper className={classes.fullscreenDialog}>
					<GridContainer style={{ flex: 1, overflow: 'hidden' }}>
						<ItemG xs={12} style={{ height: '100%' }}>
							<BPaper style={{ background: '#3799F1', height: '100%', padding: 0, overflow: 'auto' }}>
								<FullscreenDialog closeDialog={setFsDialogOpen} />
							</BPaper>
						</ItemG>
					</GridContainer>
				</Paper>
			</Dialog>
			*/}
			<Dialog
				fullScreen
				hideBackdrop // hides the dark overlay and makes it 'clickable-through'
				className={classes.dialogRoot}
				open={fsDialogOpen}
				TransitionComponent={SlideT}
				onClose={handleOnClose}
				keepMounted
				disablePortal
			>
				<AppPaper color={colorTheme} style={{ padding: 30 }}>
					<BPaper style={{ padding: 0 }}>
						<FullscreenDialog closeDialog={setFsDialogOpen} />
					</BPaper>
				</AppPaper>
			</Dialog>
		</Grid>
	)
}

export default Usage