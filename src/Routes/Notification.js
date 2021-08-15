import { Caption, CircularLoader, GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import { Notifications as AlarmIco } from 'variables/icons'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useLocalization, useSelector } from 'Hooks'
import Info from 'Components/Typography/Info'
import moment from 'moment'
import { Divider } from '@material-ui/core'

const NotificationRoute = () => {
	//Hooks
	const params = useParams()
	const t = useLocalization()
	//Redux
	const notifications = useSelector(s => s.data.notifications)

	//State
	const [notification, setNotification] = useState(null)
	//Const

	//useCallbacks

	//useEffects
	useEffect(() => {
		let newNotf = notifications.findIndex(f => f.uuid === params.uuid)
		setNotification(notifications[newNotf])

	}, [notifications, params])
	//Handlers

	return (
		<GridContainer>
			<ItemG xs={12}>
				<PageHeader
					label={t('sidebar.notification', { disableMissing: true }) + ' - ' + notification?.ruleName}
					icon={AlarmIco}

				/>
			</ItemG>
			<ItemG xs={12}>
				<InfoCard
					noAvatar
					noHeader
					noExpand
					content={
						notification ?
							<ItemG container>
								<ItemG xs={6}>
									<Caption>{t('alarms.fields.uuid')}</Caption>
									<Info>{notification.uuid}</Info>
								</ItemG>
								<ItemG xs={6}>
									<Caption>{t('alarms.fields.name')}</Caption>
									<Info>{notification.ruleName}</Info>
								</ItemG>
								<ItemG xs={12}>
									<Divider />
								</ItemG>
								<ItemG xs={6}>
									<Caption>{t('alarms.fields.deviceName')}</Caption>
									<Info>{notification.deviceName}</Info>
								</ItemG>
								<ItemG xs={6}>
									<Caption>{t('alarms.fields.deviceId')}</Caption>
									<Info>{notification.deviceUUNAME}</Info>
								</ItemG>
								<ItemG xs={6}>
									<Caption>{t('alarms.fields.message')}</Caption>
									<Info>{notification.message}</Info>
								</ItemG>
								<ItemG xs={6}>
									<Caption>{t('alarms.fields.date')}</Caption>
									<Info>{moment(notification.dataTime).format('HH:mm:ss DD-MM-YYYY')}</Info>
								</ItemG>
							</ItemG>
							: <CircularLoader fill />

					}
				/>
			</ItemG>
		</GridContainer>
	)
}

export default NotificationRoute
