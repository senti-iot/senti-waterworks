import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Dialog } from '@material-ui/core'
import { SlideT } from 'Components'
import CTable from 'Components/Table/Table'
import TC from 'Components/Table/TC'
import { Backdrop, DPaper, TitleContainer, DBox, GetDevicesButton, DevicesSelected, Title } from 'Components/Custom/Styles/deviceTableStyles'
import { useSelector, useLocalization, useState, useDispatch } from 'Hooks'
import { setSelectedDevices } from 'Redux/appState'
import { sortData as rSortData } from 'Redux/data'
import FilterToolbar from 'Components/FilterToolbar/FilterToolbar'
import { customFilterItems } from 'variables/functions/filters'
import ItemG from 'Components/Containers/ItemG'



const DeviceTable = (props) => {
	//Hooks
	const dispatch = useDispatch()
	const t = useLocalization()

	//Redux
	const devices = useSelector(s => s.data.devices)
	const selectedDevices = useSelector(s => s.appState.selectedDevices)
	const filters = useSelector(s => s.appState.filters.devices)

	//State
	const [selDev, setSelDev] = useState([])

	const [order, setOrder] = useState('desc')
	const [orderBy, setOrderBy] = useState('id')

	//Const
	const { openTable, setOpenTable } = props

	//useCallbacks

	//useEffects
	useEffect(() => {
		setSelDev(selectedDevices)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	//Handlers
	const setSelDevices = devices => dispatch(setSelectedDevices(devices))
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
			setSelDev(customFilterItems(devices, filters).map(d => d.uuid))
	}
	//#region  Filters
	const dLiveStatus = () => {
		return [
			{ value: 0, label: t("devices.fields.state.inactive") },
			{ value: 1, label: t("devices.fields.state.active") },
		]
	}
	const deviceFilters = [
		{ key: 'name', name: t('devices.fields.name'), type: 'string' },
		{ key: 'address', name: t('devices.fields.address'), type: 'string' },
		{ key: 'communication', name: t('devices.fields.status'), type: 'dropDown', options: dLiveStatus() },
		{ key: '', name: t('filters.freeText'), type: 'string', hidden: true },
	]

	//#endregion
	const columns = [
		// { id: 'address', label: t('devices.fields.address') },
		{ id: 'uuid', label: t('devices.fields.uuid') },
		{ id: 'name', label: t('devices.fields.name') },
		// { id: 'id', label: t('devices.fields.id') },
		// { id: 'type', label: t('devices.fields.type') },
		// { id: 'group', label: t('devices.fields.group') },
		{ id: 'communication', label: t('devices.fields.status') },
	]
	const bodyStructure = row => {
		return <Fragment>
			{/* <TC label={row.address} /> */}
			<TC label={row.uuname} />
			<TC label={row.name} />
			{/* <TC label={row.id} /> */}
			{/* <TC label={row.type} /> */}
			{/* <TC label={row.group} /> */}
			<TC label={row.communication ? t('devices.fields.state.active') : t('devices.fields.state.inactive')} />
		</Fragment>
	}
	const closeDialog = () => {
		setSelDevices(selDev)
		setOpenTable(false)
	}
	const exitDialog = () => {
		setOpenTable(false)
	}
	return (
		<Dialog
			fullScreen
			style={{ top: 70 }}
			onClose={exitDialog}
			open={openTable}
			// open={true}
			color={'primary'}
			TransitionComponent={SlideT}
			BackdropComponent={Backdrop}
			PaperComponent={DPaper}

		// classes={{
		// 	root: classes.dialogRoot
		// }}
		>
			<DBox>
				<TitleContainer>
					<Title variant={'h6'}>{t('charts.selectedDevices')}</Title>
					<ItemG container style={{ width: 'auto' }}>
						<ItemG>
							<DevicesSelected>{selDev.length}</DevicesSelected>
						</ItemG>
						<ItemG>
							<GetDevicesButton variant={'contained'} color={'secondary'} onClick={closeDialog}>{t('actions.get')}</GetDevicesButton>
						</ItemG>
					</ItemG>
				</TitleContainer>
				<FilterToolbar reduxKey={'devices'} filters={deviceFilters} />
				<CTable
					order={order}
					orderBy={orderBy}
					sortKey={'devices'}
					body={customFilterItems(devices, filters)}
					bodyStructure={bodyStructure}
					mobile
					bodyMobileStructure={() => { }}
					selected={selDev}
					columns={columns}
					handleCheckboxClick={selectDevice}
					handleSelectAllClick={selectAllDevices}
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
