import React, { useState } from 'react'
import { makeStyles, /* Typography, Button, */ ButtonBase, Dialog } from '@material-ui/core'
import Toilet from "assets/icons/toilet.svg"
import Bathroom from "assets/icons/bath.svg"
import Dishwasher from "assets/icons/dishwasher.svg"
import WashingMachine from "assets/icons/washmachine.svg"
import { useLocalization } from 'Hooks'
import ItemG from 'Components/Containers/ItemG'
import GridContainer from 'Components/Containers/GridContainer'
import { HeaderText } from 'Components/Custom/Styles/arcGraphStyles'
import { emphasize } from '@material-ui/core/styles'
import UsageReduction from 'Components/Custom/Usage/UsageReduction'
import { BPaper } from 'Styles/containerStyle'
import SlideT from 'Components/Transitions/SlideT'

const useStyles = makeStyles(theme => ({
	bigButton: {
		padding: 16,
		display: 'flex',
		flexWrap: 'wrap',
		// width: 200,
		height: 240,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		// flexFlow: 'column',
		background: theme.palette.primary.main,
		color: '#ffffff',
		borderRadius: 8,
		"&:hover": {
			backgroundColor: emphasize(theme.palette.primary.main, 0.2)
		},
		transition: '300ms all ease'
	},
	img: {
		width: 160,
		height: 160
	},
	dialogRoot: {
		height: 'calc(100vh - 100px)',
		marginTop: 70,
		// background: theme.appBackground
	},
}))

const UsageTips = props => {
	//Hooks
	const t = useLocalization()
	//Redux

	//State
	// const [message, setMessage] = useState('')
	const [descriptionOpen, setDescriptionOpen] = useState(false)
	const [chosenDescription, setChosenDescription] = useState(null)

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

	// const handleChange = e => {
	// 	e.stopPropagation() // otherwise it closes the dialog
	// 	setMessage(e.target.value)
	// }

	// const handleSubmit = e => {
	// 	e.preventDefault()
	// }

	const classes = useStyles()

	return (
		<>
			<ItemG container className={classes.container}>

				{/* left column with pics */}
				<ItemG xs={12} md={12} container>
					<HeaderText variant="h4">
						{t('tipsAndTricks.title')}
					</HeaderText>
					<GridContainer xs={12} container>

						{picsAndText.map(({ imgSrc, text }, index) => (
							<ItemG xs={6} md={3} key={index} container justify={'center'}>
								<ButtonBase variant={'contained'} onClick={() => {
									setDescriptionOpen(true)
									setChosenDescription(index)
								}} className={classes.bigButton}>
									<ItemG xs={12}>
										<img src={imgSrc} alt="" className={classes.img} />
									</ItemG>
									<ItemG xs={12}>
										<HeaderText variant="h6">{text}</HeaderText>
									</ItemG>
								</ButtonBase>
							</ItemG>
						))}
					</GridContainer>
				</ItemG>

				{/* right column with textarea */}
				{/* <ItemG xs={12} md={5} className={classes.textareaContainer} >
					<Typography variant="h4" className={classes.textBox} style={{}}>
					Mine gode råd
					</Typography>
					<textarea
						className={classes.textarea}
						// onChange={handleChange}
						// value={message}
						placeholder="Her kan du skrive dine gode råd til at spare vand"
					/>
					<Button type="submit" variant="contained" color="secondary" className={classes.submitBtn}>Send</Button>
				</ItemG> */}
			</ItemG>
			<Dialog
				fullScreen
				hideBackdrop // hides the dark overlay and makes it 'clickable-through'
				className={classes.dialogRoot}
				open={descriptionOpen}
				TransitionComponent={SlideT}
				onClose={() => setDescriptionOpen(false)}
				onBackdropClick={() => setDescriptionOpen(false)}
				keepMounted
				disablePortal
				PaperComponent={BPaper}
				PaperProps={{
					style: { width: '100%', margin: 0, height: '100%', padding: '0px 16px' }
				}}
			>
				{/* <AppPaper color={colorTheme} style={{ padding: 30, background: "linear-gradient(180deg, rgba(7, 96, 167, 0.826049) 39.28%, rgba(1, 39, 96, 0.994564) 138.69%);" }}> */}
				{/* <BPaper style={{ padding: 0 }}> */}

				<UsageReduction setDescriptionOpen={setDescriptionOpen} chosenDescription={chosenDescription}/>
				{/* </BPaper> */}
				{/* </AppPaper> */}
			</Dialog>
		</>
	)
}

export default UsageTips