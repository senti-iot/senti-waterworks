import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { T } from 'Components'
import { useLocalization } from 'Hooks'
import { Button } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'
import { emphasize } from '@material-ui/core/styles'

const devicesTableWidgetStyles = makeStyles(theme => ({
	title: {
		marginLeft: 16, marginTop: 16, fontWeight: 600, letterSpacing: 1, height: 32
	},
	text: {
		marginLeft: 16,
		marginTop: 16,
		fontSize: '1.25rem'
	},
	filterButton: {
		position: 'absolute',
		bottom: 16,
		right: 16,
		background: orange[500],
		minWidth: 150,
		width: 150,
		color: '#fff',
		textTransform: 'none',
		borderRadius: 8,
		fontSize: "1rem",
		"&:hover": {
			backgroundColor: emphasize(orange[500], 0.2)
		}
	}
}))


const DeviceTableWidget = () => {
	const t = useLocalization()
	const classes = devicesTableWidgetStyles()
	return (
		<div>
			<T variant={'h5'} className={classes.title}>{t('charts.selectedDevices')}</T>
			<T className={classes.text}>{`${t('charts.seeing')}: ${2} ${t('charts.devices')}`}</T>
			<Button variant={'contained'} className={classes.filterButton}>{t('actions.filter')}</Button>
		</div>
	)
}

export default DeviceTableWidget
