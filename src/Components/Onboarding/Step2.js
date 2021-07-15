import React from 'react'
import ItemG from 'Components/Containers/ItemG'
import { NeedAccountT, NextStepButton, AdressTF } from 'Styles/loginStyles'
import DSelect from 'Components/Input/DSelect'
import TextF from 'Components/Input/TextF'

const Step2 = props => {
	const { t, handleInput, firstName, city, lastName, email, phone, address, postnr, goToNextStep, noOfAdults, noOfChildren } = props
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
					autoFocus
					label={t('users.fields.lastName')}
					fullWidth
					onChange={handleInput}
					value={lastName}
				/>
				<TextF
					id={'email'}
					autoFocus
					label={t('users.fields.email')}
					fullWidth
					onChange={handleInput}
					value={email}
				/>
				<TextF
					id={'phone'}
					autoFocus
					label={t('users.fields.phone')}
					fullWidth
					onChange={handleInput}
					value={phone}
				/>
				<TextF
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
