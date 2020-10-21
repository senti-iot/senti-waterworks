import { GridContainer, InfoCard, ItemG, PageHeader } from 'Components'
import { Devices as DeviceIcon } from 'variables/icons'
import React from 'react'
import FullDeviceTable from 'Components/Custom/DevicesTable/FullDeviceTable'

const Devices = () => {
	//Hooks

	//Redux

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	return (
		<GridContainer>
			<ItemG xs={12} noMargin noPadding>
				<PageHeader
					label={'sidebar.devices'}
					icon={DeviceIcon}

				/>
			</ItemG>
			<ItemG xs={12}>
				<InfoCard
					noAvatar
					noHeader
					noExpand
					content={<FullDeviceTable />}
				/>
			</ItemG>
		</GridContainer>
	)
}

export default Devices
