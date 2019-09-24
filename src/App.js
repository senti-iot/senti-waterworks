import React, { useState } from 'react';
import { Router } from '@reach/router'
import Main from 'Routes/Main';
import './App.css'
import { ThemeProvider } from '@material-ui/styles';
import { lightTheme } from 'variables/themes';
import LocalizationProvider from 'Components/Providers/LocalizationProvider';
import Header from 'Components/Header';
import Settings from 'Routes/Settings';

export const HTitle = React.createContext(null)

function App() {
	const [title, setTitle] = useState('')

	return (
		<LocalizationProvider>
			<HTitle.Provider value={setTitle}>
				<ThemeProvider theme={lightTheme}>
					<Header title={title} />
					<div style={{ marginTop: 70 }}>
						<Router>
							<Main path={'/*'} title={title} />
							<Settings path={'/settings'} />
						</Router>
					</div>
				</ThemeProvider>
			</HTitle.Provider>

		</LocalizationProvider>
	);
}

export default App;
