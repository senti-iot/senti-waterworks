import React from 'react'
import { makeStyles, IconButton, CircularProgress } from '@material-ui/core'
import { Close } from '../../../variables/icons'

const useStyles = makeStyles(theme => ({
	closeDialog: {
		position: 'absolute',
		top: 8,
		right: 8
	}
}))

const DialogDescription = props => {
	console.log(props)
	const classes = useStyles()

	return (
		<div style={{ position: 'relative' }}>
			<p style={{ margin: 0 }}>You chose {props.content.headline}</p>
			<p style={{ margin: 0 }}>Pavel is working on this...</p>
			<CircularProgress color="secondary" />
			<IconButton size="small" className={classes.closeDialog} onClick={() => props.setDescriptionOpen(false)}>
				<Close />
			</IconButton>
		</div>
	)
}

export default DialogDescription