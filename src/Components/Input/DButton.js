import React, { useState } from 'react'
import { Menu, MenuItem, Button } from '@material-ui/core'
import { ItemG } from 'Components'
import { KeyboardArrowDown } from 'variables/icons'

const DButton = (props) => {
	//#region Variables
	const [anchor, setAnchor] = useState(null)

	const { label, menuItems, divider, buttonClasses, menuClasses } = props

	//#endregion

	//#region Handlers

	const handleOpenActionsDetails = event => {
		setAnchor(event.currentTarget)
		// setState({ anchor: event.currentTarget });
	}

	const handleCloseActionsDetails = () => {
		setAnchor(null)
		// setState({ anchor: null });
	}
	const handleMenuItemClick = (m) => e => {
		if (m.func) {
			m.func()
		}
		else {
			if (props.onChange)
				props.onChange(m.value)

		}
		handleCloseActionsDetails()
	}

	//#endregion
	return (
		<>
			<Button
				aria-label='More'
				aria-owns={anchor ? 'long-menu' : null}
				aria-haspopup='true'
				variant={props.variant}
				color={props.color}
				classes={buttonClasses}
				onClick={handleOpenActionsDetails}
				endIcon={<KeyboardArrowDown style={{ marginLeft: 16 }} />}
			>
				{label}

			</Button>
			<Menu
				classes={menuClasses}
				id='long-menu'
				anchorEl={anchor}
				open={Boolean(anchor)}
				onClose={handleCloseActionsDetails}
				disablePortal
				style={{ marginTop: 80 }}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				PaperProps={{ style: { minWidth: 230 } }}>
				{menuItems.map((m, i) => {
					if (m.hide)
						return null
					return <MenuItem divider={divider ? i === menuItems.length - 1 ? false : true : false} disabled={m.disabled || props.value === m.value} key={i}
						onClick={handleMenuItemClick(m)}>
						<ItemG container justify={'space-between'} alignItems={'center'}>
							{m.icon ? <ItemG style={{ display: 'flex', marginRight: 8 }}>{m.icon}</ItemG> : null}
							<ItemG xs>{m.label}</ItemG>
						</ItemG>
					</MenuItem>
				})}
			</Menu>
		</>
	)

}

export default DButton
