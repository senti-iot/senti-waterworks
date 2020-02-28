import React from 'react'
import ItemG from 'Components/Containers/ItemG'
import { NeedAccountT, LoginTF, LoginButton, AdressTF } from 'Styles/loginStyles'

const Step2 = props => {
	const { t, handleInput, firstName, country, lastName, email, phone, address, postnr, history } = props
	const handleNextStep = () => history.push('/signup/da/step3')
	return (
		<ItemG xs={12} container justify={'center'}>
			<ItemG xs={12} container justify={'center'}>
			</ItemG>

			<ItemG container xs={12} style={{ marginTop: 48 }}>
				<NeedAccountT style={{ width: 300 }}>
					{t('signup.form.dataAutoFill')}
				</NeedAccountT>
				<NeedAccountT style={{ width: 300 }}>
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
				<ItemG xs={12} container>
					<ItemG xs={9} container>
						<AdressTF
							id={'address'}
							autoFocus
							label={t('users.fields.address')}
							fullWidth
							onChange={handleInput}
							value={address}
						/>
					</ItemG>
					<ItemG xs={3} container>

						<AdressTF
							style={{ marginLeft: 8 }}
							id={'postnr'}
							autoFocus
							label={t('users.fields.postnr')}
							onChange={handleInput}
							value={postnr}
						/>
					</ItemG>
				</ItemG>
				<LoginTF
					id={'country'}
					autoFocus
					label={t('users.fields.country')}
					fullWidth
					onChange={handleInput}
					value={country}
				/>
				{/* </ItemG> */}
			</ItemG>
			<ItemG xs={12} container justify={'center'} style={{ marginTop: 36 }}>
				<LoginButton variant={'contained'} fullWidth color={'secondary'} onClick={handleNextStep}>
					{t('actions.nextStep')}
				</LoginButton>
			</ItemG>
		</ItemG>
	)
}

export default Step2
