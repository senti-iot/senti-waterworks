import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import React from 'react'
import { Star } from 'variables/icons'

const Favorites = () => {
	return (
		<GridContainer>
			<ItemG xs={12} noMargin noPadding>
				<PageHeader
					label={'sidebar.favorites'}
					icon={Star}
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

export default Favorites
