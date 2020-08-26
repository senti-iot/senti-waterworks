import React from 'react'
import { ItemG } from 'Components'
import { useLocalization, useDispatch, useSelector } from 'Hooks'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { changeDate } from 'Redux/dateTime'
import moment from 'moment'
import { orange } from '@material-ui/core/colors'

const DayOption = styled(({ isSelected, ...props }) => <Button {...props} />)`
	color: ${(props) => !props.isSelected ? '#fff' : orange[500]};
	text-transform: none;
	white-space: nowrap;
`

const DateTimeDays = () => {
	const t = useLocalization()
	const dispatch = useDispatch()
	const period = useSelector(s => s.dateTime.period)
	const uInternal = useSelector(s => s.settings.user?.internal)
	const setDateTime = (menuId, to, from, timeType) => () => {
		dispatch(changeDate(menuId, to, from, timeType))
	}
	/*
	from = moment().subtract(7, 'd').startOf('day')
	to = moment().startOf('day')
	*/
	return (
		<ItemG container style={{ width: 'auto' }} wrap={"nowrap"} alignItems={'center'} justify={'center'}>
			{uInternal?.sentiWaterworks?.timeType === 1 ? <DayOption isSelected={period.menuId === 0} onClick={setDateTime(0, moment().endOf('day'), moment().startOf('day'), 1)}>{t('filters.dateOptions.today')}</DayOption> : null}
			<DayOption isSelected={period.menuId === 2} onClick={setDateTime(2, moment().startOf('day'), moment().subtract(7, 'day').startOf('day'), 2)}>{t('filters.dateOptions.7days')}</DayOption>
			<DayOption isSelected={period.menuId === 3} onClick={setDateTime(3, moment().startOf('day'), moment().startOf('month').startOf('day'), 2)}>{t('filters.dateOptions.month')}</DayOption>
			<DayOption isSelected={period.menuId === 4} onClick={setDateTime(4, moment().startOf('day'), moment().startOf('year').startOf('day'), 2)}>{t('filters.dateOptions.year')}</DayOption>
		</ItemG>
	)
}

export default DateTimeDays
