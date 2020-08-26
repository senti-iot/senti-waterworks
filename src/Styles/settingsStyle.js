import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

export const settingsStyles = makeStyles(theme => ({
	closeButton: {
		color: "#fff"
	},
	avatar: {
		background: '#fff',
		color: theme.headerColor,
		borderRadius: 8
	},
	cardHeader: {
		display: 'flex',
		justifyContent: 'center',
		background: theme.headerColor,
		borderRadius: "4px 4px 0px 0px"
	},
	list: {
		width: "100%"
	},
	formControl: {
		marginTop: 16,
		marginBottom: 8,
		minWidth: 208,
	},
	iconColor: {
		// fill: theme.palette.type === 'light' ? "rgba(0, 0, 0, 0.54)" : '#fff',
		cursor: "pointer"
	},
	p: {
		// marginBottom: theme.spacing(1)
	},
	title: {
		fontWeight: 500
	},
	icon: {
		// color: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.54)' : '#fff',
		marginRight: 4
	},
	red: {
		// color: '#fff',
		color: red[600],
		// ...dangerBoxShadow,
		"&:hover": {
			color: red[800]
		}
	}
}))