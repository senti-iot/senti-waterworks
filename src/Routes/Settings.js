import React, { useContext, useEffect } from 'react'
// import  from 'Components/Containers/GridContainer';
import { ItemG, GridContainer, T, /* InfoCard */ } from 'Components'
import { HTitle } from 'App'
import DisplaySettings from 'Components/Settings/DisplaySettings'
import TermsAndConditionsSettings from 'Components/Settings/TermsAndConditionsSettings'
import { useLocalization, useSelector, useDispatch, useHistory } from 'Hooks'
import { finishedSaving } from 'Redux/settings'
import useSnackbar from 'Hooks/useSnackbar/useSnackbar'
import { /* Divider, */ CardHeader, IconButton } from '@material-ui/core'
import { settingsStyles } from 'Styles/settingsStyle'
import { SettingsRounded, Close } from 'variables/icons'

const Settings = (props) => {
	//Hooks

	const setTitle = useContext(HTitle)
	const t = useLocalization()
	const s = useSnackbar().s
	const dispatch = useDispatch()
	const classes = settingsStyles()
	const history = useHistory()

	//Redux
	const saved = useSelector(state => state.settings.saved)
	const redux = {
		finishedSaving: () => dispatch(finishedSaving())
	}
	//State

	//Const

	//useCallbacks

	//useEffects

	useEffect(() => {
		setTitle('sidebar.settings')
	}, [setTitle])
	useEffect(() => {
		if (saved === true) {
			s('snackbars.settingsSaved')
			redux.finishedSaving()
		}
	}, [redux, saved, s])
	//Handlers

	const handleCloseButton = () => {
		history.push('/')
	}

	return (
		<GridContainer>
			<ItemG xs={12} noMargin noPadding>
				<CardHeader
					className={classes.cardHeader}
					avatar={<ItemG container alignItems={'center'}><SettingsRounded className={classes.avatar} /></ItemG>}
					title={<T variant={'h6'} style={{ color: '#fff' }}>{t('sidebar.settings')}</T>}
					action={ <IconButton onClick={handleCloseButton}>
						<Close className={classes.closeButton}/>
					</IconButton>}
				/>
			</ItemG>
			<ItemG xs={12}>
				<DisplaySettings t={t} />
			</ItemG>
			{/* <ItemG xs={12}>
				<InfoCard
					noAvatar
					noHeader
					noExpand
					content={<Divider style={{ margin: "0px 2px" }} />}
				/>
			</ItemG> */}
			<ItemG xs={12}>
				<TermsAndConditionsSettings />

			</ItemG>
		</GridContainer>
	)
}

export default Settings
