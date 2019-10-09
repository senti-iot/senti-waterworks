import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Dialog, Paper } from '@material-ui/core'
import { SlideT, T } from 'Components'
import CTable from 'Components/Table/Table'
import TC from 'Components/Table/TC'
import deviceTableStyles from 'Components/Custom/Styles/deviceTableStyles'
import { useSelector, useLocalization } from 'Hooks'

const columns = [
	{ id: 'name', label: 'Name' },
	{ id: 'address', label: 'Address' },
	{ id: 'type', label: 'Type' },
	// { id: 'liveStatus', checkbox: true, label: <ItemG container justify={'center'} title={t('devices.fields.status')}><SignalWifi2Bar /></ItemG> },
	// { id: 'address', label: t('devices.fields.address') },
	// { id: 'org.name', label: t('devices.fields.org') },
	// { id: 'dataCollection', label: t('devices.fields.availability') }
]
const body = [{
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
},
{
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
},
{
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
}, {
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
},
{
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
},
{
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
}, {
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
},
{
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
},
{
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
}, {
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
},
{
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
},
{
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
}, {
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
},
{
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
},
{
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
}, {
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
},
{
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
},
{
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
}, {
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
},
{
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
},
{
	name: 'Fake Device',
	address: 'Fake street',
	type: 'Fake'
}]
const bodyStructure = row => {
	return <Fragment>
		<TC FirstC label={row.name} />
		<TC label={row.address} />
		<TC label={row.type} />
	</Fragment>
}
const DeviceTableWrapper = (props) => {
	const { openTable, setOpenTable } = props
	const color = useSelector(s => s.settings.colorTheme)
	const classes = deviceTableStyles({ color })
	const t = useLocalization()

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
			disableBackdropClick
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
					order={'asc'}
					orderBy={'name'}
					body={body}
					bodyStructure={bodyStructure}
					mobile
					bodyMobileStructure={() => { }}
					selected={[]}
					columns={columns}
					handleCheckboxClick={() => { }}
					handleSelectAllClick={() => { }}
					handleClick={() => { }}
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
