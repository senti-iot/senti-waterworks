import { AppBar, Dialog, Divider, IconButton, List, ListItem, ListItemText, Toolbar, Typography, Hidden, Tooltip } from '@material-ui/core'
import { Close } from 'variables/icons'
import cx from 'classnames'
import React, { Fragment, useState } from 'react'
import { ItemG, CircularLoader, SlideT } from 'Components'
import Search from 'Components/Search/Search'
import { filterItems, suggestionGen } from 'variables/functions/filters'
import TP from 'Components/Table/TP'
import { useLocalization, useSelector } from 'Hooks'
import { makeStyles } from '@material-ui/styles'

const assignStyles = makeStyles(theme => ({
	appBar: {
		position: 'sticky',
		backgroundColor: theme.header,
		boxShadow: "none",
		borderBottom: "0",
		marginBottom: "0",
		width: "100%",
		paddingTop: "10px",
		zIndex: "1029",
		color: "#ffffff",
		border: "0",
		// borderRadius: "3px",
		padding: "10px 0",
		transition: "all 150ms ease 0s",
		minHeight: "50px",
	},
	flex: {
		flex: 1,
	},
	selectedItem: {
		background: theme.palette.primary.main,
		"&:hover": {
			background: theme.hover
		}
		// color: "#fff"
	},
	selectedItemText: {
		color: "#FFF"
	}
}))


const AssignUser = props => {

	//Hooks
	const t = useLocalization()
	const classes = assignStyles()

	//Redux
	const users = useSelector(s => s.data.users)

	//State
	const [page, setPage] = useState(0)
	const [filters, setFilters] = useState({
		keyword: '',
		value: null,
		endDate: null,
		activeDateFilter: false
	})

	//Const
	const { open } = props
	const height = window.innerHeight
	const rows = Math.round((height - 85 - 49 - 49) / 49)
	const appBarClasses = cx({
		[' ' + classes['primary']]: 'primary'
	})

	//useCallbacks

	//useEffects

	//Handlers


	const assignSensor = sId => e => {
		let user = users[users.findIndex(o => o.uuid === sId)]
		// console.log('sId', sId)
		// console.log('U', user)
		// console.log('sId', sId)
		props.callBack(user)
	}
	const closeDialog = () => {
		props.handleClose(false)
	}
	const handleFilterKeyword = value => {
		setFilters({ ...filters, keyword: value })

	}
	const handleChangePage = (event, newpage) => {
		setPage(newpage)
	}

	return (
		<Dialog
			fullScreen
			open={open}
			TransitionComponent={SlideT}
		>
			<AppBar className={classes.appBar + appBarClasses}>
				<Toolbar>
					<Hidden smDown>
						<ItemG container alignItems={'center'}>
							<ItemG xs={3} container alignItems={'center'}>
								<Typography variant='h6' color='inherit' className={classes.flex}>
									{t('sidebar.users')}
								</Typography>
							</ItemG>
							<ItemG xs>
								<Search
									fullWidth
									open={true}
									focusOnMount
									suggestions={users ? suggestionGen(users) : []}
									handleFilterKeyword={handleFilterKeyword}
									searchValue={filters.keyword} />
							</ItemG>
							<ItemG xs={1}>
								<Tooltip title={t('actions.cancel')}>
									<IconButton color='inherit' onClick={closeDialog} aria-label='Close'>
										<Close />
									</IconButton>
								</Tooltip>
							</ItemG>
						</ItemG>
					</Hidden>
					<Hidden mdUp>
						<ItemG container alignItems={'center'}>
							<ItemG xs={12} container alignItems={'center'}>
								<IconButton color={'inherit'} onClick={closeDialog} aria-label='Close'>
									<Close />
								</IconButton>
								<Typography variant='h6' color='inherit' className={classes.flex}>
									{t('sidebar.users')}
								</Typography>
							</ItemG>
							<ItemG xs={12} container alignItems={'center'} justifyContent={'center'}>
								<Search
									noAbsolute
									fullWidth
									open={true}
									focusOnMount
									suggestions={users ? suggestionGen(users) : []}
									handleFilterKeyword={handleFilterKeyword}
									searchValue={filters.keyword} />
							</ItemG>
						</ItemG>
					</Hidden>
				</Toolbar>
			</AppBar>
			<List>
				{users ? filterItems(users, filters).slice(page * rows, page * rows + rows).map((p, i) => (
					<Fragment key={i}>
						<ListItem button onClick={assignSensor(p.uuid)} value={p.uuid}>
							<ListItemText primary={p.firstName + ' ' + p.lastName} />
						</ListItem>
						<Divider />
					</Fragment>
				)
				) : <CircularLoader />}
				<TP
					disableRowsPerPage
					count={users ? users.length : 0}
					page={page}
					t={t}
					handleChangePage={handleChangePage}
				/>
			</List>
		</Dialog>

	)
}


export default AssignUser