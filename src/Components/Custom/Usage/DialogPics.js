import React, { useState } from 'react'
import { makeStyles, Typography, Button } from '@material-ui/core'
import Toilet from "assets/icons/toilet.svg"
import Bathroom from "assets/icons/bath.svg"
import Dishwasher from "assets/icons/dishwasher.svg"
import WashingMachine from "assets/icons/washmachine.svg"
import { useLocalization } from 'Hooks'
import ItemG from 'Components/Containers/ItemG'
import GridContainer from 'Components/Containers/GridContainer'

const useStyles = makeStyles(theme => ({
	container: {
		width: '100%',
		background: 'transparent',
		opacity: '0.9',
		height: '45%',
		padding: 32,
		boxSizing: 'border-box',
		display: 'flex'
	},
	textBox: {
		color: '#fff',
		fontWeight: 500
	},
	flex: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		padding: '32px 0',
		justifyContent: 'space-between',
		flex: 1,
		boxSizing: 'border-box'
	},
	imgBox: {
		marginRight: 32,
		flex: 1,
		background: '#20619F',
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
		maxWidth: 120,
		maxHeight: 100
	},
	groupLabel: {
		color: '#fff',
		marginTop: 8
	},
	textareaContainer: {
		width: '40%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		paddingLeft: 16
	},
	textarea: {
		background: '#20619F',
		color: '#fff',
		marginTop: 32,
		resize: 'none',
		border: 'none',
		outline: 'none',
		borderRadius: 4,
		flex: 1,
		padding: '4px 8px',
		fontSize: 18,
		'&::placeholder': {
			color: '#fff'
		}
	},
	submitBtn: {
		color: '#fff',
		alignSelf: 'flex-end',
		marginTop: 16
	}
}))

const DialogPics = props => {
	//Hooks
	const t = useLocalization()
	//Redux

	//State
	const [message, setMessage] = useState('')

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

	const handleChange = e => {
		e.stopPropagation() // otherwise it closes the dialog
		setMessage(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault()
	}

	const classes = useStyles()

	return (
		<GridContainer className={classes.container}>

			{/* left column with pics */}
			<ItemG xs={12} md={7}>
				<Typography variant="h4" className={classes.textBox} style={{}}>
					{t('tipsAndTricks.title')}
				</Typography>

				<GridContainer className={classes.flex}>
					{picsAndText.map(({ imgSrc, text }, index) => (
						<ItemG xs={6} md={3} key={index} className={classes.imgBox} onClick={() => {
							props.setDescriptionOpen(true)
							props.setChosenDescription(index)
						}}>
							<img src={imgSrc} alt="" className={classes.img} />
							<Typography variant="h6" className={classes.groupLabel}>{text}</Typography>
						</ItemG>
					))}
				</GridContainer>
			</ItemG>

			{/* right column with textarea */}
			<ItemG xs={12} md={5} className={classes.textareaContainer} onSubmit={handleSubmit}>
				<Typography variant="h4" className={classes.textBox} style={{}}>
					Mine gode råd
				</Typography>
				<textarea
					className={classes.textarea}
					onChange={handleChange}
					value={message}
					placeholder="Her kan du skrive dine gode råd til at spare vand"
				/>
				<Button type="submit" variant="contained" color="secondary" className={classes.submitBtn}>Send</Button>
			</ItemG>
		</GridContainer>
	)
}

export default DialogPics