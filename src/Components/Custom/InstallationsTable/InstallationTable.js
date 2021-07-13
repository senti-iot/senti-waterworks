import React, { Fragment, useEffect } from 'react'
// import PropTypes from 'prop-types'
import CTable from 'Components/Table/Table'
import TC from 'Components/Table/TC'
import { useSelector, useLocalization, useState, useDispatch } from 'Hooks'
import { getAdminDevices, getAdminInstallations, getAdminUsers, sortData as rSortData } from 'Redux/data'
import FilterToolbar from 'Components/FilterToolbar/FilterToolbar'
import { customFilterItems } from 'variables/functions/filters'
// import { Chip, Tooltip } from '@material-ui/core'
// import InstallationToolbar from 'Components/Custom/InstallationsTable/InstallationToolbar'
// import { getTags } from 'Redux/tagManager'
// import { contrastColor } from 'data/functions'
import { makeStyles } from '@material-ui/styles'
import { red } from '@material-ui/core/colors'
import { Delete, Edit, SwapHorizontalCircleIcon, Devices as DeviceIcon } from 'variables/icons'
import { ItemG } from 'Components'
import { Chip } from '@material-ui/core'
import DeleteDialog from 'Components/Dialogs/DeleteDialog'
import { deleteInstallation } from 'data/installations'

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

