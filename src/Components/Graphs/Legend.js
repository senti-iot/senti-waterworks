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
	const data = props.data ? props.data[props.id] : []
	let fs = props.fullScreen
	const t = useLocalization()
	let lines = props.graphLines
	return (
		<ItemG container justifyContent={'center'} alignItems={'center'}>
			{data.map(line => {
				if (line.noLegend) {
					return null
				}
				if (line.median && !line.noMedianLegend) {
					return <Fragment key={'LegendFragment' + line.name}>
						<FormControlLabel
							key={'Legend' + line.name}
							id={fs ? 'LegendfsLG' + line.name : 'Legend' + line.name}
							style={{ color: line.hidden ? 'rgba(255, 255, 255, 0.3)' : colors[line.color][line.colorValue ? line.colorValue : 500] }}
							control={
								<CheckedBox
									checked={!fs ? !lines['L' + line.name] : !lines['LfsLG' + line.name]}
									color={'default'}
									id={fs ? 'LegendCheckboxfsLG' + line.name : 'LegendCheckbox' + line.name} />
							}
							label={<T
								style={{ color: line.hidden ? 'rgba(255, 255, 255, 0.3)' : '#fff' }}
								id={fs ? 'LegendLabelfsLG' + line.name : 'LegendLabel' + line.name}>{t('chartLines.' + line.name, { disableMissing: true })}</T>}
						/>
						<FormControlLabel
							key={'LegendMedian' + line.name}
							// checked={lines['Median' + line.name]}
							style={{ color: 'rgba(255, 255, 255, 0.3)' }}
							control={
								<CheckedBox
									checked={!fs ? !lines['Median' + line.name] : !lines['MedianfsLG' + line.name]}
									color={'default'}
									id={fs ? 'LegendMedianCheckboxfsLG' + line.name : 'LegendMedianCheckbox' + line.name} />
							}
							label={<T
								style={{
									color: 'rgba(255, 255, 255, 0.3)'
								}}
								id={fs ? 'LegendMedianLabelfsLG' + line.name : 'LegendMedianLabel' + line.name}>{t('chartLines.' + line.name, { disableMissing: true }) + ' ' + t('chartLines.average')}</T>}
						/>
					</Fragment>
				}
				return <FormControlLabel
					checked={!lines['L' + line.name]}
					key={'Legend' + line.name}
					id={fs ? 'LegendfsLG' + line.name : 'Legend' + line.name}
					style={{ color: !line.prev ? colors[line.color] ? colors[line.color][line.colorValue ? line.colorValue : 500] : line.color : 'rgba(128,128,128,1)' }}
					control={
						<CheckedBox
							checked={!fs ? !lines['L' + line.name] : !lines['LfsLG' + line.name]}
							color={'default'}
							id={fs ? 'LegendCheckboxfsLG' + line.name : 'LegendCheckbox' + line.name} />
					}

					label={<T
						style={{ color: line.hidden ? 'rgba(255, 255, 255, 0.3)' : '#fff' }}
						id={fs ? 'LegendLabelfsLG' + line.name : 'LegendLabel' + line.name}>{t('chartLines.' + line.name, { disableMissing: true }) ? t('chartLines.' + line.name, { disableMissing: true }) : line.name}</T>}
				/>

			})}
		</ItemG>
	)
}

export default Legend
