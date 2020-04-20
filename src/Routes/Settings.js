import React, { useContext, useEffect } from 'react'
// import  from 'Components/Containers/GridContainer';
import { ItemG, GridContainer } from 'Components'
import { HTitle } from 'App'
import DisplaySettings from 'Components/Settings/DisplaySettings'
import TermsAndConditionsSettings from 'Components/Settings/TermsAndConditionsSettings'
import { useLocalization, useSelector, useDispatch } from 'Hooks'
import { finishedSaving } from 'Redux/settings'
import useSnackbar from 'Hooks/useSnackbar/useSnackbar'

const Settings = (props) => {
	const setTitle = useContext(HTitle)
	const t = useLocalization()
	const s = useSnackbar().s
	const dispatch = useDispatch()
	const saved = useSelector(state => state.settings.saved)
	const redux = {
		finishedSaving: () => dispatch(finishedSaving())
	}
	useEffect(() => {
		setTitle('sidebar.settings')
	}, [setTitle])
	useEffect(() => {
		if (saved === true) {
			s('snackbars.settingsSaved')
			redux.finishedSaving()
		}
	}, [redux, saved, s])
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
