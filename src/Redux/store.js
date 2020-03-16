import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
let composeMiddleware = compose(
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({
		trace: true
	}) : f => f
)
// const store = createStore(rootReducer, composeMiddleware)

const configureStore = () => {
	const store = createStore(rootReducer, composeMiddleware)
	if (process.env.NODE_ENV !== 'production') {
		if (module.hot) {
			module.hot.accept('./rootReducer', () => {
				store.replaceReducer(rootReducer)
			})
		}
	}
	return store
}


export default configureStore