/* eslint-disable indent */
import React, { useState } from 'react'
import { makeStyles, Typography, Box } from '@material-ui/core'
import ParallaxSlide from './ParallaxSlide'

import VelkommenTil from './VelkommenTil'
import PieCharts from './PieCharts'
import LineGraph from './LineGraph'
import UsageStatus from './UsageStatus'

const useStyles = makeStyles(theme => ({
	background: {
		background: `linear-gradient(to bottom,#64b5f6,rgb(19,90,145))`,
		height: '100vh'
	},
	dotContainer: {
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		height: 60,
		display: 'flex',
		justifyContent: 'center'
	},
	dotWhite: {
		width: 10,
		height: 10,
		borderRadius: '50%',
		margin: '0 5px 0 5px',
		border: '1px solid #fff'
	},
	dotOrange: {
		width: 10,
		height: 10,
		borderRadius: '50%',
		margin: '0 5px 0 5px',
		border: `1px solid ${theme.palette.secondary.main}`,
		background: theme.palette.secondary.main
	},
	skip: {
		cursor: 'pointer',
		position: 'absolute',
		bottom: 16,
		right: 24,
		color: '#fff',
		fontSize: 18,
		fontWeight: 300
	}
}))

const WelcomeScreen = props => {
	const [currStep, setCurrStep] = useState(0)

	const screens = [
		{
			step: 0,
			component: VelkommenTil
		},
		{
			step: 1,
			component: PieCharts
		},
		{
			step: 2,
			component: LineGraph
		},
		{
			step: 3,
			component: UsageStatus
		}
	]

	const handleSkip = () => {
		setCurrStep(4)
	}

	const handleChangeIndex = value => setCurrStep(value)

	const classes = useStyles()

	return (
		<div className={classes.background}>
			{/* swipeable views for different screens */}
			<ParallaxSlide onChangeIndex={handleChangeIndex}>
				{({ injectStyle }) =>
					screens.map(({ step, component }, i) => (
						<Box key={step}>
							{component()}
						</Box>
					))
				}
			</ParallaxSlide>

			{/* dots indicator */}
			<div className={classes.dotContainer}>
				{screens.map(({ step }) => (
					<div
						key={step}
						className={step === currStep ? classes.dotOrange : classes.dotWhite}
					/>
				))}
			</div>
			<Typography onClick={handleSkip}
				variant="body1" className={classes.skip}
			>Skip</Typography>
		</div>
	)
}

export default WelcomeScreen