import React from 'react'
import { Box, makeStyles, Fade, Collapse } from '@material-ui/core'
import { red, orange, green } from '@material-ui/core/colors'
import T from 'Components/Typography/T'
import cx from 'classnames'
import { WarningIcon, ErrorIcon } from 'variables/icons'
import ItemG from 'Components/Containers/ItemG'
const useStyles = makeStyles(theme => ({
	success: {
		background: green[400]
	},
	error: {
		background: red[500]
	},
	warning: {
		background: orange[300]
	},
	smallBox: {
		padding: 8
	},
	box: {
		borderRadius: 8
	},
	mediumBox: {
		padding: 16
	},
	largeBox: {
		padding: 32
	},
	text: {
		color: '#fff'
	},
	icon: {
		marginRight: 8,
		color: '#fff'
	}

}))

const Warning = (props) => {
	//Hooks
	const classes = useStyles()
	//Redux

	//State

	//Const
	const { size, type, label, open } = props
	const boxClasses = cx({
		[classes.box]: true,
		[classes.mediumBox]: !size ? true : false,
		[classes.smallBox]: size === "small" ? true : false,
		[classes.largeBox]: size === 'large' ? true : false,
		[classes.error]: type === 'error' ? true : false,
		[classes.warning]: type === 'warning' || !type ? true : false,
		[classes.success]: type === 'success' ? true : false
	})
	//useCallbacks

	//useEffects

	//Handlers
	const renderIcon = () => {
		switch (type) {
			case 'warning':
				return <WarningIcon className={classes.icon} />
			case 'success':
			case 'error':
				return <ErrorIcon className={classes.icon} />
			default:
				break
		}
	}
	return (
		<Collapse in={open}>
			<Fade in={open}>
				<Box className={boxClasses}>
					<ItemG container alignItems={'center'} wrap={'nowrap'}>
						{renderIcon()}
						<T className={classes.text}>{label}</T>
					</ItemG>
				</Box>
			</Fade>
		</Collapse>
	)
}



export default Warning
