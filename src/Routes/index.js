// import { Copyright } from '@material-ui/icons's
import { Business, ContactSupportIcon, Group, Mail, Copyright, Star, SwapHorizontalCircleIcon, VerifiedUserIcon } from 'variables/icons'
import { Dashboard } from 'variables/icons'

export const routes = [
	{
		path: '/dashboard',
		sidebarName: 'sidebar.dashboard',
		icon: Dashboard,
		menuRoute: 'dashboard'
	},
	{
		path: '/favorites',
		sidebarName: 'sidebar.favorites',
		icon: Star,
		menuRoute: 'favorites'
	},
	{
		path: '/users',
		sidebarName: 'sidebar.users',
		icon: Group,
		menuRoute: 'users'
	},
	{
		path: '/clients',
		sidebarName: 'sidebar.clients',
		icon: Business,
		menuRoute: 'clients'
	},
	{
		path: '/moving-out',
		sidebarName: 'sidebar.movingOut',
		icon: SwapHorizontalCircleIcon,
		menuRoute: 'moving-out'
	},
	{
		path: '/contact',
		sidebarName: 'sidebar.contact',
		icon: Mail,
		menuRoute: 'contact'
	},
	{
		path: '/support',
		sidebarName: 'sidebar.support',
		icon: ContactSupportIcon,
		menuRoute: 'support'
	},
	{
		path: '/data-policy',
		sidebarName: 'sidebar.dataPolicy',
		icon: VerifiedUserIcon,
		menuRoute: 'data-policy'
	},
	{
		path: '/about',
		sidebarName: 'sidebar.about',
		icon: Copyright,
		menuRoute: 'about'
	}
]