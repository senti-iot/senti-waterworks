import React, { Fragment, useEffect } from 'react'
// import PropTypes from 'prop-types'
import CTable from 'Components/Table/Table'
import TC from 'Components/Table/TC'
import { useSelector, useLocalization, useState, useDispatch } from 'Hooks'
import { getAdminDevices, getAdminInstallations, sortData as rSortData } from 'Redux/data'
import FilterToolbar from 'Components/FilterToolbar/FilterToolbar'
import { customFilterItems } from 'variables/functions/filters'
import { Chip, Tooltip } from '@material-ui/core'
// import InstallationToolbar from 'Components/Custom/InstallationsTable/InstallationToolbar'
import { getTags } from 'Redux/tagManager'
import { contrastColor } from 'data/functions'



const FullInstallationTable = (props) => {
	//Hooks
	const dispatch = useDispatch()
	const t = useLocalization()

	//Redux
	const installations = useSelector(s => s.data.installations)
	const tags = useSelector(s => s.tagManager.tags)
	const filters = useSelector(s => s.appState.filters.installations)

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
		const getInstallations = async () => await dispatch(await getAdminInstallations())
		// const getInstallationTags = async () => await dispatch(await getTags())
		const loadData = async () => {
			if (installations.length === 0 && loading) {
				await getInstallations()
				await getDevices()
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
		if (!s)
			setSelDev(newSInstallations)
		else
			setSelDev(customFilterItems(installations, filters).map(d => d.uuid))
	}
	//#region  Filters
	const dLiveStatus = () => {
		return [
			{ value: 0, label: t("installations.fields.state.inactive") },
			{ value: 1, label: t("installations.fields.state.active") },
		]
	}
	const dTagList = () => {
		return tags.map(t => ({
			value: t.name, label: t.name, icon: <div style={{ borderRadius: 4, background: t.color, width: 16, height: 16 }}></div> }))

	}
	const installationFilters = [
		{ key: 'name', name: t('installations.fields.name'), type: 'string' },
		{ key: 'address', name: t('installations.fields.address'), type: 'string' },
		{ key: 'communication', name: t('installations.fields.status'), type: 'dropDown', options: dLiveStatus() },
		{ key: '', name: t('installations.fields.tags'), type: 'dropDown', options: dTagList() },
		{ key: '', name: t('filters.freeText'), type: 'string', hidden: true },
	]

	//#endregion
	const columns = [
		// { id: 'address', label: t('installations.fields.address') },
		{ id: 'uuid', label: t('installations.fields.uuid') },
		{ id: 'name', label: t('installations.fields.name') },
		// { id: 'id', label: t('installations.fields.id') },
		// { id: 'type', label: t('installations.fields.type') },
		// { id: 'group', label: t('installations.fields.group') },
		{ id: 'communication', label: t('installations.fields.status') },
		{ id: 'tags', label: t('installations.fields.tags') }
	]
	// const renderTags = installation => {
	// 	return installation.tags?.map((t, i) => (<Tooltip key={i} title={t.description}>
	// 		<Chip label={t.name} style={{ background: t.color, marginRight: 4, color: t.color ? contrastColor(t.color) : "#fff" }}/>
	// 	</Tooltip>
	// 	))
	// }
	const bodyStructure = row => {
		return <Fragment key={row.id}>
			<TC label={row.address} />
			<TC label={row.uuid} />
			<TC label={row.deviceUUID} />
			<TC label={row.operation} />
			<TC label={row.moving} />
			<TC label={row.state} />
		</Fragment>
	}
	return (

		<>

			{/* {selDev.length > 0 ? <InstallationToolbar installations={selDev}/> : <FilterToolbar reduxKey={'installations'} filters={installationFilters} />} */}

			<CTable
				order={order}
				orderBy={orderBy}
				sortKey={'installations'}
				body={customFilterItems(installations, filters)}
				bodyStructure={bodyStructure}
				mobile
				bodyMobileStructure={() => { }}
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
