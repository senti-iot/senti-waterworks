import { Divider } from '@material-ui/core'
import ItemG from 'Components/Containers/ItemG'
import Caption from 'Components/Typography/Caption'
import Info from 'Components/Typography/Info'
import { useLocalization, useSelector } from 'Hooks'
import React from 'react'

const Alarm = () => {
	//Hooks
	const t = useLocalization()
	//Redux
	const alarm = useSelector(s => s.data.alarm)
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
				return alarm.cloudFunction
			default:
				break;
		}
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
				<Info>{renderCondition()}</Info>
			</ItemG>
			<ItemG xs={12}>
				<Divider/>
			</ItemG>
			<ItemG xs={12}>
				<Caption>{t('alarms.actions')}</Caption>
				<Caption>'alarms.actions'</Caption>
				<Info>
					{JSON.stringify(alarm.actions)}
				</Info>
			</ItemG>
			{/* {JSON.stringify(alarm.condition)} */}
		</ItemG>
	)
}

export default Alarm
