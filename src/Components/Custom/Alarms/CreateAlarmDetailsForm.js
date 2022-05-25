import { Collapse } from '@material-ui/core'
import ItemG from 'Components/Containers/ItemG'
import AssignDevice from 'Components/Custom/Devices/AssignDevice'
import DMenu from 'Components/Input/DNotificationMenu'
import DSelect from 'Components/Input/DSelect'
import TextF from 'Components/Input/TextF'
import { useLocalization } from 'Hooks'
import React, { useState } from 'react'

const CreateAlarmDetailsForm = props => {
	//Hooks
	const t = useLocalization()
	//Redux

	//State
	const [openAssign, setOpenAssign] = useState(false)

	//Const
	const { alarm, metrics, metric, ttl, config, operator, quantifier,
	} = props
	const { handleSetAlarm, handleSetDevice, handleSetTtl, handleSetOperator, handleSetQuantifier, handleSetConfig, handleSetMetric,
		conditionValidator, setConditionValidator, cfs
	} = props


	// const ttlTypes = {
	// 	fromNow: 1,
	// 	fromFirstEvent: 2,
	// 	always: 3
	// }
	const ttlTypes = [
		{ value: 1, label: t('alarms.fields.ttls.fromNow') },
		{ value: 2, label: t('alarms.fields.ttls.fromFirstEvent') },
		{ value: 3, label: t('alarms.fields.ttls.always') }
	]
	const timeTypes = [
		{ value: "ms", label: t('time.ms') },
		{ value: "s", label: t('time.s') },
		{ value: "m", label: t('time.m') },
		{ value: "h", label: t('time.h') },
		{ value: "d", label: t('time.d') },
		{ value: "w", label: t('time.w') },
		{ value: "M", label: t('time.M') },
		{ value: "Q", label: t('time.Q') },
		{ value: "y", label: t('time.y') },
	]
	const operators = [
		{ value: "=", label: "=" },
		{ value: ">", label: ">" },
		{ value: "<", label: "<" },
		{ value: ">=", label: ">=" },
		{ value: "<=", label: "<=" },
		{ value: "NOT", label: "NOT" },
		{ value: "IN", label: "IN" },
	]
	//useCallbacks

	//useEffects

	//Handlers

	/**
	 * name, dataSource, condition, cloudFunction* , ttl, config(ttl, ttlType), deviceId
	 * condition()
	 */
	const showDefaultAlarms = val => {
		if ([1, 2, 3, 4, 5].includes(val)) {
			return true
		}
		else
			return false
	}
	return (
		<ItemG container>
			{/**
			 * Alarm details
			 */}
			<ItemG xs={6}>
				<TextF
					label={t('alarms.fields.name')}
					value={alarm.name}
					onChange={e => handleSetAlarm('name')(e.target.value)}
				/>

			</ItemG>
			<ItemG xs={6}>
				<TextF
					onClick={() => setOpenAssign(true)}
					readOnly
					value={alarm.device ? alarm.device.name + ' - ' + alarm.device.uuname : t('actions.select') + ' ' + t('sidebar.device')}
				/>
				<AssignDevice
					open={openAssign}
					handleClose={() => setOpenAssign(false)}
					callBack={(dev) => { handleSetDevice(dev); setOpenAssign(false) }}
				/>
			</ItemG>
			<ItemG container justify={'space-between'} alignItems={'center'}>
				<ItemG xs={6}>

					<DSelect
						label={t('alarms.fields.ttl')}
						margin={'normal'}
						menuItems={ttlTypes}
						value={ttl}
						onChange={handleSetTtl}
						style={{ maxWidth: 230 }}
						labelStyle={{
							textOverflow: 'ellipsis',
							overflow: 'hidden',
							maxWidth: 230
						}}


					/>
				</ItemG>
				<ItemG xs={6}>

					<Collapse in={ttl !== 3}>

						<TextF
							value={config.ttlValue}
							InputProps={{
								endAdornment:
							<DMenu
								button
								value={config.ttl}
								icon={timeTypes[timeTypes.findIndex(f => f.value === config.ttl)].label}
								menuItems={timeTypes}
								onChange={e => handleSetConfig('ttl')(e)}
							/>
							}}
						/>
					</Collapse>
				</ItemG>
			</ItemG>
			{/**
			 * Conditions
			 */
			}
			<Collapse in={alarm.device} style={{ flex: 1 }}>
				<ItemG xs={12}>
					<ItemG container alignItems={'center'}>
						<DSelect
							label={t('alarms.fields.conditionValidator')}
							value={conditionValidator}
							onChange={(e) => {setConditionValidator(e.target.value) }}
							menuItems={[
								{ category: "Data fields" },
								{ value: 0, label: 'Mathematic comparation' },
								{ category: "Default device alarm" },
								{ value: 1, label: 'Dry' },
								{ value: 2, label: 'Leak' },
								{ value: 3, label: 'Burst' },
								{ value: 4, label: 'Reverse flow' },
								{ value: 5, label: "All" },
								{ category: "Custom" },
								{ value: 6, label: 'Cloud function', disabled: true }
							]}
						/>
					</ItemG>
					<Collapse in={conditionValidator === 0}>
						<ItemG container alignItems={'center'}>
							<ItemG xs={6}>

								<DSelect
									label={t('alarms.fields.metric')}
									value={metric}
									onChange={handleSetMetric}
									menuItems={metrics}
								/>
							</ItemG>
							<ItemG xs={2}>

								<DSelect
									label={t('alarms.fields.operator')}
									value={operator}
									onChange={handleSetOperator}
									menuItems={operators}
									style={{ minWidth: 75 }}
								/>
							</ItemG>
							<ItemG xs={1}>

								<TextF
									label={t('alarms.fields.quantifier')}
									value={quantifier}
									onChange={handleSetQuantifier}
									style={{ minWidth: 105, maxWidth: 150 }}

								/>
							</ItemG>
						</ItemG>
					</Collapse>
					<Collapse in={showDefaultAlarms(conditionValidator)}>
						<ItemG xs={12}>
							<TextF
								label={t('sidebar.cloudfunction')}
								value={cfs[conditionValidator - 1]?.name}
								fullWidth
								readOnly={true}
							/>
						</ItemG>
					</Collapse>
					<ItemG xs={12}>

					</ItemG>
				</ItemG>
			</Collapse>
		</ItemG>
	)
}

export default CreateAlarmDetailsForm
