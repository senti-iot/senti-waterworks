import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core'
import { FadeOutLoader } from 'Components'
import CreateInstallationForm from 'Components/Custom/InstallationsTable/CreateInstallationForm'
import DialogHeader from 'Components/Custom/PageHeader/DialogHeader'
import { putDevice, putInstallation, putUser } from 'data/installations'
import { createUser } from 'data/users'
import { useDispatch, useLocalization, useSelector } from 'Hooks'
import moment from 'moment'
import { getAdminDevices, getAdminInstallations, getAdminUsers } from 'Redux/data'

const CreateInstallation = (props) => {
	//Hooks
	const dispatch = useDispatch()
	const t = useLocalization()

	//Redux
	const org = useSelector(s => s.settings.user?.org)

	//State
	const [inst, setInst] = useState({
		address: '',
		orgUUID: org ? org.uuid : null,
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
	const [instUser, setInstUser] = useState({
		adults: 1,
		children: 0
	})
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: ''
	})
	const [existingUser, setExistingUser] = useState(false)
	const [withoutUser, setWithoutUser] = useState(false)
	const [creating, setCreating] = useState(false)

	//Const
	const { open, handleClose } = props
	//useCallbacks

	//useEffects

	//Handlers
	const handleSetUser = what => value => {
		setInstUser({
			...instUser,
			[what]: value
		})
	}
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
	const handleSelectUser = user => {
		console.log("User", user)
		setInstUser({
			...user
		})
		// setInstUser({
		// })
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

	const handleSetSentiUser = what => value => {
		setUser({
			...user,
			[what]: value
		})
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
			if (withoutUser) {
				//Don't do anything about users
			}
			else {
				if (existingUser) {
					let InstUser = {
						...instUser,
						instUUID: createInstallation.uuid,
						startDate: instDevice.startDate,
						endDate: instDevice.endDate,
						userUUID: instUser.uuid,
					}
					let resInstUser = await putUser(InstUser)
					if (resInstUser) {
						console.log(resInstUser)
					}

				}
				else {


					let SentiUser = {
						...user,
						userName: user.email,
						org: {
							uuid: org.uuid
						},
						state: 2,
						role: { uuid: "943dc3fc-c9f5-4e73-a24f-b0ae334c0c5e" }

					}
					let resUser = await createUser(SentiUser).then(rs => rs.data)
					if (resUser.uuid) {
						let InstUser = {
							...instUser,
							instUUID: createInstallation.uuid,
							startDate: instDevice.startDate,
							endDate: instDevice.endDate,
							userUUID: resUser.uuid,
						}
						let resInstUser = await putUser(InstUser)
						if (resInstUser) {
							console.log(resInstUser)
						}
					}
				}
			}
			if (createDeviceInst.uuid) {
			}
			else {
				console.log(createDeviceInst)
			}
		}

		//End
		await dispatch(await getAdminDevices())
		await dispatch(await getAdminUsers())
		await dispatch(await getAdminInstallations())
		// const getInstallationTags = async () => await dispatch(await getTags())
		setCreating(false)
		handleSetClose()
	}
	const handleSetClose = async () => {
		setInst({
			address: '',
			orgUUID: org ? org.uuid : null,
			state: 0,
			operation: 0,
			moving: 0
		})
		setInstDevice({
			uuid: '',
			uuname: '',
			name: '',
			startDate: moment(),
			endDate: null
		})
		setInstUser({
			adults: 1,
			children: 0
		})
		setUser({
			firstName: '',
			lastName: '',
			email: ''
		})
		setExistingUser(false)
		setWithoutUser(false)
		handleClose()
	}
	return (
		<Dialog
			open={open}
			maxWidth={'lg'}
		>
			<FadeOutLoader overlay on={creating} onChange={handleCreate}>
				<div style={{ height: '100%' }}>

					<DialogHeader label={'menus.create.installation'} />
					<DialogContent >

						<CreateInstallationForm
							loading={creating}
							inst={inst}
							instDevice={instDevice}
							instUser={instUser}
							org={org}
							handleSetUser={handleSetUser}
							handleSetDevice={handleSetDevice}
							handleSetInstallation={handleSetInstallation}
							//Handlers
							handleSelectDevice={handleSelectDevice}
							handleSelectUser={handleSelectUser}
							existingUser={existingUser}
							setExistingUser={setExistingUser}
							withoutUser={withoutUser}
							setWithoutUser={setWithoutUser}
							user={user}
							handleSetSentiUser={handleSetSentiUser}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleStartCreate}>{t('actions.create')}</Button>
						<Button onClick={handleSetClose}>{t('actions.close')}</Button>

					</DialogActions>
				</div>
			</FadeOutLoader>
		</Dialog>
	)
}

export default CreateInstallation
