import React, { Fragment } from 'react'
import { makeStyles, IconButton, Typography } from '@material-ui/core'
import { Close, ArrowBack } from '../../../variables/icons'
// import waterDropBlue from './familie.svg'

const useStyles = makeStyles(theme => ({
	closeDialog: {
		color: '#fff'
	},
	navigationBox: {
		padding: 16,
		display: 'flex',
		justifyContent: 'space-between'
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
		lineHeight: 1.25
	}
}))

const DialogDescription = props => {
	const { content, chosenDescription, setChosenDescription, setDescriptionOpen } = props

	const handleStepChange = () => {
		if (chosenDescription === 0) return // avoid crashing

		setChosenDescription(prev => prev - 1)
	}

	const classes = useStyles()

	return (
		<Fragment>
			{/* container for back and cancel buttons */}
			<div className={classes.navigationBox}>
				<IconButton size="small" className={classes.closeDialog} onClick={handleStepChange}>
					<ArrowBack />
				</IconButton>
				<IconButton size="small" className={classes.closeDialog} onClick={() => setDescriptionOpen(false)}>
					<Close />
				</IconButton>
			</div>

			{/* container for headline, subheadline, and image */}
			<div className={classes.header}>
				<div className={classes.headlineBox}>
					<Typography variant="h4" style={{ fontWeight: 500 }}>{content.headline}</Typography>
					<Typography variant="body1" className={classes.subheadline}>{content.subheadline}</Typography>
				</div>
				<div className={classes.imageBox}>
					{/* edit CSS for the image if necessary */}
					<img src={content.imgSrc} alt="" style={{ maxWidth: '100%', height: "auto" }} />
				</div>
			</div>

			<div style={{ width: '70%' }}>
				<ul className={classes.list}>
					{content.listItems.map((item, index) => (
						<Typography key={index} variant="body1" className={classes.listItem}>{item}</Typography>
					))}
				</ul>
			</div>
		</Fragment>
	)
}

export default DialogDescription