import React from 'react'
import ItemG from 'Components/Containers/ItemG'
import { NeedAccountT, LoginTF, LoginButton } from 'Styles/loginStyles'
import DSelect from 'Components/Input/DSelect'

const Step3 = props => {
	const { t, handleInput, orgId, deviceNr, installationNrB, history } = props
	const handleNextStep = () => history.push('/signup/da/step2')
	const handleGenMenuItems = () => {
		let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
		return array.map(a => ({ value: a, label: a }))
	}
	return (
		<ItemG xs={12} container justify={'center'}>
			<ItemG xs={12} container justify={'center'}>
				<NeedAccountT>
					{t('signup.form.finishProfileTitle')}
				</NeedAccountT>
			</ItemG>

			<ItemG container xs={12} style={{ marginTop: 48 }}>
				<NeedAccountT>
					{t('signup.form.selectPassword')}:
				</NeedAccountT>
				<LoginTF
					id={'password'}
					autoFocus
					label={t('confirmUser.password')}
					fullWidth
					type={'password'}
					onChange={handleInput}
					value={deviceNr}
				/>
				<LoginTF
					id={'confirmPassword'}
					label={t('confirmUser.passwordConfirm')}
					type={'password'}
					fullWidth
					onChange={handleInput}
					value={installationNrB}
				/>
				<NeedAccountT styles={{ marginTop: 48 }}>
					{t('signup.form.addPeopleCount')}:
				</NeedAccountT>
				<DSelect
					id={'orgId'}
					label={t('signup.form.adultNr')}
					type={'text'}
					fullWidth
					onChange={handleInput}
					value={orgId}
					// margin={'normal'}
					styles={{ margin: 16 }}
					menuItems={handleGenMenuItems()}
				/>
				<DSelect
					id={'orgId'}
					label={t('signup.form.childNr')}
					type={'text'}
					fullWidth
					onChange={handleInput}
					value={orgId}
					// margin={'normal'}
					styles={{ margin: 16 }}
					menuItems={handleGenMenuItems()}
				/>
				{/* </ItemG> */}
			</ItemG>
			<ItemG xs={12} container justify={'center'}>
				<LoginButton variant={'contained'} fullWidth color={'secondary'} onClick={handleNextStep}>
					{t('actions.nextStep')}
				</LoginButton>
			</ItemG>
		</ItemG>
	)
}

export default Step3
