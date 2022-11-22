import React from 'react'
import ItemG from 'Components/Containers/ItemG'
import { NeedAccountT, NextStepButton } from 'Styles/loginStyles'

const OnboardingDone = props => {
	const { t, goToNextStep } = props
	const handleNextStep = () => goToNextStep()


	return (
		<ItemG xs={12} container justifyContent={'center'}>
			<ItemG xs={12} container justifyContent={'center'}>
				<NeedAccountT>
					{t('signup.form.finishConfirmEmail')}
				</NeedAccountT>
			</ItemG>
			<ItemG xs={12} container justifyContent={'center'}>
				<NextStepButton variant={'contained'} fullWidth color={'secondary'} onClick={handleNextStep}>
					{t('actions.goToLogin')}
				</NextStepButton>
			</ItemG>
		</ItemG>
	)
}

export default OnboardingDone
