import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core'
import { FadeOutLoader } from 'Components'
import CreateInstallationForm from 'Components/Custom/InstallationsTable/CreateInstallationForm'
import DialogHeader from 'Components/Custom/PageHeader/DialogHeader'
import { getInstallation, getInstUser, postDevice, postInstallation, postInstUser, putUser } from 'data/installations'
import { useDispatch, useLocalization, useSelector } from 'Hooks'
import moment from 'moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getAdminDevices, getAdminInstallations } from 'Redux/data'
import FadeLoader from 'Components/Loaders/FadeLoader'
import { createUser } from 'data/users'

const EditInstallation = (props) => {
	//Hooks
	const dispatch = useDispatch()
	const t = useLocalization()

	//Redux
	const org = useSelector(s => s.settings.user?.org)
	const devices = useSelector(s => s.data.devices)
	const users = useSelector(s => s.data.users)

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
	const [withoutUser, setWithoutUser] = useState(false)
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
		let user = users ? users[users.findIndex(f => f.uuid === inst.sentiUserUUID)] : null
		console.log(users)
		console.log('user', user)
		if (user) {
			setExistingUser(true)
			setInstUser(user)
			setUser(user)
		}
		else {
			setWithoutUser(true)
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
		setInstUser({
			...user
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
	const handleSetClose = () => {
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

		//#region User Part

		if (withoutUser) {
			//Set the current instUser to ended
			console.log(inst.instUserUUID)
			let user = await getInstUser(inst.instUserUUID)
			console.log('instUser', user)
			user.endDate = moment().format('YYYY-MM-DD HH:mm:ss')
			await postInstUser(user)
			setTimeout(() => {
				//debounce the edit
			}, 300)
			//End the instUser
		}
		else {
			if (existingUser) {
				if ((inst.sentiUserUUID !== instUser.uuid) && inst.sentiUserUUID !== null) {
					console.log('Close the current instUser')
					let user = await getInstUser(inst.instUserUUID)
					if (user) {
						console.log('instUser', user)
						user.endDate = moment().format('YYYY-MM-DD HH:mm:ss')
						await postInstUser(user)
					}
					console.log('Create a new one')
					let InstUser = {
						...instUser,
						instUUID: inst.uuid,
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
					let InstUser = {
						...instUser,
						instUUID: inst.uuid,
						startDate: instDevice.startDate,
						endDate: instDevice.endDate,
						userUUID: instUser.uuid,
					}
					let resInstUser = await postInstUser(InstUser)
					if (resInstUser) {
						console.log(resInstUser)
					}
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
						instUUID: inst.uuid,
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
		//#endregion

		//#region Device Part
		if (editInstallation.uuid) {
			let device = {
				startDate: moment(instDevice.startDate).format('YYYY-MM-DD HH:mm:ss'),
				endDate: instDevice.endDate ? moment(instDevice.endDate).format('YYYY-MM-DD HH:mm:ss') : null,
				deviceUUID: instDevice.uuid,
				instUUID: editInstallation.uuid,
				uuid: editInstallation.instDevUUID
			}
			console.log('instDevice', device)
			let editDeviceInst = await postDevice(device)
			if (editDeviceInst.uuid) {
			}
			else {
				console.log(editDeviceInst)
			}
		}
		//#endregion

		await dispatch(await getAdminDevices())
		await dispatch(await getAdminInstallations())
		await dispatch(await getAdminInstallations())

		// const getInstallationTags = async () => await dispatch(await getTags())
		handleSetClose()
		setEditing(false)
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
								withoutUser={withoutUser}
								setWithoutUser={setWithoutUser}
								user={user}
								handleSetSentiUser={handleSetSentiUser}
							/>
						</DialogContent>

						<DialogActions>
							<Button onClick={handleStartEditing}>{t('actions.edit')}</Button>
							<Button onClick={handleSetClose}>{t('actions.close')}</Button>
							{/* <Button onClick={() => setLoading(true)}>{t('actions.edit')}</Button> */}
						</DialogActions>
					</div>
				</FadeOutLoader>
			</FadeLoader>
		</Dialog>
	)
}

export default EditInstallation
