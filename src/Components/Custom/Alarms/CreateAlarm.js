import { Button, Dialog, DialogActions, DialogContent, Tab, Tabs } from '@material-ui/core'
import CreateAlarmDetailsForm from 'Components/Custom/Alarms/CreateAlarmDetailsForm'
import CreateAlarmNotificationForm from 'Components/Custom/Alarms/CreateAlarmNotificationForm'
import DialogHeader from 'Components/Custom/PageHeader/DialogHeader'
import TabPanel from 'Components/Custom/Tabs/TabPanel'
import { getDevice } from 'data/devices'
import { useLocalization } from 'Hooks'
import React from 'react'
import { useState } from 'react'

const CreateAlarm = props => {
	//Hooks
	const t = useLocalization()
	//Redux

	//State
	const [tab, setTab] = useState(0)

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
	//Notifications
	const [typeOfNotification, setTypeOfNotification] = useState(1)
	//Email
	const [emailBody, setEmailBody] = useState(`<span>
Alarm: @METRIC @(@DATA_METRIC @) er @QUALIFIER @på @DEVICE_NAME @
</span>`)
	const [emailSubject, setEmailSubject] = useState('')
	const [recipients, setRecipients] = useState([])
	//SMS
	const [smsBody, setSmsBody] = useState(`Alarm(id: @EVENT_ID@): @METRIC@ (@DATA_METRIC@) er @QUALIFIER@ på @DEVICE_NAME@`)
	const [smsRecipients, setSmsRecipients] = useState([])

	//API call

	//Const
	// const gateway = 'uni-tel'
	// const host = 'waterworks.senti.io'
	const { open, handleClose } = props

	//useCallbacks

	//useEffects

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
	};
	const handleSetTypeOfNotification = e => {
		setTypeOfNotification(e.target.value)
	}

	const handleSetEmailSubject = e => {
		setEmailSubject(e.target.value)
	}
	const handleSetEmailBody = value => {
		setEmailBody(value)
	}

	const handleStartCreate = () => { }
	const handleSetClose = () => { }

	const handleAddRecipient = () => {
		let rec = [...recipients, { name: "", email: "" }]
		setRecipients(rec)
	}
	const handleRemoveRecipient = (index) =>  () => {
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
		console.log(smsRec)
		setSmsRecipients(smsRec)
		console.log(smsRecipients)
	}
	return (
		<Dialog
			open={open}
			minWidth={'md'}
			onClose={handleClose}
		>
			<DialogHeader label={'menus.create.alarm'} />
			<DialogContent>
				<Tabs
					value={tab}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					centered
				>
					<Tab label={t('alarms.create.details')}/>
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

						handleSetAlarm={handleSetAlarm}
						handleSetDevice={handleSetDevice}
						handleSetTtl={handleSetTtl}
						handleSetConfig={handleSetConfig}
						handleSetMetric={handleSetMetric}
						handleSetOperator={handleSetOperator}
						handleSetQuantifier={handleSetQuantifier}
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

						handleSetEmailSubject={handleSetEmailSubject}
						handleSetEmailBody={handleSetEmailBody}
						handleAddRecipient={handleAddRecipient}
						handleChangeRecipient={handleChangeRecipient}
						handleRemoveRecipient={handleRemoveRecipient}

						handleSetSMSBody={handleSetSMSBody}
						handleChangeSMSRecipient={handleChangeSMSRecipient}
						handleRemoveSMSRecipient={handleRemoveSMSRecipient}
						handleAddSMSRecipient={handleAddSMSRecipient}
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

export default CreateAlarm
