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
		width: 64,
		height: 64,
		transform: 'translate(-42px, 0px)',
		[theme.breakpoints.down('lg')]: {
			width: 48,
			height: 48,
			transform: 'translate(-34px, 0px)'
		},
		[theme.breakpoints.down('md')]: {
			width: 32,
			height: 32,
			transform: 'translate(-26px, 0px)'
		}
	}

}))

export default lineStyles