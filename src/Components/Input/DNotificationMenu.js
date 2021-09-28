import React, {
	Fragment, useState
} from 'react'
import { IconButton, Menu, MenuItem, Button, Tooltip } from '@material-ui/core'
import { ItemG } from 'Components'
import { MoreVert, Notifications as AlarmIco } from 'variables/icons'
import { useHistory, useLocalization } from 'Hooks'

import T from 'Components/Typography/T'
import Caption from 'Components/Typography/Caption'
import moment from 'moment'



const DMenu = (props) => {
	//Hooks
	const t = useLocalization()
	const history = useHistory()
	// const classes = styles()
	//Redux

	//Const
	const { menuItems, icon, button, divider, tooltip, buttonClassName, transformOrigin, anchorOrigin, PaperProps, onMenuClick } = props

	//State
	const [anchor, setAnchor] = useState(null)
	//useCallbacks

	//useEffects

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
		history.push(`/notification/${m.uuid}`)
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
				onClick={onMenuClick}
				onClose={handleCloseActionsDetails}
				transformOrigin={transformOrigin}
				anchorOrigin={anchorOrigin}
				disablePortal
				PaperProps={{ style: {  marginTop: 50, minWidth: 300, maxWidth: 350 }, ...PaperProps }}>
				{menuItems.map((m, i) => {
					return <MenuItem
						divider={divider ? i === menuItems.length - 1 ? false : true : false}
						selected={m.selected}
						key={i}
						onClick={handleMenuItemClick(m)}
						style={{
							padding: '6px 0px'
						}}
					>
						<ItemG container justify={'space-between'} alignItems={'center'}>
							<ItemG xs container justify={'center'} alignItems={'center'}>
								<AlarmIco style={{ color: 'rgba(0, 0, 0, 0.54)' }}/>
							</ItemG>
							<ItemG xs={10} container>
								<ItemG xs={12}>
									<T>{m.ruleName}</T>
								</ItemG>
								<ItemG xs={12}>
									<Caption style={{ whiteSpace: 'pre-wrap' }}>
										{m.message}
									</Caption>
								</ItemG>
								<ItemG xs={12}>
									<Caption>
										{`${m.deviceName} - ${m.deviceUUNAME}`}
									</Caption>
								</ItemG>
								<ItemG xs={12}>
									<Caption>
										{moment(m.dataTime).format("HH:mm:ss DD-MM-YYYY")}
									</Caption>
								</ItemG>
							</ItemG>
						</ItemG>
					</MenuItem>
				})}
			</Menu>
		</Fragment>
	)

}

export default DMenu
