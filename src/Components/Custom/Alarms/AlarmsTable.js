import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import CTable from 'Components/Table/Table'
import TC from 'Components/Table/TC'
import { useSelector, useLocalization, useState, useDispatch, useHistory } from 'Hooks'
import { getAdminDevices, getAlarms, sortData as rSortData } from 'Redux/data'
import { customFilterItems } from 'variables/functions/filters'
import ItemG from 'Components/Containers/ItemG'
import { Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { red } from '@material-ui/core/colors'
import { Add, Notifications as AlarmIco } from 'variables/icons'
import DeleteDialog from 'Components/Dialogs/DeleteDialog'
import { Delete, /* Edit */ } from '@material-ui/icons'
import { openCA } from 'Redux/appState'
import { deleteAlarmV1 } from 'data/alarms'

// import { Chip, Tooltip } from '@material-ui/core'
// import { getTags } from 'Redux/tagManager'
// import { contrastColor } from 'data/functions'

const styles = makeStyles(theme => ({
	chipIcon: {
		color: '#fff'
	},
	movingOut: {
		fill: red[500]
	},
	section: {
		margin: 8
	},
	listContainer: {
		maxHeight: 300,
		overflow: 'auto',
		minWidth: 300
	},
	chipContainer: {
		background: 'rgba(0, 0, 0, 0.1)',
		display: 'flex',
		borderRadius: 4,
		minHeight: 40,
		padding: 12,

	},
}))

const AlarmsTable = (props) => {
	//Hooks
	const dispatch = useDispatch()
	const t = useLocalization()
	const history = useHistory()
	const classes = styles()

	//Redux
	const alarms = useSelector(s => s.data.alarms)
	const filters = useSelector(s => s.appState.filters.alarms)
	const isSWAdmin = useSelector(s => s.auth.privileges.indexOf('waterworks.admin') > -1 ? true : false)

	//State
	const [selDev, setSelDev] = useState([])
	const [order, setOrder] = useState('desc')
	const [orderBy, setOrderBy] = useState('id')
	const [openDelete, setOpenDelete] = useState(false)

	//Const

	//useCallbacks

	//useEffects

	//Handlers
	const sortData = (key, property, order) => dispatch(rSortData(key, property, order))



	const handleRequestSort = (key, property) => {
		let o = property !== orderBy ? 'asc' : order === 'desc' ? 'asc' : 'desc'

		setOrder(o)
		setOrderBy(property)
		sortData(key, property, o)
	}
	const selectDevice = (s, device) => {
		let newSDevices = []
		newSDevices = [...selDev]
		if (s) {
			newSDevices = newSDevices.filter(d => d !== device)
		}
		else {
			newSDevices.push(device)
		}
		setSelDev(newSDevices)
	}
	const selectAllDevices = (s) => {
		let newSDevices = []
		if (!s)
			setSelDev(newSDevices)
		else
			setSelDev(customFilterItems(alarms, filters).map(d => d.uuid))
	}

	const columns = [
		// { id: 'address', label: t('devices.fields.address') },
		{ id: 'name', label: t('alarms.fields.name') },
		// { id: 'name', label: t('devices.fields.name') },
		{ id: 'uuid', label: t('alarms.fields.uuid') },
		{ id: 'ttlType', label: t('alarms.fields.ttl') },
		{ id: 'count', label: t('alarms.fields.count') },
		{ id: 'state', label: t('alarms.fields.state') }
		// { id: 'id', label: t('devices.fields.id') },
		// { id: 'type', label: t('devices.fields.type') },
		// { id: 'group', label: t('devices.fields.group') },
		// { id: 'communication', label: t('devices.fields.status') },
		// { id: 'tags', label: t('devices.fields.tags') }
	]

	const handleCloseDeleteDialog = () => setOpenDelete(false)
	const handleDelete = () => {
		Promise.all([selDev.map(u => {
			// return true
			return deleteAlarmV1(u)
		})]).then(async () => {
			setOpenDelete(false)
			setSelDev([])
			await dispatch(await getAdminDevices())
			await dispatch(await getAlarms())
		})
	}
	const renderDeleteDialog = () => {
		let data = selDev.map(s => alarms[alarms.findIndex(d => d.uuid === s)])
		return <DeleteDialog
			t={t}
			title={'dialogs.delete.title.alarms'}
			message={'dialogs.delete.message.alarms'}
			open={openDelete}
			icon={<AlarmIco />}
			handleCloseDeleteDialog={handleCloseDeleteDialog}
			handleDelete={handleDelete}
			data={data}
			dataKey={'address'}
			dataKeySec={'uuid'}
		/>
	}
	const handleOpenCreate = () => dispatch(openCA())

	const renderSelectedToolbar = () => {
		return <div className={classes.chipContainer}>
			<ItemG container spacing={1} alignItems={'center'}>
				{selDev.length > 0 ? <ItemG>
					<Chip color={'primary'} label={`${selDev.length} ${t('tables.selected')}`} />
				</ItemG> : <ItemG />}

				{isSWAdmin ? <Fragment>
					<ItemG>
						<Chip className={classes.chipIcon} label={t('menus.create.alarm')} color={'secondary'} onClick={handleOpenCreate} icon={<Add className={classes.chipIcon} />} />
					</ItemG>
					{/* {selDev.length === 1 ? <ItemG>
						<Chip className={classes.chipIcon} label={t('menus.edits.alarm')} color={'secondary'} onClick={() => { handleOpenEdit(selDev[0]) }} icon={<Edit className={classes.chipIcon} />} />
					</ItemG> : null} */}
					{selDev.length >= 1 ? <ItemG>
						<Chip className={classes.chipIcon} label={t('menus.deletes.alarms')} color={'secondary'} onClick={() => { setOpenDelete(true) }} icon={<Delete className={classes.chipIcon} />} />
					</ItemG> : null}
				</Fragment> : null}
			</ItemG>
		</div>
	}
	const renderTtlType = ttlType => {
		switch (ttlType) {
			case 1:
				return t('alarms.fields.ttls.fromNow')
			case 2:
				return t('alarms.fields.ttls.fromFirstEvent')
			case 3:
				return t('alarms.fields.ttls.always')
			default:
				break;
		}

	}
	const handleGoToAlarm = (row) => {
		history.push(`/alarm/${row.uuid}`)
	}
	const bodyStructure = row => {
		return <Fragment key={row.id}>
			{/* <TC label={row.address} /> */}
			<TC label={row.name} />
			<TC label={row.uuid} />
			<TC label={renderTtlType(row.config?.ttlType)} />
			<TC label={row.count}/>
			<TC label={row.state}/>
			{/* <TC label={row.id} /> */}
			{/* <TC label={row.type} /> */}
			{/* <TC label={row.group} /> */}
			{/* <TC content={renderTags(row)} /> */}
		</Fragment>
	}

	return (

		<>

			{renderDeleteDialog()}
			{renderSelectedToolbar()}
			<CTable
				order={order}
				orderBy={orderBy}
				sortKey={'alarms'}
				body={customFilterItems(alarms, filters)}
				bodyStructure={bodyStructure}
				mobile
				bodyMobileStructure={() => { }}
				selected={selDev}
				columns={columns}
				handleCheckboxClick={selectDevice}
				handleSelectAllClick={selectAllDevices}
				handleClick={handleGoToAlarm}
				handleSort={handleRequestSort}
			/>
		</>

	)
}

// FullDeviceTable.propTypes = {
// 	openTable: PropTypes.bool.isRequired,
// 	setOpenTable: PropTypes.func.isRequired,
// }

export default AlarmsTable
