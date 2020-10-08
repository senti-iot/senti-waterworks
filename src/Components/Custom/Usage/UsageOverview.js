/* eslint-disable indent */
import React, { Fragment } from 'react'
import { makeStyles, IconButton } from '@material-ui/core'
import { Close } from '../../../variables/icons'

import UsageStatistics from './UsageStatistics'
import UsageTips from './UsageTips'

const useStyles = makeStyles(theme => ({
	closeDialog: {
		position: 'absolute',
		top: 8,
		right: 8,
		color: '#fff'
	}
}))

const UsageOverview = props => {

	const classes = useStyles()

	return (


		<Fragment>
			<UsageStatistics />
			<UsageTips /* setDescriptionOpen={setDescriptionOpen} setChosenDescription={setChosenDescription} */ />
			<IconButton size="small" className={classes.closeDialog} onClick={() => props.closeDialog(false)}>
				<Close />
			</IconButton>
		</Fragment>

	)
}

export default UsageOverview