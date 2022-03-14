import { CircularLoader, GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import { Notifications as AlarmIco } from 'variables/icons'
import React, { useEffect, useState } from 'react'
import CreateAlarm from 'Components/Custom/Alarms/CreateAlarm'
import { Collapse, makeStyles, Toolbar } from '@material-ui/core'
import { useDispatch, useLocalization } from 'Hooks'
import { getAlarms } from 'Redux/data'
import AlarmsTable from 'Components/Custom/Alarms/AlarmsTable'
import { useSelector } from 'react-redux'
import FilterToolbar from 'Components/FilterToolbar/FilterToolbar'
import { closeCA } from 'Redux/appState'


const styles = makeStyles(theme => ({
	icon: {
		color: "#fff"
	},
	secondaryToolbar: {
		display: 'flex',
		height: "48px",
		padding: 0
	},

}))

const Alarms = () => {
	//Hooks
	const t = useLocalization()
	const classes = styles()
	const dispatch = useDispatch()
	//Redux
	const userUUID = useSelector(s => s.settings.user?.uuid)
	const tags = useSelector(s => s.tagManager.tags)
	const openTagFilter = useSelector(s => s.appState.openTagFilter)
	const openCreate = useSelector(s => s.appState.oca)
	//State
	const [loading, setLoading] = useState(true)


	//Const

	//useCallbacks

	//useEffects
	useEffect(() => {
		const getAlarm = async () => await dispatch(await getAlarms())
		// const getDeviceTags = async () => await dispatch(await getTags())
		const loadData = async () => {
			if (loading && userUUID) {
				await getAlarm()
			}
			setLoading(false)
		}
		loadData()
	}, [dispatch, loading, userUUID])
	//Handlers

	const handleCloseCreate = () => dispatch(closeCA())


	const renderMenu = () => {
		return null
		// return <DMenu
		// 	icon={<MoreVert className={classes.icon} />}
		// 	// onChange={handleOpenExport}
		// 	menuItems={[{
		// 		dontShow: false,
		// 		icon: <Add />,
		// 		label: t('menus.create.alarm'),
		// 		func: handleOpenCreate
		// 	}
		// 	]}
		// />
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
			value: t.name, label: t.name, icon: <div style={{ borderRadius: 4, background: t.color, width: 16, height: 16 }}></div>
		}))

	}
	const alarmFilters = [
		{ key: 'uuname', name: t('devices.fields.uuid'), type: 'string' },
		{ key: 'name', name: t('devices.fields.name'), type: 'string' },
		{ key: 'communication', name: t('devices.fields.status'), type: 'dropDown', options: dLiveStatus() },
		{ key: 'tags', name: t('devices.fields.tags'), type: 'dropDown', options: dTagList() },
		{ key: '', name: t('filters.freeText'), type: 'string', hidden: true },
	]

	//#endregion

	return (
		<>
			<Collapse in={openTagFilter}>
				<Toolbar className={classes.secondaryToolbar}>
					<FilterToolbar reduxKey={'alarms'} filters={alarmFilters}/>
				</Toolbar>
			</Collapse>
			<GridContainer>
				<ItemG xs={12}>
					<PageHeader
						label={'sidebar.alarms'}
						icon={AlarmIco}
						actions={renderMenu()}
					/>
				</ItemG>
				<ItemG xs={12}>
					<InfoCard
						noAvatar
						noHeader
						noExpand
						content={<>
							<CreateAlarm
								open={openCreate}
								handleClose={handleCloseCreate}
							/>
							{loading ? <CircularLoader fill /> : <AlarmsTable/>}
						</>}
					/>
				</ItemG>
			</GridContainer>
		</>
	)
}

export default Alarms
