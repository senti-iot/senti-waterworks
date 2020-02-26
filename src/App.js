import React, { useState } from 'react'
import Main from 'Routes/Main'
import './App.css'

export const HTitle = React.createContext(null)

function App() {
	const [title, setTitle] = useState('')
	return (

		<HTitle.Provider value={setTitle}>
			<Main title={title} />
		</HTitle.Provider>

	)
}
/* test */
App.whyDidYouRender = true

export default App
