import React, { Fragment, useEffect } from 'react'
// import PropTypes from 'prop-types'
import CTable from 'Components/Table/Table'
import TC from 'Components/Table/TC'
import { useSelector, useLocalization, useState, useDispatch } from 'Hooks'
import { sortData as rSortData } from 'Redux/data'
import { customFilterItems } from 'variables/functions/filters'
import { getTags } from 'Redux/tagManager'
import { Dialog } from '@material-ui/core'
import Group from 'Components/Custom/Groups/Group'
import GroupToolbar from 'Components/Custom/Groups/GroupToolbar'



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
	const [clickedTag, setClickedTag] = useState(null)
	const [openGroup, setOpenGroup] = useState(false)
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

	const columns = [
		{ id: 'name', label: t('devices.fields.name') },
		{ id: 'description', label: t('devices.fields.description') },
		{ id: 'color', label: t('tags.fields.color') },
	]
	const bodyStructure = row => {
		return <Fragment key={row.id}>
			{/* <TC label={row.address} /> */}
			<TC onClick={handleSetClickedTag(row)} label={row.name} />
			<TC onClick={handleSetClickedTag(row)} label={row.description} />
			<TC onClick={handleSetClickedTag(row)} label={<div style={{ borderRadius: 4, background: row.color, width: 72, height: 24 }} />} />
		</Fragment>
	}
	const handleSetClickedTag = (tag) => e => {
		// console.log('Tag', tag)
		setOpenGroup(true)
		setClickedTag(tag)
	}
	const handleCloseClickedTag = () => {
		setOpenGroup(false)
		setTimeout(() => {
			setClickedTag(false)
		}, 300);
	}

	return (
		<>
			<GroupToolbar tags={selDev} setSelected={setSelDev}/>
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
			<Dialog
				open={openGroup}
				onClose={handleCloseClickedTag}
			>
				<Group g={clickedTag} handleClose={handleCloseClickedTag}/>
			</Dialog>
		</>

	)
}

// GroupTable.propTypes = {
// 	openTable: PropTypes.bool.isRequired,
// 	setOpenTable: PropTypes.func.isRequired,
// }

export default GroupTable
