import { makeStyles } from '@material-ui/styles';
import hexToRgba from 'hex-to-rgba'

const selectSecondType = chId => {
	switch (chId) {
		case 'waterusage':
			return 'waterUsageLine'
		case 'temperature':
			return 'ambientTempLine'
		case 'waterflow':
			return 'maxFlowLine'
		case 'readings':
			return 'readingLine'
		default:
			break;
	}
}
const selectType = chId => {
	switch (chId) {
		case 'waterusage':
			return 'waterUsageLine'
		case 'temperature':
			return 'waterTempLine'
		case 'waterflow':
			return 'minFlowLine'
		case 'readings':
			return 'readingLine'
		default:
			break;
	}
}
const lineStyles = makeStyles(theme => ({
	waterusageL: {
		fill: 'none',
		stroke: () => theme.chart.waterUsageLine,
		strokeWidth: '4px'
	},
	benchmark: {
		fill: 'none',
		stroke: () => theme.chart.waterUsageLine,
		strokeWidth: '4px'
	},
	tempAmbient: {
		fill: 'none',
		stroke: () => theme.chart.ambientTempLine,
		strokeWidth: '4px'
	},
	tempWater: {
		fill: 'none',
		stroke: () => theme.chart.waterTempLine,
		strokeWidth: '4px'
	},
	maxFlow: {
		fill: 'none',
		stroke: () => theme.chart.waterUsageLine,
		strokeWidth: '4px'
	},
	minFlow: {
		fill: 'none',
		stroke: () => theme.chart.waterUsageLine,
		strokeWidth: '4px'
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
	medianLine: {
		fill: 'none',
		stroke: theme.chart.medianLine,
		strokeWidth: '4px'
	},
	prevArea: {
		fill: 'rgba(255,255,255, 0.1)',
	},
	dot: {
		fill: props => theme.chart[selectType(props.id)],
		// transition: '100ms all ease'
	},
	secondaryDot: {
		fill: props => theme.chart[selectSecondType(props.id)],
		// transition: '100ms all ease'
	},
	medianTooltip: {
		position: "absolute",
		textAlign: "center",
		width: '72px',
		height: '36px',
		// background: theme.palette.type === 'light' ? '#eee' : '#424242',
		border: 0,
		borderRadius: 4,
		zIndex: -1,
		transition: '300ms all ease'
	},
	waterusageLArea: {
		fill: ({ id }) => hexToRgba(theme.chart[selectType(id)], 0.1),
	},
	tempAmbientArea: {
		fill: ({ id }) => hexToRgba(theme.chart[selectType(id)], 0.1),
	},
	tempWaterArea: {
		fill: ({ id }) => hexToRgba(theme.chart[selectType(id)], 0.1),
	},
	maxFlowArea: {
		fill: ({ id }) => hexToRgba(theme.chart[selectType(id)], 0.1),
	},
	minFlowArea: {
		fill: ({ id }) => hexToRgba(theme.chart[selectType(id)], 0.1),
	},
}))

export default lineStyles