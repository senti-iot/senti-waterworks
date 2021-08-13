import { CircularLoader, DMenu, GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import { Add, MoreVert, Notifications as AlarmIco } from 'variables/icons'
import React, { useEffect, useState } from 'react'
import CreateAlarm from 'Components/Custom/Alarms/CreateAlarm'
import { makeStyles } from '@material-ui/core'
import { useDispatch, useLocalization } from 'Hooks'
import { getAlarm } from 'Redux/data'
import Alarm from 'Components/Custom/Alarms/Alarm'
import { useParams } from 'react-router'


const styles = makeStyles(theme => ({
	icon: {
		color: "#fff"
	}
}))

const AlarmRoute = () => {
	//Hooks
	const t = useLocalization()
	const classes = styles()
	const dispatch = useDispatch()
	const params = useParams()
	//Redux

	//State
	const [loading, setLoading] = useState(true)
	const [openCreate, setOpenCreate] = useState(false)


	//Const

	//useCallbacks

	//useEffects
	useEffect(() => {
		const gAlarm = async (uuid) => await dispatch(await getAlarm(uuid))
		// const getDeviceTags = async () => await dispatch(await getTags())
		const loadData = async () => {
			if (loading) {
				await gAlarm(params.uuid)
			}
			setLoading(false)
		}
		loadData()
		//eslint-disable-next-line
	}, [])
	//Handlers
	const handleOpenCreate = () => setOpenCreate(true)
	const handleCloseCreate = () => setOpenCreate(false)

	const renderMenu = () => {
		return <DMenu
			icon={<MoreVert className={classes.icon} />}
			// onChange={handleOpenExport}
			menuItems={[{
				dontShow: false,
				icon: <Add />,
				label: t('menus.create.alarm'),
				func: handleOpenCreate
			}
			]}
		/>
	}

	return (
		<GridContainer>
			<ItemG xs={12}>
				<PageHeader
					label={'sidebar.alarm'}
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
						{loading ? <CircularLoader fill /> : <Alarm />}
					</>}
				/>
			</ItemG>
		</GridContainer>
	)
}

export default AlarmRoute
