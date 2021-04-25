import React, { Fragment, useEffect } from 'react'
// import PropTypes from 'prop-types'
import CTable from 'Components/Table/Table'
import TC from 'Components/Table/TC'
import { useSelector, useLocalization, useState, useDispatch } from 'Hooks'
import { sortData as rSortData } from 'Redux/data'
import FilterToolbar from 'Components/FilterToolbar/FilterToolbar'
import { customFilterItems } from 'variables/functions/filters'
// import DeviceToolbar from 'Components/Custom/DevicesTable/DeviceToolbar'
import { getTags } from 'Redux/tagManager'



const GroupTable = (props) => {
	//Hooks
	const dispatch = useDispatch()
	const t = useLocalization()

	//Redux
	const tags = useSelector(s => s.tagManager.tags)
	const filters = useSelector(s => s.appState.filters.groups)

	//State
	const [selDev, setSelDev] = useState([])
	const [loading, setLoading] = useState(true)
	const [order, setOrder] = useState('desc')
	const [orderBy, setOrderBy] = useState('id')

	//Const

	//useCallbacks

	//useEffects

	useEffect(() => {
		const getDeviceTags = async () => await dispatch(await getTags())
		const loadData = async () => {
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
			setSelDev(customFilterItems(tags, filters).map(d => d.uuid))
	}
	//#region  Filters

	const groupFilters = [
		{ key: 'name', name: t('devices.fields.name'), type: 'string' },
		{ key: 'address', name: t('devices.fields.address'), type: 'string' },
		{ key: '', name: t('filters.freeText'), type: 'string', hidden: true },
	]

	//#endregion
	const columns = [
		{ id: 'name', label: t('devices.fields.name') },
		{ id: 'description', label: t('devices.fields.description') },
		{ id: 'color', label: "Color" }
	]
	const bodyStructure = row => {
		return <Fragment key={row.id}>
			{/* <TC label={row.address} /> */}
			<TC label={row.name} />
			<TC label={row.description} />
			<TC label={<div style={{ borderRadius: 4, background: row.color, width: 72, height: 24 }}/>} />
		</Fragment>
	}
	return (

		<>

			{/* {selDev.length > 0 ? <DeviceToolbar devices={selDev} /> : <FilterToolbar reduxKey={'tags'} filters={deviceFilters} />} */}
			<FilterToolbar reduxKey={'groups'} filters={groupFilters} />

			<CTable
				order={order}
				orderBy={orderBy}
				sortKey={'tags'}
				body={customFilterItems(tags, filters)}
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

// GroupTable.propTypes = {
// 	openTable: PropTypes.bool.isRequired,
// 	setOpenTable: PropTypes.func.isRequired,
// }

export default GroupTable
