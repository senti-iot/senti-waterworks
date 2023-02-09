import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useLocalization, useState, useSelector } from 'Hooks'
import { Button, FormLabel } from '@material-ui/core'
import DeviceTableExport from './DeviceTableExport'

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
		minWidth: 150,
		width: 150,
		color: '#fff',
		textTransform: 'none',
		borderRadius: 8,
		fontSize: "1rem",
		margin: 20
		// "&:hover": {
		// 	backgroundColor: emphasize(orange[500], 0.2)
		// }
	}
}))

const DeviceTableExportWidget = () => {
	const t = useLocalization()
	const classes = devicesTableWidgetStyles()
	const selectedExportDevices = useSelector(s => s.appState.selectedExportDevices)
	const devices = useSelector(s => s.data.adminDevices)
	const [openTable, setOpenTable] = useState(false)

	const handleOpenTable = () => setOpenTable(true)

	const renderDeviceCount = () => {
		let dCount = 0;
		if (devices !== undefined) {
			dCount = devices.length
		}
	
		let selectedDCount = 0;
		if (selectedExportDevices !== undefined) {
			selectedDCount = selectedExportDevices.length
		}
			
		if (dCount === selectedDCount) {
			return t('charts.allDevices')
		}
		if (selectedDCount === 0) {
			return t('charts.noDevices')
		}
		if (dCount !== selectedDCount) {
			return selectedDCount
		}
	}

	return (
		<>
			<DeviceTableExport openTable={openTable} setOpenTable={setOpenTable} />
			{/* <T className={classes.title}></T> */}
			<FormLabel>
				{`${t('charts.selectedInstallations')}: ${renderDeviceCount()} ${t('charts.devices')}`}
			</FormLabel>
			<Button color={'secondary'} onClick={handleOpenTable} variant={'contained'} className={classes.filterButton}>{t('actions.select')}</Button>
		</>
	)
}

export default DeviceTableExportWidget
