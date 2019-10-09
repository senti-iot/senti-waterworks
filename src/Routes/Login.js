import React, { useState, useEffect } from 'react'
import moment from 'moment';
import logo from 'logo.svg'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import cookie from 'react-cookies';

// Components
import { ItemG, TextF, T, Muted, CookiesDialog, PrivacyDialog, FadeOutLoader } from 'Components';
import { Hidden, Paper, InputAdornment, Button, ButtonBase, IconButton } from '@material-ui/core';
import { useEventListener, useDispatch, useHistory, useLocation, useLocalization } from 'Hooks';
import { Person, Google, Visibility, VisibilityOff } from 'variables/icons';

// Data & Redux
import { loginUser, loginUserViaGoogle } from 'data/login';
import { getSettings } from 'Redux/settings';
import { changeLanguage } from 'Redux/localization';
import { setToken } from 'data/data';
import loginStyles from 'Styles/loginStyles';
import { defaultFont } from 'Styles/mainStyles';
import LoginImages from 'Components/Custom/Login/LoginImages';


function Login() {
	const [error, setError] = useState(false)
	const [user, setUser] = useState('')
	const [pass, setPass] = useState('')
	// const [language, setLanguage] = useState('da')
	const [loggingIn, setLoggingIn] = useState(false)
	const [loggingInGoogle, setLoggingInGoogle] = useState(false)
	const [cookies, setCookies] = useState(false)
	const [privacy, setPrivacy] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	// const inputRef = useRef(null)
	const location = useLocation()
	const history = useHistory()
	const dispatch = useDispatch()

	const redux = {
		getSettings: async () => dispatch(await getSettings()),
		setLanguage: lang => dispatch(changeLanguage(lang, true))
	}
	const t = useLocalization()
	const classes = loginStyles()

	const handleCookies = () => setCookies(!cookies)
	const handlePrivacy = () => setPrivacy(!privacy)

	//TODO
	const googleSignIn = async (googleUser) => {
		if (googleUser.error) {
			setLoggingIn(false)
			setError(true)
			return console.error(googleUser.error)
		}
		if (googleUser) {
			let token = googleUser.getAuthResponse().id_token
			await loginUserViaGoogle(token).then(async rs => {
				if (rs) {
					let exp = moment().add('1', 'day')
					cookie.save('SESSION', rs, { path: '/', expires: exp.toDate() })
					if (rs.isLoggedIn) {
						if (setToken()) {
							// TODO
							redux.getSettings()
							var prevURL = location.state ? location.state.prevURL : null
							history.push(prevURL ? prevURL : /* defaultRoute */ '/')
						}
					}
				}
				else {
					setError(true)
				}
			})
		}
	}
	const logUser = () => setLoggingIn(true)

	//TODO
	const handleLoginUser = async () => {

		await loginUser(user, pass).then(async rs => {
			if (rs) {
				let exp = moment().add('1', 'day')
				cookie.save('SESSION', rs, { path: '/', expires: exp.toDate() })
				if (rs.isLoggedIn) {
					if (setToken()) {
						await redux.getSettings()
						var prevURL = location.state ? location.state.prevURL : null
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
				break;
			case 'user':
				setUser(e.target.value)
				break;
			default:
				break;
		}
		if (error) {
			setError(false)
		}
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
	const IconEndAd = cx({
		[classes.IconEndAd]: true,
		[classes.inputIconsColor]: !error,
		[classes.iconError]: error
	})
	return (
		<div className={classes.wrapper}>
			<ItemG xs={12} sm={12} md={4} lg={4} xl={3} container>
				<div className={classes.mobileContainer}>
					<Paper className={classes.paper}>
						<div className={classes.paperContainer} style={{ overflow: 'auto' }}>
							<ItemG xs={12} container justify={'center'}>
								<img className={classes.logo} src={logo} alt={'sentiLogo'} />
							</ItemG>
							<FadeOutLoader circularClasses={classes.loader} on={loggingIn} onChange={handleLoginUser} notCentered>
								<FadeOutLoader circularClasses={classes.loader} on={loggingInGoogle} onChange={() => { }} notCentered>

									<ItemG xs={12} container justify={'center'}>
										<ItemG xs={12} container justify={'center'}>
											<T className={classes.loginButton + ' ' + classes.needAccount}>
												<span style={{ marginRight: 4 }}>
													{t('login.needAnAccount1')}
													<span style={{ fontWeight: 600 }}> Senti</span>
													<span>{t('login.needAnAccount2')}</span>?
												</span>
												<span>
													<Link to={'/login'}>
														{t('login.createAccount')}
													</Link>
												</span>
											</T>
										</ItemG>

										<ItemG container xs={12} >
											<TextF
												id={'user'}
												autoFocus
												label={t('login.username')}
												error={error}
												fullWidth
												onChange={handleInput}
												className={classes.loginButton}
												value={user}
												InputProps={{
													autoComplete: 'on',
													type: 'email',
													endAdornment: <InputAdornment classes={{ root: IconEndAd }}>
														<Person style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
													</InputAdornment>
												}}
											/>
											<TextF
												id={'pass'}
												label={t('login.pass')}
												error={error}
												className={classes.loginButton}
												type={showPassword ? 'text' : 'password'}
												fullWidth
												onChange={handleInput}
												value={pass}
												InputProps={{
													autoComplete: 'on',
													// type: 'password',
													endAdornment: <InputAdornment classes={{ root: IconEndAd }}>
														<IconButton
															className={classes.smallAction}
															onClick={handleShowPassword}
														>
															{showPassword ? <Visibility /> : <VisibilityOff />}
														</IconButton>
													</InputAdornment>
												}}
											/>
											{/* </ItemG> */}
										</ItemG>
										<ItemG xs={12} container justify={'center'}>
											<Button variant={'outlined'} fullWidth color={'primary'} className={classes.loginButton} onClick={logUser}>
												{t('actions.login')}
											</Button>
										</ItemG>
										{/* <ItemG xs={12} container justify={'center'} style={{ margin: "8px 0px" }}> */}
										{/* <ItemG xs={12} container justify={'space-around'}> */}
										{/* <Link to={`/password/reset/${language}`}> */}
										{/* {t('login.forgotPassword')} */}
										{/* </Link> */}
										{/* </ItemG> */}
										{/* </ItemG> */}
										<ItemG xs={12} container justify={'center'}>
											<GoogleLogin
												clientId="1038408973194-qcb30o8t7opc83k158irkdiar20l3t2a.apps.googleusercontent.com"
												render={renderProps => (
													<Button fullWidth className={classes.loginButton} variant={'outlined'} color={'primary'} onClick={
														() => { renderProps.onClick(); setLoggingInGoogle(true); }}>
														<img src={Google} alt={'google-logo'} style={{ marginRight: 8 }} />
														{t('actions.loginWithGoogle')}
													</Button>)}
												buttonText="Login"
												onSuccess={googleSignIn}
												onFailure={googleSignIn}
											/>
										</ItemG>
									</ItemG>
								</FadeOutLoader>
							</FadeOutLoader>
						</div>
						<ItemG xs={12} container alignItems={'flex-end'} justify={'center'} className={classes.footer}>
							<Muted className={classes.footerText}>
								<T paragraph style={{ ...defaultFont, fontSize: 13, color: 'inherit' }}>
									{`${t('login.footer')} `}
								</T>
								<ButtonBase onClick={handleCookies} style={{ ...defaultFont, fontSize: 13, margin: "0px 4px", textDecoration: 'underline' }}>{t('settings.t&c.cookiesPolicy')}</ButtonBase>
								<ButtonBase onClick={handlePrivacy} style={{ ...defaultFont, fontSize: 13, margin: "0px 4px", textDecoration: 'underline' }}>{t('settings.t&c.privacyPolicy')}</ButtonBase>
							</Muted>
						</ItemG>
					</Paper>
				</div>
			</ItemG>
			<CookiesDialog read t={t} open={cookies} handleClose={handleCookies} handleAcceptCookies={handleCookies} />
			<PrivacyDialog t={t} open={privacy} handleClose={handlePrivacy} />
			<Hidden smDown>
				<ItemG md={8} lg={8} xl={9}>
					<LoginImages />
				</ItemG>
			</Hidden>
		</div>
	)
}

export default Login
