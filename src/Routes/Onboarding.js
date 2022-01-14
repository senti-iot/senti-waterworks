import React, { useState, useEffect, useCallback } from 'react'
import logo from 'assets/senti.waterworks.black.svg'
import cookie from 'react-cookies'

// Components
import { ItemG, CookiesDialog, PrivacyDialog, CircularLoader, Warning } from 'Components'
import { Hidden, Divider } from '@material-ui/core'
import { useDispatch, useHistory, useLocalization, useEventListener } from 'Hooks'

// Data & Redux
import { changeLanguage } from 'Redux/localization'
import { setToken } from 'data/data'
import { LoginWrapper, MobileContainer, ImgLogo, Footer, FooterText, MutedButton, InputContainer, LeftPanel } from 'Styles/loginStyles'
import LoginImages from 'Components/Custom/Login/NewLoginImages'
import { ThemeProvider } from '@material-ui/styles'
import { loginTheme } from 'Styles/themes'
import Step1 from 'Components/Onboarding/Step1'
import { useParams } from 'react-router'
import Step2 from 'Components/Onboarding/Step2'
import { createOnboardingUser, confirmOnboardingUser, getOnboardData, finishOnboarding } from 'data/onboarding'
import { validateEmail } from 'data/functions'
import OnboardingDone from 'Components/Onboarding/OnboardingDone'
import OnboardingConfirm from 'Components/Onboarding/OnboardingConfirm'
import { Link } from 'react-router-dom'
import moment from 'moment'


