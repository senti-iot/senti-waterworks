import { Button, Grid } from '@material-ui/core'
import ItemG from 'Components/Containers/ItemG'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import cx from 'classnames'
import T from 'Components/Typography/T'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useLocalization } from 'Hooks'
import Link from 'Components/Custom/Link/Link'

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
	const installations = useSelector(s => s.data.installations)
	const selectedInstallations = useSelector(s => s.appState.selectedInstallations)

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	const handleGoToInstallation = () => {
		history.push(`/installation/${selectedInstallations[0]}`)
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
		let installation = installations.find(f => f.uuid === selectedInstallations[0])

		return <Grid container className={classes.container} >
			{(installation && installation.streetName) ? <ItemG xs={12} className={addressCls}>
				<T variant='h6' className={classes.addressText}>{installation.streetName + ' ' + installation.streetNumber}</T>
				<T className={classes.t}>{installation.zip + ', ' + installation.city}</T>
			</ItemG> : null
			}
			{(installation && installation.user && installation.user.fullName) ? <ItemG xs={12} className={classes.iG}>
				<T className={classes.t}>{installation.user.fullName}</T>
			</ItemG> : null}
			{(installation && installation.user && installation.user.fullName) ? <ItemG xs={12} className={classes.iG}>
				<T className={classes.t}><Link component={'a'} target={'_blank'} href={`mailto:${installation.user.email}`}>{installation.user.email}</Link></T>
				<T className={classes.t}><Link component={'a'} target={'_blank'} href={`tel:${installation.user.phone}`}>{installation.user.phone}</Link></T>

				<Link component={'a'} target={'_blank'} href={`tel:${installation.user.mobile}`}>
					<T className={classes.t}>{installation.user.mobile}</T>
				</Link>
			</ItemG> : null}
			{(installation && installation.user && installation.user.fullName) ? <ItemG xs={12} className={classes.iG}>
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
