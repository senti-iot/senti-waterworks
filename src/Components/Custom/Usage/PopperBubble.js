import React from 'react'
import { Popper, Paper, Typography, Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	popperTop: {
		padding: 16,
		position: 'relative',
		top: -15,
		maxWidth: 360,
		'&:after': {
			content: '""',
			position: 'absolute',
			bottom: -16,
			left: '50%',
			right: '50%',
			transform: 'translateX(-40%)', // not 50% because it's not symmetrical
			width: 0,
			height: 0,
			borderLeft: '16px solid transparent',
			borderRight: "16px solid transparent",
			borderTop: '16px solid #fff'
		}
	},
	popperBottom: {
		padding: 16,
		position: 'relative',
		bottom: -15,
		maxWidth: 360,
		'&:after': {
			content: '""',
			position: 'absolute',
			top: -16,
			left: '50%',
			right: '50%',
			transform: 'translateX(-40%)', // not 50% because it's not symmetrical
			width: 0,
			height: 0,
			borderLeft: '16px solid transparent',
			borderRight: "16px solid transparent",
			borderBottom: '16px solid #fff'
		}
	},
	popperLeft: {
		padding: 16,
		position: 'relative',
		left: -15,
		maxWidth: 360,
		'&:after': {
			content: '""',
			position: 'absolute',
			right: -16,
			top: '50%',
			bottom: '50%',
			transform: 'translateY(-40%)', // not 50% because it's not symmetrical
			width: 0,
			height: 0,
			borderTop: '16px solid transparent',
			borderLeft: '16px solid #fff',
			borderBottom: '16px solid transparent'
		}
	},
	popperRight: {
		padding: 16,
		position: 'relative',
		right: -15,
		maxWidth: 360,
		'&:after': {
			content: '""',
			position: 'absolute',
			left: -16,
			top: '50%',
			bottom: '50%',
			transform: 'translateY(-40%)', // not 50% because it's not symmetrical
			width: 0,
			height: 0,
			borderTop: '16px solid transparent',
			borderBottom: "16px solid transparent",
			borderRight: '16px solid #fff'
		}
	},
	popperItalicTxt: {
		fontStyle: 'italic',
		cursor: 'pointer'
	},
	popperBtn: {
		color: '#fff'
	}
}))

const PopperBubble = ({ open, anchorEl, placement, headline, body }) => {
	const classes = useStyles()

	return (
		<Popper open={open} anchorEl={anchorEl} placement={placement}>
			<Paper
				className={
					placement === 'bottom' ? classes.popperBottom :
						placement === 'left' ? classes.popperLeft :
							placement === 'right' ? classes.popperRight : classes.popperTop
				}
			>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Typography variant="body2" className={classes.popperItalicTxt}>Spring over rundvisning</Typography>
				</div>
				<Typography variant="h5" gutterBottom>{headline}</Typography>
				<Typography variant="body1">{body}</Typography>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button variant="contained" color="secondary" className={classes.popperBtn}>Næste</Button>
				</div>
			</Paper>
		</Popper>
	)
}

export default PopperBubble