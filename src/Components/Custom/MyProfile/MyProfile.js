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
		<GridContainer style={{ height: '100%' }}>
			<InfoCard
				noExpand
				noMargin
				noPadding
				avatar={<Person />}
				title={t('sidebar.myprofile')}
				content={
					<ItemG container>
						<ItemG container xs={6} alignItems={'center'} style={{ height: '100%' }}>
							<ItemG xs={12} container >
								<ItemG xs={12} container justify={'center'} alignItems={'center'}>
									<Gravatar default='mp' email={user.email} className={classes.img} size={240} />
								</ItemG>
								<ItemG xs={12} container justify={'center'} alignItems={'flex-start'}>
									<Button color={'primary'} variant={'contained'} labe>{t('actions.change')}</Button>
								</ItemG>
							</ItemG>
						</ItemG>
						<ItemG container xs={6} component={'form'} autoomplete={'off'}>
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
										{t('login.username')}:
									</T>
								</ItemG>
								<ItemG xs={7}>

									<TextF
										id={'userEmail'}
										readOnly={true}
										autoComplete={'off'}
										value={user.email}
									/>
								</ItemG>
							</ItemG>
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
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
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
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
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
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
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
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
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
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
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
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
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
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

							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
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
							<ItemG container xs={12} justify={'center'} alignItems={null}>
								<ItemG xs={5}>
									<T variant={'h6'} style={{ marginRight: 32, marginTop: 22 }}>
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
					</ItemG>
				}
			/>
		</GridContainer>

	)
}

export default MyProfile
