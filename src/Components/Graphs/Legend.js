import React, { Fragment } from 'react'
import { T, ItemG } from 'Components'
import { Checkbox, FormControlLabel, colors } from '@material-ui/core'
import styled from 'styled-components'
import { useLocalization } from 'Hooks/index'

let CheckedBox = styled(Checkbox)`
color: inherit;
padding:4px;
`

const Legend = props => {
	console.log(props)
	const data = props.data ? props.data[props.id] : []
	const t = useLocalization()
	return (
		<ItemG container justify={'center'} alignItems={'center'}>
			{data.map(line => {
				if (line.median && !line.noMedianLegend) {
					return <Fragment key={'LegendFragment' + line.name}>
						<FormControlLabel
							key={'Legend' + line.name}
							id={'Legend' + line.name}
							style={{
								color: line.hidden ? 'rgba(255, 255, 255, 0.3)' : colors[line.color][500]
							}}
							control={
								<CheckedBox
									color={'default'}
									defaultChecked={!line.hidden} id={'LegendCheckbox' + line.name} />
							}

							label={<T
								style={{
									color: line.hidden ? 'rgba(255, 255, 255, 0.3)' : '#fff'
								}}
								id={'LegendLabel' + line.name}>{t('chartLines.' + line.name, { disableMissing: true })}</T>}
						/>
						<FormControlLabel
							defaultChecked={false}
							key={'LegendMedian' + line.name}
							style={{
								color: 'rgba(255, 255, 255, 0.3)'
							}}
							control={
								<CheckedBox color={'default'} id={'LegendMedianCheckbox' + line.name} />
							}
							label={<T
								style={{
									color: 'rgba(255, 255, 255, 0.3)'
								}}
								id={'LegendMedianLabel' + line.name}>{t('chartLines.' + line.name, { disableMissing: true }) + ' ' + t('chartLines.average')}</T>}
						/>
					</Fragment>
				}
				return <FormControlLabel
					key={'Legend' + line.name}
					id={'Legend' + line.name}
					style={{
						color: !line.prev ? colors[line.color][500] : 'rgba(128,128,128,1)'
					}}
					control={
						<CheckedBox
							color={'default'}
							defaultChecked={!line.hidden} id={'LegendCheckbox' + line.name} />
					}

					label={<T
						style={{
							color: line.hidden ? 'rgba(255, 255, 255, 0.3)' : '#fff'
						}}
						id={'LegendLabel' + line.name}>{t('chartLines.' + line.name, { disableMissing: true }) ? t('chartLines.' + line.name, { disableMissing: true }) : line.name}</T>}
				/>

			})}
		</ItemG>
	)
}

export default Legend
