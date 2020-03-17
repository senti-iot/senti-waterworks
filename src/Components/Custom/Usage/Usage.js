/* eslint-disable indent */
import React, { useState } from 'react'
import { makeStyles, Grid, Dialog, Typography, IconButton, Paper } from '@material-ui/core'
import GridContainer from 'Components/Containers/GridContainer'
import ItemG from 'Components/Containers/ItemG'
import { BPaper } from 'Styles/containerStyle'
import { CallMade, HelpOutline } from 'variables/icons'
import familyIcon from 'assets/icons/familie.svg'
import waterdrop from 'assets/icons/water.drop.blue.svg'
import SlideT from 'Components/Transitions/SlideT'
import FullscreenDialog from './FullscreenDialog'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import { useLocalization } from 'Hooks'
import PopperBubble from './PopperBubble'

const useStyles = makeStyles(theme => ({
	container: {
		position: 'relative',
		padding: '0px 0',
		height: '100%'
	},
	callMade: {
		position: 'absolute',
		top: -4,
		right: -12,
		color: '#fff'
	},
	helpOutline: {
		position: 'absolute',
		bottom: -4,
		right: -12,
		color: '#fff'
	},
	itemG: {
		flex: 1
	},
	dialogTitle: {
		marginLeft: 16
	},
	headline: {
		fontSize: 14,
		fontWeight: 'bolder',
		alignSelf: 'flex-end',
		marginLeft: 8,
		position: 'relative',
		top: 6, // to align it with the bottom edge of the icon
		color: '#fff'
	},
	familyIcon: {
		maxWidth: 38,
		height: 'auto'
	},
	cubicValue: {
		fontSize: 42,
		marginTop: 16,
		lineHeight: 1,
		[theme.breakpoints.down('lg')]: {
			fontSize: 30
		}
	},
	blueWaterdrop: {
		marginLeft: 24,
		maxWidth: 36,
		height: 'auto'
	},
	dialogRoot: {
		height: 'calc(100vh - 70px)',
		marginTop: 70,
	},
	fullscreenDialog: {
		width: '100%',
		height: 'calc(100vh - 70px)',
		background: 'transparent',
		display: 'flex'
	},
	bPaper: { // doesn't work
		background: '#3799F1'
	},
	closeDialog: {
		position: 'absolute',
		top: 8,
		right: 8
	},
	rightColumnStyle: {
		borderLeft: '1px solid #fff',
		paddingLeft: 16,
		position: 'relative'
	},
	leftColumnStyle: {
		borderRight: '1px solid #fff',
		paddingRight: 16,
		position: 'relative'
	},
	flexColumn: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '100%'
	}
}))

const Usage = props => {
	const t = useLocalization()
	//Hooks
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = useState(null)
	const [popperOpen, setPopperOpen] = useState(false)

	//Redux
	const avgData = useSelector(s => s.data.avgData)

	//State
	const [fsDialogOpen, setFsDialogOpen] = useState(false)

	//Const

	//useCallbacks

	//useEffects

	//Handlers


	const columns = [
		{
			familyIcon: <img src={familyIcon} alt="senti-family-icon" className={classes.familyIcon} style={{ color: '#fff' }} />,
			headline: t('Usage.dashboardUsage.dailyConsumption'),
			cubicMetres: avgData.waterusagem3,
			liters: avgData.waterusageL
		},
		{
			familyIcon: <img src={familyIcon} alt="senti-family-icon" className={classes.familyIcon} style={{ color: '#32FFE1' }} />,
			headline: t('Usage.dashboardUsage.comparison'),
			cubicMetres: avgData.benchmarkm3,
			liters: avgData.benchmarkL,
		}
	]

	const columnClasses = (index) => {
		return cx({
			[classes.itemG]: true,
			[classes.leftColumnStyle]: index % 2 === 0,
			[classes.rightColumnStyle]: index % 2 !== 0,

		})
	}
	return (
		<Grid container className={classes.container}> {/* ref */}
			{columns.map(({ familyIcon, headline, liters }, index) => (
				<ItemG key={index} className={columnClasses(index)}>
					<div className={classes.flexColumn}>
						<div style={{ display: 'flex' }}>
							{familyIcon}
							<Typography variant="body1" className={classes.headline}>{headline}</Typography>
						</div>
						<div style={{ display: 'flex', alignItems: 'flex-end' }}>
							<Typography variant="body2" className={classes.cubicValue} style={{ color: index % 2 === 0 ? '#6DD400' : '#F7DC00' }}>
								{(liters).toFixed(0)} <span style={{ fontSize: '0.7em', color: '#fff' }}>L</span>
							</Typography>

							<img src={waterdrop} className={classes.blueWaterdrop} alt="senti-waterdrop" />
						</div>
					</div>
				</ItemG>
			))}
			<IconButton size="small" className={classes.callMade} onClick={() => setFsDialogOpen(true)}>
				<CallMade />
			</IconButton>
			<IconButton size="small" className={classes.helpOutline} onClick={e => { // clicking opens the popper
				setPopperOpen(!popperOpen)
				setAnchorEl(props.parentRef.current)
			}}>
				<HelpOutline />
			</IconButton>

			<PopperBubble
				open={popperOpen}
				anchorEl={anchorEl}
				placement="top"
				headline="Spring over rundvisning"
				body={`
				Dette element viser dit forbrug sammenlignet med en familie på samme størrelse.
				Ved at klikke på pilen kan du folde dette element ud og få en dybere indsigt,
				samt tips og tricks til at spare vand i din hverdag.
				`}
			/>

			<Dialog
				fullScreen
				hideBackdrop // hides the dark overlay and makes it 'clickable-through'
				className={classes.dialogRoot}
				open={fsDialogOpen}
				onChange={() => setFsDialogOpen(false)}
				TransitionComponent={SlideT}
				PaperProps={{
					style: {
						// colors converted from hexadecimal to RGBA in order to have an opacity effect
						background: 'linear-gradient(to bottom,rgba(7,96,167,.8),rgba(1,39,96,.8))'
					}
				}}
			>
				{/* fullscreen dialog content */}
				{/* the styling is very temporary and kinda f-ed up for whatever reason */}
				{/* I've found that I can somewhat fix it with 'flex: 1' */}
				{/* <GridContainer style={{ height: '100%' }}>

					<DPaper style={{ background: '#3799F1' }}>
						<FullscreenDialog closeDialog={setFsDialogOpen} />
					</DPaper>
				</GridContainer> */}
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
		</Grid >
	)
}

export default Usage