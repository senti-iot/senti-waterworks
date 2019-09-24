import React from 'react'
import { Grid, CircularProgress, Fade } from '@material-ui/core';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles';

const clStyles = makeStyles(theme => ({
	grid: {
		minHeight: 'calc(100vh - 300px)'
	}
}))


const CircularLoader = (props) => {
	const { notCentered, className } = props
	const classes = clStyles()
	return (
		<Grid container justify={'center'} alignItems='center' className={(notCentered ? '' : classes.grid) + ' ' + className}>
			<Fade in={true}>
				<CircularProgress />
			</Fade>
		</Grid>
	)

}
CircularLoader.propTypes = {
	notCentered: PropTypes.bool
}
export default CircularLoader