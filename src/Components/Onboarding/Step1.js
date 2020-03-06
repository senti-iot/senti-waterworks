import React from 'react'
import ItemG from 'Components/Containers/ItemG'
import { NeedAccountT, LoginTF, LoginButton } from 'Styles/loginStyles'
import { InputAdornment } from '@material-ui/core'
import { Business } from 'variables/icons'

const Step1 = props => {
	const { t, handleInput, orgIdent, deviceIdent, installationId, goToNextStep } = props
	const handleNextStep = () => {
		goToNextStep()
	}
	return (
		<ItemG xs={12} container justify={'center'}>
			<ItemG xs={12} container justify={'center'}>
				<NeedAccountT>
					{t('signup.form.insertDeviceNumber')}
				</NeedAccountT>
			</ItemG>

			<ItemG container xs={12} style={{ marginTop: 48 }}>
				<LoginTF
					id={'deviceIdent'}
					autoFocus
					label={t('signup.form.deviceNr')}
					fullWidth
					type={'email'}
					onChange={handleInput}
					value={deviceIdent}
					InputProps={{
						endAdornment: <InputAdornment>
							<Business style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
						</InputAdornment>
					}}
				/>
				<LoginTF
					id={'installationId'}
					label={t('signup.form.installationNrB')}
					fullWidth
					onChange={handleInput}
					value={installationId}
					InputProps={{
						endAdornment: <InputAdornment>
							<Business style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
						</InputAdornment>
					}}
				/>
				<LoginTF
					id={'orgIdent'}
					label={t('login.nickname')}
					type={'text'}
					fullWidth
					onChange={handleInput}
					value={orgIdent}
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
