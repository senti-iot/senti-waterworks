import React from 'react'
// import { Link, /* Router */ } from '@reach/router';
// import Header from 'Components/Header';
// import { LocalizationProvider } from 'App';
// import { TProvider } from 'Components/Providers/LocalizationProvider';
import Container from 'Components/Container/Container'
import { ThemeProvider } from 'styled-components'
import { useSelector } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
// import { lightTheme, darkTheme } from 'variables/themes';
// import Header from 'Components/Header';
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import ResetPassword from './ResetPassword'
// import MobileOnboarding from './MobileOnboarding'
// import BottomNavGuide from '../Components/MobileOnboarding/InAppScreens/BottomNavGuide' // temp
import * as themes from 'Styles/themes'
// import { darkTheme } from 'variables/themes';
import NewContent from 'Components/Loaders/NewContent'
import Onboarding from 'Routes/NewOnboarding'
import ManualOnboarding from 'Routes/Onboarding'
import SnackbarProvider from 'Hooks/useSnackbar/SnackbarProvider'

// import size from 'Styles/themes/mediaQueries'


function Main() {

	const colorTheme = useSelector(s => s.settings.colorTheme)
	const themeType = useSelector(s => s.settings.theme)
	return (


		<ThemeProvider theme={themes[colorTheme](themeType)}>
			<MuiThemeProvider theme={themes[colorTheme](themeType)}>
				<SnackbarProvider>

					<NewContent />
					<Switch>
						<Route path={'/onboard/:lang/:step/:token?'}>
							<ManualOnboarding/>
						</Route>
						<Route path={'/signup/:language/:step/:token?'}>
							<Onboarding />
						</Route>
						<Route path={'/resetpassword/:token?'}>
							<ResetPassword/>
						</Route>
						<Route path={'/login/:language?'}>
							<Login />
						</Route>
						{/* <Route path={'/mobile-onboarding'}>
						<MobileOnboarding />
					</Route> */}
						{/* temporary route just so that I can see the component rendered: */}
						{/* <Route path="/onboarding-inapp">
						<BottomNavGuide />
					</Route> */}
						<Route path={'/'}>
							<Container />
						</Route>
					</Switch>

				</SnackbarProvider>
			</MuiThemeProvider>
		</ThemeProvider>

	)
}
Main.whyDidYouRender = true

export default Main
