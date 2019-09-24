import React from 'react';
import { Router } from '@reach/router'
import Main from 'Routes/Main';
import './App.css'
import { ThemeProvider } from '@material-ui/styles';
import { lightTheme } from 'variables/themes';
import LocalizationProvider from 'Components/Providers/LocalizationProvider';

function App() {

	return (
		<LocalizationProvider>
			<ThemeProvider theme={lightTheme}>
				<Router>
					<Main path={'/*'} />
				</Router>
			</ThemeProvider>
		</LocalizationProvider>
	);
}

export default App;
