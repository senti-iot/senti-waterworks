import React from 'react'
import { ItemG } from 'Components'
import { useLocalization } from 'Hooks'
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const DayOption = styled(Button)`
	text-transform: none;
`

const DateTimeDays = () => {
	const t = useLocalization()
	return (
		<ItemG container style={{ width: 'auto' }} alignItems={'center'}>
			<DayOption>{t('filters.dateOptions.7days')}</DayOption>
			<DayOption>{t('filters.dateOptions.month')}</DayOption>
			<DayOption>{t('filters.dateOptions.year')}</DayOption>
		</ItemG>
	)
}

export default DateTimeDays
