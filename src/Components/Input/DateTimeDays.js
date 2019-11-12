import React from 'react'
import { ItemG } from 'Components'
import { useLocalization, useDispatch } from 'Hooks'
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { changeDate } from 'Redux/dateTime';
import moment from 'moment';

const DayOption = styled(Button)`
	text-transform: none;
`

const DateTimeDays = () => {
	const t = useLocalization()
	const dispatch = useDispatch()
	const setDateTime = (menuId, to, from, timeType) => () => {
		dispatch(changeDate(menuId, to, from, timeType))
	}
	return (
		<ItemG container style={{ width: 'auto' }} alignItems={'center'}>
			<DayOption onClick={setDateTime(2, moment(), moment().subtract(7, 'day'), 2)}>{t('filters.dateOptions.7days')}</DayOption>
			<DayOption onClick={setDateTime(3, moment(), moment().startOf('month'), 3)}>{t('filters.dateOptions.month')}</DayOption>
			<DayOption onClick={setDateTime(4, moment(), moment().startOf('year'), 4)}>{t('filters.dateOptions.year')}</DayOption>
		</ItemG>
	)
}

export default DateTimeDays
