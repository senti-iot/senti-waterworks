import { blue, orange, red } from '@material-ui/core/colors'
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
	yAxisLine: {
		stroke: '#ffffff33'
	},
	hiddenMedianLine: {
		stroke: '#fff',
		opacity: 0,
		strokeWidth: '6px'
	},
	weatherIcon: {
		width: 38,
		height: 38,
		transform: 'translate(-34px, 0px)',
		[theme.breakpoints.down('lg')]: {
			width: 32,
			height: 32,
			transform: 'translate(-24px, 0px)'
		},
		[theme.breakpoints.down('md')]: {
			width: 24,
			height: 24,
			transform: 'translate(-17px, 0px)'
		}
	},
	waterusageLA: {
		rx: 4,
		fill: orange[300],
		// background: orange[500]
	},
	waterusageLB: {
		rx: 4,
		fill: orange[500],
		// background: orange[500]
	},
	tempWaterA: {
		rx: 4,
		fill: blue[300],
		// background: orange[500]
	},
	tempWaterB: {
		rx: 4,
		fill: blue[500],
		// background: orange[500]
	},
	tempAmbientA: {
		rx: 4,
		fill: red[300],
		// background: orange[500]
	},
	tempAmbientB: {
		rx: 4,
		fill: red[500],
		// background: orange[500]
	}
}))

export default lineStyles