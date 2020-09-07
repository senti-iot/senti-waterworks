import React from 'react'
import { makeStyles, IconButton, Typography } from '@material-ui/core'
import { Close } from 'variables/icons'
import { useLocalization } from 'Hooks'
// import waterDropBlue from './familie.svg'

import toilet from 'assets/icons/toilet.svg'
import bath from 'assets/icons/bath.svg'
import washmachine from 'assets/icons/washmachine.svg'
import dishwasher from 'assets/icons/dishwasher.svg'

const useStyles = makeStyles(theme => ({
	container: {
		background: theme.palette.primary.main,
		borderRadius: 8,
		margin: 16,
		padding: 16
	},
	closeDialog: {
		color: '#fff'
	},
	navigationBox: {
		padding: 16,
		display: 'flex',
		justifyContent: 'flex-end'
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '0 40px'
	},
	headlineBox: {
		width: '60%'
	},
	imageBox: {
		width: '30%',
		display: 'flex',
		justifyContent: 'center'
	},
	subheadline: {
		marginTop: 16,
		fontSize: 22,
		fontWeight: 300
	},
	list: {
		listStyleImage: `url(./water.drop.blue.svg)`
	},
	listItem: {
		fontSize: 19,
		marginTop: 48,
		fontWeight: 300,
		lineHeight: 1.25,
		[theme.breakpoints.down('lg')]: {
			marginTop: 16
		}
	}
}))

const UsageReduction = props => {
	const t = useLocalization()
	const { chosenDescription, setDescriptionOpen } = props

	const dialogPics = [toilet, bath, washmachine, dishwasher] // SVG images for each section

	// const handleStepChange = () => {
	// 	if (chosenDescription === 0) return // avoid crashing

	// 	setChosenDescription(prev => prev - 1)
	// }

	const classes = useStyles()
	console.log('chosenDescription', chosenDescription)
	return (
		<div className={classes.container}>
			{/* container for back and cancel buttons */}
			<div className={classes.navigationBox}>
				<IconButton size="small" className={classes.closeDialog} onClick={() => setDescriptionOpen(false)}>
					<Close />
				</IconButton>
			</div>

			{/* container for headline, subheadline, and image */}
			<div className={classes.container}>

				<div className={classes.header}>
					<div className={classes.headlineBox}>
						<Typography variant="h4" style={{ fontWeight: 500 }}>{t(`usage.dialogScreens.${chosenDescription}.headline`)}</Typography>
						<Typography variant="body1" className={classes.subheadline}>{t(`usage.dialogScreens.${chosenDescription}.subheadline`)}</Typography>
					</div>
					<div className={classes.imageBox}>
						{/* edit CSS for the image if necessary */}
						<img src={dialogPics[chosenDescription]} alt="" style={{ maxWidth: '100%', height: "auto" }} />
					</div>
				</div>

				<div style={{ width: '70%' }} >
					<ul className={classes.list}>
						{/* problem below */}
						<Typography key={'step1'} variant="body1" className={classes.listItem}>{t(`usage.dialogScreens.${chosenDescription}.steps.0`)}</Typography>
						<Typography key={'step2'} variant="body1" className={classes.listItem}>{t(`usage.dialogScreens.${chosenDescription}.steps.1`)}</Typography>
						<Typography key={'step3'} variant="body1" className={classes.listItem}>{t(`usage.dialogScreens.${chosenDescription}.steps.2`)}</Typography>
						<Typography key={'step4'} variant="body1" className={classes.listItem}>{t(`usage.dialogScreens.${chosenDescription}.steps.3`)}</Typography>

					</ul>
				</div>
			</div>
		</div>
	)
}

export default UsageReduction