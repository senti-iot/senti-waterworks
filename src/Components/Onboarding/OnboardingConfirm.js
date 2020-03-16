import React from 'react'
import ItemG from 'Components/Containers/ItemG'
import { NeedAccountT, NextStepButton, LoginTF } from 'Styles/loginStyles'

const OnboardingConfirm = props => {
	const { t, goToNextStep, handleInput, token, success } = props
	const handleNextStep = () => goToNextStep()


	return (
		<ItemG xs={12} container justify={'center'}>
			<ItemG xs={12} container justify={'center'}>
				<NeedAccountT>
					{t('signup.form.finish')}
				</NeedAccountT>
			</ItemG>
			<ItemG xs={12} container justify={'center'}>
				<LoginTF
					id={'pass'}
					autoFocus
					label={t('signup.form.token')}
					fullWidth
					onChange={handleInput}
					value={token}
				/>
			</ItemG>
			<ItemG xs={12} container justify={'center'}>
				<NextStepButton variant={'contained'} fullWidth color={'secondary'} onClick={handleNextStep}>
					{success ? t('actions.goToLogin') : t('actions.confirm')}
				</NextStepButton>
			</ItemG>
		</ItemG>
	)
}

export default OnboardingConfirm
