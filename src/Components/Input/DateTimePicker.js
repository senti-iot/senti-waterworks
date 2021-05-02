import React from 'react'
import { KeyboardArrowRight, KeyboardArrowLeft, DateRange, AccessTime } from 'variables/icons'
import { KeyboardDateTimePicker as MuiDateTimePicker } from '@material-ui/pickers'

const DateTimePicker = ({ className, value, label, onChange }) => (
	<MuiDateTimePicker
		autoOk
		ampm={false}
		style={{ maxWidth: 230 }}
		margin={'normal'}
		label={label}
		clearable
		inputVariant={'outlined'}
		mask={'__/__/____ __:__'}
		format={"DD/MM/YYYY HH:mm"}
		placeholder="MM/DD/YYYY HH:mm"
		value={value ? value : null}
		className={className}
		onChange={onChange}
		animateYearScrolling={false}
		// color='primary'
		// disableFuture
		dateRangeIcon={<DateRange />}
		timeIcon={<AccessTime />}
		InputProps={{
			style: {
				paddingRight: 0
			}
		}}
		rightArrowIcon={<KeyboardArrowRight />}
		leftArrowIcon={<KeyboardArrowLeft />}
	/>
)

export default DateTimePicker
