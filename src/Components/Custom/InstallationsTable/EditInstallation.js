import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core'
import { FadeOutLoader } from 'Components'
import CreateInstallationForm from 'Components/Custom/InstallationsTable/CreateInstallationForm'
import DialogHeader from 'Components/Custom/PageHeader/DialogHeader'
import { getInstallation, postDevice, postInstallation } from 'data/installations'
import { useDispatch, useLocalization, useSelector } from 'Hooks'
import moment from 'moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getAdminDevices, getAdminInstallations } from 'Redux/data'
import FadeLoader from 'Components/Loaders/FadeLoader'

const EditInstallation = (props) => {
	//Hooks
	const dispatch = useDispatch()
	const t = useLocalization()

	//Redux
	const org = useSelector(s => s.settings.user?.org)
	const devices = useSelector(s => s.data.devices)

	//State
	const [inst, setInst] = useState({
		address: '',
		orgUUID: org.uuid,
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
	const [editing, setEditing] = useState(false)
	const [loading, setLoading] = useState(false)
	//Const
	const { open, handleClose } = props
	//useCallbacks
	//useEffects
	useEffect(() => {
		if (!inst.uuid && open) {
			setLoading(true)
		}
	}, [inst.uuid, open])

	//Handlers
	const handleGetData = async () => {
		let inst = await getInstallation(props.instUUID)
		console.log('inst', inst)
		setInst({
			...inst
		})
		let device = devices ? devices[devices.findIndex(f => f.uuid === inst.deviceUUID)] : null
		if (device) {

			setInstDevice({
				...device,
				startDate: inst.startDate,
				endDate: inst.endDate,
				instDevUUID: inst.instDevUUID
			})
		}
		setLoading(false)
	}
	const handleSetUser = what => value => {
		setInstUser({
			...instUser,
			[what]: value
		})
	}

	const handleSelectUser = user => {
		// setInstUser({
		// })
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
	const handleSelectDevice = device => {
		setInstDevice({
			...instDevice,
			startDate: moment(instDevice.startDate).format('YYYY-MM-DD HH:mm:ss'),
			endDate: moment(instDevice.endDate).format('YYYY-MM-DD HH:mm:ss'),
			uuid: device.uuid,
			name: device.name,
			uuname: device.uuname,
		})
	}
	const handleStartEditing = () => {
		setEditing(true)
	}
	const handleFullClose = () => {
		handleClose()
		setInst({
			address: '',
			orgUUID: org.uuid, //Webhouse ApS UUID
			state: 0,
			operation: 0,
			moving: 0
		})
	}
	const handleSetSentiUser = what => value => {
		setUser({
			...user,
			[what]: value
		})
	}

	const handleEdit = async () => {
		//Edit Installation
		let editInstallation = await postInstallation(inst).then(rs => rs)

		//Edit Device Installation
		setTimeout(() => {
			//debounce the edit
		}, 300)
		if (editInstallation.uuid) {
			let device = {
				startDate: moment(instDevice.startDate).format('YYYY-MM-DD HH:mm:ss'),
				endDate: moment(instDevice.endDate).format('YYYY-MM-DD HH:mm:ss'),
				deviceUUID: instDevice.uuid,
				instUUID: editInstallation.uuid,
				uuid: editInstallation.instDevUUID
			}
			console.log(device)
			let editDeviceInst = await postDevice(device)
			if (editDeviceInst.uuid) {
			}
			else {
				console.log(editDeviceInst)
			}
		}

		//End
		await dispatch(await getAdminDevices())
		await dispatch(await getAdminInstallations())
		// const getInstallationTags = async () => await dispatch(await getTags())
		setEditing(false)
		handleFullClose()
	}

	return (
		<Dialog
			open={open}
			maxWidth={'lg'}
		>
			<FadeLoader overlay on={loading} onChange={handleGetData}>
				<FadeOutLoader overlay on={editing} onChange={handleEdit}>
					<div style={{ height: '100%' }}>

						<DialogHeader label={'menus.edits.installation'} />
						<DialogContent>

							<CreateInstallationForm
								loading={editing}
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
								user={user}
								handleSetSentiUser={handleSetSentiUser}
							/>
						</DialogContent>

						<DialogActions>
							<Button onClick={handleStartEditing}>{t('actions.edit')}</Button>
							<Button onClick={handleFullClose}>{t('actions.close')}</Button>
							{/* <Button onClick={() => setLoading(true)}>{t('actions.edit')}</Button> */}
						</DialogActions>
					</div>
				</FadeOutLoader>
			</FadeLoader>
		</Dialog>
	)
}

export default EditInstallation
