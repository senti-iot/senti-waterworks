import { colors } from '@material-ui/core'
import { bgColors } from './backgroundColors';
import hexToRgba from 'hex-to-rgba'
import { makeStyles } from '@material-ui/styles';
import { darken } from '@material-ui/core/styles';

const containerStyles = makeStyles(theme => ({
	backgroundColor: {
		background: props => bgColors[props.color].background
	},
	gridItemBackground: {
		position: 'relative',
		height: 'calc(100% - 32px)',
		padding: '8px 16px',
		margin: 8,
		background: props => darken(hexToRgba(colors[props.color][700], 0.7), 0.5),
	}
}))

export const paperStyles = makeStyles(theme => ({
	root: {
		background: props => darken(hexToRgba(colors[props.color][700], 0.7), 0.5) + ' !important',
	}
}), { name: 'MuiPaper' })
export default containerStyles