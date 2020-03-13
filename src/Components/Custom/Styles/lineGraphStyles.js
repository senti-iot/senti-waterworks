import { makeStyles } from '@material-ui/styles'

const lineStyles = makeStyles(theme => ({
	axisLineBlack: {
		stroke: 'none',
		fill: 'rgba(255,255,255,0.1)'
	},
	axisLineWhite: {
		stroke: 'none',
		fill: 'rgba(255,255,255,0.1)'
	},
	axis: {
		stroke: 'none'
	},
	axisText: {
		fill: 'currentColor',
		fontWeight: 600,
		fontSize: '1rem'
	},
	axisTick: {
		fill: 'currentColor',
		fontWeight: 600,
		fontSize: '0.75rem'
	},
	hiddenMedianLine: {
		stroke: '#fff',
		opacity: 0,
		strokeWidth: '6px'
	},

}))

export default lineStyles