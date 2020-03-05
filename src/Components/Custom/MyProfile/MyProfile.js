import React from 'react'
import { BPaper } from 'Styles/containerStyle'
import GridContainer from 'Components/Containers/GridContainer'
import ItemG from 'Components/Containers/ItemG'
import { Person } from 'variables/icons'
import ChartTitle from 'Components/Custom/ChartTitle/ChartTitle'
import { useLocalization, useSelector } from 'Hooks'
import { makeStyles, Button } from '@material-ui/core'
import Gravatar from 'react-gravatar'
import TextF from 'Components/Input/TextF'
import { T } from 'Components'
import DSelect from 'Components/Input/DSelect'

const useStyles = makeStyles(theme => ({
	img: {
		borderRadius: "50%"
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
		<BPaper>
			<GridContainer style={{ height: '100%' }}>

				<ItemG container xs={6} >
					<ItemG container alignItems={'center'} xs={12} style={{ height: '20%' }}>
						<Person style={{ width: 48, height: 48 }} />
						<ChartTitle>
							{t('sidebar.myprofile')}
						</ChartTitle>
					</ItemG>
					<ItemG xs={12} container /* justify={'center'} */ /* alignItems={'center'} */ style={{ height: '80%' }}>
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
								value={user.aux.sentiWaterworks.extendedProfile.address}
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
								value={user.aux.sentiWaterworks.extendedProfile.postnr}
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
								value={user.aux.sentiWaterworks.extendedProfile.city}
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
								value={user.aux.sentiWaterworks.extendedProfile.adultNr}
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
								value={user.aux.sentiWaterworks.extendedProfile.childNr}
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
			</GridContainer>
		</BPaper>
	)
}

export default MyProfile
