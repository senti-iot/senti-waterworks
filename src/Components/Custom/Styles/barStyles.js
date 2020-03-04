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
		fontWeight: 500
	},
	xAxisPath: {
		rx: 8,
		strokeWidth: 1,
		stroke: "#ffffffAA"
	},
	xAxisLine: {
		rx: 8,
		strokeWidth: 1,
		stroke: "none",
		// fill: "#ffffffAA"
	},
	xAxis: {
		rx: 8,
		strokeWidth: 1,
		fill: "#ffffffAA"
	},
	A: {
		rx: 4,
		fill: orange[500],
		background: orange[500]
	},
	B: {
		rx: 4,
		fill: deepOrange[500],
		background: deepOrange[500]
	},
	C: {
		rx: 4,
		fill: yellow[500],
		background: yellow[500]
	},
	D: {
		rx: 4,
		fill: teal[500],
		background: teal[500]
	}
}))

export default useBarStyles