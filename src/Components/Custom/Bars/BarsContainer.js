import React, { useState } from 'react'
import ChartTable from 'Components/Custom/Bars/ChartTable'
import ItemG from 'Components/Containers/ItemG'
import { ChartSmallTitle } from 'Components/Custom/ChartTitle/ChartTitle'
import { useLocalization } from 'Hooks'
import { SettingsIcon, BarChart, TableIcon } from 'variables/icons'
import Dropdown from 'Components/Dropdown/Dropdown'
import BarGraph from 'Components/Graphs/BarGraph'
import CircularLoader from 'Components/Loaders/CircularLoader'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
	whiteIcon: {
		color: '#fff'
	}
}))

const BarsContainer = props => {
	//Hooks
	const t = useLocalization()
	const classes = useStyles()
	//Redux

	//State
	const [chartType, setChartType] = useState(1)

	//Const
	const { chart, loading } = props
	//useCallbacks

	//useEffects

	//Handlers
	const renderChart = () => {
		switch (chartType) {
			case 0:
				return <ChartTable loading={loading} chart={chart} />
			case 1:
				return <BarGraph loading={loading} chart={chart} />
			default:
				return null
		}
	}
	return <ItemG container style={{ height: '100%', flexFlow: 'column', }}>

		<ItemG container xs={1} justifyContent={'space-between'} alignItems={'center'} style={{ maxWidth: '100%' }}>
			<ChartSmallTitle variant={'h6'}>{t(`chartLines.readings`)}</ChartSmallTitle>
			<Dropdown
				icon={<SettingsIcon className={classes.whiteIcon} />}
				menuItems={
					[
						{ icon: TableIcon, label: "Text", func: () => setChartType(0) },
						{ icon: BarChart, label: "Bars", func: () => setChartType(1) }
					]
				}
			/>
		</ItemG>
		<ItemG xs={12} style={{ height: '100%' }}>

			{loading ? <CircularLoader fill /> : renderChart()}
		</ItemG>
	</ItemG>


}

export default BarsContainer
