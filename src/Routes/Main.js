import React, { useContext } from 'react'
import { Link, /* Router */ } from '@reach/router';
import Header from 'Components/Header';
import { LocalizationProvider } from 'App';

function Main() {
	const t = useContext(LocalizationProvider)
	return (
		<div>
			<Header />
			{/* <div id={'header'} style={{ width: '100%', background: 'navy', color: '#fff', height: 80, position: 'fixed' }}>
				<h5>Header</h5>
			</div> */}
			<div id={'container'} style={{ marginTop: 70 }}>
				<Link to={''} >{t('actions.close')} </Link>
				<Link to={'hello'} >Hello </Link>
				<Link to={'world'} >World </Link>
			</div>
			{/* <Router>

			</Router> */}

		</div>
	)
}

export default Main
