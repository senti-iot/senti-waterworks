import React, { useState, useContext } from 'react'
import { /* GridContainer, */ ItemG, T } from 'Components'
import ChartsButton from '../ChartsButton/ChartsButton'
import ChartWrapper from '../ChartWrapper.js/ChartWrapper'
import { TProvider } from 'Components/Providers/LocalizationProvider'
// import { Switch, Route, useHistory, useParams } from 'react-router-dom'

const ChartsContainer = (props) => {
	const [chart, setChart] = useState('waterusage')
	const t = useContext(TProvider)
	return (
		<ItemG container>
			<ItemG xs={12} container justify={'space-evenly'}>
				<ChartsButton onClick={() => setChart('waterusage')} active={chart === 'waterusage' ? true : false}>{t('charts.types.waterusage')}</ChartsButton>
				<ChartsButton onClick={() => setChart('temperature')} active={chart === 'temperature' ? true : false}>{t('charts.types.temperature')}</ChartsButton>
				<ChartsButton onClick={() => setChart('waterflow')} active={chart === 'waterflow' ? true : false}>{t('charts.types.waterflow')}</ChartsButton>
				<ChartsButton onClick={() => setChart('readings')} active={chart === 'readings' ? true : false}>{t('charts.types.readings')}</ChartsButton>
			</ItemG>
			<ItemG xs={12}>
				<T variant={'h5'}>{t(`charts.types.${chart}`)}</T>
			</ItemG>
			<ItemG container xs={12} >
				<ChartWrapper chart={chart} />
			</ItemG>
		</ItemG>
	)
}

export default ChartsContainer
