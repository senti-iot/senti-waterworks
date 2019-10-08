import { makeStyles } from '@material-ui/styles'
import { bgColors } from './backgroundColors'
import { darken } from '@material-ui/core/styles'
import hexToRgba from 'hex-to-rgba'
import { colors } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { primaryColor } from './mainStyles'

const tableStyles = makeStyles(theme => ({
	backgroundColor: {
		background: props => { return bgColors[props.color].background}
		// return ({
		// ...bgColors[props.color]
		// })
	},
	gridItemBackground: {
		position: 'relative',
		height: 'calc(100% - 32px)',
		padding: '8px 16px',
		margin: 8,
		// margin: 30,
		color: '#fff',
		background: props => darken(hexToRgba(colors[props.color][700], 0.7), 0.5),
	},
	header: {
		[theme.breakpoints.down('sm')]: {
			paddingRight: 4,
			padding: 0,
		},
		backgroundColor: grey[400],
		// color: grey[200]
	},
	tablecellcheckbox: {
		[theme.breakpoints.down("sm")]: {
			width: '35px'
		},
		[theme.breakpoints.down("md")]: {
			width: '45px'
		},
		fontSize: '0.875rem',
		borderTop: "1px solid rgba(224, 224, 224, 1)",
		/*padding: 0, */
		width: '50px',
	},
	tableCell: {
		borderTop: "1px solid rgba(224, 224, 224, 1)",
	},
	centered: {
		textAlign: 'center'
	},
	noCheckbox: {
		padding: 10
	},
	HeaderLabelActive: {
		width: "100%",
		color: grey[800],
		"&:hover": {
			color: "#fff"
		},
		"&:focus": {
			color: grey[900]
		}
	},
	hideIcon: {
		display: "none",
		// position: 'absolute',
		// left: '90%'
	},
	paragraphCell: {
		color: "inherit",
		margin: 0,
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis"
	},
	checkbox: {
		color: grey[800],
		'&$checked': {
			color: primaryColor
		},
	},
	checked: {},
})
)

export default tableStyles

