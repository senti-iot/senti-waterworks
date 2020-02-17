import React, { useEffect } from 'react'
// import { Link, /* Router */ } from '@reach/router';
// import Header from 'Components/Header';
// import { LocalizationProvider } from 'App';
// import { TProvider } from 'Components/Providers/LocalizationProvider';
import Container from 'Components/Container/Container';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
// import { lightTheme, darkTheme } from 'variables/themes';
// import Header from 'Components/Header';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import * as themes from 'Styles/themes'
// import { darkTheme } from 'variables/themes';
import NewContent from 'Components/Loaders/NewContent';
import size from 'Styles/themes/mediaQueries';


function Main() {
	useEffect(() => {
		//DEV Match Media
		let mqlsD = Object.keys(size.down).map(key => window.matchMedia(size.down[key]))
		let mqlsU = Object.keys(size.down).map(key => window.matchMedia(size.up[key]))
		mqlsD = mqlsD.filter(f => f.matches === true)
		mqlsU = mqlsU.filter(f => f.matches === true)
		console.log("Down", mqlsD.map(m => m.media))
		console.log("Up", mqlsU.map(m => m.media))
		// for (var i = 0; i < mqls.length; i++) { // loop through queries
		// 	mediaqueryresponse(mqls[i]) // call handler function explicitly at run time
		// 	mqls[i].addListener(mediaqueryresponse) // call handler function whenever the media query is triggered
		// }
		//eslint-disable-next-line
	}, [])
	const colorTheme = useSelector(s => s.settings.colorTheme)
	return (


		<ThemeProvider theme={themes[colorTheme]}>
			<MuiThemeProvider theme={themes[colorTheme]}>

				<NewContent />
				<Switch>
					<Route path={'/login'}>
						<Login />
					</Route>
					<Route path={'/mobile-onboarding'}>
						<div>Here Pavel</div>
					</Route>
					<Route path={'/'}>
						<Container />
					</Route>
				</Switch>
			</MuiThemeProvider>
		</ThemeProvider>

	)
}
Main.whyDidYouRender = true;

export default Main
