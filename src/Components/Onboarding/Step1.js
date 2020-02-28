import React from 'react'
import ItemG from 'Components/Containers/ItemG'
import { NeedAccountT, LoginTF, LoginButton } from 'Styles/loginStyles'
import { InputAdornment } from '@material-ui/core'
import { Business } from 'variables/icons'

const Step1 = props => {
	const { t, handleInput, orgId, deviceNr, installationNrB, history } = props
	const handleNextStep = () => history.push('/signup/da/step2')
	return (
		<ItemG xs={12} container justify={'center'}>
			<ItemG xs={12} container justify={'center'}>
				<NeedAccountT>
					{t('signup.form.insertDeviceNumber')}
				</NeedAccountT>
			</ItemG>

			<ItemG container xs={12} style={{ marginTop: 48 }}>
				<LoginTF
					id={'deviceNr'}
					autoFocus
					label={t('signup.form.deviceNr')}
					fullWidth
					type={'email'}
					onChange={handleInput}
					value={deviceNr}
					InputProps={{
						endAdornment: <InputAdornment>
							<Business style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
						</InputAdornment>
					}}
				/>
				<LoginTF
					id={'installationNrB'}
					label={t('signup.form.installationNrB')}
					fullWidth
					onChange={handleInput}
					value={installationNrB}
					InputProps={{
						endAdornment: <InputAdornment>
							<Business style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
						</InputAdornment>
					}}
				/>
				<LoginTF
					id={'orgId'}
					label={t('login.nickname')}
					type={'text'}
					fullWidth
					onChange={handleInput}
					value={orgId}
					InputProps={{
						endAdornment: <InputAdornment>
							<Business style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
						</InputAdornment>
					}}
				/>
				{/* </ItemG> */}
			</ItemG>
			<ItemG xs={12} container justify={'center'}>
				<LoginButton variant={'contained'} fullWidth color={'secondary'} onClick={handleNextStep}>
					{t('actions.nextStep')}
				</LoginButton>
			</ItemG>
			<ItemG xs={12} container justify={'center'}>
			</ItemG>
		</ItemG>
	)
}

export default Step1
