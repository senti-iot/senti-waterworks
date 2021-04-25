import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import { Devices as DeviceIcon } from 'variables/icons'
import React from 'react'
import GroupTable from 'Components/Custom/Groups/GroupTable'

const Groups = () => {
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
					label={'sidebar.Groups'}
					icon={DeviceIcon}

				/>
			</ItemG>
			<ItemG xs={12}>
				<InfoCard
					noAvatar
					noHeader
					noExpand
					content={<GroupTable />}
				/>
			</ItemG>
		</GridContainer>
	)
}

export default Groups
