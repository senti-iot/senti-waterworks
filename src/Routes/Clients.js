import { GridContainer, InfoCard, ItemG } from 'Components'
import PageHeader from 'Components/Custom/PageHeader/PageHeader'
import React from 'react'
import { Business } from 'variables/icons'

const Clients = () => {
	return (
		<GridContainer>
			<ItemG xs={12} noMargin noPadding>
				<PageHeader
					label={'sidebar.clients'}
					icon={Business}
				/>
			</ItemG>
			<ItemG xs={12}>

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

export default Clients
