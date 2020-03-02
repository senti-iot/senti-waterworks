import React, { useState } from 'react'
import ChartTable from 'Components/Custom/Bars/ChartTable'
import ItemG from 'Components/Containers/ItemG'
import { ChartSmallTitle } from 'Components/Custom/ChartTitle/ChartTitle'
import { useLocalization } from 'Hooks'
import { SettingsIcon } from 'variables/icons'
import Dropdown from 'Components/Dropdown/Dropdown'

const BarsContainer = props => {
	//Hooks
	const t = useLocalization()
	//Redux

	//State
	const [chartType, setChartType] = useState(0)

	//Const
	const { chart } = props
	//useCallbacks

	//useEffects

	//Handlers
	const renderChart = () => {
		switch (chartType) {
			case 0:
				return <ChartTable chart={props.chart} />
			case 1:
				return <div>Bars</div>
			default:
				return null
		}
	}
	return <ItemG container>

		<ItemG container xs={12} justify={'space-between'}>
			<ChartSmallTitle variant={'h6'}>{t(`charts.types.${chart}`)}</ChartSmallTitle>
			<Dropdown
				icon={<SettingsIcon />}
				menuItems={
					[
						{ label: "Text", func: () => setChartType(0) },
						{ label: "Bars", func: () => setChartType(1) }
					]
				}
			/>
		</ItemG>
		{renderChart()}
	</ItemG>


}

export default BarsContainer
