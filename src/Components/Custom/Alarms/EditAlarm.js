import { Button, Dialog, DialogActions, DialogContent, Tab, Tabs } from '@material-ui/core'
import CreateAlarmDetailsForm from 'Components/Custom/Alarms/CreateAlarmDetailsForm'
import CreateAlarmNotificationForm from 'Components/Custom/Alarms/CreateAlarmNotificationForm'
import DialogHeader from 'Components/Custom/PageHeader/DialogHeader'
import TabPanel from 'Components/Custom/Tabs/TabPanel'
import { createAlarm as cAlarmFunc, getAlarmV1 } from 'data/alarms'
import { getDevice } from 'data/devices'
import { useLocalization, useSelector } from 'Hooks'
import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'

const EditAlarm = props => {
	//Hooks
	const t = useLocalization()
	//Redux
	const user = useSelector(state => state.settings.user)
	const devices = useSelector(s => s.data.devices)
	//State
	const [tab, setTab] = useState(0)
	const [sAlarm, setSAlarm] = useState(null)
	const [loading, setLoading] = useState(true)
	//Alarm props

	const [metrics, setMetrics] = useState([])
	const [metric, setMetric] = useState("")
	const [operator, setOperator] = useState(">")
	const [quantifier, setQuantifier] = useState(0)
	const [ttl, setTtl] = useState(3)
	const [config, setConfig] = useState({
		ttl: "m",
		ttlValue: 60
	})
	const [alarm, setAlarm] = useState({})

	const [conditionValidator, setConditionValidator] = useState(1)
	//Notifications
	const [typeOfNotification, setTypeOfNotification] = useState(13)
	//Email
	const [emailBody, setEmailBody] = useState(`
Alarm: @METRIC@ (@DATA_METRIC@) er @QUALIFIER@ på @DEVICE_NAME@
`)
	const [webBody, setWebBody] = useState(`@METRIC@ (@DATA_METRIC@) er @QUALIFIER@ på @DEVICE_NAME@`)
	const [webSubject, setWebSubject] = useState('')
	const [emailSubject, setEmailSubject] = useState('')
	const [recipients, setRecipients] = useState([])
	//SMS
	const [smsBody, setSmsBody] = useState(`Alarm(id: @EVENT_ID@): @METRIC@ (@DATA_METRIC@) er @QUALIFIER@ på @DEVICE_NAME@`)
	const [smsRecipients, setSmsRecipients] = useState([])
	const [typesOfNotfs, setTypesOfNotfs] = useState([13])
	//API call


	//Const
	const gateway = 'uni-tel'
	const host = 'waterworks.senti.io'
	const { open, handleClose } = props

	const cfs = useMemo(() => [
		{
			"id": 160,
			"uuid": "c73c1d32-95ac-413a-b776-ac10c41433b5",
			"name": "[Alarm - Kamstrup] Dry field"
		},
		{
			"id": 161,
			"uuid": "eb1ea24f-3078-4c58-91b6-8f4b4e36273f",
			"name": "[Alarm - Kamstrup] Leak field"
		},
		{
			"id": 162,
			"uuid": "9680570b-d1d5-42e1-be7a-e21ca18fec90",
			"name": "[Alarm - Kamstrup] Burst field"
		},
		{
			"id": 163,
			"uuid": "70b8da9d-ee56-4df2-b98f-44ced8c2c533",
			"name": "[Alarm - Kamstrup] Reverse field"
		},
		{
			"id": 164,
			"uuid": "fc1889cf-66fb-44dd-a949-9914884238d7",
			"name": "[Alarm - Kamstrup] All infocodes"
		}
	], [])


	//useCallbacks

	//useEffects
	useEffect(() => {
		let getAlarm = async () => {
			return getAlarmV1(props.uuid)
		}
		let loadData = async () => {
			if (loading && !sAlarm) {
				let a = await getAlarm()
				console.log(a)
				setSAlarm(a)
				setLoading(false)
			}
		}
		loadData()
	}, [loading, props.uuid, sAlarm])
	useEffect(() => {
		console.log('sAlarm', sAlarm)
		if (sAlarm) {
			console.log('sAlarm', sAlarm.name)
			/**
			 * finalAlarm.name = alarm.name
			finalAlarm.userUUID = user.uuid
			finalAlarm.deviceId = alarm.device.id
			finalAlarm.dataSource = alarm.device.id
			finalAlarm.host = host
			finalAlarm.actions = []
			 */

			let device = devices[devices.findIndex(f => f.id === sAlarm.deviceId)]
			setAlarm({
				id: 57,
				name: sAlarm.name,
				actions: [],
				device: device
			})

			setTtl(sAlarm.config.ttlType)
			setConfig({
				ttl: Object.keys(sAlarm.config.ttl)[0],
				ttlValue: sAlarm.config.ttl[Object.keys(sAlarm.config.ttl)[0]]
			})

			let emailNotificationIndex = sAlarm.actions.findIndex(f => f.type === 1)
			if (emailNotificationIndex !== -1) {
				let eNotf = sAlarm.actions[emailNotificationIndex]
				setEmailBody(eNotf.config.message.body)
				setEmailSubject(eNotf.config.message.subject)
				setRecipients(eNotf.config.recipients)
			}


			let smsNotificationIndex = sAlarm.actions.findIndex(f => f.type === 2)
			if (smsNotificationIndex !== -1) {
				let smsNotf = sAlarm.actions[smsNotificationIndex]
				setSmsBody(smsNotf.config.message.body)
				setSmsRecipients(smsNotf.config.recipients)
			}


			let webNotificationIndex = sAlarm.actions.findIndex(f => f.type === 13)
			if (webNotificationIndex !== -1) {
				let webNotf = sAlarm.actions[webNotificationIndex]
				setWebSubject(webNotf.config.message.subject)
				setWebBody(webNotf.config.message.body)
			}
			if (sAlarm.condition) {
				setConditionValidator(0)

				let gDev = async () => {
					let dev = await getDevice(device.uuid)

					if (dev.dataKeys.length > 0) {
						let metrics = dev.dataKeys.map(i => ({ value: i.key, label: i.key }))
						setMetrics(metrics)
					}
				}
				gDev()
				console.log(sAlarm.condition.operator)
				setOperator(sAlarm.condition.operation)
				setMetric(sAlarm.condition.metric)
				setQuantifier(sAlarm.condition.qualifier)
			}
			else {
				setConditionValidator(cfs.findIndex(f => f.id === sAlarm.cloudFunction.id) + 1)
			}

		}
		setSAlarm(null) //Disable the useEffect
		return () => {

		}
	}, [alarm, cfs, devices, sAlarm])

	//Handlers

	const handleSetAlarm = what => value => {
		setAlarm({
			...alarm,
			[what]: value
		})
	}

	const handleSetDevice = async device => {

		console.log(device)
		let dev = await getDevice(device.uuid)
		console.log(dev)
		if (dev.dataKeys.length > 0) {
			let metrics = dev.dataKeys.map(i => ({ value: i.key, label: i.key }))
			setMetrics(metrics)
		}
		handleSetAlarm('device')(dev)



	}
	const handleSetTtl = e => {
		setTtl(e.target.value)
	}

	const handleSetConfig = what => value => {
		console.log(what, value)
		setConfig({
			...config,
			[what]: value
		})
		console.log(config)
	}

	const handleSetMetric = e => {
		console.log(e.target.value)
		setMetric(e.target.value)
	}

	const handleSetOperator = e => {
		setOperator(e.target.value)
	}

	const handleSetQuantifier = e => {
		setQuantifier(e.target.value)
	}

	const handleChangeTab = (event, newValue) => {
		setTab(newValue)
	}
	const handleSetTypeOfNotification = e => {
		setTypeOfNotification(e.target.value)
	}

	const handleSetEmailSubject = e => {
		setEmailSubject(e.target.value)
	}
	const handleSetEmailBody = value => {
		setEmailBody(value)
	}

	const handleStartCreate = async () => {
		let finalAlarm = {}
		console.log(alarm)
		finalAlarm.name = alarm.name
		finalAlarm.userUUID = user.uuid
		finalAlarm.deviceId = alarm.device.id
		finalAlarm.dataSource = alarm.device.id
		finalAlarm.host = host
		finalAlarm.actions = []

		if (ttl === 3) {
			finalAlarm.config = {
				ttl: { y: 2099 },
				ttlType: ttl
			}
		}
		else {
			finalAlarm.config = {
				ttl: { [config.ttl]: config.ttlValue, },
				ttlType: ttl
			}
		}

		console.log('typeOfNotification', typesOfNotfs)

		if (typesOfNotfs.indexOf(1) > -1) {

			let emailNotf = {
				type: 1,
				config: {
					message: {
						body: emailBody,
						subject: emailSubject,
					},
					recipients: recipients,
				}
			}
			finalAlarm.actions.push(emailNotf)

		}
		if (typesOfNotfs.indexOf(2) > -1) {
			let smsNotf = {
				type: 2,
				config: {
					gateway: gateway,
					message: {
						body: smsBody
					},
					recipients: smsRecipients,
				}
			}
			finalAlarm.actions.push(smsNotf)
		}

		if (typesOfNotfs.indexOf(13) > -1) {
			/**
			 *
			 */
			let webNotf = {
				type: 13,
				config: {
					local: {
						userUUID: user.uuid
					},
					message: {
						body: webBody,
						subject: webSubject
					},
					userType: 'local'
				}
			}
			finalAlarm.actions.push(webNotf)
		}
		if (conditionValidator === 0) {
			finalAlarm.condition = {
				metric: metric,
				operation: operator,
				qualifier: quantifier
			}
		}
		if ([1, 2, 3, 4, 5].indexOf(conditionValidator) !== -1) {
			finalAlarm.cloudFunction = cfs[conditionValidator - 1].id
		}
		else {
			//To do custom cloud function
		}

		let cAlarm = await cAlarmFunc(finalAlarm)
		if (cAlarm) {
			console.log(cAlarm)
			handleSetClose()
		}


	}
	const handleSetClose = () => {

		handleClose()
	}

	const handleAddRecipient = () => {
		let rec = [...recipients, { name: "", email: "" }]
		setRecipients(rec)
	}
	const handleRemoveRecipient = (index) => () => {
		let rec = recipients.filter((v, i) => i !== index)
		setRecipients(rec)
	}
	const handleChangeRecipient = (what, id) => e => {
		let rec = [...recipients]
		rec[id][what] = e.target.value
		setRecipients(rec)
	}

	const handleSetSMSBody = value => {
		setSmsBody(value)
	}
	const handleChangeSMSRecipient = (what, id) => e => {
		let smsRec = [...smsRecipients]
		smsRec[id]['address'] = e.target.value
		smsRec[id][what] = e.target.value
		setSmsRecipients(smsRec)
	}
	const handleRemoveSMSRecipient = index => () => {
		let rec = smsRecipients.filter((v, i) => i !== index)
		setSmsRecipients(rec)
	}
	const handleAddSMSRecipient = () => {
		let smsRec = [...smsRecipients, { name: "", address: "" }]
		setSmsRecipients(smsRec)
	}
	const handleSetTypesOfNotfs = e => {
		setTypeOfNotification(e.target.value[0])
		setTypesOfNotfs(e.target.value)
	}
	const handleSetConditionValidator = e => {
		console.log(e)
		console.log(e)
		setConditionValidator(e)
	}
	return (
		<Dialog
			open={open}
			minWidth={'md'}
			onClose={handleClose}
		>
			<DialogHeader label={'menus.edits.alarm'} />
			<DialogContent>
				<Tabs
					value={tab}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					centered
				>
					<Tab label={t('alarms.create.details')} />
					<Tab label={t('alarms.create.notifications')} />
					{/* <Tab label="Item Three" /> */}
				</Tabs>
				<TabPanel value={tab} index={0}>

					<CreateAlarmDetailsForm
						alarm={alarm}
						metrics={metrics}
						metric={metric}
						ttl={ttl}
						config={config}
						operator={operator}
						quantifier={quantifier}
						cfs={cfs}
						handleSetAlarm={handleSetAlarm}
						handleSetDevice={handleSetDevice}
						handleSetTtl={handleSetTtl}
						handleSetConfig={handleSetConfig}
						handleSetMetric={handleSetMetric}
						handleSetOperator={handleSetOperator}
						handleSetQuantifier={handleSetQuantifier}
						conditionValidator={conditionValidator}
						setConditionValidator={handleSetConditionValidator}
					/>
				</TabPanel>
				<TabPanel value={tab} index={1}>
					<CreateAlarmNotificationForm
						typeOfNotification={typeOfNotification}
						handleSetTypeOfNotification={handleSetTypeOfNotification}


						emailBody={emailBody}
						emailSubject={emailSubject}
						recipients={recipients}

						smsBody={smsBody}
						smsRecipients={smsRecipients}
						webBody={webBody}
						setWebBody={setWebBody}
						handleSetEmailSubject={handleSetEmailSubject}
						handleSetEmailBody={handleSetEmailBody}
						handleAddRecipient={handleAddRecipient}
						handleChangeRecipient={handleChangeRecipient}
						handleRemoveRecipient={handleRemoveRecipient}

						handleSetSMSBody={handleSetSMSBody}
						handleChangeSMSRecipient={handleChangeSMSRecipient}
						handleRemoveSMSRecipient={handleRemoveSMSRecipient}
						handleAddSMSRecipient={handleAddSMSRecipient}
						typesOfNotfs ={typesOfNotfs}
						handleSetTypesOfNotfs={handleSetTypesOfNotfs}
						webSubject={webSubject}
						setWebSubject={setWebSubject}
					/>
				</TabPanel>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleStartCreate}>{t('actions.create')}</Button>
				<Button onClick={handleSetClose}>{t('actions.close')}</Button>

			</DialogActions>
		</Dialog>
	)
}

export default EditAlarm
