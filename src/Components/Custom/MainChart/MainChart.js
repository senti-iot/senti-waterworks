import React from 'react'
import { ItemG, DateTimeFilter } from 'Components'
import ChartsButton from '../ChartsButton/ChartsButton'
import { Hidden } from '@material-ui/core'
import LineGraph from 'Components/Graphs/LineGraph'
import { useLocalization, useSelector } from 'Hooks'
import DateTimeArrows from 'Components/Input/DateTimeArrows'
import DateTimeDays from 'Components/Input/DateTimeDays'
import { ExportModule } from 'Components/ExportModule/ExportModule'
import ChartsButtonContainer from '../ChartsButton/ChartsButtonContainer'
import ChartsDateNavContainer from '../ChartsButton/ChartsDateNavContainer'
import ChartTitle from '../ChartTitle/ChartTitle'

export const MainChart = React.memo((props) => {
	const { chart, setChart } = props
	const t = useLocalization()
	const isActive = (c) => chart === c ? true : false
	const handleSetChart = (c) => () => setChart(c)
	const selectedDevices = useSelector(s => s.appState.selectedDevices)
	const isAdmin = useSelector(s => s.auth.isAdmin)

	return (
		<ItemG container /* justify={'space-between'} */ style={{ height: '100%', flexFlow: 'column' }}>
			<Hidden smDown>
				<ChartsButtonContainer>
					<ItemG container justify={'space-evenly'}>
						<ItemG xs={3}>
							<ChartsButton onClick={handleSetChart('waterusage')} isActive={isActive('waterusage')}>{t('charts.types.waterusage')} </ChartsButton>
						</ItemG>
						<ItemG xs={3}>
							<ChartsButton onClick={handleSetChart('temperature')} isActive={isActive('temperature')}>{t('charts.types.temperature')}</ChartsButton>
						</ItemG>
						<ItemG xs={3}>
							<ChartsButton onClick={handleSetChart('waterflow')} isActive={isActive('waterflow')}>{t('charts.types.waterflow')}</ChartsButton>
						</ItemG>
						<ItemG xs={3}>
							<ChartsButton disabled={isAdmin ? selectedDevices.length < 11 : undefined} onClick={handleSetChart('readings')} isActive={isActive('readings')}>{t('charts.types.readings')}</ChartsButton>
						</ItemG>
					</ItemG>
				</ChartsButtonContainer>
				{/* <ItemG> */}
				<ChartsDateNavContainer container alignItems={'center'} justify={'space-between'}>
					<ItemG xs={2}>
						<ChartTitle variant={'h6'}>{t(`charts.types.${chart}`)}</ChartTitle>
					</ItemG>
					<DateTimeArrows />
					<ItemG container xs alignItems={'center'} justify={'flex-end'}>
						<DateTimeDays />
						<DateTimeFilter />
						<ExportModule />
					</ItemG>

				</ChartsDateNavContainer>
			</Hidden>

			{/* </ItemG> */}
			<ItemG container style={{ flex: 1 }}>
				<LineGraph loading={props.loading} id={chart} />
			</ItemG>

		</ItemG>
	)
})
MainChart.whyDidYouRender = true
// export default MainChart
