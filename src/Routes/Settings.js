import React, { useContext, useEffect, useReducer } from 'react'
// import  from 'Components/Containers/GridContainer';
import { ItemG, GridContainer } from 'Components';
import { HTitle } from 'App';
import DisplaySettings from 'Components/Settings/DisplaySettings';
import { TProvider } from 'Components/Providers/LocalizationProvider';
import { settings, initialState } from 'Redux/settings';

const Settings = (props) => {
	const setTitle = useContext(HTitle)
	const t = useContext(TProvider)
	console.log(t)
	const [sState, sDispatch] = useReducer(settings, initialState)
	useEffect(() => {
		setTitle('sidebar.settings')
	}, [setTitle])

	return (
		<GridContainer>
			<ItemG xs={12}>
				<DisplaySettings t={t} sState={sState} sDispatch={sDispatch} />
			</ItemG>
		</GridContainer>
	)
}

export default Settings
