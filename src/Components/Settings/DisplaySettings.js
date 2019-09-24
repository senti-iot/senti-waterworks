import React from 'react'
import { InfoCard, ItemGrid, DSelect, CircularLoader } from 'Components';
import { Laptop } from 'variables/icons'
import { Grid, ListItem, List, ListItemText, /* Switch */ } from '@material-ui/core';
import { settingsStyles } from 'Styles/settingsStyle';
// import { connect } from 'react-redux'
// import {
// 	changeTRP, changeTheme, changeDrawerState, changeSideBarLoc, changeDiscoverSenti, changeMapTheme, changeDetailsPanel,
// 	changeSnackbarLocation, changeDrawerType, changeDrawerCloseOnNav, changeHeaderBorder, changeHoverTime, changeGlobalSearch, changeDashboardTheme
// } from 'redux/settings';
// import { changeLanguage } from 'redux/localization';

function DisplaySettings(props) {

	const changeLang = (e) => props.changeLanguage(e.target.value)
	const changeTRP = (e) => props.changeTRP(e.target.value)
	const changeTheme = (e) => props.changeTheme(e.target.value)
	// const changeDashboardTheme = (e) => props.changeDashboardTheme(e.target.value)
	// const changeSideBarLoc = (e) => props.changeSideBarLoc(e.target.value)
	// const changeMapTheme = e => props.changeMapTheme(e.target.value)
	const changeSnackbarLocation = e => props.changeSnackbarLocation(e.target.value)
	// const changeDetailsPanel = e => props.changeDetailsPanel(e.target.checked)
	// const changeDrawerType = e => props.changeDrawerType(e.target.value)
	// const changeDrawerState = e => props.changeDrawerState(e.target.checked)
	// const changeDrawerCloseOnNav = e => props.changeDrawerCloseOnNav(e.target.checked)
	// const changeHeaderBorder = e => props.changeHeaderBorder(e.target.checked)
	const changeHoverTime = e => props.changeHoverTime(e.target.value)
	// const changeGlobalSearch = e => props.changeGlobalSearch(e.target.checked)


	const { language, trp, sideBar, discSentiVal,
		theme, hoverTime, t, snackbarLocation } = props

	const classes = settingsStyles()

	let languages = [
		{ value: 'en', label: t('settings.languages.en') },
		{ value: 'da', label: t('settings.languages.da') }
	]

	// let mapThemes = [
	// 	{ value: 0, label: props.t("map.themes.0") },
	// 	{ value: 1, label: props.t("map.themes.1") },
	// 	{ value: 2, label: props.t("map.themes.2") },
	// 	{ value: 3, label: props.t("map.themes.3") },
	// 	{ value: 4, label: props.t("map.themes.4") },
	// 	{ value: 5, label: props.t("map.themes.5") },
	// 	{ value: 6, label: props.t("map.themes.6") },
	// 	{ value: 7, label: props.t("map.themes.7") }
	// ]

	let themes = [
		{ value: 1, label: t('settings.themes.dark') },
		{ value: 0, label: t('settings.themes.light') }
	]
	// rowsPerPageOptions: [autoheight, 5, 7, 8, 10, 15, 20, 25, 50, 100],
	let autoheightStr = Math.round((window.innerHeight - 70 - 48 - 30 - 64 - 56 - 30 - 56 - 30) / 49) + ' - auto'
	let autoheight = Math.round((window.innerHeight - 70 - 48 - 30 - 64 - 56 - 30 - 56 - 30) / 49)
	let trps = [
		{ value: autoheight, label: autoheightStr },
		{ value: 5, label: 5 },
		{ value: 7, label: 7 },
		{ value: 8, label: 8 },
		{ value: 10, label: 10 },
		{ value: 15, label: 15 },
		{ value: 20, label: 20 },
		{ value: 25, label: 25 },
		{ value: 50, label: 50 },
		{ value: 100, label: 100 }
	]

	let snackbarLocations = [
		{ value: 'left', label: t('settings.snackbarLocations.left') },
		{ value: 'right', label: t('settings.snackbarLocations.right') }
	]
	// let sideBarLocs = [
	// 	{ value: 0, label: t('settings.sideBarLeft') },
	// 	{ value: 1, label: t('settings.sideBarRight') }
	// ]
	// let drawerTypes = [
	// 	{ value: 'permanent', label: t('settings.drawer.types.permanent') },
	// 	{ value: 'persistent', label: t('settings.drawer.types.persistent') }
	// ]
	let hoverTimes = [
		{ value: 0, label: t('settings.hover.values.0') },
		{ value: 300, label: t('settings.hover.values.300') },
		{ value: 500, label: t('settings.hover.values.500') },
		{ value: 700, label: t('settings.hover.values.700') },
		{ value: 1000, label: t('settings.hover.values.1000') },
		{ value: 2000, label: t('settings.hover.values.2000') },
		{ value: 3000, label: t('settings.hover.values.3000') },
	]
	return (
		discSentiVal !== null && language !== null && trp !== null && sideBar !== null && theme !== null ?
			<InfoCard
				noExpand
				avatar={<Laptop />}
				title={t('settings.headers.display')}
				content={
					<Grid container>
						<List className={classes.list}>
							<ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText>{t('settings.language')}</ListItemText>
									<DSelect menuItems={languages} value={'da'} onChange={changeLang} />
								</ItemGrid>
							</ListItem>

							{/* <ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText secondary={t('settings.justForMobile')}>{t('settings.sideBarLoc')}</ListItemText>
									<DSelect menuItems={sideBarLocs} value={sideBar} onChange={changeSideBarLoc} />
								</ItemGrid>
							</ListItem> */}
							<ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText>{t('settings.theme')}</ListItemText>
									<DSelect menuItems={themes} value={theme} onChange={changeTheme} />
								</ItemGrid>
							</ListItem>

							{/* <ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText>{t('settings.map')}</ListItemText>
									<DSelect menuItems={mapThemes} value={mapTheme} onChange={changeMapTheme} />
								</ItemGrid>
							</ListItem> */}
							<ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText>{t('settings.snackbarLocation')}</ListItemText>
									<DSelect menuItems={snackbarLocations} value={snackbarLocation} onChange={changeSnackbarLocation} />
								</ItemGrid>
							</ListItem>

							<ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText>{t('settings.tables.trp')}</ListItemText>
									<DSelect menuItems={trps} value={trp} onChange={changeTRP} />
								</ItemGrid>
							</ListItem>
							<ListItem>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText primary={t('settings.tables.hover')} />
									<DSelect menuItems={hoverTimes} value={hoverTime} onChange={changeHoverTime} />
								</ItemGrid>
							</ListItem>
						</List>
					</Grid>
				}
			/> : <CircularLoader notCentered />
	)
}

