import React from 'react'
import './App.css'
import LocalizationProvider from 'Components/Providers/LocalizationProvider'
import configureStore from 'Redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { StylesProvider } from "@material-ui/styles"
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { hot } from 'react-hot-loader/root'
import SnackbarProvider from 'Hooks/useSnackbar/SnackbarProvider'

export const HTitle = React.createContext(null)
export const store = configureStore()

const Providers = props => {
	return (
		<Router>
			<StylesProvider injectFirst>
				<Provider store={store}>
					<LocalizationProvider>
						<SnackbarProvider>
							<MuiPickersUtilsProvider utils={MomentUtils}>
								{props.children}
							</MuiPickersUtilsProvider>
						</SnackbarProvider>
					</LocalizationProvider>
				</Provider>
			</StylesProvider>
		</Router>
	)
}
const HotProviders = hot(Providers)

export default HotProviders
