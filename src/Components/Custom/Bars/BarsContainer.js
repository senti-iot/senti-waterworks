import React, { useState } from 'react'
import ChartTable from 'Components/Custom/Bars/ChartTable'
import ItemG from 'Components/Containers/ItemG'
import { ChartSmallTitle } from 'Components/Custom/ChartTitle/ChartTitle'
import { useLocalization } from 'Hooks'
import { SettingsIcon } from 'variables/icons'
import Dropdown from 'Components/Dropdown/Dropdown'
import BarGraph from 'Components/Graphs/BarGraph'

const BarsContainer = props => {
	//Hooks
	const t = useLocalization()
	//Redux

	//State
	const [chartType, setChartType] = useState(1)

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
				return <BarGraph chart={props.chart} />
			default:
				return null
		}
	}
	return <ItemG container style={{ height: '100%', flexFlow: 'column', }}>

		<ItemG container xs={1} justify={'space-between'} alignItems={'flex-start'} style={{ maxWidth: '100%' }}>
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
		<ItemG xs={12} style={{ height: '100%' }}>

			{renderChart()}
		</ItemG>
	</ItemG>


}

export default BarsContainer