// const mapStateToProps = state => {
// 	const s = state.settings
// 	return ({
// 		language: state.localization.language,
// 		theme: s.theme,
// 		trp: s.trp,
// 		sideBar: s.sideBar,
// 		discSentiVal: s.discSentiVal,
// 		mapTheme: s.mapTheme,
// 		snackbarLocation: s.snackbarLocation,
// 		detailsPanel: s.detailsPanel,
// 		drawer: s.drawer,
// 		drawerState: s.drawerState,
// 		drawerCloseOnNav: s.drawerCloseOnNav,
// 		headerBorder: s.headerBorder,
// 		hoverTime: s.hoverTime,
// 		globalSearch: s.globalSearch,
// 		dsTheme: s.dsTheme
// 	})
// }
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		changeDiscoverSenti: val => dispatch(changeDiscoverSenti(val)),
// 		changeLanguage: code => dispatch(changeLanguage(code)),
// 		changeTRP: nr => dispatch(changeTRP(nr)),
// 		changeTheme: t => dispatch(changeTheme(t)),
// 		changeSideBarLoc: loc => dispatch(changeSideBarLoc(loc)),
// 		changeMapTheme: t => dispatch(changeMapTheme(t)),
// 		changeSnackbarLocation: val => dispatch(changeSnackbarLocation(val)),
// 		changeDetailsPanel: val => dispatch(changeDetailsPanel(val)),
// 		changeDrawerType: val => dispatch(changeDrawerType(val)),
// 		changeDrawerState: val => dispatch(changeDrawerState(val)),
// 		changeDrawerCloseOnNav: val => dispatch(changeDrawerCloseOnNav(val)),
// 		changeHeaderBorder: val => dispatch(changeHeaderBorder(val)),
// 		changeHoverTime: val => dispatch(changeHoverTime(val)),
// 		changeGlobalSearch: val => dispatch(changeGlobalSearch(val)),
// 		changeDashboardTheme: val => dispatch(changeDashboardTheme(val))
// 	}
// }
export default DisplaySettings