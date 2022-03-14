import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import { GroupWorkIcon } from 'variables/icons'
import React from 'react'
import GroupTable from 'Components/Custom/Groups/GroupTable'
import { makeStyles } from '@material-ui/styles'
import { useLocalization } from 'Hooks'
import { Collapse, Toolbar } from '@material-ui/core'
import FilterToolbar from 'Components/FilterToolbar/FilterToolbar'
import { useSelector } from 'react-redux'


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


const Groups = () => {
	//Hooks
	const t = useLocalization()
	const classes = styles()

	//Redux
	const openTagFilter = useSelector(s => s.appState.openTagFilter)

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	//#region  Filters

	const groupFilters = [
		{ key: 'name', name: t('devices.fields.name'), type: 'string' },
		{ key: 'address', name: t('devices.fields.address'), type: 'string' },
		{ key: '', name: t('filters.freeText'), type: 'string', hidden: true },
	]

	//#endregion

	return (
		<>
			<Collapse in={openTagFilter}>
				<Toolbar className={classes.secondaryToolbar}>
					<FilterToolbar reduxKey={'groups'} filters={groupFilters} />
				</Toolbar>
			</Collapse>
			<GridContainer>
				<ItemG xs={12}>
					<PageHeader
						label={'sidebar.groups'}
						icon={GroupWorkIcon}

					/>
				</ItemG>
				<ItemG xs={12}>
					<InfoCard
						noAvatar
						noHeader
						noExpand
						content={<GroupTable />}
					/>
				</ItemG>
			</GridContainer>
		</>

	)
}

export default Groups
