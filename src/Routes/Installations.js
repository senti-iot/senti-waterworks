import { DMenu, GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import { Add, Devices as DeviceIcon, MoreVert } from 'variables/icons'
import React, { useState } from 'react'
import InstallationTable from 'Components/Custom/InstallationsTable/InstallationTable'
import { useLocalization } from 'Hooks'
import { makeStyles } from '@material-ui/core'
import CreateInstallation from 'Components/Custom/InstallationsTable/CreateInstallation'
import EditInstallation from 'Components/Custom/InstallationsTable/EditInstallation'

const styles = makeStyles(theme => ({
	icon: {
		color: "#fff"
	}
}))

const Installations = () => {
	//Hooks
	const t = useLocalization()
	const classes = styles()
	//Redux

	//State
	const [openCreate, setOpenCreate] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)
	const [editInstUUID, setEditInstUUID] = useState(false)
	//Const

	//useCallbacks

	//useEffects

	//Handlers
	const handleOpenCreate = () => setOpenCreate(true)
	const handleCloseCreate = () => setOpenCreate(false)

	const handleOpenEdit = (uuid) => {
		setEditInstUUID(uuid)
		setOpenEdit(true)
	}
	const handleCloseEdit = () => {
		setEditInstUUID(null)
		setOpenEdit(false)
	}


	const renderMenu = () => {
		return <DMenu
			icon={<MoreVert className={classes.icon} />}
			// onChange={handleOpenExport}
			menuItems={[{
				dontShow: false,
				icon: <Add />,
				label: t('menus.create.installation'),
				func: handleOpenCreate
			}
			]}
		/>
	}
	return (
		<GridContainer>
			<ItemG xs={12}>
				<PageHeader
					label={'sidebar.installations'}
					icon={DeviceIcon}
					actions={renderMenu()}
				/>
			</ItemG>
			<ItemG xs={12}>
				<InfoCard
					noAvatar
					noHeader
					noExpand
					content={<>
						<CreateInstallation
							open={openCreate}
							handleClose={handleCloseCreate}
						/>
						<EditInstallation
							open={openEdit}
							instUUID={editInstUUID}
							handleClose={handleCloseEdit}
						/>
						<InstallationTable
							handleOpenEdit={handleOpenEdit}
						/>
					</>

					}
				/>
			</ItemG>
		</GridContainer>
	)
}

export default Installations
