import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import React from 'react'
import { Group } from 'variables/icons'

const Users = () => {
	return (
		<GridContainer>
			<ItemG xs={12} noMargin noPadding>
				<PageHeader
					label={'sidebar.users'}
					icon={Group}
				/>
			</ItemG>
			<ItemG xs={12}>
				<InfoCard
					noAvatar
					noHeader
					noExpand
					content
				/>
			</ItemG>
		</GridContainer>
	)
}

export default Users
