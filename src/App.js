import React from 'react';
import { Router } from '@reach/router'
import Main from 'Main';

function App() {
	return (
		<Router>
			<Main path={'/main/*'} />
		</Router>
	);
}

export default App;
