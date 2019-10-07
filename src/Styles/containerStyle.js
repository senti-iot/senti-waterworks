import { makeStyles, colors } from '@material-ui/core'
import { bgColors } from './backgroundColors';
import { darken } from '@material-ui/core/styles';
import hexToRgba from 'hex-to-rgba'

const containerStyles = makeStyles(theme => ({
	backgroundColor: props => {
		return ({
			...bgColors[props.color]
		})
	},
	gridItemBackground: props => {
		return {
			position: 'relative',
			height: 'calc(100% - 32px)',
			padding: '8px 16px',
			margin: 8,
			// margin: 30,
			color: '#fff',
			background: darken(hexToRgba(colors[props.color][700], 0.7), 0.5),
		}
	}
}))


export default containerStyles