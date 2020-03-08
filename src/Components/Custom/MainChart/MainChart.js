import React, { useState } from 'react'
import { ItemG, DateTimeFilter, DMenu } from 'Components'
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
import { DateRange, ImportExport, MoreVert } from 'variables/icons'
import styled from 'styled-components'

const DateRangeIcon = styled(DateRange)`
color: #fff;
`
const MoreVertIcon = styled(MoreVert)`
color: #fff;
`
export const MainChart = React.memo((props) => {
	//Hooks
	const t = useLocalization()

	//Redux
	// const selectedDevices = useSelector(s => s.appState.selectedDevices)
	// const isAdmin = useSelector(s => s.auth.isAdmin)
	const data = useSelector(s => s.data.deviceData)
	console.log(data)
	//State
	const [openExport, setOpenExport] = useState(false)
	//Const
	const { chart, setChart } = props

	//useCallbacks

	//useEffects

	//Handlers
	const handleOpenExport = () => {
		setOpenExport(true)
	}
	const handleCloseExport = () => {
		setOpenExport(false)
	}
	const isActive = (c) => chart === c ? true : false
	const handleSetChart = (c) => () => setChart(c)

	return (
		<ItemG container /* justify={'space-between'} */ style={{ height: '100%', flexFlow: 'column' }}>
			<Hidden xsDown>
				<ChartsButtonContainer>
					<ItemG container /* justify={'space-evenly'} */>
						<ItemG xs={3}>
							<ChartsButton onClick={handleSetChart('waterusage')} isActive={isActive('waterusage')}>{t('charts.types.waterusage')} </ChartsButton>
						</ItemG>
						{data ? data.temperature.length > 0 ?
							<ItemG xs={3}>
								<ChartsButton onClick={handleSetChart('temperature')} isActive={isActive('temperature')}>{t('charts.types.temperature')}</ChartsButton>
							</ItemG> : null : null
						}
						{data ? data.waterflow.length > 0 ?
							<ItemG xs={3}>
								<ChartsButton onClick={handleSetChart('waterflow')} isActive={isActive('waterflow')}>{t('charts.types.waterflow')}</ChartsButton>
							</ItemG> : null : null}
						<ItemG xs={3}>
							<ChartsButton onClick={handleSetChart('readings')} isActive={isActive('readings')}>{t('charts.types.readings')}</ChartsButton>
						</ItemG>
					</ItemG>
				</ChartsButtonContainer>
				<ChartsDateNavContainer container alignItems={'center'} justify={'space-between'}>
					<ItemG xs={3} md={3} lg={3} >
						<ChartTitle variant={'h6'}>{t(`charts.types.${chart}`)}</ChartTitle>
					</ItemG>
					<ItemG xs={7} md={7} lg={5}>
						<DateTimeArrows />
					</ItemG>
					<ItemG xs={2} md={2} lg={4} container wrap={"nowrap"} alignItems={'center'} justify={'flex-end'}>
						<Hidden mdDown>

							<DateTimeDays />
						</Hidden>
						<DateTimeFilter icon={<DateRangeIcon />} />
						<DMenu
							icon={<MoreVertIcon />}
							onChange={handleOpenExport}
							menuItems={[{
								dontShow: false,
								icon: <ImportExport />,
								label: t('actions.export')
							}]}
						/>
					</ItemG>

				</ChartsDateNavContainer>
				<ExportModule open={openExport}
					handleOpenExport={handleOpenExport}
					handleCloseExport={handleCloseExport}
				/>
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
