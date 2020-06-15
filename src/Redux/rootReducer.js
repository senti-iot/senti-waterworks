import { settings } from './settings'
import { localization } from './localization'
import { appState } from './appState'
import { data } from './data'
import { dateTime } from './dateTime'
import { mobileOnboarding } from './mobileOnboarding'
import { serviceWorkerReducer } from './serviceWorkerRedux'
import { combineReducers } from 'redux'
import { auth } from './auth'
import { arcData } from './charts/arcData'
import { barData } from './charts/barData'
import { lineData } from './charts/lineData'
import { priceUsageData } from './charts/priceUsageData'

let reducers = combineReducers({
	auth, settings, localization, appState, data, dateTime, serviceWorkerReducer, mobileOnboarding,
	arcData, barData, lineData, priceUsageData
})

const rootReducer = (state, action) => {
	return reducers(state, action)
}

export default rootReducer