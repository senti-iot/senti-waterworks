import cookie from 'react-cookies'
import 'moment/locale/da'
import 'moment/locale/en-gb'
import { saveSettings, getValidSession, getAuthUser, saveInternal } from 'data/login'
// import { setDates } from './dateTime';
import { setPrefix, set } from 'data/storage'
import { setAccessLevel } from 'Redux/auth'
// import { getAllData } from './data';
// import { setDashboards } from './dsSystem';
// require("moment/min/locales.min")
import moment from 'moment'

// window.moment = moment
const acceptCookies = 'acceptCookies'

const autoRowsPerPage = 'autoRowsPerPage'

//Display
const MENULOC = 'sidebarLocation'
const changeLangAction = 'changeLanguage'
const THEME = 'theme'
const TRP = 'tableRowsPerPage'
const DISCSENT = 'discoverSentiBanner'
const DidKnow = 'notifDidYouKnow'
const MapTheme = 'mapTheme'
const changeSB = 'changeSnackbarLocation'
const changeDP = 'changeDetailsPanelState'
const changeDT = 'changeDrawerType'
const changeDS = 'changeDrawerState'
const changeHB = 'changeHeaderBorder'
const changeBC = 'changeBreadCrumbs'
const changeHT = 'changeHoverTime'
const changeGS = 'changeGlobalSearch'
const changeDSTheme = 'changeDashboardTheme'
const changeCTheme = 'changeColorTheme'
const changeUnit = 'changeMeasurementUnit'
const changeMDC = 'changeMaxDailyConsumption'
const changeBenchmarkType = 'changeBenchmarkType'
//Navigation

const changeDR = 'changeDefaultRoute'
const changeDV = 'changeDefaultView'
const changeDCON = 'changeDrawerCloseOnNav'

//Calibration

const CALTYPE = 'calibrationType'
const COUNT = 'calibrationCount'
const TCOUNT = 'calibrationTimeCount'
const CALNOTIF = 'calibrationNotify'
const ALERTS = 'notifAlerts'
// const GETFAVS = 'getFavorites'

//Charts

const CHARTTYPE = 'chartType'
const CHARTDATATYPE = 'chartDataType'
const addPeriod = 'chartAddPeriod'
const weekendColor = 'changeWeekendColor'

//Get/Set Settings from server

const GetSettings = 'getSettings'
const SAVESETTINGS = 'saveSettings'
const SAVED = 'savedSettings'
const NOSETTINGS = 'noSettings'
const reset = 'resetSettings'

//Organisation Settings
const SetOrgSettings = 'setOrgSettings'


export const resetSettings = () => {
	return async (dispatch, getState) => {
		dispatch({
			type: reset,
			user: getState().settings.user
		})
		dispatch(await saveSettingsOnServ())
		// dispatch(await getSettings())
	}
}
export const saveOnServ = (user) => {
	return async (dispatch) => {
		var saved = await saveSettings(user)
		dispatch({
			type: SAVESETTINGS,
			saved: saved ? true : false
		})
	}
}
export const saveSettingsOnServ = () => {
	return async (dispatch, getState) => {
		// return true
		let user = getState().settings.user
		let s = getState().settings
		let settings = {
			mUnit: s.mUnit,
			language: s.language,
			dsTheme: s.dsTheme,
			weekendColor: s.weekendColor,
			theme: s.theme,
			colorTheme: s.colorTheme,
			trp: s.trp,
			cookies: s.cookies,
			snackbarLocation: s.snackbarLocation,
			hoverTime: s.hoverTime,
			maxDailyConsumption: s.maxDailyConsumption,
			benchmarkSplitByTags: s.benchmarkSplitByTags
		}
		user.internal.sentiWaterworks.settings = settings
		var saved = await saveInternal(user.internal, user.uuid)
		dispatch({
			type: SAVESETTINGS,
			saved: saved ? true : false
		})
	}
}
export const getSettings = async () => {
	return async (dispatch, getState) => {
		var sessionCookie = cookie.load('SESSION') ? cookie.load('SESSION') : null
		var userId, user
		if (sessionCookie) {
			let vSession = await getValidSession()
			if (vSession.status === 200) {
				// let exp = moment().add('1', 'day')
				cookie.save('SESSION', sessionCookie, { path: '/', expires: moment(vSession.data.expires).toDate() })
				setPrefix(sessionCookie.uuid)
			}
			else {
				return cookie.remove('SESSION')
			}
			userId = sessionCookie.uuid
			user = userId !== 0 ? await getAuthUser(userId) : null
			if (user) { //Nasty error in Senti-core
				dispatch(setAccessLevel({ role: user.role, privileges: user.privileges }))
			}
		}

		moment.updateLocale('en-gb', {
			week: {
				dow: 1
			}
		})

		if (user) {
			user.internal = user.internal || {}
			user.internal.sentiWaterworks = user.internal.sentiWaterworks || {}
			user.internal.sentiWaterworks.extendedProfile = user.internal.sentiWaterworks.extendedProfile || {}
			user.aux = user.aux || {}
			user.aux.sentiWaterworks = user.aux.sentiWaterworks || {}
			user.aux.sentiWaterworks.extendedProfile = user.aux.sentiWaterworks.extendedProfile || {}
			let settings = user.internal.sentiWaterworks.settings = user.internal.sentiWaterworks.settings || {}

			if (settings) {
				moment.locale(settings.language === 'en' ? 'en-gb' : settings.language)
				dispatch({
					type: GetSettings,
					settings: {
						...settings,
					},
					user
				})
			}
			else {
				moment.locale(settings.language === 'en' ? 'en-gb' : settings.language)
				let s = {
					...getState().settings,
				}
				dispatch({
					type: NOSETTINGS,
					loading: false,
					user,
					settings: s
				})
			}
		}
	}
}

