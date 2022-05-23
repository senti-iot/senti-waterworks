import { Collapse, Toolbar } from '@material-ui/core'
import { GridContainer, InfoCard, ItemG, MapContainer } from 'Components'
import PageHeader from 'Components/Custom/PageHeader/PageHeader'
import FilterToolbar from 'Components/FilterToolbar/FilterToolbar'
import { useLocalization } from 'Hooks'
import React from 'react'
import { useSelector } from 'react-redux'
import { Map } from 'variables/icons'
import cx from 'classnames'
import { makeStyles } from '@material-ui/styles'

const styles = makeStyles(theme => ({
	icon: {
		color: "#fff"
	},
	secondaryToolbar: {
		display: 'flex',
		height: "48px",
		padding: 0
	},

}))

const DeviceMap = () => {
	//Hooks
	const t = useLocalization()
	const classes = styles()

	//Redux
	const openTagFilter = useSelector(s => s.appState.openTagFilter)

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	const dOperation = () => {
		return [
			{ value: 0, label: t("installations.operations.inactive") },
			{ value: 1, label: t("installations.operations.active") },
		]
	}
	const dState = () => {
		return [
			{ value: 0, label: t("installations.states.provisioned") },
			{ value: 1, label: t("installations.states.onboarded") }
		]
	}
	const installationFilters = [
		{ key: 'streetName', name: t('installations.fields.streetName'), type: 'string' },
		{ key: 'zip', name: t('installations.fields.zip'), type: 'string' },
		{ key: 'city', name: t('installations.fields.city'), type: 'string' },
		{ key: 'state', name: t('installations.fields.state'), type: 'dropDown', options: dState() },
		{ key: 'operation', name: t('installations.fields.operation'), type: 'dropDown', options: dOperation() },
		{ key: 'user.fullName', name: t('installations.fields.user'), type: 'string' },
		// { key: '', name: t('installations.fields.tags'), type: 'dropDown', options: dTagList() },
		{ key: '', name: t('filters.freeText'), type: 'string', hidden: true },
	]
	const toolbarCX = cx({
		[classes.secondaryToolbar]: true,
	})
	return (
		<>
			<Collapse in={openTagFilter}>
				<Toolbar className={toolbarCX}>
					<FilterToolbar reduxKey={'installations'} filters={installationFilters} />
				</Toolbar>
			</Collapse>
			<GridContainer>
				<ItemG xs={12} noMargin noPadding>
					<PageHeader
						label={'sidebar.deviceMap'}
						icon={Map}
					/>
				</ItemG>
				<ItemG xs={12}>

				</ItemG>
				<ItemG xs={12}>
					<InfoCard
						noAvatar
						noHeader
						noExpand
						content={<MapContainer />}
					/>
				</ItemG>
			</GridContainer>
		</>
	)
}

export default DeviceMap
