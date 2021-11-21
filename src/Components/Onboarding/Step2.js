import React from 'react'
import ItemG from 'Components/Containers/ItemG'
import { NeedAccountT, NextStepButton, AdressTF } from 'Styles/loginStyles'
import DSelect from 'Components/Input/DSelect'
import TextF from 'Components/Input/TextF'

const Step2 = props => {
	const { t, handleInput, firstName, lastName, email, phone, streetName, zip, city, streetNumber, goToNextStep, noOfAdults, noOfChildren  } = props
	const handleNextStep = () => {
		goToNextStep()
	}


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
			<ItemG container xs={12}>
				{/* <NeedAccountT style={{ width: 300 }}>
					{t('signup.form.dataAutoFill')}
				</NeedAccountT> */}
				<NeedAccountT >
					{t('signup.form.completeMissingFields')}
				</NeedAccountT>
				<TextF
					id={'firstName'}
					autoFocus
					label={t('users.fields.firstName')}
					fullWidth
					onChange={handleInput}
					value={firstName}
				/>
				<TextF
					id={'lastName'}

					label={t('users.fields.lastName')}
					fullWidth
					onChange={handleInput}
					value={lastName}
				/>
				<TextF
					id={'email'}

					label={t('users.fields.email')}
					fullWidth
					onChange={handleInput}
					value={email}
				/>
				<TextF
					id={'phone'}

					label={t('users.fields.phone')}
					fullWidth
					onChange={handleInput}
					value={phone}
				/>
				<ItemG xs={12} container>
					<ItemG xs={9} container>

						<AdressTF

							id={'streetName'}

							label={t('onboarding.fields.streetName')}
							fullWidth
							onChange={handleInput}
							value={streetName}
						/>
					</ItemG>
					<ItemG xs={3} container>
						<AdressTF
							style={{ marginLeft: 8 }}
							id={'streetNumber'}

							label={t('onboarding.fields.streetNumber')}
							fullWidth
							onChange={handleInput}
							value={streetNumber}
						/>
					</ItemG>
				</ItemG>
				<ItemG xs={12} container>

					<ItemG xs={4} container>

						<AdressTF
							id={'zip'}
							label={t('onboarding.fields.zip')}
							onChange={handleInput}
							value={zip}
						/>
					</ItemG>
					<ItemG xs={8} container>
						<AdressTF
							style={{ marginLeft: 8 }}
							id={'city'}
							label={t('onboarding.fields.city')}
							fullWidth
							onChange={handleInput}
							value={city}
						/>
					</ItemG>
				</ItemG>

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

export default Step2
