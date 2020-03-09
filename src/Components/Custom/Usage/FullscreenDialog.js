/* eslint-disable indent */
import React, { Fragment, useState } from 'react'
import { makeStyles, IconButton } from '@material-ui/core'
import { Close } from '../../../variables/icons'

import DialogDetails from './DialogDetails'
import DialogPics from './DialogPics'
import DialogDescription from './DialogDescription'

import toilet from 'assets/icons/toilet.svg'
import bath from 'assets/icons/bath.svg'
import washmachine from 'assets/icons/washmachine.svg'
import dishwasher from 'assets/icons/dishwasher.svg'

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
			imgSrc: toilet,
			listItems: [
				`Hvis du har et nyt toilet med 2-skyl, og konsekvent bruger det store
				skyl, hver gang du her på toilet, bruger du 3 liter mere pr. gang end nødvendigt.`,
				`Du kan også skylle sjældnere ud, end du plejer, lad fx. væere med at skylle ud,
				hvis du bare har tisset, eller undlade at putte snotpapir og lignende i toilletet
				for derefter at skylle det ud.`,
				`Brug regnvand til toiletskylning. Dette er en lidt mere omfattende mulighed, idet
				et opsamlingsanlæg skal tilsluttes kloaknettet af en autoriseret vvs'er og opfylde
				bygningsreglementet, men tilgengæld kan bruges til meget mere end toiletskyl, fx
				vaskemaskinen, havevanding og bilvask.`
			]
		},
		{
			headline: 'Sådan kan du spare vand når du bader',
			subheadline: `Karbad og brusebad repræsenterer mellem 35% og 45% af dit
			daglige forbrug. Du kan derfor spare meget vand ved at følge disse råd:`,
			imgSrc: bath,
			listItems: [
				`Vælg et brusebad frem for et karbad. Et karbad forbruger nemt 200 liter
				vand, mens du kun bruger ca. 35 liter på et brusebad.`,
				`Tag et kort bad hvor du i perioderne under badet ikke lader vandet løbe
				i mere end 5 min i træk.`,
				`Sluk for vandet mens du sæber dig ind.`,
				`Køb en sparebruser. Så bruger du kun 6-12 liter vand i minuttet - halvt
				så meget som en almindelig bruser.`
			]
		},
		{
			headline: 'Sådan kan du spare vand når du vasker tøj',
			subheadline: `Vidste du at vandudgiften til at vaske ligger på cirka 600-700
			kroner om året. Du kan derfor spare meget vand ved at følge disse råd:`,
			imgSrc: washmachine,
			listItems: [
				`Spring forvasken over. Tøjet et sjældent så snavset, at den er nødvendigt
				med forvask.`,
				`Tøjet bliver rent på et kort program, medmindre dit tøj er meget beskidt.
				Vælg normalvask eller strygeletprogrammet. Finvaskprogrammet har en høj
				vandstand, og bruger derfor mere vand.`,
				`Fyld vaskemaskinen op og vask færre vaske gange.`,
				`Luft tøjet i stedet for. Ved at lufte tøj som ikke er tæt siddende, kan det
				sagtens bruges flere dage. På den måde holder tøjet også længere. For vask
				lider på tøjet.`
			]
		},
		{
			headline: 'Sådan kan du spare vand når du vasker op eller bruger opvaskemaskinen',
			subheadline: `Vidste du at vandudgiften til at vaske ligger på cirka 600-700 kroner
			om året. Du kan derfor spare meget vand vet at følge disse råd:`,
			imgSrc: dishwasher,
			listItems: [
				`Brug altid en balje frem for at vaske op under rindende vand, hvis du vasker op
				i hånden.`,
				`Har du opvaskemachine, skan den fyldes helt op, før den startes. Du behøver ikke
				skylle tallerkenerne, det er nok at skrabe madresterne af. Gå desuden efter
				A-mærkedehvidvare, gerne A++, som sikrer et lavt vand- og energiforbrug.`,
				`Nyere opvaskemaskiner er alle sammen udstyret med et eco-program, som bruger
				meget lidt vand til en opvask. Nogle af dem bruger endda ikke mere end 10 liter
				vand på en enkelt opvask. Ældre opvaskemaskiner uden eco-program vil komme op på
				omtrent 20 liter vand til en opvask.`
			]
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