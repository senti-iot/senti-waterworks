import { Button, Checkbox, Collapse, Divider, FormControlLabel } from '@material-ui/core'
import { DSelect, T, TextF } from 'Components'
import ItemG from 'Components/Containers/ItemG'
import AssignDevice from 'Components/Custom/Devices/AssignDevice'
import AssignUser from 'Components/Custom/Users/AssignUser'
import DateTimePicker from 'Components/Input/DateTimePicker'
import { useLocalization } from 'Hooks'
import React, { useState } from 'react'

const CreateInstallationForm = (props) => {
	//Hooks
	const t = useLocalization()
	//Redux

	//State
	const [openAssign, setOpenAssign] = useState(false)
	const [openUserAssign, setOpenUserAssign] = useState(false)
	//Const
	const { inst, instDevice, org, handleSelectDevice, handleSetDevice, handleSetInstallation,
		handleSelectUser, instUser, handleSetUser, existingUser, setExistingUser, user, handleSetSentiUser, setWithoutUser, withoutUser
	} = props

	// console.log('instDevice', instDevice)
	// console.log('inst', inst)
	const states = [
		{ value: 0, label: t("installations.states.provisioned") },
		{ value: 1, label: t("installations.states.onboarded") }
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
	const handleGenMenuItems = () => {
		let array = [0, 1, 2, 3, 4, 5, 6]
		return array.map(a => ({ value: a, label: a }))
	}

	return (
		<ItemG container>
			<ItemG container xs={12} md={3}>

				<ItemG xs={12}>
					<T variant={'h6'}>{t('sidebar.installation')}</T>
				</ItemG>
				<ItemG xs={12}>
					<TextF
						label={t('installations.fields.streetName')}
						value={inst.streetName}
						onChange={e => handleSetInstallation('streetName')(e.target.value)}
					/>
				</ItemG>
				<ItemG xs={12} style={{ maxWidth: 230 }}>
					<TextF
						style={{ width: '49%', minWidth: '49%', marginRight: '4px' }}
						label={t('installations.fields.streetNumber')}
						value={inst.streetNumber}
						onChange={e => handleSetInstallation('streetNumber')(e.target.value)}
					/>
					<TextF
						style={{ width: '49%', minWidth: '49%' }}
						label={t('installations.fields.side')}
						value={inst.side}
						onChange={e => handleSetInstallation('side')(e.target.value)}
					/>
				</ItemG>
				<ItemG xs={12}>
					<TextF
						label={t('installations.fields.zip')}
						value={inst.zip}
						onChange={e => handleSetInstallation('zip')(e.target.value)}
					/>
				</ItemG>
				<ItemG xs={12}>
					<TextF
						label={t('installations.fields.city')}
						value={inst.city}
						onChange={e => handleSetInstallation('city')(e.target.value)}
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
			</ItemG>
			<ItemG xs={1} container alignItems={'center'} justifyContent={'center'}>
				<Divider orientation={'vertical'} />
			</ItemG>
			<ItemG container xs={12} md={3} style={{ height: 'min-content' }}>
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
			<ItemG xs={1} container alignItems={'center'} justifyContent={'center'}>
				<Divider orientation={'vertical'} />
			</ItemG>
			<ItemG container xs={12} md={3} style={{ height: 'min-content' }}>
				<ItemG xs={12}>
					<T variant={'h6'}>{t('sidebar.user')}</T>
				</ItemG>
				<ItemG xs={12}>
					<FormControlLabel
						control={<Checkbox checked={withoutUser} onChange={() => setWithoutUser(!withoutUser)} name="withoutUserCheck" />}
						label={t('installations.withoutUser')}
					/>

					<FormControlLabel
						disabled={withoutUser}
						control={<Checkbox checked={existingUser} onChange={() => setExistingUser(!existingUser)} name="existingUserCheck" />}
						label={t('installations.useExistingUser')}
					/>
				</ItemG>
				<Collapse in={!withoutUser}>
					<ItemG xs={12}>

						<Collapse in={!existingUser}>
							<ItemG xs={12}>
								<TextF
									label={t('users.fields.firstName')}
									value={user.firstName}
									onChange={e => handleSetSentiUser('firstName')(e.target.value)}
								/>
								<TextF
									label={t('users.fields.lastName')}
									value={user.lastName}
									onChange={e => handleSetSentiUser('lastName')(e.target.value)}
								/>
								<TextF
									label={t('users.fields.phone')}
									value={user.phone}
									onChange={e => handleSetSentiUser('phone')(e.target.value)}
								/>
								<TextF
									label={t('users.fields.mobile')}
									value={user.mobile}
									onChange={e => handleSetSentiUser('mobile')(e.target.value)}
								/>
								<TextF
									label={t('users.fields.email')}
									value={user.email}
									onChange={e => handleSetSentiUser('email')(e.target.value)}
								/>
							</ItemG>
						</Collapse>
						<Collapse in={existingUser}>
							<Button variant={'outlined'} onClick={() => setOpenUserAssign(true)}>{t('actions.selectUser')}</Button>
							<TextF
								label={t('users.fields.firstName')}
								value={user.firstName}
								onChange={e => handleSetSentiUser('firstName')(e.target.value)}
							/>
							<TextF
								label={t('users.fields.lastName')}
								value={user.lastName}
								onChange={e => handleSetSentiUser('lastName')(e.target.value)}
							/>
							<TextF
								label={t('users.fields.phone')}
								value={user.phone}
								onChange={e => handleSetSentiUser('phone')(e.target.value)}
							/>
							<TextF
								label={t('users.fields.mobile')}
								value={user.mobile}
								onChange={e => handleSetSentiUser('mobile')(e.target.value)}
							/>
							<TextF
								label={t('users.fields.email')}
								value={user.email}
								onChange={e => handleSetSentiUser('email')(e.target.value)}
							/>

							<AssignUser open={openUserAssign}
								handleClose={() => setOpenUserAssign(false)}
								callBack={(dev) => { handleSelectUser(dev); setOpenUserAssign(false) }}
							/>
						</Collapse>

					</ItemG>
					<ItemG xs={12}>
						<ItemG xs={12}>
							<DSelect
								id={'adultNr'}
								label={t('signup.form.adultNr')}
								value={instUser.adults}
								type={'text'}
								margin={'normal'}
								menuItems={handleGenMenuItems().slice(1)}
								onChange={(e) => handleSetUser('adults')(e.target.value)}
							/>
						</ItemG>

						<ItemG xs={12}>
							<DSelect
								label={t('signup.form.childNr')}
								value={instUser.children}
								type={'text'}
								margin={'normal'}
								menuItems={handleGenMenuItems()}
								onChange={(e) => handleSetUser('children')(e.target.value)}
							/>

						</ItemG>
					</ItemG>
				</Collapse>

			</ItemG>

		</ItemG>
	)
}

export default CreateInstallationForm
