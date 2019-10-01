import React from 'react'
import { Button } from '@material-ui/core'
import chartsButtonStyles from '../Styles/chartsButtonStyles'

const ChartsButton = ({ active, ...rest }) => {
	const classes = chartsButtonStyles({ active })
	return (
		<Button {...rest} className={classes.mainButton}>
			{rest.children}
		</Button>
	)
}

export default ChartsButton
