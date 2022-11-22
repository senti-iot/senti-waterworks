import React from 'react'
import ItemG from 'Components/Containers/ItemG'
import { NeedAccountT, LoginTF, NextStepButton } from 'Styles/loginStyles'

const Step3 = props => {
	const { t, error, handleInput, pass, confirmPass, goToNextStep } = props
	const handleNextStep = () => goToNextStep()

	return (
		<ItemG xs={12} container justifyContent={'center'}>
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

				{/* </ItemG> */}
			</ItemG>
			<ItemG xs={12} container justifyContent={'center'}>
				<NextStepButton variant={'contained'} fullWidth color={'secondary'} onClick={handleNextStep}>
					{t('actions.confirm')}
				</NextStepButton>
			</ItemG>
		</ItemG>
	)
}

export default Step3
