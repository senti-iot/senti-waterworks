import React, { Fragment, useState } from 'react'
import { Button, Collapse, Divider, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@material-ui/core'
import cx from 'classnames'
import sidebarStyles from 'Styles/sidebarStyles'
import { useLocalization } from 'Hooks'
import { NavLink } from 'react-router-dom'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { Muted, T } from 'Components'
import Gravatar from 'react-gravatar'
import Person from '@material-ui/icons/Person'
import SettingsRounded from '@material-ui/icons/SettingsRounded'
import { GoogleLogout } from 'react-google-login'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'
import { useHistory, useDispatch, useSelector } from 'Hooks'
import cookie from 'react-cookies'
import { logOut } from 'data/login'

const Sidebar = (props) => {
	//Hooks
	const classes = sidebarStyles()
	const t = useLocalization()
	const history = useHistory()
	const dispatch = useDispatch()
	//Redux
	const user = useSelector(state => state.settings.user)

	//State
	const [dropdown, setDropdown] = useState([])
	const [anchorProfile, setAnchorProfile] = useState(null)

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
	const handleProfileOpen = e => {
		setAnchorProfile(e.currentTarget)
	}
	const handleProfileClose = () => {
		setAnchorProfile(null)
		if (props.onClose)
			props.onClose()
	}
	const redux = {
		resetRedux: () => dispatch({ type: 'RESET_APP' })
	}
	const handleLogOut = async () => {
		try {
			await logOut().then(() => {
				cookie.remove('SESSION', { path: '/' })
				redux.resetRedux()
			})
		}
		catch (e) {
		}
		if (!cookie.load('SESSION')) {
			history.push('/login')
		}
		setAnchorProfile(null)
	}
	const handleSettingsOpen = () => {
		handleProfileClose()
		history.push(`/settings`)
	}
	const handleMyProfileOpen = () => {
		handleProfileClose()
		history.push(`/my-profile`)
	}

	const renderUserMenu = () => {
		const openProfile = Boolean(anchorProfile)

		return <>
			<Button
				aria-owns={openProfile ? 'menu-appbar' : null}
				aria-haspopup='true'
				onClick={handleProfileOpen}
				classes={{
					root: classes.iconRoot
				}}
			>
				<ExpandMore className={cx(classes.expand, {
					[classes.expandOpen]: openProfile,
				})} />
				{user ? <T style={{ color: '#fff', textTransform: 'none', margin: 8 }}>{`${user.firstName}`}</T> : <T style={{ color: '#fff', textTransform: 'none', margin: 8 }}>{`${'Not logged in'}`}</T>}
				{user ? user.img ? <img src={user.img} alt='UserProfile' className={classes.img} /> :
					<Gravatar default='mp' email={user.email} className={classes.img} size={36} /> :
					<Gravatar default='mp' email={''} className={classes.img} size={36} />}
			</Button>
			<Menu
				style={{ marginTop: 50 }}
				id='menu-appbar'
				anchorEl={anchorProfile}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={openProfile}
				onClose={handleProfileClose}
				disableAutoFocusItem
			>
				{user ?
					<MenuItem disableRipple component={'div'} className={classes.nameAndEmail}>
						<T style={{ fontSize: '1rem' }}>{`${user.firstName} ${user.lastName}`}</T>
						<Muted style={{ fontSize: '0.875rem' }}>{user.email}</Muted>
					</MenuItem>
					: null}
				<Divider />
				{/* <MenuItem onClick={handleRedirectToOwnProfile}>
					<AccountBox className={classes.leftIcon} />{t('menus.user.profile')}
				</MenuItem>
				{user ? user.privileges.apiorg.editusers ? <MenuItem onClick={handleRedirectToOwnOrg}>
					<Business className={classes.leftIcon} />{t('menus.user.account')}
				</MenuItem> : null : null} */}
				<MenuItem onClick={handleMyProfileOpen}>
					<Person className={classes.leftIcon} />{t('sidebar.myprofile')}
				</MenuItem>
				<MenuItem onClick={handleSettingsOpen}>
					<SettingsRounded className={classes.leftIcon} />{t('sidebar.settings')}
				</MenuItem>
				<GoogleLogout
					// onLogoutSuccess={() => logOut()}
					clientId="1038408973194-qcb30o8t7opc83k158irkdiar20l3t2a.apps.googleusercontent.com"
					render={renderProps => (<MenuItem onClick={() => { renderProps.onClick(); handleLogOut() }}>
						<PowerSettingsNew className={classes.leftIcon} />{t('menus.user.signout')}
					</MenuItem>)}
				>

				</GoogleLogout>
			</Menu>
		</>
	}

	return <Drawer
		// variant={"permanent"}
		className={cx(classes.drawer, {
			// [classes.drawerOpen]: open,
			// [classes.drawerPersClose]: pers && !open,
			// [classes.drawerClose]: !pers && !open,
		})}
		classes={{
			paper: cx({
				// [classes.drawerOpen]: open,
				// [classes.drawerPersClose]: pers && !open,
				// [classes.drawerClose]: !pers && !open,
				[classes.drawerPaper]: true,
			}),
		}}
		open={open}
		BackdropProps={{ invisible: true }}
		onClose={e => { console.log(e); handleCloseDrawer() }}
	>
		<Hidden smUp>
			{renderUserMenu()}
		</Hidden>
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