import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@material-ui/core'
import { SlideT, T } from 'Components'
import CTable from 'Components/Table/Table'
import TC from 'Components/Table/TC'
import { Backdrop, DPaper, TitleContainer, DBox } from 'Components/Custom/Styles/deviceTableStyles'
import { useSelector, useLocalization, useState, useDispatch } from 'Hooks'
import { selectDevice, selectAllDevices } from 'Redux/appState'
import { sortData } from 'Redux/data'
import FilterToolbar from 'Components/FilterToolbar/FilterToolbar'
import { customFilterItems } from 'variables/functions/filters'

const columns = [
	{ id: 'address', label: 'address' },
	{ id: 'guid', label: 'guid' },
	{ id: 'name', label: 'name' },
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
		<TC label={row.name} />
		<TC label={row.id} />
		<TC label={row.type} />
		<TC label={row.group} />
		<TC label={row.communication ? 'active' : 'inactive'} />
	</Fragment>
}

const DeviceTable = (props) => {
	const devices = useSelector(s => s.data.devices)
	const selectedDevices = useSelector(s => s.appState.selectedDevices)
	const filters = useSelector(s => s.appState.filters.devices)
	const dispatch = useDispatch()
	const redux = {
		selectDevice: (b, device) => dispatch(selectDevice(b, device)),
		selectAllDevices: (b) => dispatch(selectAllDevices(b)),
		sortData: (key, property, order) => dispatch(sortData(key, property, order))
	}
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
			BackdropComponent={Backdrop}
			// BackdropProps={{
			// classes: {
			// root: classes.dialogRoot
			// }
			// }}
			PaperComponent={DPaper}

		// classes={{
		// 	root: classes.dialogRoot
		// }}
		>
			<DBox>
				<TitleContainer>
					<T variant={'h4'} style={{ fontWeight: 500, letterSpacing: 0.5 }}>{t('charts.selectedDevices')}</T>
				</TitleContainer>
				{/* <div> */}
				<FilterToolbar reduxKey={'devices'} filters={deviceFilters} />
				{/* <T>Filter Toolbar</T> */}
				{/* </div> */}
				<CTable
					order={order}
					orderBy={orderBy}
					sortKey={'devices'}
					body={customFilterItems(devices, filters)}
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
			</DBox>
		</Dialog>
	)
}

DeviceTable.propTypes = {
	openTable: PropTypes.bool.isRequired,
	setOpenTable: PropTypes.func.isRequired,
}

export default DeviceTable
