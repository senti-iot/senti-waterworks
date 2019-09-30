import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';
import { headerColor } from 'Styles/mainStyles';
import { emphasize } from '@material-ui/core/styles';



const chartsButtonStyles = makeStyles(theme => ({
	mainButton: {
		background: ({ active }) => active ? colors['orange'][500] : headerColor,
		color: '#fff',
		"&:hover": {
			backgroundColor: ({ active }) => active ? emphasize(colors['orange'][500], 0.2) : emphasize(headerColor, 0.2)
		}
	}

}))


export default chartsButtonStyles