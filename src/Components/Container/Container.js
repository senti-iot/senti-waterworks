import React, { useEffect, Fragment, Suspense, useState } from 'react'
import { AppBackground } from 'Styles/containerStyle'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from 'Components/Header'
import cookie from 'react-cookies'
import { useDispatch, useSelector } from 'Hooks'
import { getSettings } from 'Redux/settings'
import { routes } from 'Routes'
import { getAllNotifications, getAdminInstallations, getAlarms } from 'Redux/data'
import { getTags } from 'Redux/tagManager'
import { CircularLoader } from 'Components'

function Container(props) {
	const colorTheme = useSelector((state) => state.settings.colorTheme)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)

	// const devices = useSelector(s => s.data.devices)
	const installations = useSelector(s => s.data.installations)
	const isSuperUser = useSelector(s => s.auth.isSuperUser)
	const isSWAdmin = useSelector(s => s.auth.privileges.indexOf('waterworks.admin') > -1 ? true : false)
	const haveData = useSelector(s => s.data.haveData)
	const loggedIn = useSelector(s => s.data.loggedIn)
	useEffect(() => {
		// const loadSettings = async () => {
		// 	// await getDevices()
		// 	setLoading(false)
		// }
		// loadSettings()
		if (!haveData && cookie.load('SESSION')) {
			// const getDevices = async () => await dispatch(await getAdminDevices())
			const getSetting = async () => await dispatch(await getSettings())
			const getDeviceTags = async () => await dispatch(await getTags())
			const getNotifications = async () => await dispatch(await getAllNotifications())
			const getAlarm = async () => await dispatch(await getAlarms())
			const getInstallations = async () => await dispatch(await getAdminInstallations())
			// const getNewData = async () => await dispatch(await getNData())

			const loadData = async () => {
				if (installations.length === 0) {
					// await getDevices()
					await getInstallations()
					await getDeviceTags()
				}
				// await getDeviceData()
				await getSetting()
				await getAlarm()
				await getNotifications()

				setLoading(false)
				// await getNewData()
			}
			loadData()
		}
		// else {
		// 	setLoading(false)
		// }
	}, [installations.length, dispatch, haveData, isSWAdmin, isSuperUser, loggedIn])


	return (
		cookie.load('SESSION') ?
			<Fragment>
				<Header title={props.title} />
				{!loading ?
					<AppBackground color={colorTheme}>
						<Suspense fallback={<CircularLoader fill />}>

							<Switch>
								{routes.map((r, i) => (<Route key={i} path={r.path} exact={r.exact}>
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
					: <AppBackground color={colorTheme}><CircularLoader fill /></AppBackground>}
			</Fragment>
			: <Redirect from={window.location.pathname} to={{
				pathname: window.location.pathname.includes('onboard') ? '/onboard/da/step1' : '/login', state: {
					prevURL: window.location.pathname
				}
			}} />
	)
}
Container.whyDidYouRender = true

export default Container
