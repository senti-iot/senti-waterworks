import React, { /* useContext, */ useEffect, useState, Fragment, Suspense } from 'react'
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
// import { getAllDevices } from 'Redux/data'
// import ChartContainer from 'Components/Container/ChartContainer'
import EndUserContainer from 'Components/Container/EndUserContainer'
import MyProfile from 'Components/Custom/MyProfile/MyProfile'
import MyProfileEdit from 'Components/Custom/MyProfile/MyProfileEdit'
import { routes } from 'Routes'

function Container(props) {
	const colorTheme = useSelector((state) => state.settings.colorTheme)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)
	useEffect(() => {

		const getSetting = async () => dispatch(await getSettings())
		// const getDevices = async () => dispatch(await getAllDevices())
		const loadSettings = async () => {
			await getSetting()
			// await getDevices()
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
						<Suspense fallback={<div></div>}>

							<Switch>
								{routes.map(r => (<Route path={r.path} exact={r.exact}>
									<r.component />
								</Route>))}
								{/* <Route path={'/settings'}>
								<Settings />
								</Route>

								<Route path={'/my-profile'}>
								<MyProfile />
								</Route>
								<Route path={'/my-profile/edit'}>
								<MyProfileEdit
								/>
								</Route>
								<Route exact path={'/'}>
								<EndUserContainer />
							</Route> */}
								<Redirect path={'*'} to={'/'}></Redirect>
							</Switch>
						</Suspense>
					</AppBackground>
					: <CircularLoader fill />}
			</Fragment>
			: <Redirect from={window.location.pathname} to={{
				pathname: window.location.pathname.includes('signup') ? '/signup/da/step1' : '/login', state: {
					prevURL: window.location.pathname
				}
			}} />
	)
}
Container.whyDidYouRender = true

export default Container
