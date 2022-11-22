import { Grid, Menu, MenuItem, Divider, Tooltip, Button, Hidden, /* Hidden */ } from '@material-ui/core'
import { /* AccountBox, Business, */ PowerSettingsNew, SettingsRounded, ExpandMore, KeyboardArrowRight, Person, /*  Person,  */Notifications, Devices } from 'variables/icons'
// import headerLinksStyle from 'assets/jss/material-dashboard-react/headerLinksStyle';
import React, { /* useEffect, */ useState } from 'react'
import cookie from 'react-cookies'
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
import Gravatar from 'react-gravatar'
import { logOut } from 'data/login'
// import moment from 'moment'
// import christmas from 'assets/img/christmas'
import { /* ItemG, */ T, Muted } from 'Components'
import { GoogleLogout } from 'react-google-login'
import cx from 'classnames'
import headerLinksStyle from 'Styles/headerLinksStyle'
import { useDispatch, useSelector } from 'Hooks'
import DeviceTable from 'Components/Custom/DevicesTable/DeviceTable'
import ItemG from 'Components/Containers/ItemG'
// import Dropdown from 'Components/Dropdown/Dropdown'
import DNotificationMenu from 'Components/Input/DNotificationMenu'
import { getAllNotifications } from 'Redux/data'
// import { useHistory } from 'react-router';
// import Search from 'components/Search/Search';
// import GlobalSearch from 'components/Search/GlobalSearch';


function HeaderLinks(props) {
	//Hooks
	const dispatch = useDispatch()
	const classes = headerLinksStyle()

	//Redux
	const user = useSelector(state => state.settings.user)
	const isSuperUser = useSelector(s => s.auth.isSuperUser)
	const isSWAdmin = useSelector(s => s.auth.privileges.indexOf('waterworks.admin') > -1 ? true : false)

	const selectedInstallations = useSelector(s => s.appState.selectedInstallations)
	const notifications = useSelector(s => s.data.notifications)

	const redux = {
		resetRedux: () => dispatch({ type: 'RESET_APP' })
	}

	//State
	const [anchorProfile, setAnchorProfile] = useState(null)
	const [openTable, setOpenTable] = useState(false)
	// const [stateNotf, setStateNotf] = useState([])
	//Const
	const { t, history } = props

	//useCallbacks
	//useEffects
	// useEffect(() => {
	// 	setStateNotf(notifications)

	// }, [notifications])
	//Handlers
	const handleOpenTable = () => setOpenTable(true)

	const handleProfileOpen = e => {
		setAnchorProfile(e.currentTarget)
	}
	const handleProfileClose = () => {
		setAnchorProfile(null)
		if (props.onClose)
			props.onClose()
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
	const handleGetNewNotifications = async (e) => {
		await dispatch(await getAllNotifications())
	}

	const renderNotifications = () => {
		return <ItemG container style={{ width: 'auto', alignItems: 'center', marginLeft: 8, marginRight: 8, }} onClick={handleGetNewNotifications}>
			<DNotificationMenu
				divider
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}

				icon={<Notifications style={{ color: '#fff' }}/>}
				menuItems={notifications}
				// menuItems={[{ value: 3, label: "Test" }]}
				// PaperProps={{ style: { marginTop: 50, minHeight: 300 } }}
			/>
		</ItemG>
	}

	const renderDeviceTable = () => {
		return <>
			<Button className={classes.selectDevButton} variant={'contained'} color={'secondary'} onClick={handleOpenTable}
				endIcon={<Hidden smDown>
					<KeyboardArrowRight />
				</Hidden>
				}>
				<Hidden smDown>
					{`${t('charts.selectedInstallations')}: ${selectedInstallations.length}`}
				</Hidden>
				<Hidden smUp>
					<ItemG container style={{ flexWrap: "noWrap" }} justifyContent="space-between">
						{selectedInstallations.length} <Devices style={{ marginLeft: 8 }}/>
					</ItemG>
				</Hidden>
			</Button>
			<DeviceTable openTable={openTable} setOpenTable={setOpenTable} />
		</>

	}
	const renderDeviceSelectMenu = () => {
		return isSuperUser || isSWAdmin ? <div>{renderDeviceTable()}</div> : null
	}
	const renderUserMenu = () => {
		const openProfile = Boolean(anchorProfile)

		return <Hidden smDown>

			<Tooltip title={t('menus.user.profile')}>

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
			</Tooltip>
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
		</Hidden>
	}
	let rsp = {
		xl: isSWAdmin ? 3 : 3,
		lg: isSWAdmin ? 4 : 3,
		md: isSWAdmin ? 5 : 3,
		xs: isSWAdmin ? 6 : 3,
	}
	return (
		<Grid item container xs={rsp.xs} md={rsp.md} lg={rsp.lg} xl={rsp.xl} justifyContent={'flex-end'} alignItems={'center'} classes={{ container: classes.headerMargin }}>
			{/* <ItemG>
					{renderChristmasIcon()}
				</ItemG> */}
			{/* <Hidden mdDown>
					{renderSearch()}
				</Hidden> */}
			<ItemG xs={5} lg={6}>
				{renderDeviceSelectMenu()}
			</ItemG>
			<ItemG xs={3} lg={1}>
				{renderNotifications()}
			</ItemG>
			<ItemG lg={3}>
				{renderUserMenu()}
			</ItemG>
		</Grid>
	)

}
// const mapStateToProps = (state) => ({
// 	user: state.settings.user,
// 	globalSearch: state.settings.globalSearch
// })

// const mapDispatchToProps = dispatch => ({
// 	resetRedux: () => dispatch({ type: "RESET_APP" })
// })

export default HeaderLinks
