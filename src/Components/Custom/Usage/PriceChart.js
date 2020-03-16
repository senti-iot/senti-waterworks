/* eslint-disable indent */
import React from 'react'
import { makeStyles, Typography, IconButton } from '@material-ui/core'
// import { ChevronRight } from '../../../variables/icons'
import { useSelector } from 'react-redux'
import { useLocalization } from 'Hooks'
import creditCard from 'assets/icons/credit-card.svg'
import { CallMade, HelpOutline } from 'variables/icons'

const useStyles = makeStyles(theme => ({
	headline: {
		fontSize: 16,
		fontWeight: 400,
		alignSelf: 'flex-end',
		marginLeft: 8,
		position: 'relative',
		color: '#fff'
	},
	flex: {
		display: 'flex',
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
	},
	title: {
		margin: '8px 0 16px 0',
		fontWeight: 500,
		[theme.breakpoints.down('lg')]: {
			margin: '8px 0px 8px 0px'
		}
	},
	header: {
		display: 'flex',
		color: '#fff',
		marginBottom: 16
	},
	callMade: {
		position: 'absolute',
		top: -4,
		right: -12,
		color: '#fff'
	},
	helpOutline: {
		position: 'absolute',
		bottom: -4,
		right: -12,
		color: '#fff'
	}
}))

const PriceChart = props => {
	const t = useLocalization()
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
		<div style={{ position: 'relative', height: '100%' }}>
			<div className={classes.header}>
				<img src={creditCard} alt="senti-credit-card" />
				<Typography variant="body1" className={classes.headline}>{t('Usage.dashboardPrice.headline')}</Typography>
				{/* <ChevronRight className={classes.chevronRight} onClick={handleClick} /> */}
			</div>
			<Typography variant="body1" gutterBottom={false} className={classes.body1}>{t('Usage.dashboardPrice.water')}{priceData.waterusage}</Typography>
			<div className={classes.flex} style={{ maxHeight: 32, overflow: 'visible', alignItems: 'flex-end' }}>
				<Typography variant="body1" gutterBottom={false} className={classes.body1}>{t('Usage.dashboardPrice.sewage')}{priceData.sewage}</Typography>
				<Typography variant="body1" gutterBottom={false} className={classes.body1} style={{ lineHeight: '1.5em', marginLeft: 48 }}>
					Total:
          			<span className={classes.priceTag}>
						Kr. {priceData.total}
					</span>
				</Typography>
			</div>

			<IconButton size="small" className={classes.callMade} onClick={() => { }}>
				<CallMade />
			</IconButton>
			<IconButton size="small" className={classes.helpOutline} onClick={() => { }}>
				<HelpOutline />
			</IconButton>
		</div>
	)
}

export default PriceChart