import React, { useContext, useEffect } from 'react'
// import  from 'Components/Containers/GridContainer';
import { ItemG, GridContainer } from 'Components';
import { HTitle } from 'App';
import DisplaySettings from 'Components/Settings/DisplaySettings';
import { TProvider } from 'Components/Providers/LocalizationProvider';
import TermsAndConditionsSettings from 'Components/Settings/TermsAndConditionsSettings';

const Settings = (props) => {
	const setTitle = useContext(HTitle)
	const t = useContext(TProvider)
	useEffect(() => {
		setTitle('sidebar.settings')
	}, [setTitle])

	return (
		<GridContainer spacing={2}>
			<ItemG xs={12}>
				<DisplaySettings t={t} />
			</ItemG>
			<ItemG xs={12}>
				<TermsAndConditionsSettings />
			</ItemG>
		</GridContainer>
	)
}

export default Settings
