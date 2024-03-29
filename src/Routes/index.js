// import EndUserContainer from 'Components/Container/EndUserContainer'
// import Settings from 'Routes/Settings'
import React from 'react'
// import { Copyright } from '@material-ui/icons's
import {
	// Business,
	// ContactSupportIcon,
	// Group,
	// Mail,
	// Copyright,
	// Star,
	// SwapHorizontalCircleIcon,
	// VerifiedUserIcon,
	Dashboard, Devices, GroupWorkIcon, Notifications
} from 'variables/icons'

const SettingsRoute = React.lazy(() => import('./Settings'))
const MyProfileRoute = React.lazy(() => import('./MyProfile'))
// const MyProfileEditRoute = React.lazy(() => import('./MyProfileEdit'))
const DashboardRoute = React.lazy(() => import('./Dashboard'))

const DevicesRoute = React.lazy(() => import('./Devices'))
const GroupsRoute = React.lazy(() => import('./Groups'))
const InstallationsRoute = React.lazy(() => import('./Installations'))

// const AboutSentiRoute = React.lazy(() => import('./AboutSenti'))
// const FavoritesRoute = React.lazy(() => import('./Favorites'))
// const UsersRoute = React.lazy(() => import('./Users'))
// const ClientsRoute = React.lazy(() => import('./Clients'))
// const MovingOutRoute = React.lazy(() => import('./MovingOut'))
// const ContactRoute = React.lazy(() => import('./Contact'))
// const SupportRoute = React.lazy(() => import('./Support'))
// const DataPolicyRoute = React.lazy(() => import('./DataPolicy'))
const DeviceMapRoute = React.lazy(() => import('./DeviceMap'))

const AlarmsRoute = React.lazy(() => import('./Alarms'))
const AlarmRoute = React.lazy(() => import('./Alarm'))
const NotificationsRoute = React.lazy(() => import('./Notifications'))
const NotificationRoute = React.lazy(() => import('./Notification'))
const InstallationRoute = React.lazy(() => import('./Installation'))


export const routes = [
	{
		path: '/',
		exact: true,
		sidebarName: 'sidebar.dashboard',
		icon: Dashboard,
		menuRoute: 'dashboard',
		component: DashboardRoute
	},
	// {
	// 	path: '/favorites',
	// 	sidebarName: 'sidebar.favorites',
	// 	icon: Star,
	// 	menuRoute: 'favorites',
	// 	component: FavoritesRoute
	// },
	{
		path: '/devices',
		sidebarName: 'sidebar.devices',
		icon: Devices,
		menuRoute: 'devices',
		component: DevicesRoute
	},
	{
		path: '/groups',
		sidebarName: 'sidebar.groups',
		icon: GroupWorkIcon,
		menuRoute: 'groups',
		component: GroupsRoute
	},
	{
		path: '/installations',
		sidebarName: 'sidebar.installations',
		icon: Devices,
		menuRoute: 'installations',
		component: InstallationsRoute
	},
	{
		path: '/installation/:uuid',
		hideFromSideBar: true,
		component: InstallationRoute
	},
	{
		path: '/alarms',
		sidebarName: 'sidebar.alarms',
		icon: Notifications,
		menuRoute: 'alarms',
		component: AlarmsRoute
	},
	{
		path: '/alarm/:uuid',
		hideFromSideBar: true,
		component: AlarmRoute
	},
	{
		path: '/notifications',
		sidebarName: 'sidebar.notifications',
		icon: Notifications,
		menuRoute: 'notifications',
		component: NotificationsRoute,
		hideFromSideBar: true,

	},
	{
		path: '/notification/:uuid',
		hideFromSideBar: true,
		component: NotificationRoute
	},
	{
		path: '/device-map',
		hideFromSideBar: true,
		component: DeviceMapRoute,
	},
	// {
	// 	path: '/users',
	// 	sidebarName: 'sidebar.users',
	// 	icon: Group,
	// 	menuRoute: 'users',
	// 	component: UsersRoute
	// },
	// {
	// 	path: '/clients',
	// 	sidebarName: 'sidebar.clients',
	// 	icon: Business,
	// 	menuRoute: 'clients',
	// 	component: ClientsRoute
	// },
	// {
	// 	path: '/moving-out',
	// 	sidebarName: 'sidebar.movingOut',
	// 	icon: SwapHorizontalCircleIcon,
	// 	menuRoute: 'moving-out',
	// 	component: MovingOutRoute
	// },
	// {
	// 	path: '/contact',
	// 	sidebarName: 'sidebar.contact',
	// 	icon: Mail,
	// 	menuRoute: 'contact',
	// 	component: ContactRoute
	// },
	// {
	// 	path: '/support',
	// 	sidebarName: 'sidebar.support',
	// 	icon: ContactSupportIcon,
	// 	menuRoute: 'support',
	// 	component: SupportRoute
	// },
	// {
	// 	path: '/data-policy',
	// 	sidebarName: 'sidebar.dataPolicy',
	// 	icon: VerifiedUserIcon,
	// 	menuRoute: 'data-policy',
	// 	component: DataPolicyRoute
	// },
	// {
	// 	path: '/about',
	// 	sidebarName: 'sidebar.about',
	// 	icon: Copyright,
	// 	menuRoute: 'about',
	// 	component: AboutSentiRoute
	// },
	{
		path: '/settings',
		hideFromSideBar: true,
		component: SettingsRoute
	},
	{
		path: '/my-profile',
		hideFromSideBar: true,
		component: MyProfileRoute
	},
	// {
	// 	path: '/my-profile/edit',
	// 	hideFromSideBar: true,
	// 	component: MyProfileEditRoute
	// }
]