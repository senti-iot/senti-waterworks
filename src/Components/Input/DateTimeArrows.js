import React from 'react'
import { IconButton } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from 'variables/icons'
import moment from 'moment'
import { T, ItemG } from 'Components'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'Hooks'
import { changeDate } from 'Redux/dateTime'
import { lighten } from '@material-ui/core/styles'
import hexToRgba from 'hex-to-rgba'
// import size from 'Styles/themes/mediaQueries'

const LeftArrow = styled(KeyboardArrowLeft)`
color: #fff;
`
const RightArrow = styled(KeyboardArrowRight)`
color: #fff;

`
const SIconButton = styled(IconButton)`
	background: ${({ theme }) => theme.activeChartButton};
	border-radius: 50%;
	padding: 6px;
	&:disabled {
		background: ${({ theme }) => lighten(hexToRgba(theme.activeChartButton, 0.67), 0.3)};
	}
	&:hover {
		background: ${({ theme, disabled }) => disabled ? hexToRgba(theme.activeChartButton, 0.67) + ' !important' : lighten(theme.activeChartButton, 0.3)};
`
const MonthYear = styled(T)`
    font-weight: 500;
	text-align: center;
	white-space: nowrap;
`
const futureTester = (date, unit) => {
	return moment().diff(date, unit) <= 0
}

const DateTimeArrows = () => {
	// const timeTypes = [
	// 	// { id: 0, format: 'lll dddd', chart: 'minute', tooltipFormat: 'LT' },
	// 	{ id: 1, format: 'lll dddd', chart: 'day', tooltipFormat: 'LT' },
	// 	{ id: 2, format: 'lll dddd', chart: 'day', tooltipFormat: 'lll' },
	// 	{ id: 3, format: 'lll dddd', chart: 'day', tooltipFormat: 'lll' },
	// ]
	// setDateTime(0, moment().endOf('day'), moment().startOf('day'), 1

	const period = useSelector(s => s.dateTime.period)
	const dispatch = useDispatch()
	const handleSetDate = (menuId, to, from, timeType) => dispatch(changeDate(menuId, to, from, timeType))

	const handleNextPeriod = () => {
		let from, to, diff
		if (period.timeType === 1) {
			from = moment(period.from).add(1, 'day')
			to = moment(period.to).add(1, 'day')
		}
		else {
			diff = moment(period.to).diff(moment(period.from), 'minute')
			from = moment(period.from).add(diff, 'minute')
			to = moment(period.to).add(diff, 'minute')
			if (period.timeType > 1)
				to = futureTester(to, 'day') ? moment()/* .subtract(1, 'day') */ : to
		}
		handleSetDate(6, to, from, period.timeType)
	}
	const handlePreviousPeriod = () => {
		let from, to, diff

		if (period.timeType === 1) {
			from = moment(period.from).subtract(1, 'day')
			to = moment(period.to).subtract(1, 'day')
		}
		else {
			diff = moment(period.to).diff(moment(period.from), 'minute')
			from = moment(period.from).subtract(diff, 'minute')
			to = moment(period.to).subtract(diff, 'minute')

		}
		handleSetDate(6, to, from, period.timeType)
	}

	//Deleted width: 45% from itemg container

	return (
		<ItemG container justifyContent={'center'} alignItems={'center'} style={{ flexWrap: 'nowrap' }}>
			<ItemG xs={2} /* xs={3} lg={1} xl={1} */ container justifyContent={'center'}>
				<SIconButton onClick={handlePreviousPeriod} >
					<LeftArrow />
				</SIconButton>
			</ItemG>
			<ItemG container /* xs={9} lg={9} xl={5} */ justifyContent={'center'} alignItems={'center'} style={{ width: 'fit-content', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>

				<MonthYear>{moment(period.from).format(period.timeType > 1 ? 'll' : 'lll')}</MonthYear>

				&nbsp;&nbsp;&nbsp;
				<MonthYear>{` — `}</MonthYear>
				&nbsp;&nbsp;&nbsp;
				<MonthYear>{moment(period.to).format(period.timeType > 1 ? 'll' : 'lll')}</MonthYear>
			</ItemG>
			<ItemG xs={2}/* xs={3} lg={1} xl={1}  */ container justifyContent={'center'}>
				<SIconButton disabled={futureTester(period.to, period.timeType > 1 ? 'day' : 'hour')} onClick={handleNextPeriod}>
					<RightArrow />
				</SIconButton>
			</ItemG>
		</ItemG>
	)
}

export default DateTimeArrows
