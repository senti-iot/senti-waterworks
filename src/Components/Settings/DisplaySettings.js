import React /* ,{ useRef } */ from 'react'
import { InfoCard, ItemGrid, DSelect, CircularLoader } from 'Components'
import { Laptop } from 'variables/icons'
import { Grid, ListItem, List, ListItemText, colors, /* InputAdornment */ /* Switch */ } from '@material-ui/core'
import { settingsStyles } from 'Styles/settingsStyle'
import { changeLanguage } from 'Redux/localization'
import { changeTheme, changeMeasureUnit, changeSnackbarLocation, changeHoverTime, changeTRP, changeColorTheme, changeBTags, /* changeMaxDailyConsumption */ } from 'Redux/settings'
import { useSelector, useDispatch } from 'react-redux'
import ItemG from 'Components/Containers/ItemG'
import { useLocalization } from 'Hooks'
// import TextF from 'Components/Input/TextF'
//ItemG
function DisplaySettings(props) {
	//Hooks
	const dispatch = useDispatch()
	const t = useLocalization()

	//Redux
	const lang = useSelector(state => state.localization.language)
	const settings = useSelector(state => state.settings)
	const benchmarkSplitByTags = useSelector(s => s.settings.benchmarkSplitByTags)


	// const rChangeMDC = val => {
	// 	dispatch(changeMaxDailyConsumption(val))
	// }

	//State

	//Const
	const { language, trp, sideBar, discSentiVal,
		theme, hoverTime, snackbarLocation,
		colorTheme, mUnit,
	} = settings

	// const inputRef = useRef(React.createRef())
	//useCallbacks

	//useEffects

	//Handlers

	const rChangeLanguage = e => dispatch(changeLanguage(e.target.value))
	const rChangeTRP = e => dispatch(changeTRP(e.target.value))
	const rChangeTheme = e => dispatch(changeTheme(e.target.value))
	const rChangeSnackbarLocation = e => dispatch(changeSnackbarLocation(e.target.value))
	const rChangeHoverTime = e => dispatch(changeHoverTime(e.target.value))
	const rChangeColorTheme = e => dispatch(changeColorTheme(e.target.value))
	const rChangeUnit = e => dispatch(changeMeasureUnit(e.target.value))
	const rChangeBTags = e => dispatch(changeBTags(e.target.value))



	const classes = settingsStyles()

	const measureUnits = [
		{ value: 'm3', label: 'm³' },
		{ value: 'l', label: 'L' }
	]

	const languages = [
		{ value: 'en', label: t('settings.languages.en') },
		{ value: 'da', label: t('settings.languages.da') }
	]

	const themes = [
		{ value: 1, label: t('settings.themes.dark') },
		{ value: 0, label: t('settings.themes.light') }
	]
	const renderColor = (color) => {
		return <div style={{ background: color[500], width: 16, height: 16, borderRadius: 4 }} />
	}

	const colorThemes = [
		// { value: 'lightBlue', label: t('settings.chart.weekendColors.lightBlue'), icon: renderColor(colors.lightBlue) },
		// { value: 'cyan', label: t('settings.chart.weekendColors.cyan'), icon: renderColor(colors.cyan) },
		// { value: 'teal', label: t('settings.chart.weekendColors.teal'), icon: renderColor(colors.teal) },
		// { value: 'green', label: t('settings.chart.weekendColors.green'), icon: renderColor(colors.green) },
		// { value: 'lightGreen', label: t('settings.chart.weekendColors.lightGreen'), icon: renderColor(colors.lightGreen) },
		// { value: 'lime', label: t('settings.chart.weekendColors.lime'), icon: renderColor(colors.lime) },
		// { value: 'yellow', label: t('settings.chart.weekendColors.yellow'), icon: renderColor(colors.yellow) },
		// { value: 'amber', label: t('settings.chart.weekendColors.amber'), icon: renderColor(colors.amber) },
		// { value: 'orange', label: t('settings.chart.weekendColors.orange'), icon: renderColor(colors.orange) },
		// { value: 'deepOrange', label: t('settings.chart.weekendColors.deepOrange'), icon: renderColor(colors.deepOrange) },
		// { value: 'red', label: t('settings.chart.weekendColors.red'), icon: renderColor(colors.red) },
		// { value: 'pink', label: t('settings.chart.weekendColors.pink'), icon: renderColor(colors.pink) },
		// { value: 'purple', label: t('settings.chart.weekendColors.purple'), icon: renderColor(colors.purple) },
		// { value: 'deepPurple', label: t('settings.chart.weekendColors.deepPurple'), icon: renderColor(colors.deepPurple) },
		// { value: 'indigo', label: t('settings.chart.weekendColors.indigo'), icon: renderColor(colors.indigo) },
		{ value: 'blue', label: t('settings.chart.weekendColors.blue'), icon: renderColor(colors.blue) },
	]

	// rowsPerPageOptions: [autoheight, 5, 7, 8, 10, 15, 20, 25, 50, 100],
	const autoheightStr = Math.round((window.innerHeight - 70 - 48 - 30 - 64 - 56 - 30 - 56 - 30) / 49) + ' - auto'
	const autoheight = Math.round((window.innerHeight - 70 - 48 - 30 - 64 - 56 - 30 - 56 - 30) / 49)
	const trps = [
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

	const snackbarLocations = [
		{ value: 'left', label: t('settings.snackbarLocations.left') },
		{ value: 'right', label: t('settings.snackbarLocations.right') }
	]
	const hoverTimes = [
		{ value: 0, label: t('settings.hover.values.0') },
		{ value: 300, label: t('settings.hover.values.300') },
		{ value: 500, label: t('settings.hover.values.500') },
		{ value: 700, label: t('settings.hover.values.700') },
		{ value: 1000, label: t('settings.hover.values.1000') },
		{ value: 2000, label: t('settings.hover.values.2000') },
		{ value: 3000, label: t('settings.hover.values.3000') },
	]
	const onOff = [
		{ value: 0, label: t('actions.off') },
		{ value: 1, label: t('actions.on') }
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
									<DSelect menuItems={languages} value={lang} onChange={rChangeLanguage} />
								</ItemGrid>
							</ListItem>
							<ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText>{t('settings.theme')}</ListItemText>
									<DSelect menuItems={themes} value={theme} onChange={rChangeTheme} />
								</ItemGrid>
							</ListItem>
							<ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText>{t('settings.colorTheme')}</ListItemText>
									<DSelect leftIcon menuItems={colorThemes} value={colorTheme} onChange={rChangeColorTheme} />
								</ItemGrid>
							</ListItem>
							<ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText>{t('settings.snackbarLocation')}</ListItemText>
									<DSelect menuItems={snackbarLocations} value={snackbarLocation} onChange={rChangeSnackbarLocation} />
								</ItemGrid>
							</ListItem>

							<ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText>{t('settings.tables.trp')}</ListItemText>
									<DSelect menuItems={trps} value={trp} onChange={rChangeTRP} />
								</ItemGrid>
							</ListItem>
							<ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText primary={t('settings.tables.hover')} />
									<DSelect menuItems={hoverTimes} value={hoverTime} onChange={rChangeHoverTime} />
								</ItemGrid>
							</ListItem>
							<ListItem divider>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText primary={t('settings.chart.mUnit')} />
									<DSelect menuItems={measureUnits} value={mUnit} onChange={rChangeUnit} />
								</ItemGrid>
							</ListItem>
							<ListItem>
								<ItemG container alignItems={'center'}>
									<ListItemText primary={t('settings.chart.splitBenchmarkByTags')} secondary={t('settings.chart.splitBenchmarkByTagsWarn', { type: 'markdown' })} />
									<DSelect menuItems={onOff} value={benchmarkSplitByTags} onChange={rChangeBTags}/>
								</ItemG>
							</ListItem>
							{/* <ListItem>
								<ItemGrid container zeroMargin noPadding alignItems={'center'}>
									<ListItemText primary={t('settings.chart.maxDailyConsumption')} />
									<TextF
										// value={maxDailyConsumption}
										defaultValue={maxDailyConsumption}
										// onChange={rChangeMDC}
										inputRef={inputRef}
										InputProps={{
											// ref: inputRef,
											onBlur: () => {
												rChangeMDC(inputRef.current.value)
											},
											onKeyDown: e => {
												if (e.key === 'Enter') {
													// rChangeMDC(inputRef.current.value)
													inputRef.current.blur()
												}
											},
											endAdornment: <InputAdornment position={'end'} > L</InputAdornment>
										}}
									/>
								</ItemGrid>
							</ListItem> */}
						</List>
					</Grid>
				}
			/>
			: <CircularLoader notCentered />
	)
}

export default DisplaySettings