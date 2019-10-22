import { Grid, Menu, MenuItem, Divider, Tooltip, Button, /* Hidden */ } from '@material-ui/core';
import { AccountBox, Business, PowerSettingsNew, SettingsRounded, ExpandMore, /* Notifications */ } from 'variables/icons';
// import headerLinksStyle from 'assets/jss/material-dashboard-react/headerLinksStyle';
import React, { useState } from 'react';
import cookie from 'react-cookies';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
import Gravatar from 'react-gravatar'
import { logOut } from 'data/login';
// import moment from 'moment'
// import christmas from 'assets/img/christmas'
import { /* ItemG, */ T, Muted } from 'Components';
import { GoogleLogout } from 'react-google-login';
import cx from 'classnames'
import headerLinksStyle from 'Styles/headerLinksStyle';
import { useDispatch, useSelector } from 'Hooks';
// import { useHistory } from 'react-router';
// import Search from 'components/Search/Search';
// import GlobalSearch from 'components/Search/GlobalSearch';


function HeaderLinks(props) {

	const [anchorProfile, setAnchorProfile] = useState(null)
	const history = props.history
	const dispatch = useDispatch()
	const redux = {
		resetRedux: () => dispatch({ type: 'RESET_APP' })
	}
	const user = useSelector(state => state.settings.user)
	// const globalSearch = useSelector(state => state.settings.globalSearch)



	const handleProfileOpen = e => {
		setAnchorProfile(e.currentTarget)
	}
	const handleProfileClose = () => {
		setAnchorProfile(null)
		if (props.onClose)
			props.onClose()
	}
	// const handleRedirectToChristmas = () => {
	// 	props.history.push(`/holiday`)
	// }
	const classes = headerLinksStyle()

	const handleRedirectToOwnProfile = () => {
		handleProfileClose()
		// if (user)
		// history.push(`/management/user/${user.id}`)

	}
	const handleRedirectToOwnOrg = () => {
		handleProfileClose()
		// if (user)
		// history.push(`/management/org/${user.org.id}`)
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
		// if (user)
		// props.history.push(`/settings`)
	}
	// renderChristmasIcon = () => {
	// 	const { classes } = props
	// 	if (moment().format('MM') === '12') {
	// 		let today = moment().format('DD')
	// 		return today
	// 	}
	// 	else
	// 	{
	// 		if (moment().format('MM') === '11') {
	// 			return <IconButton onClick={handleRedirectToChristmas}>
	// 				<img src={christmas[0]} className={classes.img} alt={'christmas'} />
	// 			</IconButton>
	// 		}
	// 		return null
	// 	}

	// }
	// renderSearch = () => {
	// 	const { globalSearch } = props
	// 	return null
	// 	// return globalSearch ? <GlobalSearch /> : null
	// }
	// renderNotifications = () => {
	// 	return <ItemG container style={{ width: 'auto', alignItems: 'center', marginLeft: 8, marginRight: 8, }}>
	// 		<Notifications />
	// 	</ItemG>
	// }
	const renderUserMenu = () => {
		const { t } = props;
		const openProfile = Boolean(anchorProfile)

		return <div>
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
					{user ? user.img ? <img src={user.img} alt='UserProfile' className={classes.img} /> : <Gravatar default='mp' email={user.email} className={classes.img} size={36} /> : <Gravatar default='mp' email={null} className={classes.img} size={36} />}
					{/* <Gravatar default='mp' email={''} className={classes.img} size={36} /> */}
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
				<MenuItem onClick={handleRedirectToOwnProfile}>
					<AccountBox className={classes.leftIcon} />{t('menus.user.profile')}
				</MenuItem>
				{user ? user.privileges.apiorg.editusers ? <MenuItem onClick={handleRedirectToOwnOrg}>
					<Business className={classes.leftIcon} />{t('menus.user.account')}
				</MenuItem> : null : null}
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
		</div>
	}

	// const { classes } = props;
	return (
		<Grid container justify={'center'} classes={{ container: classes.headerMargin }}>
			{/* <ItemG>
					{renderChristmasIcon()}
				</ItemG> */}
			{/* <Hidden mdDown>
					{renderSearch()}
				</Hidden> */}
			{renderUserMenu()}
			{/* {renderNotifications()} */}
		</Grid>
	);

}
// const mapStateToProps = (state) => ({
// 	user: state.settings.user,
// 	globalSearch: state.settings.globalSearch
// })

// const mapDispatchToProps = dispatch => ({
// 	resetRedux: () => dispatch({ type: "RESET_APP" })
// })

export default HeaderLinks
