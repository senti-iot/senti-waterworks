import React from 'react'
import ItemG from 'Components/Containers/ItemG'
import { NeedAccountT, LoginTF, NextStepButton } from 'Styles/loginStyles'
import DSelect from 'Components/Input/DSelect'

const Step3 = props => {
	const { t, error, handleInput, noOfAdults, deviceNr, installationNrB, noOfChildren, goToNextStep } = props
	const handleNextStep = () => goToNextStep()

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

			<ItemG container xs={12}>
				<NeedAccountT>
					{t('signup.form.selectPassword')}:
				</NeedAccountT>
				<LoginTF
					id={'pass'}
					autoFocus
					error={error}
					label={t('confirmUser.password')}
					fullWidth
					type={'password'}
					onChange={handleInput}
					value={deviceNr}
				/>
				<LoginTF
					id={'confirmPass'}
					label={t('confirmUser.passwordConfirm')}
					type={'password'}
					error={error}
					fullWidth
					onChange={handleInput}
					value={installationNrB}
				/>
				<NeedAccountT styles={{ marginTop: 48 }}>
					{t('signup.form.addPeopleCount')}:
				</NeedAccountT>
				<DSelect
					id={'noOfAdults'}
					label={t('signup.form.adultNr')}
					type={'text'}
					fullWidth
					onChange={handleInput}
					value={noOfAdults}
					// margin={'normal'}
					styles={{ margin: 16 }}
					menuItems={handleGenMenuItems()}
				/>
				<DSelect
					id={'noOfChildren'}
					label={t('signup.form.childNr')}
					type={'text'}
					fullWidth
					onChange={handleInput}
					value={noOfChildren}
					// margin={'normal'}
					styles={{ margin: 16 }}
					menuItems={handleGenMenuItems()}
				/>
				{/* </ItemG> */}
			</ItemG>
			<ItemG xs={12} container justify={'center'}>
				<NextStepButton variant={'contained'} fullWidth color={'secondary'} onClick={handleNextStep}>
					{t('actions.confirm')}
				</NextStepButton>
			</ItemG>
		</ItemG>
	)
}

export default Step3
