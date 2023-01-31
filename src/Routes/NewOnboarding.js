import React, { useState, useEffect, useCallback } from 'react'
import logo from 'assets/senti.waterworks.black.svg'
import cookie from 'react-cookies'

// Components
import { ItemG, CookiesDialog, PrivacyDialog, Warning } from 'Components'
import { Hidden, Divider } from '@material-ui/core'
import { useDispatch, useHistory, useLocalization, useEventListener } from 'Hooks'

// Data & Redux
import { changeLanguage } from 'Redux/localization'
import { setToken } from 'data/data'
import { LoginWrapper, MobileContainer, ImgLogo, Footer, FooterText, MutedButton, InputContainer, LeftPanel } from 'Styles/loginStyles'
import LoginImages from 'Components/Custom/Login/NewLoginImages'
import { ThemeProvider } from '@material-ui/styles'
import { loginTheme } from 'Styles/themes'
import { useParams } from 'react-router'
import Step3 from 'Components/Onboarding/Step3'
import { confirmOnboardingUser } from 'data/onboarding'
import OnboardingDone from 'Components/Onboarding/OnboardingDone'
import OnboardingConfirm from 'Components/Onboarding/OnboardingConfirm'
import { Link } from 'react-router-dom'


const NewOnboarding = props => {
	//Hooks
	const t = useLocalization()
	const params = useParams()
	const history = useHistory()
	const dispatch = useDispatch()
	//Redux

	//State

	const [cookies, setCookies] = useState(false)
	const [privacy, setPrivacy] = useState(false)
	const [error, setError] = useState(false)
	// const [token, setConfirmToken] = useState('')
	// const [antiCheat, setAntiCheat] = useState(false)
	const [success, setSuccess] = useState(false)
	const [step, setStep] = useState(0)

	//#region Step 1

	//#endregion

	//#region Step 2



	//#endregion

	//#region Step 3
	const [pass, setPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')


	//#endregion
	//Const

	//useCallbacks


	const handleNextStep = useCallback(async () => {
		let err = 0
		if (step === 0) {
			switch (true) {
				case confirmPass !== pass:
					setError('signup.error.passwordMismatch')
					err = 1
					break
				case pass.length < 8:
					setError('signup.error.passwordTooShort')
					err = 1
					break
				default:
					break
			}
			if (err) {
				return
			}
			else {
				setError(null)
				setStep(1)
			}
		}
		if (step === 'done') {
			history.push('/login')
		}
		if (step === 1) {
			// if (success) {
			// 	history.push('/login')
			// 	return
			// }
			if (error) {
				setError(null)
			}
			let confirmation = await confirmOnboardingUser(params.token, pass)
			if (confirmation.status === 404)
				setError('signup.error.missingData')
			else {
				setSuccess('confirmUser.welcomeMessage')
			}
		}
	}, [confirmPass, error, history, params.token, pass, step])

	const handleKeyPress = useCallback((event) => {
		if (event.key === 'Enter') {
			handleNextStep()
		}
	}, [handleNextStep])
	//useEventListener
	useEventListener('keypress', handleKeyPress)


	//useEffects
	useEffect(() => {
		var loginData = cookie.load('SESSION')
		//Login Data is valid
		if (loginData) {
			if (setToken()) {
				history.push('/')
			}
		}
		if (params.language === 'en') {
			dispatch(changeLanguage('en', true))
			// setLanguage('en')
		}
	}, [params.language, history, dispatch])


	const handleCookies = () => setCookies(!cookies)
	const handlePrivacy = () => setPrivacy(!privacy)


	const handleInput = (e, id) => {
		if (error) {
			setError(null)
		}
		//#region Step1

		//#endregion
		//#region Step2
		//#endregion
		//#region Step 3
		switch (e.target.id) {
			case 'pass':
				setPass(e.target.value)
				break
			case 'confirmPass':
				setConfirmPass(e.target.value)
				break

			default:
				break
		}

		//#endregion
	}



	const renderStep = () => {
		switch (step) {
			case 0:
				return (
					<Step3
						t={t}
						error={error === 'signup.error.passwordMismatch' ? true : false}
						goToNextStep={handleNextStep}
						handleInput={handleInput}
						pass={pass}
						confirmPass={confirmPass}
					/>)
			case 1:
				return <OnboardingDone
					t={t}
					goToNextStep={handleNextStep}
				/>
			default:
				break
		}
	}
	return (
		<ThemeProvider theme={loginTheme}>
			<LoginWrapper>
				{step === 1 ?
					<OnboardingConfirm
						success={success}
						handleNextStep={handleNextStep}
						handleInput={handleInput}
						// token={token}
					/>
					: <>
						<ItemG xs={12} sm={12} md={5} lg={4} xl={3} container>
							<MobileContainer>
								<LeftPanel /* className={classes.paper} */>
									<InputContainer>
										<ItemG xs={12} container justifyContent={'center'}>
											<Link to={'/login'}>

												<ImgLogo src={logo} alt={'sentiLogo'} />
											</Link>
										</ItemG>
										<Warning
											open={Boolean(error) || Boolean(success)}
											type={success ? 'success' : 'error'}
											label={t(success ? success : error, { disableMissing: true })}
										/>
										{renderStep()}
									</InputContainer>
									<Divider style={{ width: '100%' }} />
									<Footer xs={12} container alignItems={'flex-end'} justifyContent={'center'}>
										<FooterText style={{ flex: 1 }}>
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
							<ItemG md={8} lg={8} xl={9}>
								<LoginImages />
							</ItemG>
						</Hidden>
					</>}
			</LoginWrapper>
		</ThemeProvider>
	)
}

export default NewOnboarding
