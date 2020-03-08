import React from 'react'
import ItemG from 'Components/Containers/ItemG'
import { NeedAccountT, LoginTF, NextStepButton, AdressTF } from 'Styles/loginStyles'

const Step2 = props => {
	const { t, handleInput, firstName, city, lastName, email, phone, address, postnr, goToNextStep } = props
	const handleNextStep = () => {
		goToNextStep()
	}
	return (
		<ItemG xs={12} container justify={'center'}>
			<ItemG container xs={12}>
				{/* <NeedAccountT style={{ width: 300 }}>
					{t('signup.form.dataAutoFill')}
				</NeedAccountT> */}
				<NeedAccountT >
					{t('signup.form.completeMissingFields')}
				</NeedAccountT>
				<LoginTF
					id={'firstName'}
					autoFocus
					label={t('users.fields.firstName')}
					fullWidth
					onChange={handleInput}
					value={firstName}
				/>
				<LoginTF
					id={'lastName'}
					autoFocus
					label={t('users.fields.lastName')}
					fullWidth
					onChange={handleInput}
					value={lastName}
				/>
				<LoginTF
					id={'email'}
					autoFocus
					label={t('users.fields.email')}
					fullWidth
					onChange={handleInput}
					value={email}
				/>
				<LoginTF
					id={'phone'}
					autoFocus
					label={t('users.fields.phone')}
					fullWidth
					onChange={handleInput}
					value={phone}
				/>
				<LoginTF
					id={'address'}
					autoFocus
					label={t('users.fields.address')}
					fullWidth
					onChange={handleInput}
					value={address}
				/>
				<ItemG xs={12} container>

					<ItemG xs={3} container>

						<AdressTF

							id={'postnr'}
							autoFocus
							label={t('users.fields.postnr')}
							onChange={handleInput}
							value={postnr}
						/>
					</ItemG>
					<ItemG xs={9} container>
						<AdressTF
							style={{ marginLeft: 8 }}
							id={'city'}
							autoFocus
							label={t('users.fields.city')}
							fullWidth
							onChange={handleInput}
							value={city}
						/>
					</ItemG>
				</ItemG>


				{/* </ItemG> */}
			</ItemG>
			<ItemG xs={12} container justify={'center'}>
				<NextStepButton variant={'contained'} fullWidth color={'secondary'} onClick={handleNextStep}>
					{t('actions.nextStep')}
				</NextStepButton>
			</ItemG>
		</ItemG>
	)
}

export default Step2
