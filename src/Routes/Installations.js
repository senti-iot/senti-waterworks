import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import { Devices as DeviceIcon } from 'variables/icons'
import React from 'react'
import InstallationTable from 'Components/Custom/InstallationsTable/InstallationTable'

const Installations = () => {
	//Hooks

	//Redux

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	return (
		<GridContainer>
			<ItemG xs={12}>
				<PageHeader
					label={'sidebar.Installations'}
					icon={DeviceIcon}

				/>
			</ItemG>
			<ItemG xs={12}>
				<InfoCard
					noAvatar
					noHeader
					noExpand
					content={<InstallationTable />}
				/>
			</ItemG>
		</GridContainer>
	)
}

export default Installations
