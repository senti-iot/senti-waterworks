// ##############################
// // // Sidebar styles
// #############################

import {
	drawerWidth,
	transition,
	headerColor
} from "./mainStyles"

import { getContrast } from 'variables/functions'
import { makeStyles } from '@material-ui/styles'

const sidebarStyle = makeStyles(theme => ({
	iconRoot: {
		color: "#FFF",
		background: theme.secondary,
		margin: 16,
		"&:hover": {
			background: theme.palette.secondary.light,
		}
	},
	leftIcon: {
		marginRight: 8
	},
	nested: {
		paddingLeft: `${theme.spacing(2)}px !important`,
	},
	appBarWrapper: {
		backgroundColor: theme.sidebar
	},
	root: {
		display: 'flex',
	},
	mobileList: {
		margin: 16,
		padding: 0,
		[theme.breakpoints.down('md')]: {
			margin: 8
		}
	},
	drawerPaper: {
		color: getContrast(theme.sidebar),
		backgroundColor: theme.sidebar,
		overflowY: 'inherit',
		top: 70,
		[theme.breakpoints.down('md')]: {
			top: 0
		},
		width: drawerWidth,
		border: 'none',
	},
	drawer: {
		top: 70,
		width: drawerWidth,
		[theme.breakpoints.down('sm')]: {
			width: 275
		},
		flexShrink: 0,
		whiteSpace: 'nowrap',

	},
	drawerOpen: {
		width: drawerWidth,
		[theme.breakpoints.down('sm')]: {
			width: 275
		},
		overflowX: "auto",
		...transition
	},
	drawerClose: {
		...transition,
		overflowX: 'hidden',
		width: 60
	},
	drawerPersClose: {
		...transition,
		overflowX: 'hidden',
		width: 0
	},
	whiteFont: {
		fontSize: '14px',
		color: 'inherit',
		fontWeight: '500',
		// color: ,
		// ...defaultFont,
		margin: "0",
		lineHeight: "30px",
		// fontSize: "14px",
		// color: "#FFFFFF"
	},
	border: {
		width: '100%',
		background: '#555',
		height: 1
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		minHeight: 48,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	button: {
		color: getContrast(theme.sidebar),
		margin: '8px 0px',
		padding: 10,
		height: 44,
		"&:hover": {
			background: theme.hover,
			color: getContrast(theme.palette.primary.main)
		},
		transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1), background 0.16s cubic-bezier(0.685, 0.0473, 0.346, 1) "
	},
	buttonOpen: {
		borderRadius: 3
	},
	buttonClose: {
		borderRadius: "50%"
	},
	buttonActiveRoute: {
		color: getContrast(theme.palette.primary.main),
		// color: getContrast(theme.palette.primary.main ? theme.palette.primary.main : "#fff"),
		background: theme.palette.primary.main,
		"&:focus": {
			background: theme.palette.primary.main
		}
	},
	logo: {
		backgroundColor: theme.header,
		position: "relative",
		padding: "0px 4px",
		[theme.breakpoints.up('sm')]: {
			minHeight: 70
		},
		minHeight: "48px",
		zIndex: "4",
		display: 'flex',
		"&:after": {
			content: '""',
			position: "absolute",
			bottom: "0",

			height: "0px",
			right: "15px",
			width: "calc(100% - 30px)",
			backgroundColor: "rgba(180, 180, 180, 0.3)"
		}
	},
	logoLink: {
		// ...defaultFont,
		textTransform: "uppercase",
		padding: "5px 0",
		display: "block",
		fontSize: "18px",
		textAlign: "left",
		fontWeight: "400",
		lineHeight: "30px",
		textDecoration: "none",
		backgroundColor: "transparent",
		"&,&:hover": {
			color: "#FFFFFF"
		}
	},
	logoImage: {
		// width: "50px",
		display: "inline-block",
		maxHeight: "50px",
		marginLeft: "50px",
		[theme.breakpoints.down("md")]: {
			marginLeft: "18px"
		},
		marginRight: "15px"
	},
	img: {
		borderRadius: 50,
		height: 36,
		width: 36,
		color: headerColor
	},

	image: {
		position: "relative",
		height: 48,
		[theme.breakpoints.up('sm')]: {
			height: 70
		},
		// marginLeft: 48,
		borderRadius: 4,
		[theme.breakpoints.down("xs")]: {
			height: 48
		},
		"&:hover, &$focusVisible": {
			zIndex: 1,
		}
	},
	focusVisible: {},
	imageSrc: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: "85px 50px",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "50% 50%",
	},
}))

export default sidebarStyle
