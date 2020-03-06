/* eslint-disable indent */
import React, { Fragment, useState } from 'react'
import { makeStyles, IconButton } from '@material-ui/core'
import { Close } from '../../../variables/icons'

import DialogDetails from './DialogDetails'
import DialogPics from './DialogPics'
import DialogDescription from './DialogDescription'

const useStyles = makeStyles(theme => ({
	closeDialog: {
		position: 'absolute',
		top: 8,
		right: 8,
		color: '#fff'
	}
}))

const FullscreenDialog = props => {
	const [descriptionOpen, setDescriptionOpen] = useState(false)
	const [chosenDescription, setChosenDescription] = useState(null)

	const dialogScreens = [
		{
			headline: 'Sådan kan du spare vand når du bruger toilettet',
			subheadline: `27 procent af vandforbruget går til toiletskyl - en person
			bruger i gennemsnit 10.841 liter vand om året på at skylle. Du kan derfor
			spare meget vand ved at følge disse råd:`,
			imgSrc: 'toilet.svg'
		},
		{
			headline: 'Sådan kan du spare vand når du bader',
			subheadline: `Karbad og brusebad repræsenterer mellem 35% og 45% af dit
			daglige forbrug. Du kan derfor spare meget vand ved at følge disse råd:`,
			imgSrc: 'bath.svg'
		},
		{
			headline: 'Sådan kan du spare vand når du vasker tøj',
			subheadline: `Vidste du at vandudgiften til at vaske ligger på cirka 600-700
			kroner om året. Du kan derfor spare meget vand ved at følge disse råd:`,
			imgSrc: 'washmachine.svg'
		},
		{
			headline: 'Sådan kan du spare vand når du vasker op eller bruger opvaskemaskinen',
			subheadline: `Vidste du at vandudgiften til at vaske ligger på cirka 600-700 kroner
			om året. Du kan derfor spare meget vand vet at følge disse råd:`,
			imgSrc: 'dishwasher.svg'
		}
	]

	const classes = useStyles()

	return (
		<Fragment>
			{descriptionOpen ? (
				<DialogDescription
					setDescriptionOpen={setDescriptionOpen}
					chosenDescription={chosenDescription}
					setChosenDescription={setChosenDescription}
					content={dialogScreens[chosenDescription]}
				/>
			) : (
					<Fragment>
						<DialogDetails />
						<DialogPics setDescriptionOpen={setDescriptionOpen} setChosenDescription={setChosenDescription} />
						<IconButton size="small" className={classes.closeDialog} onClick={() => props.closeDialog(false)}>
							<Close />
						</IconButton>
					</Fragment>
				)}
		</Fragment >
	)
}

export default FullscreenDialog