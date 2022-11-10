import React from 'react'
import { Button } from '@material-ui/core'
import { ItemG, Caption, Info } from 'Components'
import { Link } from 'react-router-dom'
import { useLocalization } from 'Hooks'
import { setSelectedDevices } from 'Redux/appState'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"	;
import { makeStyles } from '@material-ui/styles'


const OpenPopupStyles = makeStyles(theme => ({
	contact: {
		margin: 0,
	}
}))


const OpenPopup = props => {

	//Hooks
	const t = useLocalization()
	const classes = OpenPopupStyles()
	const dispatch = useDispatch()
	const history = useHistory()
	//Redux
	//State

	//Const
	const { m, dontShow } = props

	//useCallbacks

	//useEffects

	//Handlers
	const handleFilterData = () => {
		if (m.deviceUUID) {
			dispatch(setSelectedDevices([m.deviceUUID]))
			history.push('/')

		}
	}
	const renderAddress = () => {
		return m?.streetName ? (m.streetName ? m.streetName : '') + (m.streetNumber ? ' ' + m.streetNumber : '') + (m.side ? ' ' + m.side : '') + (m.zip ? ', ' + m.zip : '') + (m.city ? ' ' + m.city : '') : null
	}
	const renderUser = () => {
		if (m && m.user) {
			return <>
				<Info className={classes.contact}>{m.user.fullName}</Info>
				<Info className={classes.contact}><Link component={'a'} target={'_blank'} href={`mailto:${m.user.email}`}>{m.user.email}</Link></Info>
				<Info><Link component={'a'} target={'_blank'} href={`tel:${m.user.phone}`}>{m.user.phone}</Link></Info>
			</>
		}
		else return null
	}
	// const { weather } = this.state
	return !dontShow ?
		<ItemG container>
			{/* <ItemG xs={10} container direction={'column'}>
				<Typography variant={'h5'}>{m.address}</Typography>
			</ItemG>
			<ItemG xs={2} container>
				<ItemG container justify={'flex-end'}>
				</ItemG>
			</ItemG> */}
			<ItemG xs={12}>
				{renderUser()}
			</ItemG>

			<ItemG xs={12}>
				<Caption>{t('devices.fields.address')}</Caption>
				<Info>{renderAddress()}</Info>
			</ItemG>

			{/**
			 * Instead of uuid, include latest usage or something else
			 */ }
			{/* <ItemG xs={12}>
				<Caption>{t('installations.fields.instId')}</Caption>
				<Info>{m.uuid}</Info>
			</ItemG> */}

			<ItemG xs={12} container justify={'flex-end'}>
				<Button variant={'text'} color={'primary'} component={Link} to={`/installation/${m.uuid}`}>
					{t('menus.seeMore')}
				</Button>
				<Button variant={'text'} color={'secondary'} onClick={handleFilterData}>
					{t('actions.seeData')}
				</Button>
			</ItemG>
		</ItemG> : null
}

export default OpenPopup
