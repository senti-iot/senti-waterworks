import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import React from 'react'
import { SwapHorizontalCircleIcon } from 'variables/icons'

const MovingOut = () => {
	return (
		<GridContainer>
			<ItemG xs={12} noMargin noPadding>
				<PageHeader
					label={'sidebar.movingOut'}
					icon={SwapHorizontalCircleIcon}
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

export default MovingOut
