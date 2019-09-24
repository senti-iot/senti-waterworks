import React from 'react'
// import { Link, /* Router */ } from '@reach/router';
// import Header from 'Components/Header';
// import { LocalizationProvider } from 'App';
// import { TProvider } from 'Components/Providers/LocalizationProvider';
import Container from 'Components/Container/Container';
import { ThemeProvider } from '@material-ui/styles';
import Header from 'Components/Header';
import { Router } from '@reach/router';
import Settings from './Settings';
import { lightTheme, darkTheme } from 'variables/themes';
import { useSelector } from 'react-redux'

function Main(props) {
	// const t = useContext(TProvider)
	const theme = useSelector(state => state.settings.theme)
	return (

		<ThemeProvider theme={theme ? darkTheme : lightTheme}>
			<Header title={props.title} />
			<div style={{ marginTop: 70 }}>
				<Router>
					<Container path={'/*'} />
					<Settings path={'/settings'} />
				</Router>
			</div>
		</ThemeProvider>
	)
}

export default Main
