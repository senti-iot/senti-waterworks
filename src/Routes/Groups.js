import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import { GroupWorkIcon } from 'variables/icons'
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
					label={'sidebar.groups'}
					icon={GroupWorkIcon}

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
