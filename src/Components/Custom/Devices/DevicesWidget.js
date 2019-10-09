import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { T, ItemG } from 'Components'
import { useLocalization, useSelector } from 'Hooks'
import { green, red } from '@material-ui/core/colors'
import { KeyboardArrowRight } from 'variables/icons'
import { IconButton } from '@material-ui/core'

const devicesWidgetStyles = makeStyles(theme => ({
	title: {
		marginLeft: 16, marginTop: 16, fontWeight: 600, letterSpacing: 1, height: 32
	},
	text: {
		marginTop: 8,
		fontSize: '1rem'
	},
	devices: {
		minWidth: '100px',
		width: '100px',
		borderBottom: '1px solid white',
		textAlign: 'center',
		fontSize: '1.25rem',
		fontWeight: 500
	},
	activeDevices: {
		color: green[500]
	},
	inactiveDevices: {
		color: red[500]
	},
	widgetButton: {
		position: 'absolute',
		top: 2,
		right: 2
	}
}))


const DevicesWidget = () => {
	const classes = devicesWidgetStyles()
	const t = useLocalization()
	const devices = useSelector(s => s.data.devices)
	const inactiveDevices = devices.filter(d => !d.active)
	const activeDevices = devices.filter(d => d.active)
	return (
		<div>
			<IconButton className={classes.widgetButton}><KeyboardArrowRight /></IconButton>
			<T variant={'h5'} className={classes.title}>{t('charts.devices')}</T>
			<ItemG container>
				<ItemG container direction={'column'} style={{ maxWidth: '45%' }}>
					<ItemG style={{ margin: 16 }} container alignItems={'center'}>
						<T className={classes.text}>{t('charts.device.active')}:</T>
					</ItemG>
					<ItemG style={{ margin: 16 }} container alignItems={'center'}>
						<T className={classes.text}>{t('charts.device.inactive')}:</T>
					</ItemG>
				</ItemG>
				<ItemG container direction={'column'} style={{ maxWidth: '45%' }}>
					{/* <T variant={'h5'} className={classes.title}>{t('charts.devices')}</T> */}
					<ItemG style={{ margin: 16 }} container alignItems={'center'}>
						<T className={classes.devices + " " + classes.activeDevices}>{activeDevices.length}</T>
					</ItemG>
					<ItemG style={{ margin: 16 }} container alignItems={'center'}>
						<T className={classes.devices + " " + classes.inactiveDevices}>{inactiveDevices.length}</T>
					</ItemG>
				</ItemG>
			</ItemG>
		</div>
	)
}

export default DevicesWidget
