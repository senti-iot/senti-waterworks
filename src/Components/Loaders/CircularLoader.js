import React from 'react'
import { Grid, CircularProgress, Fade } from '@material-ui/core';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles';
import cx from 'classnames'
import T from 'Components/Typography/T'
import ItemG from 'Components/Containers/ItemG'
const clStyles = makeStyles(() => ({
	grid: {
		minHeight: 'calc(100vh - 300px)'
	},
	fill: {
		height: '100%',
		width: '100%'
	}
}))


const CircularLoader = (props) => {
	const { notCentered, className, fill } = props
	const classes = clStyles()
	const gridClasses = cx({
		[classes.grid]: notCentered,
		[classes.fill]: fill,
		[className]: className ? true : false
	})
	return (
		<Grid container justify={'center'} alignItems='center' className={gridClasses} style={props.style}>
			<Fade in={true}>
				<ItemG container alignItems={'center'} justify={'center'}>
					<ItemG xs={12} container justify={'center'}>
						<CircularProgress />
					</ItemG>
					<ItemG>
						<T>{props.label}</T>
					</ItemG>
				</ItemG>
			</Fade>
		</Grid>
	)

}
CircularLoader.propTypes = {
	notCentered: PropTypes.bool
}
export default CircularLoader