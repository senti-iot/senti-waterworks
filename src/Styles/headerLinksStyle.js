// ##############################
// // // HeaderLinks styles
// #############################

import {
	defaultFont,
	// dangerColor,
	primaryColor,
	primaryBoxShadow,
	headerColor
} from "./mainStyles"
import { makeStyles } from '@material-ui/styles'

const headerLinksStyle = makeStyles(theme => ({
	selectDevButton: {
		color: '#fff',
		textTransform: 'none',
		marginRight: 32,
		whiteSpace: "nowrap"
	},
	expand: {
		// [theme.breakpoints.down('md')]: {
		// 	marginLeft: 18,
		// 	marginRight: 24,
		// },
		transform: 'rotate(0deg)',
		// transition: theme.transitions.create('transform', {
		// 	duration: theme.transitions.duration.shortest,
		// }),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	nameAndEmail: {
		// height: 46,
		display: 'flex',
		flexFlow: 'column',
		alignItems: 'flex-start',
		"&:hover": {
			background: 'inherit'
		},
		"&:focus": {
			background: 'inherit'
		},
		cursor: 'default'
	},
	img: {
		borderRadius: 50,
		height: 36,
		width: 36,
		color: headerColor
	},
	headerMargin: {
		// marginLeft: 10
	},
	leftIcon: {
		marginRight: 8
	},
	iconRoot: {
		color: "#FFF",
		// [theme.breakpoints.down('md')]: {
		// 	justifyContent: 'left',
		// 	width: 260
		// }
		// padding: "12px 2px"
	},
	menuItem: {
		maxHeight: 20
	},
	menuList: {
		padding: 0
	},
	linkText: {
		zIndex: "4",
		...defaultFont,
		fontSize: "14px"
	},
	buttonLink: {
		// [theme.breakpoints.down("sm")]: {
		// 	display: "flex",
		// 	marginLeft: "30px",
		// 	width: "auto"
		// }
	},
	searchButton: {
		// [theme.breakpoints.down("sm")]: {
		// 	top: "-50px !important",
		// 	marginRight: "22px",
		// 	float: "right"
		// }
	},
	margin: {
		zIndex: "4",
		margin: "0",
	},
	searchIcon: {
		width: "17px",
		zIndex: "4"
	},
	links: {
		width: "20px",
		height: "20px",
		zIndex: "4",
		// [theme.breakpoints.down("sm")]: {
		// 	display: "block",
		// 	width: "30px",
		// 	height: "30px",
		// 	color: "#a9afbb",
		// 	marginRight: "15px"
		// }
	},
	notifications: {
		zIndex: "4",
		// [theme.breakpoints.up("md")]: {
		// 	position: "absolute",
		// 	top: "5px",
		// 	border: "1px solid #FFF",
		// 	right: "10px",
		// 	fontSize: "9px",
		// 	background: dangerColor,
		// 	color: "#FFFFFF",
		// 	minWidth: "16px",
		// 	height: "16px",
		// 	borderRadius: "10px",
		// 	textAlign: "center",
		// 	lineHeight: "16px",
		// 	verticalAlign: "middle",
		// 	display: "block"
		// },
		// [theme.breakpoints.down("sm")]: {
		// 	...defaultFont,
		// 	fontSize: "14px",
		// 	marginRight: "8px"
		// }
	},
	dropdown: {
		borderRadius: "3px",
		border: "0",
		boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.26)",
		top: "100%",
		zIndex: "1000",
		minWidth: "160px",
		padding: "5px 0",
		margin: "2px 0 0",
		fontSize: "14px",
		textAlign: "left",
		listStyle: "none",
		backgroundColor: "#fff",
		backgroundClip: "padding-box"
	},
	pooperResponsive: {
		// [theme.breakpoints.down("sm")]: {
		// 	zIndex: "1640",
		// 	position: "static",
		// 	float: "none",
		// 	width: "auto",
		// 	marginTop: "0",
		// 	backgroundColor: "transparent",
		// 	border: "0",
		// 	boxShadow: "none",
		// 	color: "black"
		// }
	},
	dropdownItem: {
		...defaultFont,
		fontSize: "13px",
		padding: "10px 20px",
		margin: "0 5px",
		borderRadius: "2px",
		transition: "all 150ms linear",
		display: "block",
		clear: "both",
		fontWeight: "400",
		lineHeight: "1.42857143",
		color: "#333",
		whiteSpace: "nowrap",
		"&:hover": {
			backgroundColor: primaryColor,
			color: "#FFFFFF",
			...primaryBoxShadow
		}
	}
}))

export default headerLinksStyle
