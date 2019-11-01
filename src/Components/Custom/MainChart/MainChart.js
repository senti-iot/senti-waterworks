import React, { useState, useEffect } from 'react'
import { /* GridContainer, */ ItemG, T, DateTimeFilter, CircularLoader } from 'Components'
import ChartsButton from '../ChartsButton/ChartsButton'
import { Hidden } from '@material-ui/core'
import LineGraph from 'Components/Graphs/LineGraph'
import { useLocalization, useSelector, useDispatch, usePrevious } from 'Hooks'
import { getData } from 'Redux/data'
import DateTimeArrows from 'Components/Input/DateTimeArrows'
import DateTimeDays from 'Components/Input/DateTimeDays'
// import { Switch, Route, useHistory, useParams } from 'react-router-dom'
// import { useHistory } from 'react-router'

const MainChart = (props) => {
	const { chart, setChart } = props
	const t = useLocalization()
	const isActive = (c) => chart === c ? true : false
	const handleSetChart = (c) => () => setChart(c)
	const selectedDevices = useSelector(s => s.appState.selectedDevices)
	const [loading, setLoading] = useState(true)

	const dispatch = useDispatch()
	const period = useSelector(s => s.dateTime.period)
	const prevPeriod = usePrevious(period)
	// const history = useHistory()
	useEffect(() => {
		if (prevPeriod && period !== prevPeriod && !loading) {
			setLoading(true)
		}
	}, [loading, period, prevPeriod])
	useEffect(() => {
		if (loading) {
			const getDeviceData = async () => dispatch(await getData(period.from, period.to))
			const loadData = async () => {
				await getDeviceData()
				setLoading(false)
			}
			loadData()
		}
	})
	return (
		<ItemG container justify={'space-between'} alignItems={'flex-end'} style={{ height: '100%' }}>
			<ItemG xs={12} style={{ margin: '0px 30px' }}>
				<Hidden mdDown>
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
							<ChartsButton disabled={selectedDevices.length !== 1} onClick={handleSetChart('readings')} isActive={isActive('readings')}>{t('charts.types.readings')}</ChartsButton>
						</ItemG>
					</ItemG>
				</Hidden>
			</ItemG>
			<ItemG xs={12}>
				<div style={{ margin: 30 }}>
					<ItemG container alignItems={'center'} justify={'space-between'}>
						<T variant={'h6'} style={{ fontWeight: 600, fontSize: '1.75rem', letterSpacing: 1.5 }}>{t(`charts.types.${chart}`)}</T>
						<DateTimeArrows />
						<DateTimeDays />
						<DateTimeFilter />
					</ItemG>
				</div>
			</ItemG>
			{loading ? <CircularLoader style={{ height: '60%' }} />
				: <ItemG container xs={12}>
					<div style={{ width: '100%', height: '100%' }}>
						<LineGraph id={chart} />
					</div>
				</ItemG>
			}
		</ItemG>
	)
}

export default MainChart
