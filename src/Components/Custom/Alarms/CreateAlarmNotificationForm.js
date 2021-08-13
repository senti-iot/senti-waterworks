import { Button, Collapse, IconButton } from '@material-ui/core'
import ItemG from 'Components/Containers/ItemG'
import DSelect from 'Components/Input/DSelect'
import TextF from 'Components/Input/TextF'
import { useLocalization } from 'Hooks'
import React from 'react'

import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/theme-monokai'
import { Close } from 'variables/icons'

const CreateAlarmNotificationForm = props => {
	//Hooks
	const t = useLocalization()
	//Redux

	//State

	//Const
	const { typeOfNotification, emailSubject, emailBody, recipients, smsBody, smsRecipients,

	} = props
	const { handleSetTypeOfNotification, handleSetEmailSubject, handleSetEmailBody, handleAddRecipient,
		handleRemoveRecipient, handleChangeSMSRecipient, handleRemoveSMSRecipient, handleAddSMSRecipient,
		handleChangeRecipient, handleSetSMSBody } = props
	const typesOfNotification = [
		{ value: 1, label: t('alarms.fields.emailNotification') },
		{ value: 2, label: t('alarms.fields.smsNotification') },
		{ value: 13, label: t('alarms.fields.emailNotification') },
		// { value: 12, label: t('alarms.fields.apiSimplePost') }
	]
	//useCallbacks

	//useEffects

	//Handlers

	/**
	 * name, dataSource, condition, cloudFunction* , ttl, config(ttl, ttlType), deviceId
	 * condition()
	 */
	return (
		<ItemG container>
			<ItemG xs={12}>
				<DSelect
					label={t('alarms.create.typeOfNotification')}
					value={typeOfNotification}
					menuItems={typesOfNotification}
					onChange={handleSetTypeOfNotification}
					fullWidth
				/>
			</ItemG>
			<ItemG xs={12}>
				<Collapse fullWidth in={typeOfNotification === 1 || typeOfNotification === 13}>
					<ItemG xs={12}>
						<TextF
							label={t('alarms.create.subject')}
							value={emailSubject}
							onChange={handleSetEmailSubject}
						/>
					</ItemG>
					<ItemG xs={12}>
						<AceEditor
							mode={'html'}
							theme={'tomorrow'}
							onChange={handleSetEmailBody}
							value={emailBody}
							highlightActiveLine={true}
							showPrintMargin={false}
							showGutter={true}
							style={{ width: '100%', maxHeight: 160 }}
							name="CloudFunctionCode"
							editorProps={{ $blockScrolling: true }}
						/>
					</ItemG>
					{recipients.map((r, i) =>

						<ItemG container noWrap alignItems={'center'}>
							<ItemG xs={6}>
								<TextF
									label={t('users.fields.name')}
									value={r.name}
									onChange={handleChangeRecipient('name', i)}
								/>
							</ItemG>
							<ItemG xs={5}>

								<TextF
									label={t('users.fields.email')}
									value={r.email}
									onChange={handleChangeRecipient('email', i)}
								/>
							</ItemG>
							<ItemG xs={1}>
								<IconButton variant={'outlined'} style={{ marginTop: 8 }}
									onClick={handleRemoveRecipient(i)}
								><Close /></IconButton>
							</ItemG>
						</ItemG>

					)}
					<ItemG xs={12}>
						<Button style={{ marginTop: 12 }} variant={'outlined'} onClick={handleAddRecipient} color="primary">{t('actions.addRecipient')}</Button>
					</ItemG>

				</Collapse>
			</ItemG>
			<ItemG xs={12}>
				<Collapse in={typeOfNotification === 2}>
					<ItemG xs={12}>
						<AceEditor
							mode={'html'}
							theme={'tomorrow'}
							onChange={handleSetSMSBody}
							value={smsBody}
							highlightActiveLine={true}
							showPrintMargin={false}
							showGutter={true}
							wrapEnabled
							setOptions={{
								wrapBehavioursEnabled: false,
								indentedSoftWrap: false
							}}
							style={{ width: '100%', maxHeight: 160 }}
							name="CloudFunctionCode"
							editorProps={{ $blockScrolling: true }}
						/>
					</ItemG>
					{smsRecipients.map((r, i) =>

						<ItemG container noWrap alignItems={'center'}>
							<ItemG xs={5}>
								<TextF
									label={t('users.fields.phone')}
									value={r.phone}
									onChange={handleChangeSMSRecipient('name', i)}
								/>
							</ItemG>
							<ItemG xs={1}>
								<IconButton variant={'outlined'} style={{ marginTop: 8 }}
									onClick={handleRemoveSMSRecipient(i)}
								><Close /></IconButton>
							</ItemG>
						</ItemG>

					)}
					<ItemG xs={12}>
						<Button style={{ marginTop: 12 }} variant={'outlined'} onClick={handleAddSMSRecipient} color="primary">{t('actions.addRecipient')}</Button>
					</ItemG>
				</Collapse>
			</ItemG>
			<Collapse in={typeOfNotification === 12} style={{ flex: 1 }}>
				<ItemG xs={12}>
					API Post
				</ItemG>
			</Collapse>
		</ItemG>
	)
}

export default CreateAlarmNotificationForm
