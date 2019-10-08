import { makeStyles } from '@material-ui/core';
import { bgColors } from 'Styles/backgroundColors';

const deviceTableStyles = makeStyles(theme => ({
	backgroundColor: props => {
		return ({
			...bgColors[props.color]
		})
	},
	dialogRoot: {
		top: 70,
		height: 'calc(100% - 70px)'
	},
	paperRoot: {
		margin: theme.spacing(5),
		borderRadius: 3
	},
	
}))

export default deviceTableStyles