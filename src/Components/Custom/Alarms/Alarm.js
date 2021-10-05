import { Divider } from '@material-ui/core'
import ItemG from 'Components/Containers/ItemG'
import Caption from 'Components/Typography/Caption'
import Info from 'Components/Typography/Info'
import { useLocalization, useSelector } from 'Hooks'
import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/theme-monokai'
import moment from 'moment'

const Alarm = () => {
	//Hooks
	const t = useLocalization()
	//Redux
	const alarm = useSelector(s => s.data.alarm)
	const devices = useSelector(s => s.data.devices)
	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers
	const renderTTL = () => {
		switch (alarm.config.ttlType) {
			case 1:
				return t('alarms.fields.ttls.fromNow') + ' ' + alarm.config.ttl[Object.keys(alarm.config.ttl)[0]] + ' ' + t('time.' + Object.keys(alarm.config.ttl)[0])
			case 2:
				return t('alarms.fields.ttls.fromFirstEvent') + ' ' + alarm.config.ttl[Object.keys(alarm.config.ttl)[0]] + ' ' + t('time.' + Object.keys(alarm.config.ttl)[0])
			case 3:
				return t('alarms.fields.ttls.always')
			default:
				break
		}

	}
	const renderCondition = () => {
		switch (true) {
			case (alarm.condition !== null) && !Array.isArray(alarm.condition):
				return alarm.condition.metric + ' ' + alarm.condition.operation + ' ' + alarm.condition.qualifier
			case alarm.condition === null && alarm.cloudFunction !== null:
				return <><ItemG xs={12}>
					{t('sidebar.cloudfunction') + ' ' + alarm.cloudFunction.id}
					<AceEditor
						readOnly
						mode={'html'}
						theme={'tomorrow'}
						highlightActiveLine={true}
						showPrintMargin={false}
						showGutter={true}
						style={{ width: '100%', maxHeight: 240, marginBottom: 16 }}
						name="CloudFunctionCode"
						editorProps={{ $blockScrolling: true }}
						value={alarm.cloudFunction.code}
					/>
				</ItemG>
				</>
			default:
				break;
		}
	}
	const renderActionType = (type) => {
		switch (type) {
			case 13:
				return t('alarms.fields.webNotification')
			case 1:
				return t('alarms.fields.emailNotification')
			case 2:
				return t('alarms.fields.smsNotification')

			default:
				break;
		}
	 }
	const renderActions = () => {
		return alarm.actions.map(a => {
			return <ItemG xs={12}>
				<ItemG>
					{a.uuid}
				</ItemG>
				<ItemG>
					{/* <Caption>{t('notification.fields.type')}</Caption> */}
					<Info>{renderActionType(a.type)}</Info>
				</ItemG>
				<ItemG>
					<AceEditor
						readOnly
						mode={'html'}
						theme={'tomorrow'}
						highlightActiveLine={true}
						showPrintMargin={false}
						showGutter={true}
						style={{ width: '100%', maxHeight: 160 }}
						name="CloudFunctionCode"
						editorProps={{ $blockScrolling: true }}
						value={a.config?.message?.body}
					/>
				</ItemG>
			</ItemG>
		})
	}
	const renderNotifications = () => {
		return alarm.events.map(e => {
			let device = devices[devices.findIndex(f => f.id === e.deviceId)]
			if (device) {

				return <ItemG xs={12} container>
					<ItemG xs={12}>
						<Caption>{t('alarms.fields.deviceName')}</Caption>
						<Info>{device.uuname}</Info>
					</ItemG>
					<ItemG xs={6}>
						<Caption>{t('alarms.fields.id')}</Caption>
						<Info>{e.id}</Info>
					</ItemG>
					<ItemG xs={6}>
						<Caption>{t('alarms.fields.date')}</Caption>
						<Info>{moment(e.expires).format('dddd DD.MM.YYYY HH:mm:ss')}</Info>
					</ItemG>

					<ItemG xs={12}>
						<Divider />
					</ItemG>
				</ItemG>
			}
			return null
		})
	}
	// console.log(alarm)
	return (
		<ItemG container style={{ padding: 16 }}>
			<ItemG xs={3}>
				<Caption>{t('alarms.fields.name')}</Caption>
				<Info>{alarm.name}</Info>
			</ItemG>
			<ItemG xs={9}>
				<Caption>{t('alarms.fields.uuid')}</Caption>
				<Info>{alarm.uuid}</Info>
			</ItemG>
			<ItemG xs={3}>
				<Caption>{t('alarms.fields.count')}</Caption>
				<Info>{alarm.count}</Info>
			</ItemG>
			<ItemG xs={9}>
				<Caption>{t('alarms.fields.state')}</Caption>
				<Info>{alarm.state}</Info>
			</ItemG>
			<ItemG xs={3}>
				<Caption>{t('alarms.fields.ttl')}</Caption>
				<Info>{renderTTL()}</Info>
			</ItemG>
			<ItemG xs={12}>
				<Divider />
			</ItemG>
			<ItemG xs={3}>
				<Caption>{t('alarms.fields.condition')}</Caption>
			</ItemG>
			{renderCondition()}
			<ItemG xs={12}>
				<Divider/>
			</ItemG>
			{/* <ItemG xs={12}>
				<Caption>{t('alarms.actions')}</Caption>
				<Info>
					{JSON.stringify(alarm.actions)}
				</Info>
			</ItemG> */}
			<ItemG>
				<Caption>{t('alarms.fields.type')}</Caption>
			</ItemG>
			{renderActions()}
			<ItemG xs={12}>
				<Divider />
			</ItemG>
			<ItemG>
				<Info>{t('sidebar.notifications')}</Info>
			</ItemG>
			{renderNotifications()}
			{/* {JSON.stringify(alarm.condition)} */}
		</ItemG>
	)
}

export default Alarm
