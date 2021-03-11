import React, { useState, useEffect, useCallback } from 'react'
import logo from 'assets/senti.waterworks.black.svg'

// Components
import { ItemG, CookiesDialog, PrivacyDialog } from 'Components'
import { Collapse, Hidden, InputAdornment } from '@material-ui/core'
import { useEventListener, useDispatch, useHistory, useLocation, useLocalization } from 'Hooks'
import { Email, Visibility, VisibilityOff } from 'variables/icons'

// Data & Redux
import { getSettings } from 'Redux/settings'
import { changeLanguage } from 'Redux/localization'
import { LoginWrapper, MobileContainer, ImgLogo, /* SmallActionButton,  */Footer, FooterText, MutedButton, InputContainer, LeftPanel, /* NeedAccountT, */ LoginButton, LoginTF, ResetPasswordButton, SmallActionButton } from 'Styles/loginStyles'
import LoginImages from 'Components/Custom/Login/NewLoginImages'
import { ThemeProvider } from '@material-ui/styles'
import { loginTheme } from 'Styles/themes'
import FadeLoader from 'Components/Loaders/FadeLoader'
import Warning from 'Components/Typography/Warning'
import { useParams } from 'react-router'

import { resetPassword, confirmPassword as bConfirmPass } from 'data/login'

