import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import React from 'react'
import { ContactSupportIcon } from 'variables/icons'

const Support = () => {
	return (
		<GridContainer>
			<ItemG xs={12} noMargin noPadding>
				<PageHeader
					label={'sidebar.support'}
					icon={ContactSupportIcon}
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

export default Support
