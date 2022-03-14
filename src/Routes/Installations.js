import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import { Devices as DeviceIcon } from 'variables/icons'
import React, { Fragment, useState } from 'react'
import InstallationTable from 'Components/Custom/InstallationsTable/InstallationTable'
import { useLocalization } from 'Hooks'
import { Collapse, Toolbar } from '@material-ui/core'
import CreateInstallation from 'Components/Custom/InstallationsTable/CreateInstallation'
import EditInstallation from 'Components/Custom/InstallationsTable/EditInstallation'
import { useDispatch, useSelector } from 'react-redux'
import FilterToolbar from 'Components/FilterToolbar/FilterToolbar'
import { closeCI } from 'Redux/appState'
import cx from 'classnames'
import { makeStyles } from '@material-ui/styles'

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

const Installations = () => {
	//Hooks
	const t = useLocalization()
	const classes = styles()
	const dispatch = useDispatch()
	//Redux
	// const isSWAdmin = useSelector(s => s.auth.privileges.indexOf('waterworks.admin') > -1 ? true : false)
	const oci = useSelector(s => s.appState.oci)
	const openTagFilter = useSelector(s => s.appState.openTagFilter)
	//State
	const [openEdit, setOpenEdit] = useState(false)
	const [editInstUUID, setEditInstUUID] = useState(false)

	//Const

	//useCallbacks

	//useEffects

	//Handlers
	const handleCloseCreate = () => dispatch(closeCI())

	const handleOpenEdit = (uuid) => {
		setEditInstUUID(uuid)
		setOpenEdit(true)
	}
	const handleCloseEdit = () => {
		setEditInstUUID(null)
		setOpenEdit(false)
	}


	const renderMenu = () => {
		return null /* isSWAdmin ? <DMenu
			icon={<MoreVert className={classes.icon} />}
			// onChange={handleOpenExport}
			menuItems={[{
				dontShow: false,
				icon: <Add />,
				label: t('menus.create.installation'),
				func: handleOpenCreate
			}
			]}
		/> : */
	}
	const dOperation = () => {
		return [
			{ value: 0, label: t("installations.operations.inactive") },
			{ value: 1, label: t("installations.operations.active") },
		]
	}
	const dState = () => {
		return [
			{ value: 0, label: t("installations.states.provisioned") },
			{ value: 1, label: t("installations.states.onboarded") }
		]
	}
	const installationFilters = [
		{ key: 'streetName', name: t('installations.fields.streetName'), type: 'string' },
		{ key: 'zip', name: t('installations.fields.zip'), type: 'string' },
		{ key: 'city', name: t('installations.fields.city'), type: 'string' },
		{ key: 'state', name: t('installations.fields.state'), type: 'dropDown', options: dState() },
		{ key: 'operation', name: t('installations.fields.operation'), type: 'dropDown', options: dOperation() },
		// { key: '', name: t('installations.fields.tags'), type: 'dropDown', options: dTagList() },
		{ key: '', name: t('filters.freeText'), type: 'string', hidden: true },
	]
	const toolbarCX = cx({
		[classes.secondaryToolbar]: true,
	})

	return (
		<>
			<Collapse in={openTagFilter}>
				<Toolbar className={toolbarCX}>
					<FilterToolbar reduxKey={'installations'} filters={installationFilters} />
				</Toolbar>
			</Collapse>
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
								open={oci}
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
		</>
	)
}

export default Installations
