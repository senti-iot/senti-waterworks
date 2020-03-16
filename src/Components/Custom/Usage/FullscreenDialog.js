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

	const classes = useStyles()

	return (
		<Fragment>
			{descriptionOpen ? (
				<DialogDescription
					setDescriptionOpen={setDescriptionOpen}
					chosenDescription={chosenDescription}
					setChosenDescription={setChosenDescription}
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