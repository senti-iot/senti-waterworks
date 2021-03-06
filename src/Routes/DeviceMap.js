import { GridContainer, InfoCard, ItemG, MapContainer } from 'Components'
import PageHeader from 'Components/Custom/PageHeader/PageHeader'
import React from 'react'
import { Copyright } from 'variables/icons'

const AboutSenti = () => {
	return (
		<GridContainer>
			<ItemG xs={12} noMargin noPadding>
				<PageHeader
					label={'sidebar.deviceMap'}
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
					content={<MapContainer />}
				/>
			</ItemG>
		</GridContainer>
	)
}

export default AboutSenti
