import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Dialog, Paper } from '@material-ui/core'
import { SlideT, T } from 'Components'
import CTable from 'Components/Table/Table'
import TC from 'Components/Table/TC'
import deviceTableStyles from 'Components/Custom/Styles/deviceTableStyles'
import { useSelector, useLocalization, useState, useDispatch } from 'Hooks'
import { selectDevice, selectAllDevices } from 'Redux/appState'
import { sortData } from 'Redux/data'
import FilterToolbar from 'Components/FilterToolbar/FilterToolbar'

const columns = [
	{ id: 'address', label: 'address' },
	{ id: 'guid', label: 'guid' },
	{ id: 'nId', label: 'id' },
	{ id: 'id', label: 'id' },
	{ id: 'type', label: 'type' },
	{ id: 'group', label: 'group' },
	{ id: 'active', label: 'active' },
	// { id: 'liveStatus', checkbox: true, label: <ItemG container justify={'center'} title={t('devices.fields.status')}><SignalWifi2Bar /></ItemG> },
	// { id: 'address', label: t('devices.fields.address') },
	// { id: 'org.name', label: t('devices.fields.org') },
	// { id: 'dataCollection', label: t('devices.fields.availability') }
]

const bodyStructure = row => {
	return <Fragment>
		<TC label={row.address} />
		<TC label={row.guid} />
		<TC label={row.nId} />
		<TC label={row.id} />
		<TC label={row.type} />
		<TC label={row.group} />
		<TC label={row.active ? 'active' : 'inactive'} />
	</Fragment>
}
// dLiveStatus = () => {
// 	const { t, classes } = this.props
// 	return [
// 		{ value: 0, label: t("devices.status.redShort"), icon: <SignalWifi2Bar className={classes.redSignal} /> },
// 		{ value: 1, label: t("devices.status.yellowShort"), icon: <SignalWifi2Bar className={classes.yellowSignal} /> },
// 		{ value: 2, label: t("devices.status.greenShort"), icon: <SignalWifi2Bar className={classes.greenSignal} /> }
// 	]
// }
// dCalibrated = () => {
// 	const { t } = this.props
// 	return [
// 		{ value: true, label: t("filters.devices.calibrated") },
// 		{ value: false, label: t("filters.devices.notCalibrated") }
// 	]
// }
// dLocationPlace = () => {
// 	const { t } = this.props
// 	return [
// 		{ value: 1, label: t('devices.locationTypes.pedStreet') },
// 		{ value: 2, label: t('devices.locationTypes.park') },
// 		{ value: 3, label: t('devices.locationTypes.path') },
// 		{ value: 4, label: t('devices.locationTypes.square') },
// 		{ value: 5, label: t('devices.locationTypes.crossroads') },
// 		{ value: 6, label: t('devices.locationTypes.road') },
// 		{ value: 7, label: t('devices.locationTypes.motorway') },
// 		{ value: 8, label: t('devices.locationTypes.port') },
// 		{ value: 9, label: t('devices.locationTypes.office') },
// 		{ value: 0, label: t('devices.locationTypes.unspecified') }]
// }
// dAvailable = () => {
// 	const { t } = this.props
// 	return [
// 		{ value: true, label: t('devices.fields.notfree') },
// 		{ value: false, label: t('devices.fields.free') }
// 	]
// }

const DeviceTable = (props) => {
	const color = useSelector(s => s.settings.colorTheme)
	const devices = useSelector(s => s.data.devices)
	const selectedDevices = useSelector(s => s.appState.selectedDevices)
	const dispatch = useDispatch()
	const redux = {
		selectDevice: (b, device) => dispatch(selectDevice(b, device)),
		selectAllDevices: (b) => dispatch(selectAllDevices(b)),
		sortData: (key, property, o) => dispatch(sortData(key, property, order))
	}
	const classes = deviceTableStyles({ color })
	const t = useLocalization()
	const [order, setOrder] = useState('desc')
	const [orderBy, setOrderBy] = useState('id')

	const { openTable, setOpenTable } = props

	const handleRequestSort = (key, property) => {
		let o = property !== orderBy ? 'asc' : order === 'desc' ? 'asc' : 'desc'

		setOrder(o)
		setOrderBy(property)
		redux.sortData(key, property, o)
	}

	//#region  Filters
	const deviceFilters = [
		{ key: 'name', name: t('devices.fields.name'), type: 'string' },
		{ key: 'address', name: t('devices.fields.address'), type: 'string' },
		// { key: '', name: t('orgs.fields.name'), type: 'string' },
		// { key: 'liveStatus', name: t('devices.fields.status'), type: 'dropDown', options: this.dLiveStatus() },
		// { key: 'locationType', name: t('devices.fields.locType'), type: 'dropDown', options: this.dLocationPlace() },
		// { key: 'lat', name: t('calibration.stepheader.calibration'), type: 'diff', options: { dropdown: this.dCalibrated(), values: { false: [0] } } },
		// { key: 'dataCollection', name: t('devices.fields.availability'), type: 'dropDown', options: this.dAvailable() },
		{ key: '', name: t('filters.freeText'), type: 'string', hidden: true },
	]

	//#endregion

	const closeDialog = () => setOpenTable(false)
	return (
		<Dialog
			fullScreen
			style={{ top: 70 }}
			onClose={closeDialog}
			open={openTable}
			color={'primary'}
			TransitionComponent={SlideT}
			BackdropProps={{
				classes: {
					root: classes.dialogRoot
				}
			}}
			PaperProps={{
				classes: {
					root: classes.backgroundColor
				}
			}}
			classes={{
				root: classes.dialogRoot
			}}
		>
			<Paper className={classes.paperRoot}>
				<div className={classes.title}>
					<T variant={'h4'} style={{ fontWeight: 500, letterSpacing: 0.5 }}>{t('charts.selectedDevices')}</T>
				</div>
				{/* <div> */}
				<FilterToolbar reduxKey={'devices'} filters={deviceFilters} />
				{/* <T>Filter Toolbar</T> */}
				{/* </div> */}
				<CTable
					order={order}
					orderBy={orderBy}
					sortKey={'devices'}
					body={devices}
					bodyStructure={bodyStructure}
					mobile
					bodyMobileStructure={() => { }}
					selected={selectedDevices}
					columns={columns}
					handleCheckboxClick={redux.selectDevice}
					handleSelectAllClick={redux.selectAllDevices}
					handleClick={() => { }}
					handleSort={handleRequestSort}
				/>
			</Paper>
		</Dialog>
	)
}

DeviceTable.propTypes = {
	openTable: PropTypes.bool.isRequired,
	setOpenTable: PropTypes.func.isRequired,
}

export default DeviceTable
