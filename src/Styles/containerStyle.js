import { colors } from '@material-ui/core'
import { bgColors } from './backgroundColors';
import { darken } from '@material-ui/core/styles';
import hexToRgba from 'hex-to-rgba'
import { makeStyles } from '@material-ui/styles';

const containerStyles = makeStyles(theme => ({
	backgroundColor: {
		background: props => bgColors[props.color].background + ' !important'
	},
	gridItemBackground: {
		position: 'relative',
		height: 'calc(100% - 32px)',
		padding: '8px 16px',
		margin: 8,
		// margin: 30,
		color: '#fff',
		background: props => darken(hexToRgba(colors[props.color][700], 0.7), 0.5) + ' !important',
	}
}))


export default containerStyles