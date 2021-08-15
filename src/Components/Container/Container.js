import React, { useEffect, useState, Fragment, Suspense } from 'react'
import { AppBackground } from 'Styles/containerStyle'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from 'Components/Header'
import cookie from 'react-cookies'
import { useDispatch, useSelector } from 'Hooks'
import { getSettings } from 'Redux/settings'
import { CircularLoader } from 'Components'
import { routes } from 'Routes'
import { getAdminDevices, getAllNotifications, getNData } from 'Redux/data'
import { getTags } from 'Redux/tagManager'

function Container(props) {
	const colorTheme = useSelector((state) => state.settings.colorTheme)
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)

	const devices = useSelector(s => s.data.devices)
	const isSuperUser = useSelector(s => s.auth.isSuperUser)
	const isSWAdmin = useSelector(s => s.auth.privileges.indexOf('waterworks.admin') > -1 ? true : false)
	const haveData = useSelector(s => s.data.haveData)

	useEffect(() => {
		// const loadSettings = async () => {
		// 	// await getDevices()
		// 	setLoading(false)
		// }
		// loadSettings()
		if (loading && !haveData) {
			const getSetting = async () => await dispatch(await getSettings())
			const getDevices = async () => await dispatch(await getAdminDevices())
			const getNewData = async () => await dispatch(await getNData())
			const getDeviceTags = async () => await dispatch(await getTags())
			const getNotifications = async () => await dispatch(await getAllNotifications())
			const loadData = async () => {
				await getSetting()

				if ((isSuperUser || isSWAdmin) && devices.length === 0) {
					await getDevices()
					await getDeviceTags()
				}
				// await getDeviceData()
				await getNotifications()
				// await getNewData()
				setLoading(false)
			}
			loadData()
		}
		else {
			setLoading(false)
		}
	}, [devices.length, dispatch, haveData, isSWAdmin, isSuperUser, loading])


	return (
		cookie.load('SESSION') ?
			<Fragment>
				<Header title={props.title} />
				{!loading ?
					<AppBackground color={colorTheme}>
						<Suspense fallback={<div></div>}>

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
