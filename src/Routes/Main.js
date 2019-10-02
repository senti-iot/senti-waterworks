import React from 'react'
// import { Link, /* Router */ } from '@reach/router';
// import Header from 'Components/Header';
// import { LocalizationProvider } from 'App';
// import { TProvider } from 'Components/Providers/LocalizationProvider';
import Container from 'Components/Container/Container';
import { ThemeProvider } from '@material-ui/styles';
import { useSelector } from 'react-redux'
import { lightTheme, darkTheme } from 'variables/themes';
// import Header from 'Components/Header';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';


function Main(props) {
	const theme = useSelector(state => state.settings.theme)
	return (
		<ThemeProvider theme={theme ? darkTheme : lightTheme}>
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

	)
}

export default Main
