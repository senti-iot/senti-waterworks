import React from 'react'
import { IconButton } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from 'variables/icons'
import moment from 'moment'
import { T, ItemG } from 'Components'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'Hooks'
import { changeDate } from 'Redux/dateTime'
import size from 'Styles/themes/mediaQueries'

const LeftArrow = styled(KeyboardArrowLeft)`
width: 1.75em;
height: 1.75em;
@media ${size.down.xl} {
	width: 1.5em;
	height: 1.5em;
}
`
const RightArrow = styled(KeyboardArrowRight)`
width: 1.75em;
height: 1.75em;
@media ${size.down.xl} {
	width: 1.5em;
	height: 1.5em;
}
`
const MonthYear = styled(T)`
    /* font-weight: 600; */
	text-align: center;
    font-size: 1.50rem;
	white-space: nowrap;
	@media ${size.down.md} {
  		font-size: 1em;
}
    /* letter-spacing: 1.5px; */
`
const futureTester = (date, unit) => {
	return moment().subtract(1, 'day').diff(date, unit) <= 0
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
		let from, to, diff;
		if (period.menuId === 3) {
			from = moment(period.from).add(1, 'month').startOf('month')
			to = !futureTester(to, 'day') ? moment(from).endOf('month') : moment().subtract(1, 'day')
		}
		if (period.menuId === 2) {
			from = moment(period.to)
			to = futureTester(to, 'day') ? moment(period.to).add(6, 'day') : moment().subtract(1, 'day')
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
		let from, to, diff;
		if (period.menuId === 3) {
			from = moment(period.from).subtract(1, 'month').startOf('month')
			to = moment(from).endOf('month')
		}
		if (period.menuId === 2) {
			from = moment(period.from).subtract(6, 'day').startOf('day')
			to = moment(period.from)
		}
		if ([1, 4, 5, 6].indexOf(period.menuId) !== -1) {
			diff = moment(period.to).diff(moment(period.from), 'day')
			from = moment(period.from).subtract(diff, 'day').startOf(timeTypes[period.timeType].chart)
			to = moment(period.to).subtract(diff, 'day').endOf(timeTypes[period.timeType].chart)
		}
		handleSetDate(period.timeType, to, from, period.timeType, period.id)
	}

	return (
		<ItemG container justify={'center'} alignItems={'center'} style={{ flex: 1, flexWrap: 'nowrap' }}>
			<ItemG xs={3} lg={1} xl={1} container justify={'center'}>
				<IconButton onClick={handlePreviousPeriod} >
					<LeftArrow />
				</IconButton>
			</ItemG>
			<ItemG container xs={5} lg={7} xl={5} justify={'center'} alignItems={'center'} style={{ whiteSpace: 'nowrap' }}>

				<MonthYear>{moment(period.from).format('ll')}</MonthYear>
				&nbsp;&nbsp;&nbsp;
				<MonthYear>{` — `}</MonthYear>
				&nbsp;&nbsp;&nbsp;
				<MonthYear>{moment(period.to).format('ll')}</MonthYear>
			</ItemG>
			<ItemG xs={3} lg={1} xl={1} container justify={'center'}>
				<IconButton disabled={futureTester(period.to, 'day')} onClick={handleNextPeriod}>
					<RightArrow />
				</IconButton>
			</ItemG>
		</ItemG>
	)
}

export default DateTimeArrows
