import { Divider } from '@material-ui/core'
import { DSelect, T, TextF } from 'Components'
import ItemG from 'Components/Containers/ItemG'
import AssignDevice from 'Components/Custom/Devices/AssignDevice'
import DateTimePicker from 'Components/Input/DateTimePicker'
import { useLocalization } from 'Hooks'
import React, { useState } from 'react'

const CreateInstallationForm = (props) => {
	//Hooks
	const t = useLocalization()
	//Redux

	//State
	const [openAssign, setOpenAssign] = useState(false)
	//Const
	const { inst, instDevice, org, handleSelectDevice, handleSetDevice, handleSetInstallation } = props
	// console.log('instDevice', instDevice)
	// console.log('inst', inst)
	const states = [
		{ value: 0, label: t("installations.states.onboarded") },
		{ value: 1, label: t("installations.states.provisioned") }
	]
	const moving = [
		{ value: 0, label: t('actions.no') },
		{ value: 1, label: t('actions.yes') }
	]
	const operations = [
		{ value: 0, label: t("installations.operations.inactive") },
		{ value: 1, label: t("installations.operations.active") },
	]

	//useCallbacks

	//useEffects

	//Handlers

	return (
		<ItemG container style={{ padding: 16, maxWidth: 300 }}>
			<ItemG xs={12} style={{ }}>
				<T variant={'h6'}>{t('sidebar.installation')}</T>
			</ItemG>
			<ItemG xs={12}>
				<TextF
					label={t('installations.fields.address')}
					value={inst.address}
					onChange={e => handleSetInstallation('address')(e.target.value)}
				/>
			</ItemG>
			<ItemG xs={12}>
				<DSelect
					label={t('installations.fields.state')}
					margin={'normal'}
					menuItems={states}
					value={inst.state}
					// onChange={rChangeLanguage}
					onChange={e => handleSetInstallation('state')(e.target.value)}

				/>
			</ItemG>
			<ItemG xs={12}>
				<DSelect
					margin={'normal'}
					label={t('installations.fields.operation')}
					menuItems={operations}
					value={inst.operation}
					onChange={e => handleSetInstallation('operation')(e.target.value)}
				/>
			</ItemG>
			<ItemG xs={12}>
				<DSelect
					label={t('installations.fields.moving')}
					value={inst.moving}
					margin={'normal'}
					menuItems={moving}
					onChange={e => handleSetInstallation('moving')(e.target.value)}
				/>
			</ItemG>
			<ItemG xs={12}>
				<TextF
					disabled
					label={t('devices.fields.org')}
					value={org?.name}
				/>
			</ItemG>
			<ItemG xs={12}><Divider style={{ margin: "12px 0px" }}/></ItemG>
			<ItemG xs={12}>
				<T variant={'h6'}>{t('sidebar.device')}</T>
			</ItemG>
			<ItemG xs={12}>
				<TextF
					onClick={() => setOpenAssign(true)}
					readOnly
					value={instDevice.uuname ? instDevice.name + ' - ' + instDevice.uuname : t('actions.select') + ' ' + t('sidebar.device')}
				/>
				<AssignDevice open={openAssign}
					handleClose={() => setOpenAssign(false)}
					callBack={(dev) => { handleSelectDevice(dev); setOpenAssign(false) }}
				/>
			</ItemG>
			<ItemG xs={12}>
				<DateTimePicker
					value={instDevice.startDate}
					label={t('installations.fields.startDate')}
					onChange={value => handleSetDevice('startDate')(value)}
				/>
			</ItemG>
			<ItemG xs={12}>
				<DateTimePicker
					value={instDevice.endDate}
					label={t('installations.fields.endDate')}
					onChange={value => handleSetDevice('endDate')(value)}
				/>
			</ItemG>
		</ItemG>
	)
}

export default CreateInstallationForm
