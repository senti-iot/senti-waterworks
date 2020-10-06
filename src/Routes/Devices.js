import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import React from 'react'

const Devices = () => {
	//Hooks

	//Redux

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	return (
		<GridContainer>
			<ItemG xs={12} noMargin noPadding>
				<PageHeader
					label={'sidebar.devices'}
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

export default Devices
