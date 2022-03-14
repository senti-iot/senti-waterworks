import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import { Devices as DeviceIcon } from 'variables/icons'
import React from 'react'
import FullDeviceTable from 'Components/Custom/DevicesTable/FullDeviceTable'
import { Collapse, Toolbar } from '@material-ui/core'
import FilterToolbar from 'Components/FilterToolbar/FilterToolbar'
import { useLocalization } from 'Hooks'
import { /* useDispatch */ useSelector } from 'react-redux'
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

const Devices = () => {
	//Hooks
	const t = useLocalization()
	// const dispatch = useDispatch()
	const classes = styles()

	//Redux
	const openTagFilter = useSelector(s => s.appState.openTagFilter)
	const tags = useSelector(s => s.tagManager.tags)

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	//#region  Filters
	const dLiveStatus = () => {
		return [
			{ value: 0, label: t("devices.fields.state.inactive") },
			{ value: 1, label: t("devices.fields.state.active") },
		]
	}
	const dTagList = () => {
		return tags.map(t => ({
			value: t.name, label: t.name, icon: <div style={{ borderRadius: 4, background: t.color, width: 16, height: 16 }}></div>
		}))

	}
	const deviceFilters = [
		{ key: 'uuname', name: t('devices.fields.uuid'), type: 'string' },
		{ key: 'name', name: t('devices.fields.name'), type: 'string' },
		{ key: 'communication', name: t('devices.fields.status'), type: 'dropDown', options: dLiveStatus() },
		{ key: 'tags', name: t('devices.fields.tags'), type: 'dropDown', options: dTagList() },
		{ key: '', name: t('filters.freeText'), type: 'string', hidden: true },
	]

	//#endregion
	return (
		<>
			<Collapse in={openTagFilter}>
				<Toolbar className={classes.secondaryToolbar}>
					<FilterToolbar reduxKey={'devices'} filters={deviceFilters} />
				</Toolbar>
			</Collapse>
			<GridContainer>
				<ItemG xs={12}>
					<PageHeader
						label={'sidebar.devices'}
						icon={DeviceIcon}

					/>
				</ItemG>
				<ItemG xs={12}>
					<InfoCard
						noAvatar
						noHeader
						noExpand
						content={<FullDeviceTable />}
					/>
				</ItemG>
			</GridContainer>
		</>
	)
}

export default Devices