export const changeBTags = val => {
	return async dispatch => {
		dispatch({
			type: changeBenchmarkType,
			benchmarkSplitByTags: val
		})
		dispatch(await saveSettingsOnServ())
	}
}
export const changeMeasureUnit = val => {
	return async dispatch => {
		dispatch({
			type: changeUnit,
			mUnit: val
		})
		dispatch(await saveSettingsOnServ())

	}

}
export const changeMaxDailyConsumption = val => {
	return async dispatch => {
		dispatch({
			type: changeMDC,
			payload: val
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeGlobalSearch = val => {
	return async dispatch => {
		dispatch({
			type: changeGS,
			globalSearch: val
		})
	}
}
export const changeSnackbarLocation = (val) => {
	return async dispatch => {
		dispatch({
			type: changeSB,
			snackbarLocation: val
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeDrawerState = val => {
	return async dispatch => {
		dispatch({
			type: changeDS,
			drawerState: val
		})
		dispatch(saveSettingsOnServ())

	}
}
export const changeDrawerType = (val) => {
	return async dispatch => {
		dispatch({
			type: changeDT,
			drawer: val
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeDrawerCloseOnNav = (val) => {
	return async  dispatch => {
		dispatch({
			type: changeDCON,
			drawerCloseOnNav: val
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeHeaderBorder = (val) => {
	return async dispatch => {
		dispatch({
			type: changeHB,
			headerBorder: val
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeHoverTime = val => {
	return async dispatch => {
		dispatch({
			type: changeHT,
			hoverTime: val
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeBreadCrumbs = val => {
	return async dispatch => {
		dispatch({
			type: changeBC,
			breadcrumbs: val
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeDetailsPanel = (val) => {
	return async dispatch => {
		dispatch({
			type: changeDP,
			detailsPanel: val
		})
		dispatch(saveSettingsOnServ())
	}
}
export const acceptCookiesFunc = (val) => {
	return async dispatch => {
		dispatch({
			type: acceptCookies,
			acceptCookies: val
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeDefaultView = route => {
	return async (dispatch) => {
		dispatch({
			type: changeDV,
			defaultView: route
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeDefaultRoute = route => {
	return async (dispatch) => {
		dispatch({
			type: changeDR,
			defaultRoute: route
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeMapTheme = t => {
	return async (dispatch, getState) => {
		dispatch({
			type: MapTheme,
			t
		})
		dispatch(saveSettingsOnServ())
	}

}
export const changeAlerts = t => {
	return async (dispatch, getState) => {
		dispatch({
			type: ALERTS,
			t
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeDidKnow = t => {
	return async (dispatch, getState) => {
		dispatch({
			type: DidKnow,
			t
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeChartDataType = t => {
	return async (dispatch, getState) => {
		dispatch({
			type: CHARTDATATYPE,
			t
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeChartType = t => {
	return async (dispatch, getState) => {
		dispatch({
			type: CHARTTYPE,
			t
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeDiscoverSenti = val => {
	return async (dispatch, getState) => {
		dispatch({
			type: DISCSENT,
			val
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeCalNotif = t => {
	return async (dispatch, getState) => {
		dispatch({
			type: CALNOTIF,
			t
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeTCount = tcount => {
	return async (dispatch, getState) => {
		dispatch({
			type: TCOUNT,
			tcount
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeCount = count => {
	return async (dispatch, getState) => {
		dispatch({
			type: COUNT,
			count
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeCalType = t => {
	return async (dispatch, getState) => {
		dispatch({
			type: CALTYPE,
			t
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeSideBarLoc = loc => {
	return async (dispatch, getState) => {
		dispatch({
			type: MENULOC,
			loc
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeTRP = (nr) => {
	return async (dispatch, getState) => {
		let trp = nr
		if (nr === 'auto') {
			let height = window.innerHeight
			let rows = Math.round(height - 70 - 48 - 30 - 64 - 56 / 49)
			trp = rows
		}
		dispatch({
			type: TRP,
			nr: trp
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeSettingsDate = (menuId, to, from, timeType, id) => {
	return async (dispatch, getState) => {
		let periods = []
		periods = [...getState().settings.periods]
		let c
		if (id === -1) {
			c = periods.length
		}
		else {
			c = periods.findIndex(f => f.id === id)
		}
		periods[c] = {
			id: c,
			menuId, to: to ? to : undefined, from: from ? from : undefined, timeType, chartType: id === -1 ? 3 : periods[c].chartType, hide: false, raw: id !== -1 ? periods[c].raw : false
		}
		dispatch({
			type: addPeriod,
			periods: periods
		})
		dispatch(saveSettingsOnServ())
	}
}
export const removeChartPeriod = pId => {
	return async (dispatch, getState) => {
		let periods = []
		periods = [...getState().settings.periods]
		periods.splice(periods.findIndex(f => f.id === pId), 1)
		dispatch({
			type: addPeriod,
			periods: periods
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changePeriodChartType = (type, p) => {
	return async (dispatch, getState) => {
		let periods = []
		periods = [...getState().settings.periods]
		let id = periods.findIndex(f => f.id === p.id)
		if (id > -1) {
			periods[id].chartType = type
		}
		dispatch({
			type: addPeriod,
			periods
		})
		dispatch(saveSettingsOnServ())
	}
}

export const updateChartPeriod = p => {
	return async (dispatch, getState) => {
		let periods = []
		periods = [...getState().settings.periods]
		let id = periods.findIndex(f => f.id === p.id)
		if (id > -1) {
			periods[id].raw = !p.raw
		}
		dispatch({
			type: addPeriod,
			periods: periods
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeTheme = (code) => {
	return async (dispatch, getState) => {
		dispatch({
			type: THEME,
			code
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeColorTheme = (code) => {
	return async (dispatch, getState) => {
		dispatch({
			type: changeCTheme,
			code
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeWeekendColor = (id) => {
	return async (dispatch, getState) => {
		dispatch({
			type: weekendColor,
			id
		})
		dispatch(saveSettingsOnServ())
	}
}
export const changeDashboardTheme = (id) => {
	return async (dispatch, getState) => {
		dispatch({
			type: changeDSTheme,
			dsTheme: id
		})
		dispatch(saveSettingsOnServ())
	}
}
export const finishedSaving = () => {
	return {
		type: SAVED,
		saved: false
	}
}
let autoheight = Math.round((window.innerHeight - 70 - 48 - 30 - 64 - 56 - 30 - 56 - 30) / 49) + ' - auto'
export let initialState = {
	weekendColor: 'red',
	periods: [{
		id: 0,
		menuId: 0,
		raw: true,
		timeType: 1,
		chartType: 3,
		hide: false
	}],
	cookies: true,
	maxDailyConsumption: 0,
	// defaultRoute: '/dashboard',
	// defaultView: '/list',
	// mapTheme: 0,
	// rawData: 0,
	language: 'da',
	// calibration: 1,
	// calNotifications: 0,
	// count: 200,
	// tcount: 600,
	// discSentiVal: 1,
	// sideBar: 0,
	theme: 0,
	// chartType: 3,
	trp: 10,
	// alerts: 1,
	// didKnow: 0,
	mUnit: 'l',
	loading: true,
	saved: false,
	rowsPerPageOptions: [autoheight, 5, 7, 8, 10, 15, 20, 25, 50, 100],
	// cardsPerPageOptions: [2, 3, 4, 6, 8, 9],
	snackbarLocation: 'left',
	// detailsPanel: 0,
	// drawer: 'permanent',
	// drawerState: true,
	// drawerCloseOnNav: true,
	// headerBorder: false,
	// breadcrumbs: true,
	hoverTime: 1000,
	// globalSearch: true,
	dsTheme: 0,
	colorTheme: 'blue',
	benchmarkSplitByTags: 0,
	orgSettings: {}
}
export const settings = (state = initialState, action) => {
	switch (action.type) {
		case 'RESET_APP':
			return initialState
		case SetOrgSettings:
			return Object.assign({}, state, { orgSettings: action.payload })
		case autoRowsPerPage:
			let newRowsPerPage = [...initialState.rowsPerPageOptions]
			newRowsPerPage[0] = action.payload + ' - auto'
			return Object.assign({}, state, { rowsPerPageOptions: [...newRowsPerPage] })
		case reset:
			return Object.assign({}, state, { ...initialState, user: action.user, cookies: false })
		case changeBenchmarkType:
			return Object.assign({}, state, { benchmarkSplitByTags: action.benchmarkSplitByTags })
		case changeMDC:
			return Object.assign({}, state, { maxDailyConsumption: action.payload })
		case changeUnit:
			return Object.assign({}, state, { mUnit: action.mUnit })
		case changeDSTheme:
			return Object.assign({}, state, { dsTheme: action.dsTheme })
		case changeGS:
			return Object.assign({}, state, { globalSearch: action.globalSearch })
		case changeHT:
			return Object.assign({}, state, { hoverTime: action.hoverTime })
		case changeBC:
			return Object.assign({}, state, { breadcrumbs: action.breadcrumbs })
		case changeHB:
			return Object.assign({}, state, { headerBorder: action.headerBorder })
		case changeDCON:
			return Object.assign({}, state, { drawerCloseOnNav: action.drawerCloseOnNav })
		case changeDS:
			return Object.assign({}, state, { drawerState: action.drawerState })
		case changeDT:
			return Object.assign({}, state, { drawer: action.drawer })
		case changeSB:
			return Object.assign({}, state, { snackbarLocation: action.snackbarLocation })
		case changeDP:
			return Object.assign({}, state, { detailsPanel: action.detailsPanel })
		case weekendColor:
			return Object.assign({}, state, { weekendColor: action.id })
		// case addPeriod:
		// let periods = setDates(action.periods)
		// return Object.assign({}, state, { periods: periods })
		case acceptCookies:
			return Object.assign({}, state, { cookies: action.acceptCookies })
		case changeDR:
			return Object.assign({}, state, { defaultRoute: action.defaultRoute })
		case changeDV:
			return Object.assign({}, state, { defaultView: action.defaultView })
		case CHARTDATATYPE:
			return Object.assign({}, state, { rawData: action.t })
		case SAVED:
			return Object.assign({}, state, { saved: action.saved })
		case DISCSENT:
			return Object.assign({}, state, { discSentiVal: action.val })
		case NOSETTINGS:
			return Object.assign({}, state, { ...action.settings, loading: false, user: action.user })
		case GetSettings: {
			// let periods = setDates(action.settings.periods)
			set('settings', action.settings)
			return Object.assign({}, state, { ...action.settings, /* periods: periods, */ user: action.user, loading: false })
		}
		case changeLangAction: {
			moment.locale(action.code)
			return Object.assign({}, state, {
				language: action.code,
			})
		}
		case SAVESETTINGS:
			return Object.assign({}, state, {
				saved: action.saved
			})
		case THEME:
			return Object.assign({}, state, {
				theme: action.code
			})
		case changeCTheme:
			return Object.assign({}, state, {
				colorTheme: action.code
			})
		case TRP:
			return Object.assign({}, state, {
				trp: action.nr
			})
		case MENULOC:
			return Object.assign({}, state, {
				sideBar: action.loc
			})
		case CALTYPE:
			return Object.assign({}, state, {
				calibration: action.t
			})
		case COUNT:
			return Object.assign({}, state, {
				count: action.count
			})
		case TCOUNT:
			return Object.assign({}, state, {
				tcount: action.tcount
			})
		case CALNOTIF:
			return Object.assign({}, state, {
				calNotifications: action.t
			})
		case ALERTS:
			return Object.assign({}, state, {
				alerts: action.t
			})
		case DidKnow:
			return Object.assign({}, state, {
				didKnow: action.t
			})
		case CHARTTYPE:
			return Object.assign({}, state, {
				chartType: action.t
			})
		case MapTheme:
			return Object.assign({}, state, {
				mapTheme: action.t
			})
		default:
			return state
	}

}