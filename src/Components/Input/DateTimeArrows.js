import React from 'react'
import { IconButton } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from 'variables/icons'
import moment from 'moment'
import { T, ItemG } from 'Components'
import styled from 'styled-components';

const LeftArrow = styled(KeyboardArrowLeft)`
width: 1.75em;
height: 1.75em;
`
const RightArrow = styled(KeyboardArrowRight)`
width: 1.75em;
height: 1.75em;
`
const MonthYear = styled(T)`
    /* font-weight: 600; */
	text-align: center;
    font-size: 1.50rem;
    /* letter-spacing: 1.5px; */
`

const DateTimeArrows = () => {
	return (
		<ItemG container justify={'center'} alignItems={'center'} style={{ flex: 1, flexWrap: 'nowrap' }}>
			<IconButton>
				<LeftArrow />
			</IconButton>
			<MonthYear>{moment().format('MMMM YYYY')}</MonthYear>
			<IconButton>
				<RightArrow />
			</IconButton>
		</ItemG>
	)
}

export default DateTimeArrows
