import React, { useState } from 'react';
import Main from 'Routes/Main';
import './App.css'
import LocalizationProvider from 'Components/Providers/LocalizationProvider';
import store from 'Redux/store';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';

export const HTitle = React.createContext(null)

function App() {
	const [title, setTitle] = useState('')
	return (
		<Router>
			<Provider store={store}>
				<LocalizationProvider>
					<HTitle.Provider value={setTitle}>
						<Main title={title} />
					</HTitle.Provider>
				</LocalizationProvider>
			</Provider>
		</Router>
	);
}

export default App;
