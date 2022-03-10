import { Divider } from '@material-ui/core'
import { Caption, CircularLoader, Info, ItemG, OpenStreetMap, T } from 'Components'
import { useLocalization } from 'Hooks'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { getAdminUsers, gInstallation } from 'Redux/data'
import { dateFormatter } from 'variables/functions/filters'

const Installation = () => {
	//Hooks
	const dispatch = useDispatch()
	const params = useParams()
	const t = useLocalization()
	//Redux
	const installation = useSelector(s => s.data.installation)
	const users = useSelector(s => s.data.users)
	//State
	const [loading, setLoading] = useState(true)
	//Const

	//useCallbacks

	//useEffects
	useEffect(() => {
		let getData = async () => {
			await dispatch(await getAdminUsers())
			await dispatch(await gInstallation(params.uuid))
			setLoading(false)
		}
		getData()

		return () => {
		}
	}, [params.uuid, dispatch])
	//Handlers

	const renderOrg = () => {
		return <>
			<ItemG xs={3}>
				<Caption>{t('installations.fields.org')}</Caption>
				<Info>{installation.org?.name}</Info>
			</ItemG>
			<ItemG xs={9}>
				<Caption>{t('installations.fields.orgNickname')}</Caption>
				<Info>{installation.org?.nickname}</Info>
			</ItemG>
		</>
	}

	const renderUser = () => {
		console.log(users)
		let user = users.find(u => u.uuid === installation.sentiUserUUID)
		return <ItemG xs={12}>
			<Caption>{t("installations.fields.user")}</Caption>
			{user ? <Info>{`${user.firstName} ${user.lastName}`}</Info> : null}
		</ItemG>
	}
	const renderOperation = () => {
		switch (installation.operation) {
			case 0:
				return t('installations.operations.inactive')

			case 1:
				return t('installations.operations.active')

			default:
				break;
		}

	}
	const renderState = () => {

		switch (installation.state) {
			case 0:
				return t('installations.states.provisioned')

			case 1:
				return t('installations.states.onboarded')

			default:
				break
		}
	}
	const renderAddress = () => {
		let i = installation
		let str = i.streetName + (i.streetNumber ? ' ' + i.streetNumber + '' : '')  + (i.side ? ', ' + i.side + ', ' : ', ')  + i.zip + ' ' + i.city
		return str
	}
	return (
		loading ? <CircularLoader/> :
			<ItemG container style={{ padding: 16 }}>
				<ItemG xs={12}>
					<T variant={'h6'}>{t('installations.header.details')}</T>
					<Divider />
				</ItemG>
				<ItemG xs={3}>
					<Caption>{t('installations.fields.operation')}</Caption>
					<Info>{renderOperation()}</Info>
				</ItemG>
				<ItemG xs={9}>
					<Caption>{t('installations.fields.state')}</Caption>
					<Info>{renderState()}</Info>
				</ItemG>
				<ItemG xs={3}>
					<Caption>{t('installations.fields.address')}</Caption>
					<Info>{renderAddress()}</Info>
				</ItemG>
				<ItemG xs={9}>
					<Caption>{t('installations.fields.moving')}</Caption>
					<Info>{installation.moving ? t("actions.yes") : t("actions.no")}</Info>
				</ItemG>
				<ItemG xs={3}>
					<Caption>{t('installations.fields.startDate')}</Caption>
					<Info>{dateFormatter(installation.startDate) === 'Invalid date' ? '-' : dateFormatter(installation.startDate)}</Info>
				</ItemG>
				<ItemG xs={9}>
					<Caption>{t('installations.fields.endDate')}</Caption>
					<Info>{dateFormatter(installation.endDate) === 'Invalid date' ? '-' : dateFormatter(installation.endDate)}</Info>
				</ItemG>

				<ItemG xs={12}>
					<T variant={'h6'}>{t('installations.header.map')}</T>
					<Divider />
				</ItemG>
				<ItemG xs={12}>
					<div style={{ minHeight: 300, height: 300, marginBottom: 24 }}>
						<OpenStreetMap
							t={t}
							markers={[{
								...installation, lng: installation.long, lat: installation.lat
							}]}
						/>
					</div>
				</ItemG>
				<ItemG xs={12}>
					<T variant={'h6'}>{t('installations.header.ownership')}</T>
					<Divider />
				</ItemG>
				{renderUser()}
				{renderOrg()}
				{/* <ItemG xs={3}>
				<Caption>{t('alarms.fields.ttl')}</Caption>
				<Info>{renderTTL()}</Info>
			</ItemG> */}
				{/* <ItemG xs={12}>
				<Divider />
			</ItemG> */}
				{/* <ItemG xs={3}>
				<Caption>{t('alarms.fields.condition')}</Caption>
			</ItemG>
			{renderCondition()} */}
				<ItemG xs={12}>
					<T variant={'h6'}>{t('installations.header.softwareIDs')}</T>
					<Divider />
				</ItemG>
				<ItemG xs={6}>
					<Caption>{t('installations.fields.deviceUUID')}</Caption>
					<Info>{installation.deviceUUID}</Info>
				</ItemG>
				<ItemG xs={6}>
					<Caption>{t('installations.fields.instDevUUID')}</Caption>
					<Info>{installation.instDevUUID}</Info>
				</ItemG>
				<ItemG xs={6}>
					<Caption>{t('installations.fields.instUserUUID')}</Caption>
					<Info>{installation.instUserUUID}</Info>
				</ItemG>
				<ItemG xs={6}>
					<Caption>{t('installations.fields.sentiUserUUID')}</Caption>
					<Info>{installation.sentiUserUUID}</Info>
				</ItemG>
				<ItemG xs={6}>
					<Caption>{t('installations.fields.deviceUUID')}</Caption>
					<Info>{installation.uuid}</Info>
				</ItemG>
			</ItemG>
	)
}

export default Installation
