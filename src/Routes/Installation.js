import { GridContainer, InfoCard, ItemG } from 'Components'
import Installation from 'Components/Custom/InstallationsTable/Installation'
import PageHeader from 'Components/Custom/PageHeader/PageHeader'
import React from 'react'
import { useParams } from 'react-router'
import { Devices } from 'variables/icons'

const InstallationRoute = (props) => {
	//Hooks
	const params = useParams()

	//Redux

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	return (
		<GridContainer>
			<ItemG xs={12} noMargin noPadding>
				<PageHeader
					label={'sidebar.installation'}
					subheader={params.uuid}
					icon={Devices}
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
