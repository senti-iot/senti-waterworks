import React from 'react'
import { T } from 'Components'
import { useLocalization, useState, useSelector } from 'Hooks'
import { Button } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'
import { emphasize } from '@material-ui/core/styles'
import DeviceTable from './DeviceTable'
import styled from 'styled-components'
import size from 'Styles/themes/mediaQueries'

const Title = styled(T)`
	@media ${size.down.md} {
		margin-top: 8px;
		margin-left: 8px;
		font-size: 1em;
	}
	margin: 16px;
	font-weight: 600;
	font-size: 1.5em;
	letter-spacing: 1.5px;
`
const FilterButton = styled(Button)`
	position: absolute;
	@media ${size.down.md} {
		min-width: 50px;
		height: 28px;
		padding: 0px;
		width: 100px;
		bottom: 8px;
		font-size: 0.875em;
	}
	bottom: 16px;
	right: 16px;
	background: ${orange[500]};
	min-width: 150px;
	width: 150px;
	color: #fff;
	text-transform: none;
	border-radius: 8px;
	font-size: 1em;
	&:hover {
		background: ${emphasize(orange[500], 0.2)}
	}
`

const Text = styled(T)`
	@media ${size.down.md} {
		margin-left: 8px;
		margin-top: 8px;
		font-size: 0.875em;
	}
	margin-left: 16px;
	margin-top: 16px;
	font-size: 1.25rem;
`

const renderDeviceCount = (t, dCount, selectedDCount) => {
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
const DeviceTableWidget = () => {
	const t = useLocalization()
	const selectedDevices = useSelector(s => s.appState.selectedDevices)
	const devices = useSelector(s => s.data.devices)
	const [openTable, setOpenTable] = useState(false)

	const handleOpenTable = () => setOpenTable(true)

	return (
		<>
			<DeviceTable openTable={openTable} setOpenTable={setOpenTable} />
			<Title variant={'h5'}>{t('charts.selectedDevices')}</Title>
			<Text>{`${t('charts.seeing')}: ${renderDeviceCount(t, devices.length, selectedDevices.length)} ${t('charts.devices')}`}</Text>
			<FilterButton onClick={handleOpenTable} variant={'contained'}>{t('actions.filter')}</FilterButton>
		</>
	)
}

export default DeviceTableWidget
