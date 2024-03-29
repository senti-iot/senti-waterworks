import React from 'react'
import { T, ItemG } from 'Components'
import Card from '@material-ui/core/Card'
import { CardContent, /* Divider */ } from '@material-ui/core'
import moment from 'moment'
import styled from 'styled-components'
import { Droplet, Thermometer, Pipe } from 'variables/icons'
import { capitalizeFL, formatNumber } from 'data/functions'
// import { Tooltip as MuiTooltip } from '@material-ui/core'


const TCard = styled(Card)`
	min-width: 300px;
	max-width: 450px;
	position: absolute;
	border: 0;
	border-radius: 4;
	z-index: -1;
	transition: 300ms all ease;
`

const waterUsageTooltip = (props) => {
	//Hooks

	//Redux

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	const numberOfDays = moment(props.tooltip.date).month() + 1 === moment().month() + 1 && moment(props.tooltip.date).year() === moment().year() ? moment().date() : moment(props.tooltip.date).daysInMonth()

	return <TCard id={props.fs ? 'tooltipfsLG' + props.id : 'tooltip' + props.id}>
		<CardContent>
			{/* <ItemG container> */}
			<ItemG container xs={12}>
				<ItemG container xs={5}>
					<ItemG xs={12}>
						<T variant={'h6'}>{capitalizeFL(moment(props.tooltip.date).format(props.timeType === 4 ? 'MMMM' : 'dddd'))}</T>
					</ItemG>
					{ props.timeType === 4 ?
						null : <ItemG xs={12}>
							<T variant={'body2'}>{moment(props.tooltip.date).format('ll')}</T>
						</ItemG>
					}
				</ItemG>
				<ItemG xs={7} container justifyContent={'center'} alignItems={'center'} style={{ flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
					<ItemG container alignItems={'center'}>
						<ItemG xs={10} style={{ textAlign: 'right' }}>
							<T variant={'h5'}>{`${formatNumber(props.tooltip.value, 2)} ${props.unit === 'm3' ? 'm³' : 'L'}`}</T>
							{props.timeType === 4 ? <T variant={'h5'}>Gns. {`${formatNumber(props.tooltip.value / numberOfDays, 2)} ${props.unit === 'm3' ? 'm³' : 'L'}`}</T> : null}
						</ItemG>
						<ItemG xs={2}>
							<img src={Droplet} alt={'water drop'} height={36} width={36} style={{ margin: 4 }} />
						</ItemG>
					</ItemG>
				</ItemG>
			</ItemG>
			{/* </ItemG> */}
			{/* <Divider />
			<ItemG container xs={12}>
			</ItemG> */}

		</CardContent>
	</TCard>
}
// const waterFlowTooltip = (props) => { }

const waterFlowTooltip = (props) => {
	return <TCard id={props.fs ? 'tooltipfsLG' + props.id : 'tooltip' + props.id}>
		<CardContent>
			{/* <ItemG container> */}
			<ItemG container xs={12}>
				<ItemG container xs={6}>
					<ItemG xs={12}>
						<T variant={'h6'}>{capitalizeFL(moment(props.tooltip.date).format('dddd'))}</T>
					</ItemG>
					<ItemG xs={12}>
						<T varinat={'body2'}>{moment(props.tooltip.date).format('ll')}</T>
					</ItemG>
				</ItemG>
				<ItemG xs={6} container justifyContent={'center'} alignItems={'flex-end'}>
					<T variant={'h5'}>{`${props.tooltip.value} l/t`}</T>
					<img src={Pipe} alt={'water drop'} height={36} width={36} style={{ margin: 4 }} />
				</ItemG>
			</ItemG>
			{/* </ItemG> */}
			{/* <Divider />
			<ItemG container xs={12}>
			</ItemG> */}

		</CardContent>
	</TCard>
}
// const waterFlowTooltip = (props) => { }

const temperatureTooltip = (props) => {
	return <TCard id={props.fs ? 'tooltipfsLG' + props.id : 'tooltip' + props.id}>
		<CardContent>
			{/* <ItemG container> */}
			<ItemG container xs={12}>
				<ItemG container xs={6}>
					<ItemG xs={12}>
						<T variant={'h6'}>{capitalizeFL(moment(props.tooltip.date).format('dddd'))}</T>
					</ItemG>
					<ItemG xs={12}>
						<T varinat={'body2'}>{moment(props.tooltip.date).format('ll')}</T>
					</ItemG>
				</ItemG>
				<ItemG xs={6} container justifyContent={'center'} alignItems={'flex-end'}>
					<T variant={'h5'}>{`${parseFloat(props.tooltip.value).toFixed(1)} °C`}</T>
					<img src={Thermometer} alt={'water drop'} height={36} width={36} style={{ margin: 4 }} />
				</ItemG>
			</ItemG>
			{/* </ItemG> */}
			{/* <Divider />
			<ItemG container xs={12}>
			</ItemG> */}

		</CardContent>
	</TCard>
}


const readingTooltip = (props) => {
	return <TCard id={props.fs ? 'tooltipfsLG' + props.id : 'tooltip' + props.id}>
		<CardContent>
			{/* <ItemG container> */}
			<ItemG container xs={12}>
				<ItemG container xs={6}>
					<ItemG xs={12}>
						<T variant={'h6'}>{capitalizeFL(moment(props.tooltip.date).format('dddd'))}</T>
					</ItemG>
					<ItemG xs={12}>
						<T varinat={'body2'}>{moment(props.tooltip.date).format('lll')}</T>
					</ItemG>
				</ItemG>
				<ItemG xs={6} container justifyContent={'center'} alignItems={'flex-end'} style={{ flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
					<T variant={'h5'}>{`${props.tooltip.value} m³`}</T>
					<img src={Droplet} alt={'water drop'} height={36} width={36} style={{ margin: 4 }} />
				</ItemG>
			</ItemG>
			{/* </ItemG> */}
			{/* <Divider />
			<ItemG container xs={12}>
			</ItemG> */}

		</CardContent>
	</TCard>
}


const Tooltip = (props) => {
	switch (props.id) {
		case 'waterusage':
			return waterUsageTooltip(props)
		case 'waterflow':
			return waterFlowTooltip(props)
		case 'temperature':
			return temperatureTooltip(props)
		case 'readings':
			return readingTooltip(props)
		default:
			return null
	}

}

export default Tooltip
