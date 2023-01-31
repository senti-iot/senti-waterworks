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

const useStyles = makeStyles(theme => ({
	img: {
		borderRadius: "50%",
		padding: 32
	}
}))


const MyProfileEdit = () => {
	//Hooks
	const t = useLocalization()
	const classes = useStyles()
	//Redux
	const user = useSelector(s => s.settings.user)
	//Stateimport Gravatar from 'react-gravatar'


	//Const

	//useCallbacks

	//useEffects

	//Handlers
	const handleGenMenuItems = () => {
		let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
		return array.map(a => ({ value: a, label: a }))
	}
	return (
		<GridContainer>
			<InfoCard
				noExpand
				// noMargin
				// noPadding
				// avatar={<Person />}
				noAvatar
				// title={t('sidebar.myprofile')}
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
								<ItemG xs={12} container justifyContent={'center'} alignItems={'center'}>
									<Gravatar default='mp' email={user.email} className={classes.img} size={240} />
								</ItemG>
								<ItemG xs={12} container justifyContent={'center'} alignItems={'flex-start'}>
									<Button color={'primary'} variant={'contained'} labe>{t('actions.change')}</Button>
								</ItemG>
							</ItemG>
						</ItemG>
						<ItemG container xs={6} component={'form'} autoomplete={'off'}>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('login.username')}:
									</T>
								</ItemG>
								<ItemG xs={7}>

									<TextF
										label={t('login.username')}
										id={'userEmail'}
										readOnly={true}
										autoComplete={'off'}
										value={user.email}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('login.pass')}:
									</T>
								</ItemG>
								<ItemG xs={7}>

									<TextF
										id={'userPassword'}
										readOnly={true}
										type={'password'}
										value={'********'}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('users.fields.firstName')}:
									</T>
								</ItemG>
								<ItemG xs={7}>
									<TextF
										id={'userFirstName'}
										readOnly={true}
										value={user.firstName}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('users.fields.lastName')}:
									</T>
								</ItemG>
								<ItemG xs={7}>
									<TextF
										id={'userLastName'}

										readOnly={true}
										value={user.lastName}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('users.fields.address')}:
									</T>
								</ItemG>
								<ItemG xs={7}>

									<TextF

										readOnly={true}
										value={user.internal.sentiWaterworks.extendedProfile.address}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('users.fields.postnr')}:
									</T>
								</ItemG>
								<ItemG xs={7}>

									<TextF
										readOnly={true}
										value={user.internal.sentiWaterworks.extendedProfile.postnr}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('users.fields.city')}:
									</T>
								</ItemG>
								<ItemG xs={7}>

									<TextF
										readOnly={true}
										value={user.internal.sentiWaterworks.extendedProfile.city}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('users.fields.phone')}:
									</T>
								</ItemG>
								<ItemG xs={7}>
									<TextF
										readOnly={true}
										value={user.phone}
									/>

								</ItemG>
							</ItemG>

							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('signup.form.adultNr')}:
									</T>
								</ItemG>
								<ItemG xs={7}>
									<DSelect
										id={'adultNr'}
										value={user.internal.sentiWaterworks.extendedProfile.adultNr}
										// label={}
										type={'text'}
										// fullWidth
										// onChange={handleInput}
										// value={orgId}
										// margin={'normal'}
										styles={{ margin: 16 }}
										menuItems={handleGenMenuItems()}
									/>

								</ItemG>
							</ItemG>
							<ItemG container xs={12} justifyContent={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22, color: 'gray' }}>
										{t('signup.form.childNr')}:
									</T>
								</ItemG>
								<ItemG xs={7}>
									<DSelect
										id={'orgId'}
										value={user.internal.sentiWaterworks.extendedProfile.childNr}
										// label={}
										type={'text'}
										// fullWidth
										// onChange={handleInput}
										// value={orgId}
										// margin={'normal'}
										styles={{ margin: 16 }}
										menuItems={handleGenMenuItems()}
									/>

								</ItemG>
							</ItemG>
						</ItemG>
						<ItemG xs={12} container justifyContent={'center'} alignItems={'center'}>
							<Button color={'primary'} style={{ margin: 16 }} variant={'contained'}>{t('actions.cancel')}</Button>
							<Button color={'primary'} style={{ margin: 16 }} variant={'contained'}>Change Password </Button>

						</ItemG>
					</ItemG>
				}
			/>
		</GridContainer>

	)
}

export default MyProfileEdit
