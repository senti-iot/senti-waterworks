import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { settings } from './settings'
import { localization } from './localization'
import thunk from 'redux-thunk';

let reducers = combineReducers({ settings, localization })
/**
*	 Debugging purposes
**/
// const logger = store => next => action => {
//  console.info('dispatching', action)
// 	let result = next(action)
// 	console.info('next state', store.getState())
// 	return result
// }
const rootReducer = (state, action) => {
	if (action.type === 'RESET_APP') {
		state = undefined
	}
	return reducers(state, action)
}
let composeMiddleware = compose(
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({
		trace: true
	}) : f => f
)
const store = createStore(rootReducer, composeMiddleware)


export default store