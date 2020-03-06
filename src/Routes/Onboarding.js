import React, { useState, useEffect } from 'react'
import logo from 'assets/senti.waterworks.black.svg'
import cookie from 'react-cookies'

// Components
import { ItemG, CookiesDialog, PrivacyDialog, CircularLoader } from 'Components'
import { Hidden } from '@material-ui/core'
import { useDispatch, useHistory, useLocation, useLocalization } from 'Hooks'

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
import Step3 from 'Components/Onboarding/Step3'
import { getOnboardingData, createOnboardingUser } from 'data/onboarding'


const Onboarding = props => {
	//Hooks
	const t = useLocalization()
	const params = useParams()
	const location = useLocation()
	const history = useHistory()
	const dispatch = useDispatch()
	//Redux

	//State

	const [cookies, setCookies] = useState(false)
	const [privacy, setPrivacy] = useState(false)
	const [loading, setLoading] = useState(false)

	//#region Step 1
	const [orgIdent, setOrgIdent] = useState('hfsundbyvester')
	const [installationId, setInstallationId] = useState('56')
	const [deviceIdent, setDeviceIdent] = useState('axioma5003405')
	//#endregion

	//#region Step 2
	const [org, setOrg] = useState('')
	const [role, setRole] = useState(0)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [address, setAddress] = useState('')
	const [postnr, setPostnr] = useState('')
	const [city, setCity] = useState('')
	//#endregion

	//#region Step 3
	const [pass, setPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const [noOfChildren, setNoOfChildren] = useState(0)
	const [noOfAdults, setNoOfAdults] = useState(1)

	//#endregion
	//Const

	//useCallbacks

	//useEffects

	//Handlers

	// const inputRef = useRef(null)


	const handleCookies = () => setCookies(!cookies)
	const handlePrivacy = () => setPrivacy(!privacy)


	const handleInput = (e, id) => {
		console.log(e)
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
			case 'address':
				setAddress(e.target.value)
				break
			case 'postnr':
				setPostnr(e.target.value)
				break
			case 'city':
				setCity(e.target.value)
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

	useEffect(() => {
		var loginData = cookie.load('SESSION')
		//Login Data is valid
		if (loginData) {
			if (setToken()) {
				history.push('/')
			}
		}
		if (location.pathname.includes('en')) {
			dispatch(changeLanguage('en', true))
			// setLanguage('en')
		}
	}, [location.pathname, history, dispatch])

	const handleCreateUser = async () => {

		let user = {
			firstName: firstName,
			lastName: lastName,
			phone: phone,
			email: email,
			userName: email,
			password: pass,
			image: "",
			aux: {},
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
					},
					extendedProfile: {
						address: address,
						city: city,
						postnr: postnr,
						noOfChildren: noOfChildren,
						noOfAdults: noOfAdults
					}
				}
			},
			org: {
				uuid: org
			},
			role: {
				uuid: role
			},
			state: 4
		}
		let result = await createOnboardingUser(user)
		console.log(result)
	}
	const handleAutoComplete = data => {
		setOrg(data.orgUUID ? data.orgUUID : "")
		setRole(data.roleUUID ? data.roleUUID : "")
		setFirstName(data.firstName ? data.firstName : "")
		setLastName(data.lastName ? data.lastName : "")
		setEmail(data.email ? data.email : "")
		setPhone(data.telefon ? data.telefon : "")
		setAddress(data.address ? data.address : "")
		setPostnr(data.postnr ? data.postnr : "")
		setCity(data.city ? data.city : "")
		setNoOfAdults(data.adults ? data.adults : 1)
		setNoOfChildren(data.children ? data.children : 0)
	}

	const handleNextStep = async () => {
		let step = params.step
		if (step === 'step1') {
			setLoading(true)
			let autoCompleteData = await getOnboardingData(orgIdent, installationId, deviceIdent)
			console.log(autoCompleteData)
			handleAutoComplete(autoCompleteData)
			setLoading(false)
			history.push('/signup/da/step2')
		}
		if (step === 'step2') {
			/**
			 * TODO
			 * Check that at least the name & e-mail are filled up and correct format
			 */
			history.push('/signup/da/step3')
		}
		if (step === 'step3') {
			handleCreateUser()
		}
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
						address={address}
						postnr={postnr}
						city={city}
						goToNextStep={handleNextStep}

					/>)
			case "step3":
				return (
					<Step3
						t={t}
						goToNextStep={handleNextStep}
						handleInput={handleInput}
						pass={pass}
						confirmPass={confirmPass}
						noOfChildren={noOfChildren}
						noOfAdults={noOfAdults}
					/>)
			default:
				break
		}
	}
	return (
		<ThemeProvider theme={loginTheme}>

			<LoginWrapper>
				<ItemG xs={12} sm={12} md={5} lg={4} xl={3} container>
					<MobileContainer>
						<LeftPanel /* className={classes.paper} */>
							<InputContainer>
								<ItemG xs={12} container justify={'center'}>
									<ImgLogo src={logo} alt={'sentiLogo'} />
								</ItemG>

								{loading ? <CircularLoader fill /> : renderStep()}
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
					<ItemG md={8} lg={8} xl={9}>
						<LoginImages />
					</ItemG>
				</Hidden>
			</LoginWrapper>
		</ThemeProvider>
	)
}

export default Onboarding
