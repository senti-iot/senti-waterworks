import { red, green, yellow } from "@material-ui/core/colors"
const drawerWidth = 260

const transition = {
	transition: "all 0.22s cubic-bezier(0.685, 0.0473, 0.346, 1)"
}

const deviceStatus = {
	redSignal: {
		color: red[700]
	},
	greenSignal: {
		color: green[700]
	},
	yellowSignal: {
		color: yellow[600]
	},
}

const boxShadow = "0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)"

const card = {
	display: "inline-block",
	position: "relative",
	width: "100%",
	boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
	borderRadius: "3px",
	overflow: 'auto'
	// color: "rgba(0, 0, 0, 0.87)",
	// background: "#fff",
	// overflow: "visible"
}

const defaultFont = {
	fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
	fontWeight: "300",
	lineHeight: "1.5em"
}

const primaryColor = "#278881"
const hoverColor = "#37a891"
const secondaryColor = "#4db6ac"
const headerColor = "#1a1b32"
const warningColor = "#ff9800"
const dangerColor = "#f44336"
const successColor = "#4caf50"
const infoColor = "#00acc1"
const roseColor = "#e91e63"
const grayColor = "#999999"
const sideBarColor = "#434351"

const leftIcon = {
	marginRight: "8px"
}
const primaryBoxShadow = {
	boxShadow:
		"0 12px 20px -10px rgba(55, 168, 145, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(55, 168, 145, 0.28)"
}
const infoBoxShadow = {
	boxShadow:
		"0 12px 20px -10px rgba(0, 188, 212, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 188, 212, 0.2)"
}
const successBoxShadow = {
	boxShadow:
		"0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2)"
}
const warningBoxShadow = {
	boxShadow:
		"0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2)"
}
const dangerBoxShadow = {
	boxShadow:
		"0 12px 20px -10px rgba(244, 67, 54, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2)"
}
const sentiCardHeader = {
	// background: "linear-gradient(60deg, #ffa726, #fb8c00)",
	background: "linear-gradient(60deg, #37a891, #278881)",
	...primaryBoxShadow
}
const orangeCardHeader = {
	background: "linear-gradient(60deg, #ffa726, #fb8c00)",
	...warningBoxShadow
}
const greenCardHeader = {
	background: "linear-gradient(60deg, #66bb6a, #43a047)",
	...successBoxShadow
}
const redCardHeader = {
	background: "linear-gradient(60deg, #ef5350, #e53935)",
	...dangerBoxShadow
}
const blueCardHeader = {
	background: "linear-gradient(60deg, #26c6da, #00acc1)",
	...infoBoxShadow
}
const purpleCardHeader = {
	background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
	...primaryBoxShadow
}

const cardActions = {
	margin: "0 20px 10px",
	paddingTop: "10px",
	borderTop: "1px solid #eeeeee",
	height: "auto",
	...defaultFont
}
const warningCardHeader = {
	color: "#fff",
	background: "linear-gradient(60deg, #ffa726, #fb8c00)",
	...warningBoxShadow
}
const successCardHeader = {
	color: "#fff",
	background: "linear-gradient(60deg, #66bb6a, #43a047)",
	...successBoxShadow
}
const dangerCardHeader = {
	color: "#fff",
	background: "linear-gradient(60deg, #ef5350, #e53935)",
	...dangerBoxShadow
}
const infoCardHeader = {
	color: "#fff",
	background: "linear-gradient(60deg, #26c6da, #00acc1)",
	...infoBoxShadow
}
const primaryCardHeader = {
	color: "#fff",
	background: "linear-gradient(60deg, #37a891, #278881)",
	...primaryBoxShadow
}
const cardHeader = {
	margin: "-20px 15px 0",
	borderRadius: "3px",
	padding: "15px"
}

const defaultBoxShadow = {
	border: "0",
	borderRadius: "3px",
	boxShadow:
		"0 10px 20px -12px rgba(0, 0, 0, 0.12), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.12)",
	padding: "10px 0",
	transition: "all 150ms ease 0s"
}

export {
	leftIcon,
	deviceStatus,
	//variables
	drawerWidth,
	transition,
	boxShadow,
	card,
	defaultFont,
	primaryColor,
	warningColor,
	dangerColor,
	successColor,
	infoColor,
	roseColor,
	grayColor,
	primaryBoxShadow,
	infoBoxShadow,
	successBoxShadow,
	warningBoxShadow,
	dangerBoxShadow,
	orangeCardHeader,
	greenCardHeader,
	redCardHeader,
	blueCardHeader,
	purpleCardHeader,
	cardActions,
	cardHeader,
	defaultBoxShadow,
	warningCardHeader,
	successCardHeader,
	dangerCardHeader,
	infoCardHeader,
	primaryCardHeader,
	secondaryColor,
	sentiCardHeader,
	hoverColor,
	headerColor,
	sideBarColor
}
