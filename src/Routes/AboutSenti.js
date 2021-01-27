import { GridContainer, InfoCard, ItemG } from 'Components'
import PageHeader from 'Components/Custom/PageHeader/PageHeader'
import React from 'react'
import { Copyright } from 'variables/icons'

const AboutSenti = () => {
	return (
		<GridContainer>
			<ItemG xs={12} noMargin noPadding>
				<PageHeader
					label={'sidebar.about'}
					icon={Copyright}
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

export default AboutSenti
