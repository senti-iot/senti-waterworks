import { Button, DialogActions, Divider } from '@material-ui/core'
import { ItemG, T } from 'Components'
import DialogHeader from 'Components/Custom/PageHeader/DialogHeader'
import { useLocalization } from 'Hooks'
import React from 'react'

const Group = (props) => {
	//Hooks
	const t = useLocalization()
	//Redux

	//State

	//Const
	const tag = props.g
	const { handleClose } = props

	//useCallbacks

	//useEffects

	//Handlers

	return (
		<div>

			<DialogHeader noLoc label={tag.name} />
			<ItemG container style={{ padding: 16 }} spacing={0}>
				<ItemG xs={12} justifyContent={'center'}>
					<T variant={'caption'}>UUID</T>
					<T>{tag.uuid}</T>
				</ItemG>
				<ItemG xs={12}>
					<Divider />
				</ItemG>
				<ItemG xs={12} justifyContent={'center'}>
					<T variant={'caption'}>Description</T>
					<T>{tag.description}</T>
				</ItemG>
				<ItemG xs={12}>
					<Divider />
				</ItemG>
				<ItemG xs={12} justifyContent={'center'}>
					<T variant={'caption'}>Color</T>
			 		<div style={{ borderRadius: 4, background: tag.color, width: 100, height: 16, margin: 4 }}></div>
				</ItemG>
				<ItemG xs={12}>
					<Divider />
				</ItemG>
			</ItemG>

			<DialogActions>

				<ItemG container>
					<Button onClick={handleClose}>{t('actions.close')}</Button>
					<Button>{t('actions.create')}</Button>
				</ItemG>
			</DialogActions>
		</div>
	)
}

export default Group
