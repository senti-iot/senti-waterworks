import React from 'react'
// import { Link, /* Router */ } from '@reach/router';
// import Header from 'Components/Header';
// import { LocalizationProvider } from 'App';
// import { TProvider } from 'Components/Providers/LocalizationProvider';
import Container from 'Components/Container/Container';
import { ThemeProvider } from '@material-ui/styles';
import Header from 'Components/Header';
import { BrowserRouter as Router, Route, Switch /* Redirect */ } from 'react-router-dom';
import { lightTheme, darkTheme } from 'variables/themes';
import { useSelector } from 'react-redux'
import { createBrowserHistory } from 'history'

export const hist = createBrowserHistory();

function Main(props) {
	// const t = useContext(TProvider)
	const theme = useSelector(state => state.settings.theme)
	return (

		<ThemeProvider theme={theme ? darkTheme : lightTheme}>
			<Router>
				<Header title={props.title} />
				<div style={{ marginTop: 70 }}>
					<Switch>
						<Route path={'/'}>
							<Container />
						</Route>
					</Switch>
				</div>
			</Router>
		</ThemeProvider>
	)
}

export default Main
