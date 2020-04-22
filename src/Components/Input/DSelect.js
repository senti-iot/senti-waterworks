import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { FormControl, Select, MenuItem, InputLabel, OutlinedInput, FormHelperText, Input } from '@material-ui/core'
import { ItemG } from 'Components'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/styles'

const styles = makeStyles(theme => ({
	label: {
		color: theme.palette.type === 'dark' ? "#fff" : undefined,
	},
	// formControl: {
	// 	marginTop: 16,
	// 	marginBottom: 8,
	// 	minWidth: 230
	// },
}))

const DSelect = (props) => {
	const [labelWidth, setLabelWidth] = useState(null)
	const InputRef = useRef(null)
	const theme = useTheme()
	useEffect(() => {
		setLabelWidth(ReactDOM.findDOMNode(InputRef.current).offsetWidth)
	}, [InputRef])
	const lWidth = () => {
		if (InputRef.current) {
			// setLabelWidth(ReactDOM.findDOMNode(InputRef.current).offsetWidth)
			return labelWidth
		}
		else {
			return 100
		}
	}
	const { error, helperText, value, onKeyPress, margin, onChange, simple, menuItems, label, fullWidth, leftIcon, id } = props
	const { selectClasses, formControlClasses, inputClasses, menuProps, IconComponent, variant } = props
	//TO DO
	let mobile = window.innerWidth < theme.breakpoints.values.md ? true : false
	// let mobile = false
	const classes = styles()
	const renderInput = (props) => {
		return variant === 'outlined' || !variant ? <OutlinedInput id={id} labelWidth={lWidth()} variant={variant ? variant : 'outlined'} classes={{ root: classes.label, ...inputClasses }} /> : <Input id={id} variant={variant ? variant : 'outlined'} classes={{ root: classes.label, ...inputClasses }} />
	}
	return (
		<FormControl variant={variant ? variant : "outlined"} margin={margin} classes={formControlClasses} fullWidth={mobile || fullWidth} styles={props.styles}>
			<InputLabel
				ref={InputRef}
				classes={{ asterisk: classes.label }}
				color={'primary'}
				htmlFor='select-multiple-chip'
			>
				{label}
			</InputLabel>
			<Select
				classes={selectClasses}
				id={id}
				variant={variant ? variant : 'outlined'}
				fullWidth={mobile || fullWidth}
				margin={margin}
				value={value}
				error={error}
				onChange={event => onChange(event, id)}
				input={renderInput()}
				onKeyPress={onKeyPress}
				styles={props.styles}
				MenuProps={menuProps}
				IconComponent={IconComponent}
			// end
			>
				{!simple && menuItems.map((m, i) => {
					if (m.hide) {
						return null
					}
					return <MenuItem id={id} key={i} value={m.value}>
						<ItemG container justify={'space-between'} alignItems={'center'}>
							{leftIcon ? <ItemG style={{ display: 'flex', marginRight: 8 }}>{m.icon ? m.icon : null}</ItemG> : null}
							<ItemG xs>{m.label}</ItemG>
							{!leftIcon ? <ItemG>{m.icon ? m.icon : null}</ItemG> : null}
						</ItemG>
					</MenuItem>
				})}
				{simple && menuItems.map((m, i) => {
					if (m.hide) {
						return null
					}
					return <MenuItem id={id} key={i} value={m}>
						<ItemG container justify={'space-between'} alignItems={'center'}>
							<ItemG xs>{m}</ItemG>
						</ItemG>
					</MenuItem>
				})}
				})}
			</Select>
			{helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
		</FormControl>
	)
}

export default DSelect