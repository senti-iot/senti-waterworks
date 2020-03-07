import React, { useState, useEffect } from 'react'
import moment from 'moment'
import logo from 'assets/senti.waterworks.black.svg'
import { Link } from 'react-router-dom'
import cookie from 'react-cookies'

// Components
import { ItemG, CookiesDialog, PrivacyDialog, FadeOutLoader } from 'Components'
import { Hidden, InputAdornment, Link as MuiLink } from '@material-ui/core'
import { useEventListener, useDispatch, useHistory, useLocation, useLocalization } from 'Hooks'
import { Person, Visibility, VisibilityOff, Business } from 'variables/icons'

// Data & Redux
import { loginUser } from 'data/login'
import { getSettings } from 'Redux/settings'
import { changeLanguage } from 'Redux/localization'
import { setToken } from 'data/data'
import { LoginWrapper, MobileContainer, ImgLogo, SmallActionButton, Footer, FooterText, MutedButton, InputContainer, LeftPanel, NeedAccountT, LoginButton, LoginTF } from 'Styles/loginStyles'
import LoginImages from 'Components/Custom/Login/NewLoginImages'
import { ThemeProvider } from '@material-ui/styles'
import { loginTheme } from 'Styles/themes'


function Login() {
	const [error, setEError] = useState(false)
	const [user, setUser] = useState('')
	const [pass, setPass] = useState('')
	const [orgId, setOrgId] = useState('')
	// const [language, setLanguage] = useState('da')
	const [loggingIn, setLoggingIn] = useState(false)
	// const [loggingInGoogle, setLoggingInGoogle] = useState(false)
	const [cookies, setCookies] = useState(false)
	const [privacy, setPrivacy] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const setError = val => {
		setEError(val)
	}
	// const inputRef = useRef(null)
	const location = useLocation()
	const history = useHistory()
	const dispatch = useDispatch()

	const redux = {
		getSettings: async () => dispatch(await getSettings()),
		setLanguage: lang => dispatch(changeLanguage(lang, true))
	}
	const t = useLocalization()

	const handleCookies = () => setCookies(!cookies)
	const handlePrivacy = () => setPrivacy(!privacy)

	//TODO
	// const googleSignIn = async (googleUser) => {
	// 	if (googleUser.error) {
	// 		setLoggingIn(false)
	// 		setError(true)
	// 		return console.error(googleUser.error)
	// 	}
	// 	if (googleUser) {
	// 		let token = googleUser.getAuthResponse().id_token
	// 		await loginUserViaGoogle(token).then(async rs => {
	// 			if (rs) {
	// 				let exp = moment().add('1', 'day')
	// 				cookie.save('SESSION', rs, { path: '/', expires: exp.toDate() })
	// 				if (rs.isLoggedIn) {
	// 					if (setToken()) {
	// 						// TODO
	// 						redux.getSettings()
	// 						var prevURL = location.state ? location.state.prevURL : null
	// 						history.push(prevURL ? prevURL : /* defaultRoute */ '/')
	// 					}
	// 				}
	// 			}
	// 			else {
	// 				setError(true)
	// 			}
	// 		})
	// 	}
	// }
	const logUser = () => setLoggingIn(true)

	const handleLoginUser = async () => {
		await loginUser(user, pass, orgId).then(async rs => {
			if (rs) {
				console.log('LoginUser', rs)
				let exp = moment().add('1', 'day')
				console.log(rs)
				cookie.save('SESSION', rs, { path: '/', expires: exp.toDate() })
				if (setToken()) {
					console.log(cookie.load('SESSION'))
					await redux.getSettings()
					var prevURL = location.state ? location.state.prevURL : null
					if ("isAdmin") {
						history.push('/admin')
					}
					else {
						history.push(prevURL ? prevURL : /* defaultRoute */ '/')
					}
				}

			}
			else {
				setError(true)
				setLoggingIn(false)
			}
		})
	}
	const handleInput = (e) => {
		switch (e.target.id) {
			case 'pass':
				setPass(e.target.value)
				break
			case 'user':
				setUser(e.target.value)
				break
			case 'orgId':
				setOrgId(e.target.value)
				break
			default:
				break
		}
		// if (error) {
		// 	setError(false)
		// }
	}
	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			logUser()
		}
	}
	useEventListener('keypress', handleKeyPress)
	useEffect(() => {
		var loginData = cookie.load('SESSION')
		//Login Data is valid
		if (loginData) {
			if (setToken()) {
				history.push('/')
			}
		}
		if (location.pathname.includes('en')) {
			redux.setLanguage('en')
			// setLanguage('en')
		}
	}, [location.pathname, history, redux])

	const handleShowPassword = () => setShowPassword(!showPassword)

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
								<FadeOutLoader on={loggingIn} onChange={handleLoginUser}>
									<ItemG xs={12} container justify={'center'}>
										<ItemG xs={12} container justify={'center'}>
											<NeedAccountT>
												<span style={{ marginRight: 4 }}>
													{t('login.needAnAccount1')}
													<span style={{ fontWeight: 600 }}> Senti </span>
													<span>{t('login.needAnAccount2')}</span>?
												</span>
												<span>

													<MuiLink component={Link} to={'/signup/da/step1'}>
														{t('login.createAccount')}
													</MuiLink>
												</span>
											</NeedAccountT>
										</ItemG>

										<ItemG container xs={12} style={{ marginTop: 48 }}>
											<LoginTF
												id={'user'}
												autoFocus
												label={t('login.username')}
												error={error}
												fullWidth
												type={'email'}
												onChange={handleInput}
												value={user}
												InputProps={{
													endAdornment: <InputAdornment>
														<Person style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
													</InputAdornment>
												}}
											/>
											<LoginTF
												id={'pass'}
												label={t('login.pass')}
												error={error}
												type={showPassword ? 'text' : 'password'}
												fullWidth
												onChange={handleInput}
												value={pass}
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
												id={'orgId'}
												label={t('login.nickname')}
												error={error}
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
											<LoginButton variant={'contained'} fullWidth color={'secondary'} onClick={logUser}>
												{t('actions.login')}
											</LoginButton>
										</ItemG>
										<ItemG xs={12} container justify={'center'}>
										</ItemG>
									</ItemG>
								</FadeOutLoader>
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

export default Login
