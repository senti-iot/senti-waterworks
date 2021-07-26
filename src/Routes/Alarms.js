import { DMenu, GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import { Add, MoreVert, Notifications as AlarmIco } from 'variables/icons'
import React, { useState } from 'react'
import CreateAlarm from 'Components/Custom/Alarms/CreateAlarm'
import { makeStyles } from '@material-ui/core'
import { useLocalization } from 'Hooks'


const styles = makeStyles(theme => ({
	icon: {
		color: "#fff"
	}
}))

const Alarms = () => {
	//Hooks
	const t = useLocalization()
	const classes = styles()

	//Redux

	//State
	const [openCreate, setOpenCreate] = useState(false)


	//Const

	//useCallbacks

	//useEffects

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
					</>}
				/>
			</ItemG>
		</GridContainer>
	)
}

export default Alarms
