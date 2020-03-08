import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import Toilet from "assets/icons/toilet.svg"
import Bathroom from "assets/icons/bath.svg"
import Dishwasher from "assets/icons/dishwasher.svg"
import WashingMachine from "assets/icons/washmachine.svg"
import { useLocalization } from 'Hooks'
const useStyles = makeStyles(theme => ({
	container: {
		background: 'transparent',
		opacity: '0.9',
		height: '50%',
		padding: 32,
		boxSizing: 'border-box',
		display: 'flex',
		flexDirection: 'column'
	},
	textBox: {
		textAlign: 'center',
		color: '#fff',
		// marginBottom: 16,
		fontWeight: 500
	},
	flex: {
		// margin: '32px 0',
		display: 'flex',
		padding: 32,
		justifyContent: 'space-between',
		flex: 1,
		boxSizing: 'border-box'
	},
	imgBox: {
		flex: 1,
		background: 'rgba(12,59,105,0.7)',
		margin: '0 24px',
		padding: 16,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center',
		boxSizing: 'border-box',
		borderRadius: 4,
		cursor: 'pointer',
		width: '25%'
	},
	img: {
		// flex: 1,
		width: '100%',
		height: 'auto',
		maxWidth: 150,
		maxHeight: 120
	},
	groupLabel: {
		color: '#fff',
		marginTop: 8
	}
}))

const DialogPics = props => {
	//Hooks
	const t = useLocalization()
	//Redux

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	const picsAndText = [
		{
			imgSrc: Toilet,
			text: t('groups.toilet')
		},
		{
			imgSrc: Bathroom,
			text: t('groups.bathroom')
		},
		{
			imgSrc: WashingMachine,
			text: t('groups.washmachine')
		},
		{
			imgSrc: Dishwasher,
			text: t('groups.dishwasher')
		}
	]

	const classes = useStyles()

	return (
		<div className={classes.container}>
			<Typography variant="h4" className={classes.textBox} style={{}}>
				{t('tipsAndTricks.title')}
			</Typography>

			<div className={classes.flex}>
				{picsAndText.map(({ imgSrc, text }, index) => (
					<div key={index} className={classes.imgBox} onClick={() => {
						props.setDescriptionOpen(true)
						props.setChosenDescription(index)
					}}>
						<img src={imgSrc} alt="" className={classes.img} />
						<Typography variant="h6" className={classes.groupLabel}>{text}</Typography>
					</div>
				))}
			</div>
		</div>
	)
}

export default DialogPics