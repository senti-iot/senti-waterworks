/* eslint-disable indent */
import React, { Fragment } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
// import { ChevronRight } from '../../../variables/icons'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
	flex: {
		display: 'flex',
		justifyContent: 'space-between',
		color: '#fff'
	},
	chevronRight: {
		color: '#fff',
		width: 30,
		height: 30,
		position: 'relative',
		right: -8,
		cursor: 'pointer'
	},
	body1: {
		fontSize: 16,
		color: '#fff',
		margin: '4px 0'
	},
	priceTag: {
		marginLeft: 8,
		color: '#6DD400',
		fontSize: 26,

		// textDecoration: 'underline #fff',
		// paddingBottom: 2,
		borderBottom: '2px solid #fff',
		// textDecorationStyle: 'solid'
	},
	title: {
		margin: '8px 0 16px 0',
		fontWeight: 500,
		[theme.breakpoints.down('lg')]: {
			margin: '8px 0px 8px 0px'
		}
	}
}))

const PriceChart = props => {
	//Hooks
	const classes = useStyles()

	//Redux
	const priceData = useSelector(s => s.data.priceData)

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers


	// const handleClick = () => {
	// 	//TODO
	// }

	return (
		<Fragment>
			<div className={classes.flex}>
				<Typography variant="h5" style={{}}>Afregning</Typography>
				{/* <ChevronRight className={classes.chevronRight} onClick={handleClick} /> */}
			</div>
			<Typography variant="body1" gutterBottom={false} className={classes.body1}>Vand: Kr. {priceData.waterusage}</Typography>
			<div className={classes.flex} style={{ maxHeight: 32, overflow: 'visible', alignItems: 'flex-end' }}>
				<Typography variant="body1" gutterBottom={false} className={classes.body1}>Spildevand: Kr. {priceData.sewage}</Typography>
				<Typography variant="body1" gutterBottom={false} className={classes.body1}>
					Total:
          			<span className={classes.priceTag}>
						Kr. {priceData.total}
					</span>
				</Typography>
			</div>
		</Fragment>
	)
}

export default PriceChart