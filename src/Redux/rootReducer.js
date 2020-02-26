import { settings } from './settings'
import { localization } from './localization'
import { appState } from './appState'
import { data } from './data'
import { dateTime } from './dateTime'
import { mobileOnboarding } from './mobileOnboarding'
import { serviceWorkerReducer } from './serviceWorkerRedux'
import { combineReducers } from 'redux'

let reducers = combineReducers({ settings, localization, appState, data, dateTime, serviceWorkerReducer, mobileOnboarding })

const rootReducer = (state, action) => {
	return reducers(state, action)
}

export default rootReducer