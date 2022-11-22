import React, {
	Fragment, /* useEffect, */ useState
} from 'react'
import { IconButton, Menu, MenuItem, Button, Tooltip, Collapse, ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core'
import { ItemG } from 'Components'
import { ExpandMore, MoreVert, Visibility } from 'variables/icons'
import { useLocalization } from 'Hooks'
import cx from 'classnames'

import { makeStyles } from '@material-ui/styles'


const styles = makeStyles(theme => ({
	expand: {
		transform: 'rotate(0deg)',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
}))

const DMenu = (props) => {
	//Hooks
	const t = useLocalization()
	const classes = styles()
	//Redux

	//Const
	const { menuItems, icon, button, divider, tooltip, buttonClassName, transformOrigin, anchorOrigin, PaperProps } = props

	//State
	const [anchor, setAnchor] = useState(null)
	const [dropdowns, setDropdowns] = useState([])
	//useCallbacks

	//useEffects
	// useEffect(() => {
	// 	// console.log('dropdowns', dropdowns)

	// }, [dropdowns])
	//Handlers

	//#region Handlers
	const handleDropdownOpen = index => {

		let arrD = dropdowns
		let d = arrD[index] ? !arrD[index] : true
		arrD[index] = d
		// console.log('arrD', arrD)
		setDropdowns([...arrD])
		// setOpened(!opened)
	}
	const handleDropdownClose = index => {

		let arrD = dropdowns
		let d = false
		arrD[index] = d
		setDropdowns([...arrD])
		// setOpened(!opened)
	}

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
		<Fragment>
			{button && <Button
				aria-label='More'
				aria-owns={anchor ? 'long-menu' : null}
				aria-haspopup='true'
				style={{ color: 'rgba(0, 0, 0, 0.54)' }}
				onClick={handleOpenActionsDetails}>
				{icon ? icon : <MoreVert />}
			</Button>}
			{!button && <Tooltip title={tooltip ? tooltip : t('menus.menu')}>
				<IconButton
					aria-label='More'
					aria-owns={anchor ? 'long-menu' : null}
					aria-haspopup='true'
					classes={{
						root: buttonClassName
					}}
					onClick={handleOpenActionsDetails}>
					{icon ? icon : <MoreVert />}
				</IconButton>
			</Tooltip>}
			<Menu
				id='long-menu'
				anchorEl={anchor}
				open={Boolean(anchor)}
				onClose={handleCloseActionsDetails}
				transformOrigin={transformOrigin}
				anchorOrigin={anchorOrigin}
				disablePortal
				PaperProps={{ style: { minWidth: 200 }, ...PaperProps }}>
				{menuItems.map((m, i) => {
					if (m.dropdown) {
						return [<MenuItem style={{ display: 'flex' }} button onClick={() => handleDropdownOpen(i)}>
							<ItemG style={{ display: 'flex', marginRight: 8 }}><Visibility /></ItemG>
							<ItemG xs>{m.label}</ItemG>


							<ExpandMore className={cx({
								[classes.expandOpen]: dropdowns[i],
							}, classes.expand)} />
						</MenuItem>,

						<Collapse in={dropdowns[i]} timeout='auto' unmountOnExit>
							<List component='div' disablePadding>
								{m.options.map(op => {
									return <ListItem key={op.id} button onClick={() => { handleCloseActionsDetails();handleDropdownClose(i); m.handleClick(op.id) }}>
										<ListItemIcon>
											{op.icon}
										</ListItemIcon>
										<ListItemText primary={op.label} />
									</ListItem>
								})}
							</List>
						</Collapse>
						]
					}
					if (m.dontShow)
						return null
					return <MenuItem divider={divider ? i === menuItems.length - 1 ? false : true : false} selected={m.selected} key={i}
						onClick={handleMenuItemClick(m)}>
						<ItemG container justifyContent={'space-between'} alignItems={'center'}>
							{m.icon ? <ItemG style={{ display: 'flex', marginRight: 8 }}>{m.icon}</ItemG> : null}
							<ItemG xs>{m.label}</ItemG>
						</ItemG>
					</MenuItem>
				})}
			</Menu>
		</Fragment>
	)

}

export default DMenu
