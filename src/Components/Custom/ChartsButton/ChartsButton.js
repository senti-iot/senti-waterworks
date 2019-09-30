import React from 'react'
import { Button } from '@material-ui/core'
import chartsButtonStyles from '../Styles/chartsButtonStyles'

const ChartsButton = ({ active, ...rest }) => {
	const classes = chartsButtonStyles({ active })
	// const buttonClasses = cx({
	// 	[classes.mainButton]: true,
	// 	[classes.mainButtonHover]: !props.active,
	// 	[classes.mainButtonHoverActive]: props.active
	// })
	return (
		<Button {...rest} className={classes.mainButton}>
			{rest.children}
		</Button>
	)
}

export default ChartsButton
