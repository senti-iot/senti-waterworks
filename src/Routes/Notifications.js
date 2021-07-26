import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import { Notifications as AlarmIco } from 'variables/icons'
import React from 'react'

const Notifications = () => {
	//Hooks

	//Redux

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	return (
		<GridContainer>
			<ItemG xs={12}>
				<PageHeader
					label={'sidebar.notifications'}
					icon={AlarmIco}

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

export default Notifications
