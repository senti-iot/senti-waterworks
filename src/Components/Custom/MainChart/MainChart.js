import React, { useContext } from 'react'
import { /* GridContainer, */ ItemG, T } from 'Components'
import ChartsButton from '../ChartsButton/ChartsButton'
import { TProvider } from 'Components/Providers/LocalizationProvider'
import { Hidden } from '@material-ui/core'
import LineGraph from 'Components/Graphs/LineGraph'
// import { Switch, Route, useHistory, useParams } from 'react-router-dom'
// import { useHistory } from 'react-router'

const MainChart = (props) => {
	const { chart, setChart } = props
	const t = useContext(TProvider)
	const isActive = (c) => chart === c ? true : false
	const handleSetChart = (c) => () => setChart(c)
	// const history = useHistory()
	return (
		<ItemG container justify={'space-between'} alignItems={'flex-end'} style={{ height: '100%' }}>
			<ItemG xs={12} style={{ margin: '0px 30px' }}>
				<Hidden mdDown>
					<ItemG container justify={'space-evenly'}>
						<ItemG xs={3}>
							<ChartsButton onClick={handleSetChart('waterusage')} active={isActive('waterusage')}>{t('charts.types.waterusage')} </ChartsButton>
						</ItemG>
						<ItemG xs={3}>
							<ChartsButton onClick={handleSetChart('temperature')} active={isActive('temperature')}>{t('charts.types.temperature')}</ChartsButton>
						</ItemG>
						<ItemG xs={3}>
							<ChartsButton onClick={handleSetChart('waterflow')} active={isActive('waterflow')}>{t('charts.types.waterflow')}</ChartsButton>
						</ItemG>
						<ItemG xs={3}>
							<ChartsButton onClick={handleSetChart('readings')} active={isActive('readings')}>{t('charts.types.readings')}</ChartsButton>
						</ItemG>
					</ItemG>
				</Hidden>
			</ItemG>
			<ItemG xs={12}>
				<div style={{ margin: 30 }}>
					<T variant={'h6'} style={{ fontWeight: 600, fontSize: '1.75rem', letterSpacing: 1.5 }}>{t(`charts.types.${chart}`)}</T>
				</div>
			</ItemG>
			<ItemG container xs={12}>
				<div style={{ width: '100%', height: '100%', marginTop: 'auto' }}>
					<LineGraph id={chart} />
				</div>
			</ItemG>
		</ItemG>
	)
}

export default MainChart