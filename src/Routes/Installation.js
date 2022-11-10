import { Button } from '@material-ui/core'
import { GridContainer, InfoCard, ItemG } from 'Components'
import Installation from 'Components/Custom/InstallationsTable/Installation'
import PageHeader from 'Components/Custom/PageHeader/PageHeader'
import { useLocalization } from 'Hooks'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { setSelectedDevices } from 'Redux/appState'
import { Devices, PageviewIcon } from 'variables/icons'

const InstallationRoute = (props) => {
	//Hooks
	const params = useParams()
	const history = useHistory()
	const dispatch = useDispatch()
	const t = useLocalization()
	//Redux
	const installation = useSelector(s => s.data.installation)

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	const handleSeeData = () => {

		if (installation) {
			dispatch(setSelectedDevices([installation.deviceUUID]))
			history.push('/')

		}
	}

	return (
		<GridContainer>
			<ItemG xs={12} noMargin noPadding>
				<PageHeader
					label={'sidebar.installation'}
					subheader={params.uuid}
					icon={Devices}
					actions={<ItemG container>
						<Button variant={'contained'} color={'secondary'} style={{ color: '#fff' }} onClick={handleSeeData} startIcon={<PageviewIcon />} >{t('actions.seeData')}</Button>
					</ItemG>}
				/>
			</ItemG>
			<ItemG xs={12}>

			</ItemG>
			<ItemG xs={12}>
				<InfoCard
					noAvatar
					noHeader
					noExpand
					content={<Installation />}
				/>
			</ItemG>
		</GridContainer>
	)
}

export default InstallationRoute
