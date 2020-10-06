import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import React from 'react'
import { VerifiedUserIcon } from 'variables/icons'

const DataPolicy = () => {
	return (
		<GridContainer>
			<ItemG xs={12} noMargin noPadding>
				<PageHeader
					label={'sidebar.dataPolicy'}
					icon={VerifiedUserIcon}
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

export default DataPolicy
