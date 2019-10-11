import { makeStyles } from '@material-ui/styles';

const tcStyles = makeStyles(theme => ({
	tablecellPadding: {
		padding: 9
	},
	tableCell: {
		// paddingRight: "8px",
		// padding: 0,
		[theme.breakpoints.down('sm')]: {
			paddingRight: 4,
			padding: 0,
		},
		'&:last-child': {
			paddingRight: 8
		}
	},
	tableCellCheckbox: {
		width: 35,
	},
	center: {
		textAlign: 'center'
	}
}))

export default tcStyles