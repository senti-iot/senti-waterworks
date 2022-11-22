import React, { useState } from 'react'
import { Menu, MenuItem, Button } from '@material-ui/core'
import { ItemG } from 'Components'
import { KeyboardArrowDown } from 'variables/icons'

import { makeStyles } from '@material-ui/styles'
import cx from 'classnames'

const dbuttonStyles = makeStyles(theme => ({
	icon: {
		marginRight: 8,
		marginLeft: 8
	},
	iconDisabled: {
		color: 'rgba(0, 0, 0, 0.87)',
		opacity: 0.5
	}
}))


const DButton = (props) => {
	//Hooks
	const cls = dbuttonStyles()
	//Redux

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers

	//#region Variables
	const [anchor, setAnchor] = useState(null)

	const { label, menuItems, divider, buttonClasses, menuClasses, menuItemClasses } = props

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
				anchorEl={anchor}
				open={Boolean(anchor)}
				onClose={handleCloseActionsDetails}
				disablePortal
				disableScrollLock
				getContentAnchorEl={null}
				style={{ marginTop: 40 }}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				// PaperProps={{ style: { minWidth: 230 } }}
			>
				{menuItems.map((m, i) => {
					if (m.hide)
						return null
					return <ItemG container justifyContent={'space-between'} alignItems={'center'}>
					 <MenuItem style={{ flexGrow: 1 }} divider={divider ? i === menuItems.length - 1 ? false : true : false} disabled={m.disabled} key={i}
							onClick={handleMenuItemClick(m)} classes={menuItemClasses}>
							{m.icon ? <ItemG style={{ display: 'flex', marginRight: 8 }}>{m.icon}</ItemG> : null}
							<ItemG xs>{m.label}</ItemG>
						</MenuItem>
						{m.endIcon ? m.showOnlyOnDisabled ? m.disabled ? <ItemG className={cx({
							[cls.icon]: true,
							[cls.iconDisabled]: m.disabled
						})}>{m.endIcon}</ItemG> : null : <ItemG className={cx({
							[cls.icon]: true,
							[cls.iconDisabled]: m.disabled
						})}>{m.endIcon}</ItemG> : null}
					</ItemG>

				})}
			</Menu>
		</>
	)

}

export default DButton
