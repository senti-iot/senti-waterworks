import { Button, Dialog, DialogActions } from '@material-ui/core'
import { FadeOutLoader } from 'Components'
import CreateInstallationForm from 'Components/Custom/InstallationsTable/CreateInstallationForm'
import DialogHeader from 'Components/Custom/PageHeader/DialogHeader'
import { putDevice, putInstallation } from 'data/installations'
import { useDispatch, useLocalization, useSelector } from 'Hooks'
import moment from 'moment'
import React, { useState } from 'react'
import { getAdminDevices, getAdminInstallations } from 'Redux/data'

const CreateInstallation = (props) => {
	//Hooks
	const dispatch = useDispatch()
	const t = useLocalization()

	//Redux
	const org = useSelector(s => s.settings.user?.org)

	//State
	const [inst, setInst] = useState({
		address: '',
		orgUUID: org.uuid, //Webhouse ApS UUID
		state: 0,
		operation: 0,
		moving: 0
	})
	const [instDevice, setInstDevice] = useState({
		uuid: '',
		uuname: '',
		name: '',
		startDate: moment(),
		endDate: null
	})
	const [creating, setCreating] = useState(false)

	//Const
	const { open, handleClose } = props
	//useCallbacks

	//useEffects

	//Handlers
	const handleSetDevice = what => value => {
		setInstDevice({
			...instDevice,
			[what]: value
		})
	}
	const handleSetInstallation = what => value => {
		setInst({
			...inst,
			[what]: value
		})
	}
	const handleSelectDevice = device => {
		setInstDevice({
			...instDevice,
			uuid: device.uuid,
			name: device.name,
			uuname: device.uuname,
		})
	}
	const handleStartCreate = () => {
		setCreating(true)
	}

	const handleCreate = async () => {
		//Create Installation
		let createInstallation = await putInstallation(inst).then(rs => rs)

		//Create Device Installation
		setTimeout(() => {

		}, 300);
		if (createInstallation.uuid) {
			let device = {
				startDate: instDevice.startDate,
				endDate: instDevice.endDate,
				deviceUUID: instDevice.uuid,
				instUUID: createInstallation.uuid
			}
			let createDeviceInst = await putDevice(device)
			if (createDeviceInst.uuid) {
			}
			else {
				console.log(createDeviceInst)
			}
		}

		//End
		await dispatch(await getAdminDevices())
		await dispatch(await getAdminInstallations())
		// const getInstallationTags = async () => await dispatch(await getTags())
		setCreating(false)
		handleClose()


	}
	return (
		<Dialog
			open={open}
		>
			<FadeOutLoader overlay on={creating} onChange={handleCreate}>
				<div>

					<DialogHeader label={'menus.create.installation'} />
					<CreateInstallationForm
						loading={creating}
						inst={inst}
						instDevice={instDevice}
						org={org}
						handleSetDevice={handleSetDevice}
						handleSetInstallation={handleSetInstallation}
						//Handlers
						handleSelectDevice={handleSelectDevice}
					/>
					<DialogActions>
						<Button onClick={handleStartCreate}>{t('actions.create')}</Button>
						<Button onClick={handleClose}>{t('actions.close')}</Button>

					</DialogActions>
				</div>
			</FadeOutLoader>
		</Dialog>
	)
}

export default CreateInstallation
