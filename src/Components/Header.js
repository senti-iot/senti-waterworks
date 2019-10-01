import { AppBar, Button, Hidden, Toolbar, ButtonBase } from '@material-ui/core';
import React, { useContext } from 'react';
import HeaderLinks from './HeaderLinks';
import headerStyles from 'Styles/headerStyle';
import logo from 'logo.svg'
import { TProvider } from './Providers/LocalizationProvider';
import { useHistory } from 'react-router'

function Header({ ...props }) {
	const classes = headerStyles()
	const t = useContext(TProvider)
	const history = useHistory()
	// const navigateHome = () => navigate('/')
	const goHome = () => history.push('/')
	var brand = (
		<ButtonBase
			focusRipple
			className={classes.image}
			focusVisibleClassName={classes.focusVisible}
			style={{
				width: '120px'
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
	);

	return (
		<AppBar className={classes.appBar} >
			<Toolbar className={classes.container}>
				<Hidden mdDown>
					<div className={classes.logoContainer}>
						{brand}
					</div>
				</Hidden>
				<div className={classes.flex}>
					<Button className={classes.title}>
						{props.title ? t(props.title, props.title.options) ? t(props.title, props.title.options) : props.title : ''}
					</Button>
				</div>
				<Hidden mdDown implementation='css'>
					<HeaderLinks t={t} />
				</Hidden>
			</Toolbar>
		</AppBar>
	);
}

export default Header
