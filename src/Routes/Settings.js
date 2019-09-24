import React, { useContext, useEffect } from 'react'
// import  from 'Components/Containers/GridContainer';
import { ItemG, GridContainer, T } from 'Components';
import { HTitle } from 'App';
import DisplaySettings from 'Components/Settings/DisplaySettings';
import { TProvider } from 'Components/Providers/LocalizationProvider';

const Settings = (props) => {
	const setTitle = useContext(HTitle)
	const t = useContext(TProvider)
	useEffect(() => {
		setTitle('sidebar.settings')
	}, [setTitle])

	return (
		<GridContainer>
			<ItemG xs={12}>
				<DisplaySettings t={t} />
			</ItemG>
		</GridContainer>
	)
}

export default Settings