const FullInstallationTable = (props) => {
	//Hooks
	const dispatch = useDispatch()
	const t = useLocalization()
	const classes = styles()
	//Redux
	const installations = useSelector(s => s.data.installations)
	// const tags = useSelector(s => s.tagManager.tags)
	const filters = useSelector(s => s.appState.filters.installations)
	const isSWAdmin = useSelector(s => s.auth.privileges.indexOf('waterworks.admin') > -1 ? true : false)

	//State
	const [selDev, setSelDev] = useState([])
	const [loading, setLoading] = useState(true)
	const [order, setOrder] = useState('desc')
	const [orderBy, setOrderBy] = useState('id')
	const [openDelete, setOpenDelete] = useState(false)
	//Const
	const { handleOpenEdit } = props
	//useCallbacks

	//useEffects

	useEffect(() => {
		const getDevices = async () => await dispatch(await getAdminDevices())
		const getUsers = async () => await dispatch(await getAdminUsers())
		const getInstallations = async () => await dispatch(await getAdminInstallations())
		// const getInstallationTags = async () => await dispatch(await getTags())
		const loadData = async () => {
			if (installations.length === 0 && loading) {
				await getInstallations()
				await getDevices()
				await getUsers()
			}
			// if (tags.length === 0 && loading) {
			// 	await getInstallationTags()
			// }
			setLoading(false)
		}
		loadData()
		//eslint-disable-next-line
	}, [])
	//Handlers
	const sortData = (key, property, order) => dispatch(rSortData(key, property, order))



	const handleRequestSort = (key, property) => {
		let o = property !== orderBy ? 'asc' : order === 'desc' ? 'asc' : 'desc'

		setOrder(o)
		setOrderBy(property)
		sortData(key, property, o)
	}
	const selectInstallation = (s, installation) => {
		let newSInstallations = []
		newSInstallations = [...selDev]
		if (s) {
			newSInstallations = newSInstallations.filter(d => d !== installation)
		}
		else {
			newSInstallations.push(installation)
		}
		setSelDev(newSInstallations)
	}
	const selectAllInstallations = (s) => {
		let newSInstallations = []
		if (!s) {
			setSelDev(newSInstallations)
		}
		else {
			setSelDev(customFilterItems(installations, filters).map(d => d.uuid))
		}
	}
	//#region  Filters
	const dOperation = () => {
		return [
			{ value: 0, label: t("installations.operations.inactive") },
			{ value: 1, label: t("installations.operations.active") },
		]
	}
	const dState = () => {
		return [
			{ value: 0, label: t("installations.states.onboarded") },
			{ value: 1, label: t("installations.states.provisioned") }
		]
	}
	// const dTagList = () => {
	// 	return tags.map(t => ({
	// 		value: t.name, label: t.name, icon: <div style={{ borderRadius: 4, background: t.color, width: 16, height: 16 }}></div> }))
	// }
	const installationFilters = [
		{ key: 'address', name: t('installations.fields.address'), type: 'string' },
		{ key: 'state', name: t('installations.fields.state'), type: 'dropDown', options: dState() },
		{ key: 'operation', name: t('installations.fields.operation'), type: 'dropDown', options: dOperation() },
		// { key: '', name: t('installations.fields.tags'), type: 'dropDown', options: dTagList() },
		{ key: '', name: t('filters.freeText'), type: 'string', hidden: true },
	]

	//#endregion
	const columns = [
		{ id: 'address', label: t('installations.fields.address') },
		{ id: 'uuid', label: t('installations.fields.instId') },
		{ id: 'instDevUUID', label: t('installations.fields.deviceId') },
		{ id: 'operation', label: t('installations.fields.operation') },
		{ id: 'moving', label: t('installations.fields.moving') },
		{ id: 'state', label: t('installations.fields.state') }
		// { id: 'id', label: t('installations.fields.id') },
		// { id: 'type', label: t('installations.fields.type') },
		// { id: 'group', label: t('installations.fields.group') },
	]
	// const renderTags = installation => {
	// 	return installation.tags?.map((t, i) => (<Tooltip key={i} title={t.description}>
	// 		<Chip label={t.name} style={{ background: t.color, marginRight: 4, color: t.color ? contrastColor(t.color) : "#fff" }}/>
	// 	</Tooltip>
	// 	))
	// }
	const renderState = (state) => {
		switch (state) {
			case 0:
				return t("installations.states.onboarded")
			case 1:
				return t("installations.states.provisioned")
			default:
				break;
		}
	}
	const renderOperation = (op) => {
		switch (op) {
			case 0:
				return t("installations.operations.inactive")
			case 1:
				return t("installations.operations.active")
			default:
				break
		}
	}
	const renderMoving = (mv) => {
		switch (mv) {
			case 0:
				return
			case 1:
				return <SwapHorizontalCircleIcon className={classes.movingOut}/>
			default:
				return
		}
	}
	const bodyStructure = row => {
		return <Fragment key={row.id}>
			<TC label={row.address} />
			<TC label={row.uuid} />
			<TC label={row.instDevUUID} />
			<TC label={renderOperation(row.operation)} />
			<TC label={renderMoving(row.moving)} />
			<TC label={renderState(row.state)} />
		</Fragment>
	}
	const bodyMobileStructure = row => {
		return <Fragment key={row.id}>
			<TC label={row.address} />
			<TC label={row.uuid} />
			<TC label={row.instDevUUID} />
			<TC label={renderOperation(row.operation)} />
			<TC label={renderMoving(row.moving)} />
			<TC label={renderState(row.state)} />
		</Fragment>
	}
	const renderSelectedToolbar = () => {
		return <div className={classes.chipContainer}>
			<ItemG container spacing={1} alignItems={'center'}>
				<ItemG>
					<Chip color={'primary'} label={`${selDev.length} ${t('tables.selected')}`} />
				</ItemG>

				{isSWAdmin ? <Fragment>
					{selDev.length === 1 ? <ItemG>
						<Chip className={classes.chipIcon} label={t('menus.edits.installation')} color={'secondary'} onClick={() => { handleOpenEdit(selDev[0]) }} icon={<Edit className={classes.chipIcon} />} />
					</ItemG> : null}
					<ItemG>
						<Chip className={classes.chipIcon} label={t('menus.deletes.installations')} color={'secondary'} onClick={() => { setOpenDelete(true) }} icon={<Delete className={classes.chipIcon} />} />
					</ItemG>
				</Fragment> : null}
			</ItemG>
		</div>
	}
	const handleCloseDeleteDialog = () => setOpenDelete(false)
	const handleDelete = () => {
		Promise.all([selDev.map(u => {
			return deleteInstallation(u)
		})]).then(async () => {
			setOpenDelete(false)
			setSelDev([])
			await dispatch(await getAdminDevices())
			await dispatch(await getAdminInstallations())
		})
	}
	const renderDeleteDialog = () => {
		let data = selDev.map(s => installations[installations.findIndex(d => d.uuid === s)])
		return <DeleteDialog
			t={t}
			title={'dialogs.delete.title.installations'}
			message={'dialogs.delete.message.installations'}
			open={openDelete}
			icon={<DeviceIcon />}
			handleCloseDeleteDialog={handleCloseDeleteDialog}
			handleDelete={handleDelete}
			data={data}
			dataKey={'address'}
			dataKeySec={'uuid'}
		/>
	}
	return (

		<>
			{renderDeleteDialog()}
			{selDev.length > 0 ? <Fragment>
				{ renderSelectedToolbar()}
			</Fragment>
				: <FilterToolbar reduxKey={'installations'} filters={installationFilters} />}

			<CTable
				order={order}
				orderBy={orderBy}
				sortKey={'installations'}
				body={customFilterItems(installations, filters)}
				bodyStructure={bodyStructure}
				mobile
				bodyMobileStructure={bodyMobileStructure}
				selected={selDev}
				columns={columns}
				handleCheckboxClick={selectInstallation}
				handleSelectAllClick={selectAllInstallations}
				handleClick={() => { }}
				handleSort={handleRequestSort}
			/>
		</>

	)
}

// FullInstallationTable.propTypes = {
// 	openTable: PropTypes.bool.isRequired,
// 	setOpenTable: PropTypes.func.isRequired,
// }

export default FullInstallationTable
