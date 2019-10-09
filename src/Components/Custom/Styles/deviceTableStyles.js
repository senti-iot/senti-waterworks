import { makeStyles, colors } from '@material-ui/core';
import { bgColors } from 'Styles/backgroundColors';

const deviceTableStyles = makeStyles(theme => ({
	backgroundColor: {
		background: props => bgColors[props.color].background
	},
	dialogRoot: {
		top: 70,
		height: 'calc(100% - 70px)',
		background: 'rgba(0,0,0,0)',
	},
	paperRoot: {
		margin: theme.spacing(5),
		borderRadius: 3,
		// overflow: 'hidden'
	},
	title: {
		padding: 24,
		borderRadius: "3px 3px 0px 0px",
		background: props => colors[props.color][700],
		color: '#fff'

	},

}))

export default deviceTableStyles