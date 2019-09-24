import { AppBar, Button, Hidden, IconButton, Toolbar, /* withStyles, */ /* Link, */ ButtonBase } from '@material-ui/core';
import { KeyboardArrowLeft, Menu } from 'variables/icons';
// import headerStyle from 'assets/jss/material-dashboard-react/headerStyle.js';
import PropTypes from 'prop-types';
import React, { Fragment, useContext } from 'react';
import HeaderLinks from './HeaderLinks';
import headerStyles from './Custom/Styles/headerStyle';
import logo from 'logo.svg'
import { LocalizationProvider } from 'App';
// import { connect } from 'react-redux'
// import { changeSmallMenu } from 'redux/appState';
// import GlobalSearch from 'components/Search/GlobalSearch';


function Header({ ...props }) {
	const { headerBorder, menuPos } = props;
	const classes = headerStyles()
	const t = useContext(LocalizationProvider)
	var brand = (
		<ButtonBase
			focusRipple
			className={classes.image}
			focusVisibleClassName={classes.focusVisible}
			style={{
				width: '120px'
			}}
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
	// const renderSearch = () => {
	// 	const { globalSearch } = props
	// 	return globalSearch ? <GlobalSearch /> : null
	// }
	// const changeSmallMenu = () => props.changeSmallMenu(!props.smallMenu)
	return (
		<AppBar className={classes.appBar} >

			<Toolbar className={classes.container}>
				{/* {!menuPos ? <Hidden lgUp>
					<IconButton
						className={classes.appResponsive}
						color='primary'
						aria-label='open drawer'
						onClick={props.handleDrawerToggle}
					>
						<Menu />
					</IconButton>
				</Hidden> : null
				} */}
				<Hidden mdDown>
					{/* <IconButton onClick={changeSmallMenu} className={classes.drawerButton}>
						<Menu />
					</IconButton> */}
					<div className={classes.logoContainer}>
						{brand}
					</div>
					{headerBorder && <div style={{ height: 'calc(100% - 30%)', width: 1, background: '#555555' }} />}
				</Hidden>
				<div className={classes.flex}>
					{/* {goBackButton && <IconButton onClick={gbbFunc} variant={'fab'} className={classes.goBackButton}>
						<KeyboardArrowLeft width={40} height={40} />
					</IconButton>} */}
					<Button className={classes.title}>
						{props.headerTitle ? t(props.headerTitle.id, props.headerTitle.options) ? t(props.headerTitle.id, props.headerTitle.options) : props.headerTitle.id : ''}
					</Button>
				</div>
				<Hidden mdDown implementation='css'>
					<HeaderLinks t={t} />
				</Hidden>
				<Hidden lgUp>
					{menuPos ?
						<Fragment>
							{/* {renderSearch()} */}
							<IconButton
								className={classes.appResponsive}
								color='primary'
								aria-label='open drawer'
								onClick={props.handleDrawerToggle}
							>
								<Menu />
							</IconButton>
						</Fragment>
						: null /* renderSearch() */
					}</Hidden>
			</Toolbar>
		</AppBar>
	);
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger'])
};
// const mapStateToProps = (state) => ({
// 	smallMenu: state.appState.smallMenu,
// 	headerBorder: state.settings.headerBorder,
// 	menuPos: state.settings.sideBar,
// 	globalSearch: state.settings.globalSearch
// })

// const mapDispatchToProps = dispatch => ({
// 	changeSmallMenu: smallMenu => dispatch(changeSmallMenu(smallMenu))
// })

export default Header
// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(headerStyle)(Header))
