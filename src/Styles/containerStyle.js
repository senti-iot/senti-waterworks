import { makeStyles } from '@material-ui/core'
import { bgColors } from './backgroundColors';

const containerStyles = makeStyles(theme => ({
	backgroundColor: props => {
		console.log(props, bgColors[props.color])
		return ({
			...bgColors[props.color]
		})
	},
	gridItemBackground: props => {
		// console.log(theme.palette)
		return {
			color: '#fff',
			background: 'rgba(0, 0, 0, 0.7)'
		}
	}
}))


export default containerStyles