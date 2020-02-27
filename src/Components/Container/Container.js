import React, { /* useContext, */ useEffect, useState, Fragment } from 'react'
// import { TProvider } from 'Components/Providers/LocalizationProvider';
// import { HTitle } from 'App';
import { AppBackground } from 'Styles/containerStyle'
import { Switch, Route, Redirect } from 'react-router-dom'
import Settings from 'Routes/Settings'
import Header from 'Components/Header'
import cookie from 'react-cookies'
import { useDispatch, useSelector } from 'Hooks'
import { getSettings } from 'Redux/settings'
import { CircularLoader } from 'Components'
import { getAllDevices } from 'Redux/data'
import ChartContainer from 'Components/Container/ChartContainer'
import EndUserContainer from 'Components/Container/EndUserContainer'

function Container(props) {
	const colorTheme = useSelector((state) => state.settings.colorTheme)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)

	useEffect(() => {

		const getSetting = async () => dispatch(await getSettings())
		const getDevices = async () => dispatch(await getAllDevices())
		const loadSettings = async () => {
			await getSetting()
			await getDevices()
			setLoading(false)
		}
		loadSettings()
	}, [dispatch])

	return (
		cookie.load('SESSION') ?
			<Fragment>
				<Header title={props.title} />
				{!loading ?
					<AppBackground color={colorTheme}>
						<Switch>
							<Route path={'/settings'}>
								<Settings />
							</Route>
							<Route path={'/admin'}>
								<ChartContainer />
							</Route>
							<Route exact path={'/'}>
								<EndUserContainer />
							</Route>
							<Redirect path={'*'} to={'/'}></Redirect>
						</Switch>
					</AppBackground>
					: <CircularLoader fill />}
			</Fragment>
			: <Redirect from={window.location.pathname} to={{
				pathname: '/login', state: {
					prevURL: window.location.pathname
				}
			}} />
	)
}
Container.whyDidYouRender = true

export default Container
