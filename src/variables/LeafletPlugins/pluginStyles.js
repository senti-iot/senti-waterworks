import { makeStyles } from '@material-ui/styles'


const pluginStyles = makeStyles(theme => ({
	fullscreenButton: {
		background: theme.palette.type !== 'dark' ? '#fff' : "#424242",
		color: theme.palette.type !== 'dark' ? 'inherit' : "#fff",
		"&:hover": {
			background: theme.palette.primary.main,
			color: "#fff",
			borderRadius: 2,

		},
		padding: 4,
		borderRadius: 2,
	},
	fullscreenOn: {
		width: '100%!important',
		height: '100%!important'
	},
	pseudoFullscreen: {
		position: "fixed!important",
		width: "100%!important",
		height: "100%!important",
		top: "0!important",
		left: "0!important",
		zIndex: 99999,
	}
}))

export default pluginStyles