function ResetPassword() {
	//Hooks
	const location = useLocation()
	const history = useHistory()
	const dispatch = useDispatch()
	const t = useLocalization()
	const params = useParams()
	let token = params.token
	//Redux
	const redux = {
		getSettings: async () => dispatch(await getSettings()),
		setLanguage: lang => dispatch(changeLanguage(lang, true))
	}

	//State
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState([])
	const [passwordRequest, setPasswordRequest] = useState(false)
	const [passwordReset, setPasswordReset] = useState(false)
	const [resettingPass, setResettingPass] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)


	const [cookies, setCookies] = useState(false)
	const [privacy, setPrivacy] = useState(false)
	//Const

	//useCallbacks
	const errorMessages = useCallback(code => {
		switch (code) {
			case 0:
				return t('confirmUser.validation.passwordEmpty')
			case 1:
				return t('confirmUser.validation.passwordUnder8')
			case 2:
				return t('confirmUser.validation.passwordMismatch')
			case 404:
				return t('confirmUser.validation.emailDoesntExist')
			case 404.1:
				return t('confirmUser.validation.userDoesntExistAnymore')
			default:
				return ''
		}
	}, [t])

	const handleValidation = useCallback(() => {
		let errorCode = []
		if (password === '' && confirmPassword === '') {
			errorCode.push(0)
		}
		if (password.length < 8) {
			errorCode.push(1)
		}
		if (password !== confirmPassword) {
			errorCode.push(2)
		}
		if (errorCode.length === 0) {
			return true
		} else {
			setError(true)
			setErrorMessage(errorCode.map(c => (
				<Warning open type={'error'} key={c} label={errorMessages(c)}/>
			)))
			// this.setState({
			// 	error: true,
			// 	errorMessage: errorCode.map(c => (
			// 		<Warning type={'error'} key={c}>{this.errorMessages(c)}</Warning>
			// 	)),
			// })
			return false
		}
	}, [confirmPassword, errorMessages, password])

	const confirmPass = useCallback(async () => {
		if (handleValidation()) {
			let session = await bConfirmPass({
				newPassword: password,
				token: params.token,
			})
			if (session !== 404 && session) {
				setPasswordReset(true)
				// this.setState({
				// 	passwordReset: true,
				// })
			} else {
				setError(true)
				setErrorMessage([<Warning open type={'error'} label={errorMessages(404.1)}/>])
				// this.setState({
				// 	error: true,
				// 	errorMessage: [
				// 		<Warning type={'error'}>{this.errorMessages(404.1)}</Warning>,
				// 	],
				// })
			}
		}
	}, [errorMessages, handleValidation, params.token, password])

	//useEventListener

	const keyPressHandler = useCallback(
		(event) => {
			// Update coordinates
			if (params.token)
				if (event.key === 'Enter') {
					confirmPass()
				}

		},
		[confirmPass, params.token]
	)
	useEventListener('keypress', keyPressHandler)
	//useEffects

	//Handlers

	const resetPass = async () => {
		let session = await resetPassword({ email: email })
		console.log('session', session)
		if (session !== 404 && session) {
			setPasswordRequest(true)
			setResettingPass(false)

		} else {
			setError(true)
			setResettingPass(false)
			setErrorMessage([<Warning open type={'error'} label={errorMessages(404)}/>])

		}
	}

	const handleResetPassword = () => {
		setResettingPass(true)
	}

	const handleChangePassword = e => {
		setPassword(e.target.value)
		if (error) {
			setError(false)
			setErrorMessage([])
		}
	}
	const handleChangeEmail = e => {
		setEmail(e.target.value)
		if (error) {
			setError(false)
			setErrorMessage([])
		}
	}

	const handleChangeConfirmPassword = e => {
		setConfirmPassword(e.target.value)
		if (error) {
			setError(false)
			setErrorMessage([])
		}
	}

	// const inputRef = useRef(null)

	const handleShowPassword = () => {
		setShowPassword(!showPassword)
	}
	const handleShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword)
	}


	const handleCookies = () => setCookies(!cookies)
	const handlePrivacy = () => setPrivacy(!privacy)


	useEffect(() => {
		if (location.pathname.includes('en')) {
			redux.setLanguage('en')
		}
	}, [location.pathname, history, redux])

	const handleCancelReset = () => {
		history.push('/login')
	}
	console.log(error, errorMessage)
	return (
		<ThemeProvider theme={loginTheme}>

			<LoginWrapper>
				<ItemG xs={12} sm={12} md={5} lg={4} xl={3} container>
					<MobileContainer>
						<LeftPanel /* className={classes.paper} */>
							<InputContainer>
								<ItemG xs={12} container justify={'center'} style={{ marginBottom: 48 }}>
									<ImgLogo src={logo} alt={'sentiLogo'} />
								</ItemG>
								<FadeLoader on={resettingPass} onChange={resetPass}>
									<ItemG xs={12} container justify={'center'}>
										<ItemG container xs={12}>
											<Collapse in={error}>
												{errorMessage}
											</Collapse>
										</ItemG>
										<ItemG container xs={12} justify={'center'}>
											<Warning type={'success'} label={t('dialogs.login.resetPasswordMessage')} open={passwordRequest} />
											<Warning type={'success'} label={t('dialogs.login.passwordReseted')} open={passwordReset}/>
											<Collapse in={!passwordRequest && !token} style={{ width: '100%' }}>
												<LoginTF
													id={'user'}
													autoFocus
													label={t('users.fields.email')}
													error={error}
													fullWidth
													type={'email'}
													onChange={handleChangeEmail}
													value={email}
													InputProps={{
														endAdornment: <InputAdornment>
															<Email style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
														</InputAdornment>
													}}
												/>
											</Collapse>

										</ItemG>
										<ItemG container xs={12} justify={'center'}>

											<Collapse in={token && !passwordReset} style={{ width: '100%' }}>
												<LoginTF
													id={'pass'}
													label={t('confirmUser.password')}
													error={error}
													type={showPassword ? 'text' : 'password'}
													fullWidth
													onChange={handleChangePassword}
													value={password}
													InputProps={{
														endAdornment: <InputAdornment>
															<SmallActionButton
																onClick={handleShowPassword}
															>
																{showPassword ? <Visibility /> : <VisibilityOff />}
															</SmallActionButton>
														</InputAdornment>
													}}
												/>
												<LoginTF
													id={'pass'}
													label={t('confirmUser.passwordConfirm')}
													error={error}
													type={showConfirmPassword ? 'text' : 'password'}
													fullWidth
													onChange={handleChangeConfirmPassword}
													value={confirmPassword}
													InputProps={{
														endAdornment: <InputAdornment>
															<SmallActionButton
																onClick={handleShowConfirmPassword}
															>
																{showConfirmPassword ? <Visibility /> : <VisibilityOff />}
															</SmallActionButton>
														</InputAdornment>
													}}
												/>

											</Collapse>
										</ItemG>
										<ItemG xs={12} container justify={'center'}>
											<Collapse in={!(passwordRequest || passwordReset)} style={{ width: '100%' }}>
												<LoginButton variant={'contained'} fullWidth color={'secondary'} onClick={token ? confirmPass : handleResetPassword }>
													{t('actions.requestPasswordReset')}
												</LoginButton>
											</Collapse>
										</ItemG>
										<ItemG xs={12} container justify={'center'} alignItems={'center'}>
											<ResetPasswordButton variant={'outlined'} fullWidth color={'secondary'} onClick={handleCancelReset}>
												{passwordRequest || passwordReset ? t('actions.goToLogin') : t('actions.cancel')}
											</ResetPasswordButton>
										</ItemG>
									</ItemG>
								</FadeLoader>
								{/* </FadeOutLoader> */}
							</InputContainer>
							<Footer xs={12} container alignItems={'flex-end'} justify={'center'}>
								<FooterText>
									{`${t('login.footer')} `}
									<MutedButton onClick={handlePrivacy}>{t('settings.t&c.privacyPolicy')}</MutedButton>
									<MutedButton onClick={handleCookies}>{t('settings.t&c.cookiesPolicy')}</MutedButton>
								</FooterText>
							</Footer>
						</LeftPanel>
					</MobileContainer>
				</ItemG>
				<CookiesDialog read t={t} open={cookies} handleClose={handleCookies} handleAcceptCookies={handleCookies} />
				<PrivacyDialog t={t} open={privacy} handleClose={handlePrivacy} />
				<Hidden smDown>
					<ItemG md={7} lg={8} xl={9}>
						<LoginImages />
					</ItemG>
				</Hidden>
			</LoginWrapper>
		</ThemeProvider>
	)
}

export default ResetPassword
