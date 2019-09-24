import React, { useContext, useState } from 'react'
import { Link, /* Router */ } from '@reach/router';
import Header from 'Components/Header';
// import { LocalizationProvider } from 'App';
import { TProvider } from 'Components/Providers/LocalizationProvider';
import Container from 'Components/Container/Container';

export const HTitle = React.createContext(null)

function Main() {
	const t = useContext(TProvider)
	const [title, setTitle] = useState('')
	return (
		<div>

			<Header title={title} />
			<HTitle.Provider value={setTitle}>
				<div id={'container'} style={{ marginTop: 70 }}>
					<Container />
				</div>
			</HTitle.Provider>
			{/* <Router>

			</Router> */}

		</div>
	)
}

export default Main
