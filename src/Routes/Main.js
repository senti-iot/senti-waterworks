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
import MobileOnboarding from './MobileOnboarding'
import BottomNavGuide from '../Components/MobileOnboarding/InAppScreens/BottomNavGuide' // temp
import * as themes from 'Styles/themes'
// import { darkTheme } from 'variables/themes';
import NewContent from 'Components/Loaders/NewContent'
import Onboarding from 'Routes/Onboarding'

// import size from 'Styles/themes/mediaQueries'


function Main() {

	const colorTheme = useSelector(s => s.settings.colorTheme)
	const themeType = useSelector(s => s.settings.theme)
	console.log(themes[colorTheme])
	return (


		<ThemeProvider theme={themes[colorTheme](themeType)}>
			<MuiThemeProvider theme={themes[colorTheme](themeType)}>

				<NewContent />
				<Switch>
					<Route path={'/signup/:language/:step'}>
						<Onboarding />
					</Route>
					<Route path={'/login/:language?'}>
						<Login />
					</Route>
					<Route path={'/mobile-onboarding'}>
						<MobileOnboarding />
					</Route>
					{/* temporary route just so that I can see the component rendered: */}
					<Route path="/onboarding-inapp">
						{/* @Pavel - if you use <Route component={CompA}/> the context might be lost
							and when you invoke any of the router hooks useHistory/useMatch etc. it will crash the app
							if you really need to use the above pattern do it with render={routeProps => <CompA {...routeProps}/>}
							and you will have history, match, location in props provided from routeProps
						*/}
						<BottomNavGuide />
					</Route>
					<Route path={'/'}>
						<Container />
					</Route>
				</Switch>

			</MuiThemeProvider>
		</ThemeProvider>

	)
}
Main.whyDidYouRender = true

export default Main
