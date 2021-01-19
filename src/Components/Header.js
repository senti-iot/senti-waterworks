import React, { useState } from 'react'
import { AppBar, Toolbar, ButtonBase, IconButton, Button } from '@material-ui/core'
import HeaderLinks from './HeaderLinks'
import headerStyles from 'Styles/headerStyle'
// import logo from 'logo.svg'
import logo from 'assets/senti.waterworks.svg'
import { useHistory } from 'react-router'
import { useDispatch, useLocalization, useSelector } from 'Hooks'
import T from 'Components/Typography/T'
import { ItemG } from 'Components'
import { Menu, PageviewIcon, TuneIcon } from 'variables/icons'
import Sidebar from 'Components/Custom/Sidebar/Sidebar'
import { routes } from 'Routes'
import { changeOpenTagFilter } from 'Redux/appState'

function Header({ ...props }) {
	//Hooks
	const classes = headerStyles()
	const history = useHistory()
	const t = useLocalization()
	const dispatch = useDispatch()
	//Redux
	const org = useSelector(s => s.settings.user ? s.settings.user.org : {})

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
		dispatch(changeOpenTagFilter())
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
				<ItemG xs={3}>
					<div className={classes.logoContainer}>
						{brand}
					</div>
				</ItemG>
				<ItemG xs container alignItems={'center'} justify={'center'}>

					<T className={classes.title} variant={'h5'}>
						{org.name}
					</T>
				</ItemG>

				<HeaderLinks t={t} history={history} />
			</Toolbar>
			<Toolbar className={classes.secondaryToolbar}>
				<ItemG container>

					<ItemG xs={1} container alignItems={'center'} justify={'center'}>
						<Button
							startIcon={<PageviewIcon />}
							className={classes.toolbarButton}
							onClick={() => history.push('/')}
						>
							{t('toolbar.overview')}

						</Button>
					</ItemG>
					<ItemG xs container alignItems={'center'} justify={'flex-end'}>
						<IconButton
							onClick={handleOpenTagFilter}
							className={classes.toolbarButton}>
							<TuneIcon />
						</IconButton>
					</ItemG>
				</ItemG>
			</Toolbar>
		</AppBar>

	)
}

export default Header
