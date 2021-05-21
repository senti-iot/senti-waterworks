import React, { Fragment, useEffect } from 'react'
// import PropTypes from 'prop-types'
import CTable from 'Components/Table/Table'
import TC from 'Components/Table/TC'
import { useSelector, useLocalization, useState, useDispatch } from 'Hooks'
import { getAdminDevices, sortData as rSortData } from 'Redux/data'
import FilterToolbar from 'Components/FilterToolbar/FilterToolbar'
import { customFilterItems } from 'variables/functions/filters'
import { Chip, Tooltip } from '@material-ui/core'
import DeviceToolbar from 'Components/Custom/DevicesTable/DeviceToolbar'
import { getTags } from 'Redux/tagManager'
import { contrastColor } from 'data/functions'



const FullDeviceTable = (props) => {
	//Hooks
	const dispatch = useDispatch()
	const t = useLocalization()

	//Redux
	const devices = useSelector(s => s.data.devices)
	const tags = useSelector(s => s.tagManager.tags)
	const filters = useSelector(s => s.appState.filters.devices)

	//State
	const [selDev, setSelDev] = useState([])
	const [loading, setLoading] = useState(true)
	const [order, setOrder] = useState('desc')
	const [orderBy, setOrderBy] = useState('id')

	//Const

	//useCallbacks

	//useEffects

	useEffect(() => {
		const getDevices = async () => await dispatch(await getAdminDevices())
		const getDeviceTags = async () => await dispatch(await getTags())
		const loadData = async () => {
			if (devices.length === 0 && loading) {
				await getDevices()
			}
			if (tags.length === 0 && loading) {
				await getDeviceTags()
			}
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
	const dTagList = () => {
		return tags.map(t => ({
			value: t.name, label: t.name, icon: <div style={{ borderRadius: 4, background: t.color, width: 16, height: 16 }}></div> }))

	}
	const deviceFilters = [
		{ key: 'uuname', name: t('devices.fields.uuid'), type: 'string' },
		{ key: 'name', name: t('devices.fields.name'), type: 'string' },
		{ key: 'communication', name: t('devices.fields.status'), type: 'dropDown', options: dLiveStatus() },
		{ key: 'tags', name: t('devices.fields.tags'), type: 'dropDown', options: dTagList() },
		{ key: '', name: t('filters.freeText'), type: 'string', hidden: true },
	]

	//#endregion
	const columns = [
		// { id: 'address', label: t('devices.fields.address') },
		{ id: 'uuname', label: t('devices.fields.uuname') },
		{ id: 'name', label: t('devices.fields.name') },
		{ id: 'uuid', label: t('devices.fields.uuid') },
		// { id: 'id', label: t('devices.fields.id') },
		// { id: 'type', label: t('devices.fields.type') },
		// { id: 'group', label: t('devices.fields.group') },
		{ id: 'communication', label: t('devices.fields.status') },
		{ id: 'tags', label: t('devices.fields.tags') }
	]
	const renderTags = device => {
		return device.tags?.map((t, i) => (<Tooltip key={i} title={t.description}>
			<Chip label={t.name} style={{ background: t.color, marginRight: 4, color: t.color ? contrastColor(t.color) : "#fff" }}/>
		</Tooltip>
		))
	}
	const bodyStructure = row => {
		return <Fragment key={row.id}>
			{/* <TC label={row.address} /> */}
			<TC label={row.uuname} />
			<TC label={row.name} />
			<TC label={row.uuid} />
			{/* <TC label={row.id} /> */}
			{/* <TC label={row.type} /> */}
			{/* <TC label={row.group} /> */}
			<TC label={row.communication ? t('devices.fields.state.active') : t('devices.fields.state.inactive')} />
			<TC content={renderTags(row)} />
		</Fragment>
	}
	return (

		<>

			{selDev.length > 0 ? <DeviceToolbar devices={selDev}/> : <FilterToolbar reduxKey={'devices'} filters={deviceFilters} />}

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
		</>

	)
}

// FullDeviceTable.propTypes = {
// 	openTable: PropTypes.bool.isRequired,
// 	setOpenTable: PropTypes.func.isRequired,
// }

export default FullDeviceTable
