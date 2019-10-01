import React, { useState, useContext } from 'react'
import { /* GridContainer, */ ItemG, T } from 'Components'
import ChartsButton from '../ChartsButton/ChartsButton'
import { TProvider } from 'Components/Providers/LocalizationProvider'
import { Hidden } from '@material-ui/core'
import LineGraph from 'Components/Graphs/LineGraph'
// import { Switch, Route, useHistory, useParams } from 'react-router-dom'

const ChartsContainer = (props) => {
	const [chart, setChart] = useState('waterusage')
	const t = useContext(TProvider)
	const isActive = (c) => chart === c ? true : false
	const handleSetChart = (c) => () => setChart(c)
	return (
		<ItemG spacing={1} container justify={'space-between'} alignItems={'flex-end'} style={{ height: '100%' }}>
			<ItemG xs={12} >
				<Hidden mdDown>
					<ItemG container justify={'space-evenly'} style={{ margin: 8 }}>
						<ChartsButton onClick={handleSetChart('waterusage')} active={isActive('waterusage')}>{t('charts.types.waterusage')} </ChartsButton>
						<ChartsButton onClick={handleSetChart('temperature')} active={isActive('temperature')}>{t('charts.types.temperature')}</ChartsButton>
						<ChartsButton onClick={handleSetChart('waterflow')} active={isActive('waterflow')}>{t('charts.types.waterflow')}</ChartsButton>
						<ChartsButton onClick={handleSetChart('readings')} active={isActive('readings')}>{t('charts.types.readings')}</ChartsButton>
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

export default ChartsContainer
