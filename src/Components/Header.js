import React, { useState } from 'react'
import { AppBar, Toolbar, ButtonBase, IconButton, Button, Hidden } from '@material-ui/core'
import HeaderLinks from './HeaderLinks'
import headerStyles from 'Styles/headerStyle'
// import logo from 'logo.svg'
import logo from 'assets/senti.waterworks.svg'
import { useHistory, useLocation } from 'react-router'
import { useDispatch, useLocalization, useSelector } from 'Hooks'
import T from 'Components/Typography/T'
import { ItemG } from 'Components'
import {  Map, Menu, PageviewIcon, TuneIcon, Devices as DeviceIcon, Notifications } from 'variables/icons'
import Sidebar from 'Components/Custom/Sidebar/Sidebar'
import { routes } from 'Routes'
import {  changeOpenTagFilter, changeOpenTFilter } from 'Redux/appState'

function Header({ ...props }) {
	//Hooks
	const classes = headerStyles()
	const history = useHistory()
	const t = useLocalization()
	const dispatch = useDispatch()
	const isSWAdmin = useSelector(s => s.auth.privileges.indexOf('waterworks.admin') > -1 ? true : false)
	const location = useLocation()
	//Redux
	const org = useSelector(s => s.settings.user ? s.settings.user.org : {})
	const selectedInstallations = useSelector(s => s.appState.selectedInstallations)
	// const installations = useSelector(s => s.data.installations)

	//State
	const [menu, setMenu] = useState(false)

	//Const

	//useCallbacks

	//useEffects

	//Handlers


	const goHome = () => history.push('/')

	const handleSwitchMenu = () => setMenu(!menu)
	const handleCloseMenu = () => setMenu(false)
	const handleOpenTagFilter = () => {
		if (location.pathname === '/') {
			dispatch(changeOpenTFilter())

		 }
		else {

			dispatch(changeOpenTagFilter())
		}
	}

	var brand = (
		<ButtonBase
			focusRipple
			className={classes.image}
			focusVisibleClassName={classes.focusVisible}
			style={{
				width: '200px'
			}}
			onClick={goHome}
		// onClick={() => props.history.push(defaultRoute ? defaultRoute : '/')}
		>
			<span
				className={classes.imageSrc}
				style={{
					backgroundImage: `url(${logo})`
				}}
			/>
		</ButtonBase>
	)
	const renderMenu = () => {
		return <Sidebar
			open={menu}
			handleCloseDrawer={handleCloseMenu}
			routes={routes}
		/>
	}
	const renderAddress = () => {
		let installation = selectedInstallations[0]
		if (installation && installation.streetName) {
			return installation.streetName + ' ' + installation.streetNumber + ', ' + installation.zip + ' ' + installation.city
		}
		return null
	}
	return (
		<AppBar className={classes.appBar} >
			{renderMenu()}
			<Toolbar className={classes.container}>
				<ItemG>
					<IconButton
						className={classes.appResponsive}
						color='primary'
						aria-label='open drawer'
						onClick={handleSwitchMenu}
					>
						<Menu />
					</IconButton>
				</ItemG>
				<Hidden smDown>
					<ItemG xs={3}>
						<div className={classes.logoContainer}>
							{brand}
						</div>
					</ItemG>
				</Hidden>
				<ItemG xs container alignItems={'center'} justifyContent={'center'}>

					<T className={classes.title} variant={'h5'}>
						{`${org.name} `}
					</T>
					{selectedInstallations.length < 2 ? <>
						<Hidden mdDown>
							<T className={classes.title} variant={'h5'} style={{ margin: "0px 6px" }}>-</T>
						</Hidden>
						<T className={classes.title} variant={'h5'}>
							{renderAddress()}
						</T></>
						: null}

				</ItemG>

				<HeaderLinks t={t} history={history} />
			</Toolbar>
			<Toolbar className={classes.secondaryToolbar}>
				<ItemG container alignItems={'center'} justifyContent={'center'}>

					<ItemG xs={1} container >
						<Button
							startIcon={<PageviewIcon />}
							className={classes.toolbarButton}
							onClick={() => history.push('/')}
						>
							<Hidden smDown>
								{t('toolbar.overview')}
							</Hidden>

						</Button>
					</ItemG>
					<ItemG xs={1} container >
						<Button className={classes.toolbarButton} onClick={() => history.push('/installations')} startIcon={<DeviceIcon />}>
							<Hidden smDown>
								{t('sidebar.installations')}
							</Hidden>
						</Button>
					</ItemG>
					<ItemG xs={1} container >
						<Button
							startIcon={<Map />}
							className={classes.toolbarButton}
							onClick={() => { history.push('/device-map') }}>
							<Hidden smDown>
								{t('sidebar.deviceMap')}
							</Hidden>
						</Button>

					</ItemG>
					<ItemG xs={1} container >
						<Button
							startIcon={<Notifications />}
							className={classes.toolbarButton}
							onClick={() => history.push('/alarms')}
						>
							<Hidden smDown>
								{t('sidebar.alarms')}
							</Hidden>
						</Button>
					</ItemG>
					 <ItemG xs container alignItems={'center'} justifyContent={'flex-end'}>
						{isSWAdmin ? <IconButton
							onClick={handleOpenTagFilter}
							className={classes.toolbarButton}>
							<TuneIcon />
						</IconButton> : null}
					</ItemG>
				</ItemG>
			</Toolbar>
			{/* <Toolbar>
				Filter
			</Toolbar> */}
		</AppBar>

	)
}

export default Header
