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
	return moment()/* .subtract(1, 'day') */.diff(date, unit) <= 0
}

const DateTimeArrows = () => {
	const timeTypes = [
		// { id: 0, format: 'lll dddd', chart: 'minute', tooltipFormat: 'LT' },
		{ id: 1, format: 'lll dddd', chart: 'day', tooltipFormat: 'LT' },
		{ id: 2, format: 'lll dddd', chart: 'day', tooltipFormat: 'lll' },
		{ id: 3, format: 'lll dddd', chart: 'day', tooltipFormat: 'll' },
	]
	const period = useSelector(s => s.dateTime.period)
	const dispatch = useDispatch()
	const handleSetDate = (id, to, from, timeType) => dispatch(changeDate(id, to, from, timeType))
	const handleNextPeriod = () => {
		let from, to, diff
		if (period.menuId === 3) {
			from = moment(period.from).add(1, 'month').startOf('month')
			to = !futureTester(to, 'day') ? moment(from).endOf('month') : moment().subtract(1, 'day')
		}
		if (period.menuId === 2) {
			from = moment(period.to).add(1, 'day')
			to = futureTester(to, 'day') ? moment(period.to).add(7, 'day') : moment().subtract(1, 'day')
		}
		if ([1, 4, 5, 6].indexOf(period.menuId) !== -1) {
			diff = moment(period.to).diff(moment(period.from), 'minute')
			from = moment(period.from).add(diff + 1, 'minute').startOf('day')
			to = moment(period.to).add(diff + 1, 'minute').endOf('day')
			to = futureTester(to, 'day') ? moment().subtract(1, 'day') : to
		}
		handleSetDate(period.timeType, to, from, period.timeType)
	}
	const handlePreviousPeriod = () => {
		let from, to, diff
		if (period.menuId === 3) {
			from = moment(period.from).subtract(1, 'month').startOf('month')
			to = moment(from).endOf('month')
		}
		if (period.menuId === 2) {
			from = moment(period.from).subtract(7, 'day').startOf('day')
			to = moment(period.from).subtract(1, 'day')
		}
		if ([1, 4, 5, 6].indexOf(period.menuId) !== -1) {
			diff = moment(period.to).diff(moment(period.from), 'day')
			from = moment(period.from).subtract(diff, 'day').startOf(timeTypes[period.timeType].chart)
			to = moment(period.to).subtract(diff, 'day').endOf(timeTypes[period.timeType].chart)
		}
		handleSetDate(period.timeType, to, from, period.timeType, period.id)
	}

	return (
		<ItemG container justify={'center'} alignItems={'center'} style={{ flexWrap: 'nowrap' }}>
			<ItemG xs={1} /* xs={3} lg={1} xl={1} */ container justify={'center'}>
				<SIconButton onClick={handlePreviousPeriod} >
					<LeftArrow />
				</SIconButton>
			</ItemG>
			<ItemG container /* xs={9} lg={9} xl={5} */ justify={'center'} alignItems={'center'} style={{ width: 'fit-content', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>

				<MonthYear>{moment(period.from).format('ll')}</MonthYear>
				&nbsp;&nbsp;&nbsp;
				<MonthYear>{` — `}</MonthYear>
				&nbsp;&nbsp;&nbsp;
				<MonthYear>{moment(period.to).format('ll')}</MonthYear>
			</ItemG>
			<ItemG xs={1}/* xs={3} lg={1} xl={1}  */ container justify={'center'}>
				<SIconButton disabled={futureTester(period.to, 'day')} onClick={handleNextPeriod}>
					<RightArrow />
				</SIconButton>
			</ItemG>
		</ItemG>
	)
}

export default DateTimeArrows
