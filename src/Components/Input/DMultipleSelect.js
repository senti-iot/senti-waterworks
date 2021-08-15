import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { FormControl, Select, MenuItem, InputLabel, OutlinedInput, FormHelperText, Input, Tooltip, Divider, Checkbox } from '@material-ui/core'
import { ItemG } from 'Components'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/styles'
import hexToRgba from 'hex-to-rgba'
import { useLocalization } from 'Hooks'

const styles = makeStyles(theme => ({
	label: {
		color: theme.palette.type === 'dark' ? "#fff" : undefined,
	},
	leftIcon: {
		// marginRight: theme.spacing(1)
	},
	underlineRev: {
		background: '#fff'
	},
	root: {
		"&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
			borderColor: hexToRgba(theme.palette.primary.main, 0.67)
			// borderColor: "rgb(39,136,129, 0.67)"
		}
	},
	disabled: {},
	focused: {},
	error: {},
	notchedOutline: {
		// borderColor: "rgb(39,136,129, 0.23)",
		borderColor: `${hexToRgba(theme.palette.primary.main, 0.23)} !important`,
		"&:hover": {
			borderColor: theme.hover
		}
	},
	rootReversed: {
		"&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
			borderColor: "rgba(255,255,255, 0.67)"
		}
	},
	disabledReversed: {},
	focusedReversed: {},
	errorReversed: {},
	notchedOutlineReversed: {
		borderColor: 'rgba(255,255,255, 0.23)'
	},
	reversed: {
		color: 'rgba(255, 255, 255, 0.23)',
		"&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
			borderColor: "#fff"
		}
	},
	reversedBorder: {
		borderColor: 'rgba(255, 255, 255, 0.23)',
		"&:hover": {
			borderColor: '#fff !important;'
		}
	},
	categoryBorder: {
		// borderTop: "1px solid rgba(0, 0, 0, 0.23)",
		borderBottom: "1px solid rgba(0, 0, 0, 0.23)",
		// borderColor: 'rgba(0, 0, 0, 0.23)',
	},
	menuItem: {
		color: "#000"
	}
	// formControl: {
	// 	marginTop: 16,
	// 	marginBottom: 8,
	// 	minWidth: 230
	// },
}))

const DMultipleSelect = (props) => {
	const [labelWidth, setLabelWidth] = useState(null)
	const InputRef = useRef(null)
	const theme = useTheme()
	const t = useLocalization()
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
	const { error, helperText, value, onKeyPress, margin, onChange, simple, menuItems, label, fullWidth, leftIcon, id, readOnly } = props
	const { selectClasses, formControlClasses, inputClasses, menuProps, IconComponent, variant, labelStyle } = props
	//TO DO
	let mobile = window.innerWidth < theme.breakpoints.values.md ? true : false
	// let mobile = false
	const classes = styles()
	const renderInput = (props) => {
		return variant === 'outlined' || !variant ? <OutlinedInput id={id} labelWidth={lWidth()} variant={variant ? variant : 'outlined'}
			classes={{ root: classes.root,
				disabled: classes.disabled,
				focused: classes.focused,
				error: classes.error,
				notchedOutline: classes.notchedOutline,
					 ...inputClasses }} /> :
			<Input labelWidth={lWidth()} id={id} variant={variant ? variant : 'outlined'}
				classes={{
					root: classes.root,
					disabled: classes.disabled,
					focused: classes.focused,
					error: classes.error,
					notchedOutline: classes.notchedOutline,
					...inputClasses
				}} />
	}
	return (
		<FormControl variant={variant ? variant : "outlined"} margin={margin ? margin : "normal"} classes={formControlClasses} fullWidth={mobile || fullWidth} style={props.style}>
			<InputLabel
				ref={InputRef}
				classes={{ asterisk: classes.label }}
				color={'primary'}
				htmlFor='select-multiple-chip'
			>
				{label}
			</InputLabel>
			<Select
				multiple
				readOnly={readOnly}
				classes={selectClasses}
				id={id}
				variant={variant ? variant : 'outlined'}
				fullWidth={mobile || fullWidth}
				margin={margin ? margin : "normal"}
				value={value}
				error={error}
				onChange={event => onChange(event, id)}
				input={renderInput()}
				renderValue={(selected) => selected.length > 1 ? selected.length + ' ' + t('tables.selected') : menuItems[menuItems.findIndex(f => f.value === selected[0])].label}
				onKeyPress={onKeyPress}
				styles={props.styles}
				MenuProps={menuProps}
				IconComponent={IconComponent}
				InputProps={{
					...props.InputProps,
					style: { ...props.InputProps?.style, boxSizing: 'border-box' },

				}}
			// end
			>
				{!simple && menuItems.map((m, i) => {
					if (m.category) {
						return <MenuItem disabled className={classes.categoryBorder}>
							<Divider/>
							{m.category}
							<Divider/>
						</MenuItem>
					}
					if (m.divider) {
						return <Divider />
					}
					if (m.hide) {
						return null
					}
					return <MenuItem id={id} key={i} value={m.value} disabled={m.disabled} classes={{ selected: classes.menuItem }}>
						<Tooltip title={m.label} enterDelay={1000}>
							<ItemG container justify={'space-between'} alignItems={'center'}>
								<Checkbox checked={value.findIndex(f => f === m.value) > -1} />
								{leftIcon ? <ItemG style={{ display: 'flex', marginRight: 8 }}>{m.icon ? m.icon : null}</ItemG> : null}
								<ItemG xs style={labelStyle}>{m.label}</ItemG>
								{!leftIcon ? <ItemG>{m.icon ? m.icon : null}</ItemG> : null}
							</ItemG>
						</Tooltip>
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
			</Select>
			{helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
		</FormControl>
	)
}

export default DMultipleSelect