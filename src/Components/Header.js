import React from 'react'
import { AppBar, Button, Hidden, Toolbar, ButtonBase } from '@material-ui/core'
import HeaderLinks from './HeaderLinks'
import headerStyles from 'Styles/headerStyle'
// import logo from 'logo.svg'
import logo from 'assets/senti.waterworks.svg'
import { useHistory } from 'react-router'
import { useLocalization } from 'Hooks'

function Header({ ...props }) {
	const classes = headerStyles()
	const history = useHistory()
	const t = useLocalization()

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
				{/* <Hidden mdDown> */}
				<div className={classes.logoContainer}>
					{brand}
				</div>
				{/* </Hidden> */}
				<div className={classes.flex}>
					<Button className={classes.title}>
						{props.title ? t(props.title, props.title.options) ? t(props.title, props.title.options) : props.title : ''}
					</Button>
				</div>
				<Hidden mdDown implementation='css'>
					<HeaderLinks t={t} history={history} />
				</Hidden>
			</Toolbar>
		</AppBar>
	)
}

export default Header
