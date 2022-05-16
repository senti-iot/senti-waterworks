import { makeStyles } from '@material-ui/styles';

const usageStyle = makeStyles(theme => ({
	container: {
		position: 'relative',
		padding: '0px 0',
		height: '100%'
	},
	callMade: {
		position: 'absolute',
		top: -4,
		right: -12,
		color: '#fff'
	},
	helpOutline: {
		position: 'absolute',
		bottom: -4,
		right: -12,
		color: '#fff'
	},
	itemG: {
		flex: 1
	},
	dialogTitle: {
		marginLeft: 16
	},
	headline: {
		fontSize: 14,
		fontWeight: 'bolder',
		alignSelf: 'flex-end',
		marginLeft: 8,
		position: 'relative',
		top: 6, // to align it with the bottom edge of the icon
		color: '#fff'
	},
	familyIcon: {
		maxWidth: 38,
		height: 'auto'
	},
	cubicValue: {
		color: '#6DD400',
		fontSize: 42,
		marginTop: 8,
		lineHeight: 1,
		[theme.breakpoints.down('lg')]: {
			fontSize: 30
		}
	},
	cubicValueUnit: {
		fontSize: '0.7em',
		color: '#fff'

	},
	blueWaterdrop: {
		marginLeft: 24,
		maxWidth: 36,
		height: 'auto'
	},
	dialogRoot: {
		height: 'calc(100vh - 70px)',
		marginTop: 70,
		// background: theme.appBackground
	},
	fullscreenDialog: {
		width: '100%',
		height: 'calc(100vh - 70px)',
		background: 'transparent',
		display: 'flex',

	},
	closeDialog: {
		position: 'absolute',
		top: 8,
		right: 8
	},
	rightColumnStyle: {
		borderLeft: '1px solid #fff',
		paddingLeft: 16,
		position: 'relative'
	},
	leftColumnStyle: {
		// borderRight: '1px solid #fff',
		paddingRight: 16,
		position: 'relative',
		// flexFlow: 'column'
	},
	hiddenColumnStyle: {
		padding: 0,
		margin: 0,
		width: 0
	},
	flexColumn: {
		flexWrap: 'no-wrap',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '100%'
	},
	clientInfoCont: {
		height: '100% !important'
	}
}))


export default usageStyle