import React from 'react'
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


function Main() {
	const colorTheme = useSelector(s => s.settings.colorTheme)
	return (
		<MuiThemeProvider theme={themes[colorTheme]}>

			<ThemeProvider theme={themes[colorTheme]}>
				<div>
					<Switch>
						<Route path={'/login'}>
							<Login />
						</Route>
						<Route path={'/'}>
							<Container />
						</Route>
					</Switch>
				</div>

			</ThemeProvider>
		</MuiThemeProvider>

	)
}

export default Main
