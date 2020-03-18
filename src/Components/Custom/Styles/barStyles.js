import { makeStyles } from '@material-ui/styles'
import { orange, deepOrange, yellow, teal } from '@material-ui/core/colors'

const useBarStyles = makeStyles(theme => ({
	legendBullet: {
		width: 10,
		height: 10,
		borderRadius: 10
	},
	axisLabel: {
		fill: "none",
		fontWeight: 600
	},
	textLabel: {
		fill: '#fff',
		fontWeight: 500,
		fontSize: 16,
		[theme.breakpoints.down('lg')]: {
			fontSize: 12
		},
	},
	xAxisPath: {
		rx: 8,
		strokeWidth: 1,
		stroke: "#ffffff"
	},
	xAxisLine: {
		rx: 8,
		strokeWidth: 1,
		stroke: "none",
		// fill: "#ffffff"
	},
	xAxis: {
		rx: 8,
		strokeWidth: 1,
		fill: "#ffffff"
	},
	waterUsageA: {
		rx: 4,
		fill: orange[500],
		background: orange[500]
	},
	waterUsageB: {
		rx: 4,
		fill: deepOrange[500],
		background: deepOrange[500]
	},
	waterUsageC: {
		rx: 4,
		fill: yellow[500],
		background: yellow[500]
	},
	waterUsageD: {
		rx: 4,
		fill: teal[500],
		background: teal[500]
	}
}))

export default useBarStyles