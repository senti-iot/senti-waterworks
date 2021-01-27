import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import React from 'react'
import { Mail } from 'variables/icons'

const Contact = () => {
	return (
		<GridContainer>
			<ItemG xs={12} noMargin noPadding>
				<PageHeader
					label={'sidebar.contact'}
					icon={Mail}
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

export default Contact
