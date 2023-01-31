import React from 'react'
import GridContainer from 'Components/Containers/GridContainer'
import ItemG from 'Components/Containers/ItemG'
import { Person, Visibility, VisibilityOff, Close } from 'variables/icons'
import { useLocalization, useSelector, useHistory } from 'Hooks'
import { makeStyles, Button, Dialog, CircularProgress, InputAdornment, Card, CardHeader, CardContent, CardActions, IconButton } from '@material-ui/core'
import TextF from 'Components/Input/TextF'
import { T } from 'Components'
import DSelect from 'Components/Input/DSelect'
import { useState } from 'react'
import { updateUser, updatePassword } from 'data/users'
import SlideT from 'Components/Transitions/SlideT'
import Warning from 'Components/Typography/Warning'
import { SmallActionButton } from 'Styles/loginStyles'
import useSnackbar from 'Hooks/useSnackbar/useSnackbar'

const useStyles = makeStyles(theme => ({
	closeButton: {
		color: '#fff'
	},
	password: {
		background: 'rgba(255, 255, 255, 0.1)'
	},
	avatar: {
		background: '#fff',
		color: theme.headerColor,
		borderRadius: 8
	},
	cardHeader: {
		display: 'flex',
		justifyContent: 'center',
		background: theme.headerColor,
		borderRadius: "4px 4px 0px 0px"
	},
	img: {
		borderRadius: "50%",
		padding: 32
	}
}))


