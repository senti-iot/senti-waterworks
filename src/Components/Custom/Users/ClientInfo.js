import { Button, Grid } from '@material-ui/core'
import ItemG from 'Components/Containers/ItemG'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import cx from 'classnames'
import T from 'Components/Typography/T'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useLocalization } from 'Hooks'

const ClientInfoStyles = makeStyles(theme => ({
	container: {
		height: '100%'
	},
	iG: {
		margin: 6
	},
	address: {
		marginBottom: 0,
		paddingBottom: 0
	},
	addressText: {
		// fontSize: '16px',
		fontWeight: 700,
		// lineHeight: '14px'
		[theme.breakpoints.down('md')]: {
			fontSize: '1em'
		},
		margin: '0px 0px 8px 0px',
		letterSpacing: 1,
		height: 24
	},
	t: {
		fontSize: '14px',
		fontWeight: 400,
		lineHeight: '14px',
	},
	seeMore: {
		position: 'absolute',
		// top: 'auto',
		bottom: 0,
		// left: 'auto',
		right: 0,
		margin: 8
	}
}))

const ClientInfo = () => {
	//Hooks
	const classes = ClientInfoStyles()
	const history = useHistory()
	const t = useLocalization()
	//Redux
	const selectedDevices = useSelector(s => s.appState.selectedDevices)
	const installations = useSelector(s => s.data.installations)

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	const handleGoToInstallation = () => {
		let installation = installations[installations.findIndex(f => f.deviceUUID === selectedDevices[0])]
		history.push(`/installation/${installation.uuid}`)
	}

	let addressCls = cx({
		[classes.iG]: true,
		[classes.address]: true
	})
	const renderGoToInstallation = () => {
		return <div className={classes.seeMore}>
			<Button variant={'contained'} color={'secondary'} style={{ color: '#fff' }} onClick={handleGoToInstallation}>{t('actions.seeMore')}</Button>
		</div>
	}
	const renderClientInfo = () => {
		let device = installations[installations.findIndex(f => f.deviceUUID === selectedDevices[0])]
		// let user = installations[installations.findIndex(f => f.deviceUUID === selectedDevices[0])].user
		// console.log(device, device ? true : false)
		// console.log('user', user)


		return <Grid container className={classes.container} >
			{(device && device.streetName) ? <ItemG xs={12} className={addressCls}>
				<T variant='h6' className={classes.addressText}>{device.streetName + ' ' + device.streetNumber}</T>
				<T className={classes.t}>{device.zip + ', ' + device.city}</T>
			</ItemG> : null
			}
			{(device && device.user && device.user.fullName) ? <ItemG xs={12} className={classes.iG}>
				<T className={classes.t}>{device.user.fullName}</T>
			</ItemG> : null}
			{(device && device.user && device.user.fullName) ? <ItemG xs={12} className={classes.iG}>
				<T className={classes.t}>{device.user.email}</T>
				<T className={classes.t}>{device.user.phone}</T>
				<T className={classes.t}>{device.user.mobile}</T>
			</ItemG> : null}
			{(device && device.user && device.user.fullName) ? <ItemG xs={12} className={classes.iG}>
			</ItemG> : null}
			{/* {(device && device.streetName) ? <ItemG xs={12} className={classes.iG}>
				<T className={classes.t}>{device.deviceUUID}</T>
			</ItemG> : null} */}
			{renderGoToInstallation()}

		</Grid>

	}
	return (
		renderClientInfo()
	)
}

export default ClientInfo
