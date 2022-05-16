import { Grid } from '@material-ui/core'
import ItemG from 'Components/Containers/ItemG'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import cx from 'classnames'
import T from 'Components/Typography/T'
import { useSelector } from 'react-redux'

const ClientInfoStyles = makeStyles(theme => ({
	container: {
		height: '100%'
	},
	iG: {
		margin: 8
	},
	address: {
		marginBottom: 0,
		paddingBottom: 0
	},
	addressText: {
		fontSize: '16px',
		fontWeight: 700,
		// lineHeight: '14px'
	},
	t: {
		fontSize: '14px',
		fontWeight: 400,
		lineHeight: '14px'
	}
}))

const ClientInfo = () => {
	//Hooks
	 const classes = ClientInfoStyles()
	//Redux
	const selectedDevices = useSelector(s => s.appState.selectedDevices)
	const installations = useSelector(s => s.data.installations)

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	let addressCls = cx({
		[classes.iG]: true,
		[classes.address]: true
	})
	const renderClientInfo = () => {
		let device = installations[installations.findIndex(f => f.deviceUUID === selectedDevices[0])]
		// console.log(device, device ? true : false)
		console.log(device)


		return <Grid container className={classes.container}>
			{(device && device.streetName) ? <ItemG xs={12} className={addressCls}>
				<T className={classes.addressText}>{device.streetName + ' ' + device.streetNumber}</T>
				<T className={classes.t}>{device.zip + ', ' + device.city}</T>
			</ItemG> : null
			}
			{(device && device.user && device.user.fullName) ? <ItemG xs={12} className={classes.iG}>
				<T className={classes.t}>{device.user.fullName}</T>
			</ItemG> : null}
			{(device && device.streetName) ? <ItemG xs={12} className={classes.iG}>
				<T className={classes.t}>{device.deviceUUID}</T>
			</ItemG> : null}
		</Grid>

	}
	return (
		renderClientInfo()
	)
}

export default ClientInfo
