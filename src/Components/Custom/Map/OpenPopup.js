import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { ItemG, Caption, Info } from 'Components'
import { Link } from 'react-router-dom'
import { useLocalization } from 'Hooks'




const OpenPopup = props => {

	//Hooks
	const t = useLocalization()
	//Redux

	//State

	//Const
	const { m, dontShow } = props

	//useCallbacks

	//useEffects

	//Handlers


	// const { weather } = this.state
	return !dontShow ?
		<ItemG container>
			<ItemG xs={10} container direction={'column'}>
				<Typography variant={'h5'}>{m.address}</Typography>
				{/* <Typography variant={'body1'}>{`${m.uuid}`}</Typography> */}
			</ItemG>
			<ItemG xs={2} container>
				<ItemG container justify={'flex-end'}>
				</ItemG>
			</ItemG>
			<ItemG xs={12}>
				<Caption>{t('installations.fields.instId')}</Caption>
				<Info>{m.uuid}</Info>
			</ItemG>

			{/* <ItemG xs={12}>
				<Caption>{t('devices.fields.address')}</Caption>
				<Info>{m.address ? m.address : t('devices.noAddress')}</Info>
			</ItemG> */}


			<ItemG xs={12} container justify={'flex-end'}>
				<Button variant={'text'} component={Link} to={`/installation/${m.uuid}`}>
					{t('menus.seeMore')}
				</Button>
			</ItemG>
		</ItemG> : null
}

export default OpenPopup
