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
		{/* <TC FirstC label={row.name} /> */}
		<TC label={row.address} />
		<TC label={row.guid} />
		<TC label={row.nId} />
		<TC label={row.id} />
		<TC label={row.type} />
		<TC label={row.group} />
		<TC label={row.active ? 'active' : 'inactive'} />
	</Fragment>
}
const DeviceTableWrapper = (props) => {
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

	const closeDialog = () => setOpenTable(false)
	return (
		<Dialog
			fullScreen
			style={{ top: 70 }}
			onClose={closeDialog}
			open={openTable}
			// open={true}
			color={'primary'}
			TransitionComponent={SlideT}
			// disableBackdropClick
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
				<div style={{ height: 48, background: '#ccc', color: '#000' }}>
					<T>Filter Toolbar</T>
				</div>
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

DeviceTableWrapper.propTypes = {
	openTable: PropTypes.bool.isRequired,
	setOpenTable: PropTypes.func.isRequired,
}

export default DeviceTableWrapper
