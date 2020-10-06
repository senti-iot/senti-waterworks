import React, { Fragment, useState } from 'react'
import { Collapse, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core'
import cx from 'classnames'
import sidebarStyles from 'Styles/sidebarStyles'
import { useLocalization } from 'Hooks'
import { NavLink } from 'react-router-dom'

const Sidebar = (props) => {
	//Hooks
	const classes = sidebarStyles()
	const t = useLocalization()

	//Redux

	//State
	const [dropdown, setDropdown] = useState([])

	//Const
	const { open, routes, menuRoute, handleCloseDrawer } = props
	let pers = true
	//useCallbacks

	//useEffects

	//Handlers
	const isActiveRoute = (routeName) => menuRoute === routeName ? true : false

	const handleDropdown = e => key => {
		let nDropdown = [...dropdown]
		if (dropdown.indexOf(key) > -1) {
			nDropdown.splice(dropdown.indexOf(key), 1)
		}
		else {
			nDropdown.push(key)
		}
		setDropdown(nDropdown)
	}


	return <Drawer
		variant="permanent"
		className={cx(classes.drawer, {
			[classes.drawerOpen]: open,
			[classes.drawerPersClose]: pers && !open,
			[classes.drawerClose]: !pers && !open,
		})}
		classes={{
			paper: cx({
				[classes.drawerOpen]: open,
				[classes.drawerPersClose]: pers && !open,
				[classes.drawerClose]: !pers && !open,
				[classes.drawerPaper]: true,
			}),
		}}
		open={open}
	>
		<List style={{
			margin: '8px',
			paddingTop: 0,
		}}>
			{routes.map((route, index) => {
				if (route.divider) {
					return <Divider key={index} />
				}
				if (route.redirect) return null
				if (route.hideFromSideBar) return null
				if (route.dropdown) {
					return <Fragment key={index}>
						<Tooltip key={index}
							placement={'right'} title={!open ? t(route.sidebarName) : ''}>
							<ListItem
								button
								onClick={(e) => { handleDropdown(e)(route.menuRoute) }}
								to={route.path + (route.defaultView ? route.defaultView : '')}
								classes={{
									button: cx({
										[classes.buttonOpen]: open,
										[classes.buttonClose]: !open,
										[classes.buttonActiveRoute]: isActiveRoute(route.menuRoute),
										[classes.button]: true
									})
								}}>
								<ListItemIcon className={classes.whiteFont}><route.icon /></ListItemIcon>
								<ListItemText disableTypography={true} className={classes.whiteFont} primary={t(route.sidebarName)} />
							</ListItem>
						</Tooltip>
						<Collapse in={dropdown.indexOf(route.menuRoute) > -1 ? true : false} >
							<div style={{ height: 44 * route.items.length + 88 }}>
								{route.items.map((i, index) => <Tooltip key={index + i.menuRoute}
									placement={'right'} title={!open ? t(i.sidebarName) : ''}>
									<ListItem component={NavLink}
										button
										onClick={handleCloseDrawer}
										to={i.path + (i.defaultView ? i.defaultView : '')}
										classes={{
											button: cx({
												[classes.buttonOpen]: open,
												[classes.buttonClose]: !pers && !open,
												[classes.buttonActiveRoute]: isActiveRoute(i.menuRoute),
												[classes.button]: true,
												[classes.nested]: open
											})
										}}>
										<ListItemIcon className={classes.whiteFont}><i.icon /></ListItemIcon>
										<ListItemText disableTypography={true} className={classes.whiteFont} primary={t(i.sidebarName)} />
									</ListItem>
								</Tooltip>)}
							</div>
						</Collapse>
					</Fragment>
				}
				return <Tooltip key={index}
					placement={'right'} title={!open ? t(route.sidebarName) : ''}>
					<ListItem component={NavLink}
						button
						to={route.path + (route.defaultView ? route.defaultView : '')}
						onClick={handleCloseDrawer}
						classes={{
							button: cx({
								[classes.buttonOpen]: open,
								[classes.buttonClose]: !pers && !open,
								[classes.buttonActiveRoute]: isActiveRoute(route.menuRoute),
								[classes.button]: true
							})
						}}>
						<ListItemIcon className={classes.whiteFont}><route.icon /></ListItemIcon>
						<ListItemText disableTypography={true} className={classes.whiteFont} primary={t(route.sidebarName)} />
					</ListItem>
				</Tooltip>
			})}
		</List>
	</Drawer>

}

export default Sidebar