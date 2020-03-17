import React from 'react'
import ItemG from 'Components/Containers/ItemG'
import { NeedAccountT, LoginTF, NextStepButton } from 'Styles/loginStyles'
import DSelect from 'Components/Input/DSelect'

const Step3 = props => {
	const { t, error, handleInput, noOfAdults, pass, confirmPass, noOfChildren, goToNextStep } = props
	const handleNextStep = () => goToNextStep()

	const handleGenMenuAItems = () => {
		let array = [0, 1, 2, 3, 4, 5, 6]
		return array.map(a => ({ value: a, label: a }))
	}
	const handleGenMenuCItems = () => {
		let array = [0, 1, 2, 3, 4, 5, 6]
		return array.map(a => ({ value: a, label: a }))
	}
	return (
		<ItemG xs={12} container justify={'center'}>
			<ItemG xs={12} container>
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
					value={pass}
				/>
				<LoginTF
					id={'confirmPass'}
					label={t('confirmUser.passwordConfirm')}
					type={'password'}
					error={error}
					fullWidth
					onChange={handleInput}
					value={confirmPass}
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
					margin={'normal'}
					menuItems={handleGenMenuAItems()}
				/>
				<DSelect
					id={'noOfChildren'}
					label={t('signup.form.childNr')}
					type={'text'}
					fullWidth
					onChange={handleInput}
					value={noOfChildren}
					margin={'normal'}
					menuItems={handleGenMenuCItems()}
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
