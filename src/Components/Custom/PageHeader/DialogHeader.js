import { CardHeader, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ItemG from 'Components/Containers/ItemG'
import T from 'Components/Typography/T'
import { useLocalization } from 'Hooks'
import React from 'react'
import { Close } from 'variables/icons'

const dialogHeaderStyles = makeStyles(theme => ({
	cardHeader: {
		display: 'flex',
		justifyContent: 'center',
		background: theme.headerColor,
		borderRadius: "4px 4px 0px 0px"
	},
	closeButton: {
		color: "#fff"
	},
	avatar: {
		// background: '#fff',
		// color: theme.headerColor,
		color: '#fff',
		borderRadius: 8
	},
}))


const DialogHeader = props => {
	//Hooks
	const t = useLocalization()
	const classes = dialogHeaderStyles()

	//Redux

	//State

	//Const
	const { label, close, handleCloseButton } = props
	//useCallbacks

	//useEffects

	//Handlers

	return (
		<CardHeader
			className={classes.cardHeader}
			avatar={<ItemG container alignItems={'center'}>
				{props.icon ? <props.icon className={classes.avatar} /> : null}
				{/* <SettingsRounded className={classes.avatar} /> */}
			</ItemG>}
			title={<T variant={'h6'} style={{ color: '#fff' }}>{t(label)}</T>}
			action={close ? <IconButton onClick={handleCloseButton}>
				<Close className={classes.closeButton} />
			</IconButton> : null}
		/>
	)
}

export default DialogHeader
