import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import { Notifications as AlarmIco } from 'variables/icons'
import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'Hooks'

const NotificationRoute = () => {
	//Hooks
	const params = useParams()
	//Redux
	const notification = useSelector(s => s.data.notifications[s.data.notifications.findIndex(f => f.uuid = params.uuid)])
	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	return (
		<GridContainer>
			<ItemG xs={12}>
				<PageHeader
					label={'sidebar.notification'}
					icon={AlarmIco}

				/>
			</ItemG>
			<ItemG xs={12}>
				<InfoCard
					noAvatar
					noHeader
					noExpand
					content={
						<ItemG>
							<ItemG>
								{params.uuid}
							</ItemG>
							<ItemG>
								{JSON.stringify(notification)}
							</ItemG>
						</ItemG>


					}
				/>
			</ItemG>
		</GridContainer>
	)
}

export default NotificationRoute
