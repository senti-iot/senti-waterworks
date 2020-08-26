import React from 'react'
import { AppBar, Toolbar, ButtonBase } from '@material-ui/core'
import HeaderLinks from './HeaderLinks'
import headerStyles from 'Styles/headerStyle'
// import logo from 'logo.svg'
import logo from 'assets/senti.waterworks.svg'
import { useHistory } from 'react-router'
import { useLocalization, useSelector } from 'Hooks'
import T from 'Components/Typography/T'
import { ItemG } from 'Components'

function Header({ ...props }) {
	const classes = headerStyles()
	const history = useHistory()
	const t = useLocalization()
	const org = useSelector(s => s.settings.user ? s.settings.user.org : {})

	const goHome = () => history.push('/')

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

	return (
		<AppBar className={classes.appBar} >
			<Toolbar className={classes.container}>
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
		</AppBar>
	)
}

export default Header