const MyProfile = () => {
	//Hooks
	const t = useLocalization()
	const classes = useStyles()
	const s = useSnackbar().s
	const history = useHistory()
	//Redux
	const rUser = useSelector(s => s.settings.user)
	const extendedProfile = useSelector(s => s.settings.user ? s.settings.user.aux.sentiWaterworks.extendedProfile : {})

	//State
	const [extProfile, setExtProfile] = useState(extendedProfile)
	const [user, setUser] = useState(rUser)
	const [edited, setEdited] = useState(false)
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState(false)
	/**
	 * Password Dialog
	 */
	const [showPass, setShowPass] = useState(false)
	const [password, setPassword] = useState('')
	const [newPass, setNewPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [passError, setPassError] = useState(false)
	const [visiblePass, setVisiblePass] = useState({
		currentPass: false,
		newPass: false
	})
	//Const

	//useCallbacks

	//useEffects

	//Handlers
	const handleCloseButton = async () => {
		history.push('/')
	}
	const handleSaveEdit = async () => {
		let fUser = user
		fUser.aux.sentiWaterworks.extendedProfile = extProfile
		setSaving(true)
		let res = await updateUser(fUser)
		if (res) {
			setSaving(false)
			setEdited(false)
			s('snackbars.edit.user')
		}
		else {
			setSaving(false)
			setError(true)
		}
	}
	const handleSaveNewPassword = async () => {
		if (newPass === confirmPass) {
			let obj = {
				newPassword: newPass,
				oldPassword: password,
				uuid: user.uuid
			}
			let res = await updatePassword(user.uuid, obj)
			if (res) {
				s('snackbars.edit.password')
				handleClosePasswordDialog()
			}
		}
		else {
			setPassError('signup.error.passwordMismatch')
		}
	}
	const handleGenMenuItems = () => {
		let array = [0, 1, 2, 3, 4, 5, 6]
		return array.map(a => ({ value: a, label: a }))
	}

	const handleEditExtProfile = (where) => e => {
		setExtProfile({
			...extProfile,
			[where]: e.target.value
		})
		setEdited(true)
	}
	const handleEditUser = where => e => {
		setUser({
			...user,
			[where]: e.target.value
		})
	}
	const handleClosePasswordDialog = () => {
		setNewPass('')
		setPassword('')
		setConfirmPass('')
		setShowPass(false)
	}
	const handleOpenPasswordDialog = () => {
		setShowPass(true)
	}
	const handleEditPass = (e) => {
		setPassword(e.target.value)
	}
	const handleEditNewPass = (e) => {
		setNewPass(e.target.value)
	}
	const handleEditConfirmPass = (e) => {
		setConfirmPass(e.target.value)
	}
	const handleShowPassword = (where) => () => {
		setVisiblePass({
			...visiblePass,
			[where]: !visiblePass[where]
		})
	}
	//Renders

	const renderPassDialog = () => {
		return <Dialog

			onClose={handleClosePasswordDialog}
			open={showPass}
			color={'primary'}
			TransitionComponent={SlideT}
			PaperProps={{
				style: { maxWidth: 300 }
			}}
		// PaperComponent={DPaper}
		>
			<GridContainer>
				<Warning
					open={Boolean(passError)}
					label={t(passError, { disableMissing: true })}
					type={'error'}
				/>


				<ItemG xs={12}>
					<TextF
						id={'currentPassword'}
						label={t('users.fields.currentPass')}
						// readOnly={true}
						// autoComplete={'off'}
						value={password}
						onChange={handleEditPass}
						type={visiblePass.currentPass ? 'text' : 'password'}
						InputProps={{
							classes: {
								notchedOutline: classes.password
							},
							endAdornment: <InputAdornment>
								<SmallActionButton
									onClick={handleShowPassword('currentPass')}
								>
									{visiblePass.currentPass ? <Visibility /> : <VisibilityOff />}
								</SmallActionButton>
							</InputAdornment>
						}}
					/>
				</ItemG>
				<ItemG xs={12}>
					<TextF
						id={'newPassword'}
						label={t('users.fields.newPass')}
						value={newPass}
						onChange={handleEditNewPass}
						type={visiblePass.newPass ? 'text' : 'password'}

						InputProps={{
							classes: {
								notchedOutline: classes.password
							},
							endAdornment: <InputAdornment>
								<SmallActionButton
									onClick={handleShowPassword('newPass')}
								>
									{visiblePass.newPass ? <Visibility /> : <VisibilityOff />}
								</SmallActionButton>
							</InputAdornment>
						}}
					/>
				</ItemG>
				<ItemG xs={12}>
					<TextF
						id={'confirmNewPassword'}
						label={t('users.fields.confirmPass')}
						value={confirmPass}
						onChange={handleEditConfirmPass}
						type={visiblePass.newPass ? 'text' : 'password'}

						InputProps={{
							classes: {
								notchedOutline: classes.password
							},
							endAdornment: <InputAdornment>
								<SmallActionButton
									onClick={handleShowPassword('newPass')}
								>
									{visiblePass.newPass ? <Visibility /> : <VisibilityOff />}
								</SmallActionButton>
							</InputAdornment>
						}}

					/>
				</ItemG>
				<ItemG xs={12} >
					<Button onClick={handleSaveNewPassword} style={{ marginTop: 16, color: '#fff' }} fullWidth variant={'contained'} color={'secondary'}>{t('actions.confirm')}</Button>
				</ItemG>
			</GridContainer>
		</Dialog>
	}
	return (
		<GridContainer>
			{renderPassDialog()}
			<Card>
				<CardHeader
					className={classes.cardHeader}
					avatar={<ItemG container alignItems={'center'}><Person className={classes.avatar} /></ItemG>}
					title={<T variant={'h6'} style={{ color: '#fff' }}>{t('sidebar.myprofile')}</T>}
					action={<IconButton onClick={handleCloseButton}>
						<Close className={classes.closeButton}/>
					</IconButton>}
				/>

				<CardContent>
					<ItemG container justifyContent={'center'}>

						<ItemG container xs={6}>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={6}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
										{t('login.username')}:
									</T>
								</ItemG>
								<ItemG xs={6}>

									<TextF
										variant={'standard'}
										id={'userEmail'}
										readOnly={true}
										autoComplete={'off'}
										value={user.email}
										onChange={handleEditUser('email')}
									/>
								</ItemG>
							</ItemG>
							{/* <ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
										{t('login.pass')}:
									</T>
								</ItemG>
								<ItemG xs={6}>

									<TextF
										variant={'standard'}
										id={'userPassword'}
										readOnly={true}
										type={'password'}
										value={'********'}
									/>
								</ItemG>
							</ItemG> */}
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={6}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
										{t('users.fields.firstName')}:
									</T>
								</ItemG>
								<ItemG xs={6}>
									<TextF
										variant={'standard'}
										id={'userFirstName'}
										readOnly={true}
										value={user.firstName}
										onChange={handleEditUser('firstName')}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={6}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
										{t('users.fields.lastName')}:
									</T>
								</ItemG>
								<ItemG xs={6}>
									<TextF
										variant={'standard'}
										id={'userLastName'}
										readOnly={true}
										value={user.lastName}
										onChange={handleEditUser('lastName')}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={6}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
										{t('users.fields.address')}:
									</T>
								</ItemG>
								<ItemG xs={6}>

									<TextF
										variant={'standard'}
										readOnly={true}
										value={extProfile.address}
										onChange={handleEditExtProfile('address')}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={6}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
										{t('users.fields.postnr')}:
									</T>
								</ItemG>
								<ItemG xs={6}>

									<TextF
										variant={'standard'}
										readOnly={true}
										value={extProfile.postnr}
										onChange={handleEditExtProfile('postnr')}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={6}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
										{t('users.fields.city')}:
									</T>
								</ItemG>
								<ItemG xs={6}>

									<TextF
										variant={'standard'}
										readOnly={true}
										value={extProfile.city}
										onChange={handleEditExtProfile('city')}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={6}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
										{t('users.fields.phone')}:
									</T>
								</ItemG>
								<ItemG xs={6}>
									<TextF
										variant={'standard'}
										readOnly={true}
										value={user.phone}
										onChange={handleEditUser('phone')}
									/>

								</ItemG>
							</ItemG>

							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={6}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
										{t('signup.form.adultNr')}:
									</T>
								</ItemG>
								<ItemG xs={6}>
									<DSelect
										variant={'standard'}
										id={'adultNr'}
										value={extProfile.noOfAdults}
										type={'text'}
										styles={{ margin: 16 }}
										menuItems={handleGenMenuItems().slice(1)}
										onChange={handleEditExtProfile('noOfAdults')}
									/>

								</ItemG>
							</ItemG>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={6}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
										{t('signup.form.childNr')}:
									</T>
								</ItemG>
								<ItemG xs={6}>
									<DSelect
										variant={'standard'}
										id={'orgId'}
										value={extProfile.noOfChildren}
										type={'text'}
										styles={{ margin: 16 }}
										menuItems={handleGenMenuItems()}
										onChange={handleEditExtProfile('noOfChildren')}
									/>

								</ItemG>
							</ItemG>
						</ItemG>

					</ItemG>
				</CardContent>
				<CardActions>
					<ItemG xs={12} container justifyContent={'flex-end'} alignItems={'center'}>
						<Warning
							open={Boolean(error)}
							label={t(error, { disableMissing: true })}
							type={'error'}
						/>
						<Button onClick={handleOpenPasswordDialog} color={'primary'} style={{ margin: 16 }} variant={'contained'}>{t('actions.changePassword')} </Button>
						<Button onClick={handleSaveEdit} disabled={!edited} color={'secondary'} style={{ margin: 16, color: '#fff' }} variant={'contained'}>{saving ? <CircularProgress size={24} /> : t('actions.save')}</Button>

					</ItemG>
				</CardActions>
			</Card>
		</GridContainer>

	)
}

export default MyProfile