const Onboarding = props => {
	//Hooks
	const t = useLocalization()
	const params = useParams()
	const history = useHistory()
	const dispatch = useDispatch()
	//Redux

	//State

	const [cookies, setCookies] = useState(false)
	const [privacy, setPrivacy] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [token, setConfirmToken] = useState('')
	const [antiCheat, setAntiCheat] = useState(false)
	const [success, setSuccess] = useState(false)

	//#region Step 1
	const [orgIdent, setOrgIdent] = useState('')
	const [installationId, setInstallationId] = useState('')
	const [deviceIdent, setDeviceIdent] = useState('')
	//#endregion

	//#region Step 2
	const [org, setOrg] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [streetName, setStreetName] = useState('')
	const [streetNumber, setStreetNumber] = useState('')
	const [zip, setZip] = useState('')
	const [city, setCity] = useState('')
	const [startDate, setStartDate] = useState('')
	const [instUUID, setInstUUID] = useState('')
	//#endregion

	//#region Step 3
	const [pass, setPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [noOfChildren, setNoOfChildren] = useState(0)
	const [noOfAdults, setNoOfAdults] = useState(1)

	//#endregion
	//Const

	//useCallbacks

	const handleCreateUser = useCallback(async () => {

		let user = {
			firstName: firstName,
			lastName: lastName,
			phone: phone,
			email: email,
			userName: email,
			password: pass,
			image: "",
			aux: {
				sentiWaterworks: {
					extendedProfile: {
						streetName: streetName,
						city: city,
						zip: zip,
						noOfChildren: noOfChildren,
						noOfAdults: noOfAdults
					}
				}
			},
			internal: {
				sentiWaterworks: {
					settings: {
						language: "da",
						dsTheme: 0,
						weekendColor: "red",
						theme: 0,
						colorTheme: "blue",
						trp: 10,
						cookies: false,
						snackbarLocation: 'left',
						hoverTime: 1000,
					}
				}
			},
			org: {
				uuid: org
			},
			state: 4
		}
		let result = await createOnboardingUser(user)
		if (result.ok) {
			return true
		}
		else {
			return false
		}
	}, [streetName, city, email, firstName, lastName, noOfAdults, noOfChildren, org, pass, phone, zip])

	const handleNextStep = useCallback(async () => {
		let step = params.step
		let err = 0
		if (step === 'step1') {

			setLoading(true)
			let autoCompleteData = await getOnboardData(orgIdent, installationId, deviceIdent)
			if (autoCompleteData === 404 || autoCompleteData === 401) {
				setError('signup.error.missingDevice')
				setLoading(false)
			}
			else {
				if (error) {
					setError(null)
				}
				handleAutoComplete(autoCompleteData)
				setLoading(false)
				history.push(`/onboard/${params.lang}/step2`)
			}
		}
		if (step === 'step2') {
			setLoading(true)
			switch (true) {
				case lastName.length === 0:
				case firstName.length === 0:
					err = 1
					setError('signup.error.emptyName')
					break
				case email.length === 0:
					err = 1
					setError('signup.error.emptyEmail')
					break
				case !validateEmail(email):
					err = 1
					setError('signup.error.invalidEmail')
					break
				default:
					break
			}
			if (err) {
				setLoading(false)
				console.log(startDate)
				return
			}
			else {
				/** new Magic */
				let data = {
					sUserBody: null,
					wUserBody: null,
					instBody: null
				}
				data.sUserBody = {
					userName: email,
					email: email,
					org: {
						uuid: org,
					},
					firstName: firstName,
					lastName: lastName,
					noOfAdults: noOfAdults,
					noOfChildren: noOfChildren,
					address: streetName + " " + streetNumber,
					postnr: zip,
					city: city
				}
				console.log(startDate)
				data.wUserBody = {
					startDate: startDate,
					instUUID: instUUID,
					adults: noOfAdults,
					children: noOfChildren
				}
				data.instBody = {
					uuid: instUUID,
					streetName: streetName,
					streetNumber: streetNumber,
					zip: zip,
					city: city
				}
				let create = await finishOnboarding(data)
				console.log('create', create)
				setLoading(false)
				if (!create?.Error) {
					history.push(`/onboard/${params.lang}/done`)
				}
				else {
					setError('signup.error.missingData')
				}
				// //Do the magic here
				// let user = {
				// 	userName: email,
				// 	email: email,
				// 	org: {
				// 		uuid: org
				// 	},
				// 	firstName: firstName,
				// 	lastName: lastName
				// }
				// //Create Senti User
				// let createUser = await createSentiUser(user)
				// if (createUser) {
				// 	//Create InstUser
				// 	let instUser = {
				// 		startDate: startDate,
				// 		userUUID: createUser.uuid,
				// 		instUUID: instUUID,
				// 	}
				// 	let cInstUser = await createInstUser(instUser)
				// 	if (cInstUser) {
				// 		//Update the installation streetName
				// 		let installation = {
				// 			uuid: instUUID,
				// 			streetName: streetName
				// 		}
				// 		let uInstStreetName = await updateInstallationAddress(installation)
				// 		if (uInstStreetName) {

				// 			setLoading(false)
				// 			history.push(`/onboard/${params.lang}/done`)
				// 		}
				// 		else {
				// 			setError('signup.error.missingData')
				// 		}
				// 	}
				// 	else {
				// 		setError('signup.error.missingData')
				// 	}
				// }
				// else {
				// 	setError('signup.error.missingData')
				// }
				// setLoading(false)
			}
		}
		if (step === 'step3') {
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
				let result = handleCreateUser()
				if (result) {
					history.push(`/onboard/${params.lang}/done`)
				}
				else {
					setError('signup.error.missingData')
				}

			}
		}
		if (step === 'done') {
			history.push('/login')
		}
		if (step === 'confirm') {
			// if (success) {
			// 	history.push('/login')
			// 	return
			// }
			if (error) {
				setError(null)
			}
			let confirmation = await confirmOnboardingUser(params.token)
			if (confirmation.status === 404)
				setError('signup.error.missingData')
			else {
				setSuccess('confirmUser.welcomeMessage')
			}
		}
	}, [params.step, params.lang, params.token, orgIdent, installationId, deviceIdent, error, history, lastName, firstName, email, org, startDate, instUUID, noOfAdults, noOfChildren, streetName, streetNumber, zip, city, confirmPass, pass, handleCreateUser])

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
		if (params.lang === 'en') {
			dispatch(changeLanguage('en', true))
			// setLanguage('en')
		}
	}, [params.lang, history, dispatch])

	/**
	 * AntiCheat
	 */
	useEffect(() => {
		if (params.step.includes('step') && params.step !== 'step1') {
			setAntiCheat(true)
		}
		if (params.step.includes('confirm')) {
			setConfirmToken(params.token)
		}
		//eslint-disable-next-line
	}, [])
	useEffect(() => {
		if (antiCheat) {
			history.push(`/onboard/${params.lang}/step1`)
		}
		//eslint-disable-next-line
	}, [antiCheat])

	//Handlers

	// const inputRef = useRef(null)


	const handleCookies = () => setCookies(!cookies)
	const handlePrivacy = () => setPrivacy(!privacy)


	const handleInput = (e, id) => {
		if (error) {
			setError(null)
		}
		//#region Step1
		switch (e.target.id) {
			case 'orgIdent':
				setOrgIdent(e.target.value)
				break
			case 'installationId':
				setInstallationId(e.target.value)
				break
			case 'deviceIdent':
				setDeviceIdent(e.target.value)
				break
			default:
				break
		}

		//#endregion
		//#region Step2
		switch (e.target.id) {
			case 'firstName':
				setFirstName(e.target.value)
				break
			case 'lastName':
				setLastName(e.target.value)
				break
			case 'email':
				setEmail(e.target.value)
				break
			case 'phone':
				setPhone(e.target.value)
				break
			case 'streetName':
				setStreetName(e.target.value)
				break
			case 'zip':
				setZip(e.target.value)
				break
			case 'city':
				setCity(e.target.value)
				break
			case 'streetNumber':
				setStreetNumber(e.target.value)
				break
			default:
				break
		}
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

		switch (id) {
			case 'noOfChildren':
				setNoOfChildren(e.target.value)
				break
			case 'noOfAdults':
				setNoOfAdults(e.target.value)
				break
			default:
				break
		}
		//#endregion
	}



	const handleAutoComplete = data => {
		setFirstName(data.firstName ? data.firstName : "")
		setLastName(data.lastName ? data.lastName : "")
		setEmail(data.email ? data.email : "")
		setPhone(data.telefon ? data.telefon : "")
		setStreetName(data.streetName ? data.streetName : "")
		setZip(data.zip ? data.zip : "")
		setCity(data.city ? data.city : "")
		setNoOfAdults(data.adults ? data.adults : 1)
		setNoOfChildren(data.children ? data.children : 0)
		setOrg(data.orgUUID ? data.orgUUID : "")
		setStartDate(
			data.startDate ? (moment(data.startDate).format('YYYY-MM-DD HH:mm:ss') !== 'Invalid date' ?
				moment(data.startDate).format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:ss')) : moment().format('YYYY-MM-DD HH:mm:ss'))
		setInstUUID(data.installationUUID ? data.installationUUID : null)
	}



	const renderStep = () => {
		let step = params.step
		switch (step) {
			case "step1":
				return (
					<Step1
						t={t}
						handleInput={handleInput}
						orgIdent={orgIdent}
						installationId={installationId}
						deviceIdent={deviceIdent}
						goToNextStep={handleNextStep}
					/>)
			case "step2":
				return (
					<Step2
						t={t}
						handleInput={handleInput}
						firstName={firstName}
						lastName={lastName}
						email={email}
						phone={phone}
						streetName={streetName}
						streetNumber={streetNumber}
						zip={zip}
						city={city}
						goToNextStep={handleNextStep}
						noOfChildren={noOfChildren}
						noOfAdults={noOfAdults}
					/>)
			// case "step3":
			// 	return (
			// 		<Step3
			// 			t={t}
			// 			error={error === 'signup.error.passwordMismatch' ? true : false}
			// 			goToNextStep={handleNextStep}
			// 			handleInput={handleInput}
			// 			pass={pass}
			// 			confirmPass={confirmPass}
			// 			noOfChildren={noOfChildren}
			// 			noOfAdults={noOfAdults}
			// 		/>)
			case "done":
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
				{params.step === 'confirm' ?
					<OnboardingConfirm
						success={success}
						handleNextStep={handleNextStep}
						handleInput={handleInput}
						token={token}
					/>
					: <>
						<ItemG xs={12} sm={12} md={5} lg={4} xl={3} container>
							<MobileContainer>
								<LeftPanel /* className={classes.paper} */>
									<InputContainer>
										<ItemG xs={12} container justify={'center'}>
											<Link to={'/login'}>

												<ImgLogo src={logo} alt={'sentiLogo'} />
											</Link>
										</ItemG>
										<Warning
											open={Boolean(error) || Boolean(success)}
											type={success ? 'success' : 'error'}
											label={t(success ? success : error, { disableMissing: true })}
										/>
										{loading ? <CircularLoader /> : renderStep()}
									</InputContainer>
									<Divider style={{ width: '100%' }} />
									<Footer xs={12} container alignItems={'flex-end'} justify={'center'}>
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

export default Onboarding
