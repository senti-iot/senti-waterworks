import React from 'react'
import { Typography } from '@material-ui/core';
import cx from 'classnames'
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles(theme => ({
	bold: {
		fontWeight: 600
	},
	reversed: {
		color: "#fff"
	}
}))

const T = (props) => {
	let classes = styles()
	let classNames = cx({
		[classes.reversed]: props.reversed,
		[classes.bold]: props.b
	})
	return (
		<Typography noWrap={props.noWrap} color={props.color} paragraph={props.paragraph ? props.paragraph : undefined} style={props.style} className={props.className + ' ' + classNames} variant={props.variant ? props.variant : 'body2'}>
			{props.children}
		</Typography>
	)
}
export default T