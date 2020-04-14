import React from 'react'
import GridContainer from 'Components/Containers/GridContainer'
import ItemG from 'Components/Containers/ItemG'
import { Person } from 'variables/icons'
import { useLocalization, useSelector } from 'Hooks'
import { makeStyles, Button } from '@material-ui/core'
import Gravatar from 'react-gravatar'
import TextF from 'Components/Input/TextF'
import { T } from 'Components'
import DSelect from 'Components/Input/DSelect'
import InfoCard from 'Components/Cards/InfoCard'
import { blue } from '@material-ui/core/colors'
import { useState } from 'react'
import { Prompt } from 'react-router'
import { updateUser } from 'data/users'
import CircularLoader from 'Components/Loaders/CircularLoader'

const useStyles = makeStyles(theme => ({
	img: {
		borderRadius: "50%",
		padding: 32
	}
}))


const MyProfile = () => {
	//Hooks
	const t = useLocalization()
	const classes = useStyles()
	//Redux
	const rUser = useSelector(s => s.settings.user)
	const extendedProfile = useSelector(s => s.settings.user.aux.sentiWaterworks.extendedProfile)

	// console.log(extProfile)

	//State
	const [extProfile, setExtProfile] = useState(extendedProfile)
	const [user, setUser] = useState(rUser)
	const [edited, setEdited] = useState(false)
	const [saving, setSaving] = useState(false)

	//Const

	//useCallbacks

	//useEffects

	//Handlers
	const handleSaveEdit = async () => {
		console.log('Bing')
		let fUser = user
		fUser.aux.sentiWaterworks.extendedProfile = extProfile
		setSaving(true)
		await updateUser(fUser)
		setSaving(false)

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
	return (
		<GridContainer>
			<Prompt
				when={edited}
				message={() => `${t('snackbars.unsavedChanges')}`}
			/>
			<InfoCard
				noExpand
				noAvatar
				content={
					<ItemG container>
						<ItemG container xs={6} alignItems={'center'} style={{ height: '100%' }}>
							<ItemG xs={12} container >
								<ItemG xs={12} container alignItems={'center'}>
									<ItemG style={{ display: 'flex', marginLeft: 50 }}>
										<Person style={{ background: blue[500], borderRadius: 50, color: '#fff', width: 24, height: 24, padding: 6, marginRight: 16 }} />
									</ItemG>
									<ItemG>

										<T variant={'h6'}>{t('sidebar.myprofile')}</T>
									</ItemG>
								</ItemG>
								<ItemG xs={12} container justify={'center'} alignItems={'center'}>
									<Gravatar default='mp' email={user.email} className={classes.img} size={240} />
								</ItemG>
								<ItemG xs={12} container justify={'center'} alignItems={'flex-start'}>
									<Button color={'primary'} variant={'contained'}>{t('actions.change')}</Button>
								</ItemG>
							</ItemG>
						</ItemG>
						<ItemG container xs={6} component={'form'} autoomplete={'off'}>
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('login.username')}:
									</T>
								</ItemG>
								<ItemG xs={7}>

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
							{/* <ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('login.pass')}:
									</T>
								</ItemG>
								<ItemG xs={7}>

									<TextF
										variant={'standard'}
										id={'userPassword'}
										readOnly={true}
										type={'password'}
										value={'********'}
									/>
								</ItemG>
							</ItemG> */}
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('users.fields.firstName')}:
									</T>
								</ItemG>
								<ItemG xs={7}>
									<TextF
										variant={'standard'}
										id={'userFirstName'}
										readOnly={true}
										value={user.firstName}
										onChange={handleEditUser('firstName')}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('users.fields.lastName')}:
									</T>
								</ItemG>
								<ItemG xs={7}>
									<TextF
										variant={'standard'}
										id={'userLastName'}
										readOnly={true}
										value={user.lastName}
										onChange={handleEditUser('lastName')}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('users.fields.address')}:
									</T>
								</ItemG>
								<ItemG xs={7}>

									<TextF
										variant={'standard'}
										readOnly={true}
										value={extProfile.address}
										onChange={handleEditExtProfile('address')}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('users.fields.postnr')}:
									</T>
								</ItemG>
								<ItemG xs={7}>

									<TextF
										variant={'standard'}
										readOnly={true}
										value={extProfile.postnr}
										onChange={handleEditExtProfile('postnr')}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('users.fields.city')}:
									</T>
								</ItemG>
								<ItemG xs={7}>

									<TextF
										variant={'standard'}
										readOnly={true}
										value={extProfile.city}
										onChange={handleEditExtProfile('city')}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('users.fields.phone')}:
									</T>
								</ItemG>
								<ItemG xs={7}>
									<TextF
										variant={'standard'}
										readOnly={true}
										value={user.phone}
										onChange={handleEditUser('phone')}
									/>

								</ItemG>
							</ItemG>

							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('signup.form.adultNr')}:
									</T>
								</ItemG>
								<ItemG xs={7}>
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
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('signup.form.childNr')}:
									</T>
								</ItemG>
								<ItemG xs={7}>
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
						<ItemG xs={12} container justify={'center'} alignItems={'center'}>
							<Button color={'primary'} style={{ margin: 16 }} variant={'contained'}>{t('actions.changePassword')} </Button>
							<Button onClick={handleSaveEdit} disabled={!edited} color={'primary'} style={{ margin: 16 }} variant={'contained'}>{saving ? <CircularLoader /> : t('actions.edit')}</Button>

						</ItemG>
					</ItemG>
				}
			/>
		</GridContainer>

	)
}

export default MyProfile
