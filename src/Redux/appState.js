const updateFilters = 'updateFilters'
const changeTRP = 'changeTableRows'
const changeMT = 'changeMapTheme'
const changeCT = 'changeChartType'
const changeHM = 'changeHeatMap'
const changeYAXIS = 'changeYAxis'
const changeCPP = 'changeCardsPerPage'
const changeEventHandler = 'changeEH'
const changeSM = 'changeSmallmenu'
const changeT = 'changeTabs'
const sInstallation = 'selectInstallation'
const sExportDevice = 'selectExportDevice'
const getSettings = 'getSettings'
const fsLG = 'fullScreenLineGraph'
const setLines = 'setGraphLines'
const setTFilter = 'setTFilter'
const setOpenTFilter = 'setOpenTFilter'
const setOpenTagFilter = 'setOpenTagFilter'
const openCreateInstallation = 'openCreateInstallation'
const openCreateAlarm = 'openCreateAlarm'
const openCreateTag = 'openCreateTag'


export const openCA = () => dispatch => dispatch({ type: openCreateAlarm, payload: true })
export const closeCA = () => dispatch => dispatch({ type: openCreateAlarm, payload: false })

export const openCT = () => dispatch => dispatch({ type: openCreateTag, payload: true })
export const closeCT = () => dispatch => dispatch({ type: openCreateTag, payload: true })

export const openCI = () => dispatch => dispatch({ type: openCreateInstallation, payload: true })
export const closeCI = () => dispatch => dispatch({ type: openCreateInstallation, payload: false })


export const changeOpenTagFilter = () => {
	return ({
		type: setOpenTFilter
	})
}
export const changeOpenTFilter = () => {
	return ({
		type: setOpenTagFilter
	})
}
export const changeSmallMenu = (val) => {
	return dispatch => {
		dispatch({
			type: changeSM,
			smallMenu: val
		})
	}
}
export const changeEH = (bool) => {
	return dispatch => {
		dispatch({ type: changeEventHandler, EH: bool })
	}
}
export const changeCardsPerPage = (val) => {
	return (dispatch) => {
		dispatch({ type: changeCPP, CPP: val })
	}
}
export const changeYAxis = (val) => {
	return (dispatch) => {
		dispatch({ type: changeYAXIS, chartYAxis: val })
	}
}
export const changeHeatMap = (val) => {
	return (dispatch) => {
		dispatch({ type: changeHM, heatMap: val })
	}
}
export const changeChartType = (val) => {
	return (dispatch) => {
		dispatch({ type: changeCT, chartType: val })
	}
}
export const changeMapTheme = (val) => {
	return (dispatch) => {
		dispatch({ type: changeMT, mapTheme: val })
	}
}

export const changeTableRows = (val) => {
	return (dispatch, getState) => {
		let trp = val
		if (val.toString().includes('auto')) {
			let height = window.innerHeight
			let rows = Math.round((height - 70 - 48 - 30 - 64 - 56 - 30 - 56 - 30) / 49)
			trp = rows
			dispatch({ type: 'autoRowsPerPage', payload: trp })
		}
		dispatch({ type: changeTRP, trp: trp, trpStr: val })
	}
}

