import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { FormControl, Select, MenuItem, InputLabel, OutlinedInput, FormHelperText } from '@material-ui/core';
import { ItemG } from 'Components';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/styles';

// Replace withStyles with withTheme, remove styles

const styles = makeStyles(theme => ({
	label: {
		color: theme.palette.type === 'dark' ? "#fff" : undefined,
	},
	formControl: {
		marginTop: 16,
		marginBottom: 8,
		minWidth: 230
	},
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
	const { error, helperText, value, onKeyPress, margin, onChange, simple, menuItems, label, fullWidth, leftIcon } = props
	let mobile = window.innerWidth < theme.breakpoints.values.md ? true : false
	const classes = styles()
	return (
		<FormControl variant="outlined" margin={margin} className={classes.formControl} fullWidth={mobile || fullWidth}>
			<InputLabel
				ref={InputRef}
				classes={{ asterisk: classes.label }}
				color={'primary'}
				htmlFor='select-multiple-chip'
			>
				{label}
			</InputLabel>
			<Select
				variant={'outlined'}
				fullWidth={mobile || fullWidth}
				value={value}
				error={error}
				onChange={onChange}
				input={<OutlinedInput labelWidth={lWidth()} variant={'outlined'} classes={{ root: classes.label }} />}
				onKeyPress={onKeyPress}
			>
				{!simple && menuItems.map((m, i) => {
					return <MenuItem key={i} value={m.value}>
						<ItemG container justify={'space-between'} alignItems={'center'}>
							{leftIcon ? <ItemG style={{ display: 'flex', marginRight: 8 }}>{m.icon ? m.icon : null}</ItemG> : null}
							<ItemG xs>{m.label}</ItemG>
							{!leftIcon ? <ItemG>{m.icon ? m.icon : null}</ItemG> : null}
						</ItemG>
					</MenuItem>
				})}
				{simple && menuItems.map((m, i) => {
					return <MenuItem key={i} value={m}>
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


// class DSelect extends PureComponent {
// 	componentDidMount = () => {
// 		this.setState({ labelWidth: ReactDOM.findDOMNode(this.InputRef).offsetWidth })
// 	}

// 	labelWidth = () => {
// 		if (this.InputRef) {
// 			return this.state.labelWidth
// 		}
// 		else {
// 			return 100
// 		}
// 	}
// 	render() {
// 		const { classes, error, helperText, value, onKeyPress, margin, onChange, simple, menuItems, label, theme, fullWidth, leftIcon } = this.props
// 		let mobile = window.innerWidth < theme.breakpoints.values.md ? true : false

// 		return (
// 			<FormControl variant="outlined" margin={margin} className={classes.formControl} fullWidth={mobile || fullWidth}>
// 				<InputLabel ref={ref => {
// 					this.InputRef = ref;
// 				}}
// 					classes={{ asterisk: classes.label }}
// 				 /* FormLabelClasses={{ root: classes.label }} */ color={'primary'} htmlFor='select-multiple-chip'>
// 					{label}
// 				</InputLabel>
// 				<Select
// 					variant={'outlined'}
// 					fullWidth={mobile || fullWidth}
// 					value={value}
// 					error={error}
// 					onChange={onChange}
// 					input={<OutlinedInput labelWidth={this.labelWidth()} variant={'outlined'} classes={{ root: classes.label }} />}
// 					onKeyPress={onKeyPress}
// 				>
// 					{!simple && menuItems.map((m, i) => {
// 						return <MenuItem key={i} value={m.value}>
// 							<ItemG container justify={'space-between'} alignItems={'center'}>
// 								{leftIcon ? <ItemG style={{ display: 'flex', marginRight: 8 }}>{m.icon ? m.icon : null}</ItemG> : null}
// 								<ItemG xs>{m.label}</ItemG>
// 								{!leftIcon ? <ItemG>{m.icon ? m.icon : null}</ItemG> : null}
// 							</ItemG>
// 						</MenuItem>
// 					})}
// 					{simple && menuItems.map((m, i) => {
// 						return <MenuItem key={i} value={m}>
// 							<ItemG container justify={'space-between'} alignItems={'center'}>
// 								{/* {leftIcon ? <ItemG style={{ display: 'flex', marginRight: 8 }}>{m.icon ? m.icon : null}</ItemG> : null} */}
// 								<ItemG xs>{m}</ItemG>
// 								{/* {!leftIcon ? <ItemG>{m.icon ? m.icon : null}</ItemG> : null} */}
// 							</ItemG>
// 						</MenuItem>
// 					})}
// 					})}
// 				</Select>
// 				{helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
// 			</FormControl>
// 		)
// 	}
// }

export default DSelect