export const addFilter = (f, type) => {
	return (dispatch, getState) => {
		let filters = []
		filters = [...getState().appState.filters[type]]
		let id = filters.length
		if (filters.length > 0) {
			f.filterType = 'OR'
		}

		filters.push({ ...f, id })
		dispatch({
			type: updateFilters,
			filters: {
				[type]: filters
			}
		})
		return id
	}
}
export const editFilter = (f, type) => {
	return (dispatch, getState) => {
		let filters = []

		filters = [...getState().appState.filters[type]]
		let filterIndex = filters.findIndex(fi => fi.id === f.id)
		filters[filterIndex] = f
		dispatch({
			type: updateFilters,
			filters: {
				[type]: filters
			}
		})
	}
}
export const removeFilter = (f, type) => {
	return (dispatch, getState) => {
		let filters = []
		filters = [...getState().appState.filters[type]]
		filters = filters.filter(filter => {
			return filter.id !== f.id
		})
		dispatch({
			type: updateFilters,
			filters: {
				[type]: filters
			}
		})
	}
}
export const changeTabs = tabs => {
	return dispatch => {
		dispatch({
			type: changeT,
			tabs: tabs
		})
	}
}
export const selectAllDevices = (b) => {
	return (dispatch, getState) => {
		if (b) {
			let installations = getState().data.installations
			let newSInstallations = installations.map(d => d.id)
			dispatch({
				type: sInstallation,
				payload: newSInstallations
			})
		}
		else {
			dispatch({
				type: sInstallation,
				payload: []
			})
		}
	}
}
export const setSelectedExportDevices = (devices) => {
	return (dispatch, getState) => {
		dispatch({
			type: sExportDevice,
			payload: devices
		})
	}
}
export const setSelectedInstallations = (installations) => {
	return (dispatch, getState) => {
		dispatch({
			type: sInstallation,
			payload: installations
		})
	}
}
export const setTest = (devices) => {
	return (dispatch, getState) => {
		dispatch({
			type: 'Test',
			payload: devices
		})
	}
}
export const setFullScreenLineGraph = fs => ({
	type: fsLG,
	payload: fs
})
export const selectInstallation = (b, installation) => {
	return (dispatch, getState) => {
		let newSDevices = []
		let selectedInstallations = getState().appState.selectedInstallations
		newSDevices = [...selectedInstallations]
		if (b) {
			newSDevices = newSDevices.filter(d => d.toString() !== installation)
		}
		else {
			newSDevices.push(installation)
		}
		dispatch({
			type: sInstallation,
			payload: newSDevices
		})

	}
}
export const setGraphLines = (state) => {
	return {
		type: setLines,
		payload: state
	}
}
export const setGraphLine = (id, value) => {
	return (dispatch, getState) => {
		let lState = { ...getState().appState.lines }

		lState[id] = value
		dispatch({
			type: setLines,
			payload: lState
		})

	}
}
export const setTagFilter = (tagArray) => {
	return (dispatch, getState) => {
		// let newSDevices = []
		// let selectedDevices = getState().appState.selectedDevices
		let installations = getState().data.installations
		let tArr = tagArray.filter(f => f !== -1)

		if (tArr.length > 0) {
			// let tagDevices = devices.filter(d => d.tags.filter(t => tagArray.findIndex(ti => ti === t.uuid) > -1)).map(s => s.uuid)
			let tagDevices = installations.map(s => ({ uuid: s.uuid, tags: s.tags }))
			let fDevices = tagDevices.filter(d => {

				let result = d.tags.filter(t => {
					return tagArray.findIndex(ti => ti === t.uuid) > -1
				})
				return result.length > 0
			}).map(s => s.uuid)
			dispatch({
				type: sInstallation,
				payload: fDevices
			})
		}
		// if (tagUuid !== -1) {

		// 	// let devices = getState().data.devices
		// 	let tagDevices = devices.filter(d => d.tags.filter(t => t.uuid === tagUuid).length > 0).map(s => s.uuid)
		// 	dispatch({
		// 		type: sDevice,
		// 		payload: tagDevices
		// 	})

		// }
		else {
			tArr.push(-1)
			dispatch({
				type: sInstallation,
				payload: installations.map(s => s.uuid)
			})
		}

		dispatch({
			type: setTFilter,
			payload: tArr
		})
	}
}
const initialState = {

	lines: {},
	fullScreenLineChart: false,
	selectedExportInstallations: [],
	selectedInstallations: [],
	selectedTag: [-1],
	openTagFilter: false,
	openTagsFilter: false,
	oci: false,
	oca: false,
	oct: false,
	tabs: {
		id: '',
		route: 0,
		data: [],
		// filters: {
		// keyword: ''
		// },
		tabs: [],
		// noSearch: true
	},
	eH: true,
	CPP: 9,
	chartYAxis: 'linear',
	trpStr: null,
	heatMap: false,
	chartType: 1,
	mapTheme: 0,
	smallMenu: true,
	trp: null,
	filters: {
		alarms: [],
		tokens: [],
		favorites: [],
		projects: [],
		devices: [],
		groups: [],
		collections: [],
		installations: [],
		orgs: [],
		users: [],
		registries: [],
		devicetypes: [],
		sensors: [],
		functions: [],
		messages: [],
	}

}

export const appState = (state = initialState, action) => {
	switch (action.type) {
		case 'RESET_APP':
			return initialState
		case openCreateTag:
			return Object.assign({}, state, { oct: action.payload })
		case openCreateAlarm:
			return Object.assign({}, state, { oca: action.payload })
		case openCreateInstallation:
			return Object.assign({}, state, { oci: action.payload })
		case setOpenTagFilter:
			return Object.assign({}, state, { openTagsFilter: !state.openTagsFilter })
		case setOpenTFilter:
			return Object.assign({}, state, { openTagFilter: !state.openTagFilter })
		case setTFilter:
			return Object.assign({}, state, { selectedTag: action.payload })
		case setLines:
			return Object.assign({}, state, { lines: action.payload })
		case fsLG:
			return Object.assign({}, state, { fullScreenLineChart: action.payload })
		case changeT:
			return Object.assign({}, state, { tabs: action.tabs })
		case getSettings:
			return Object.assign({}, state, { smallMenu: action.settings.drawerState !== undefined ? action.settings.drawerState : true })
		case changeSM:
			return Object.assign({}, state, { smallMenu: action.smallMenu })
		case changeEventHandler:
			return Object.assign({}, state, { EH: action.EH })
		case changeCPP:
			return Object.assign({}, state, { CPP: action.CPP })
		case changeYAXIS:
			return Object.assign({}, state, { chartYAxis: action.chartYAxis })
		case changeHM:
			return Object.assign({}, state, { heatMap: action.heatMap })
		case changeCT:
			return Object.assign({}, state, { chartType: action.chartType })
		case changeMT:
			return Object.assign({}, state, { mapTheme: action.mapTheme })
		case changeTRP:
			return Object.assign({}, state, { trp: action.trp })
		case updateFilters:
			return Object.assign({}, state, { filters: { ...state.filters, ...action.filters } })
		case sInstallation:
			return Object.assign({}, state, { selectedInstallations: action.payload })
		case sExportDevice:
			return Object.assign({}, state, { selectedExportDevices: action.payload })
		default:
			return state
	}
}
