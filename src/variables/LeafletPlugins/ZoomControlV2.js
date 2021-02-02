import { IconButton } from '@material-ui/core'
import { Add, Remove } from 'variables/icons'
import { ItemG } from 'Components'
import React from 'react'
import { useMap } from 'react-leaflet'
import pluginStyles from 'variables/LeafletPlugins/pluginStyles'

function ZoomControl({ position, zoom }) {
	//Hooks
	const map = useMap()
	const classes = pluginStyles()
	//Redux

	//State

	//Const

	//useCallbacks

	//useEffects

	//Handlers
	const zoomIn = (e) => {
		e.stopPropagation()
		// L.DomEvent.stopPropagation(e)
		// L.DomEvent.disableClickPropagation(this.zoomInButton)
		map.zoomIn(map.options.zoomDelta * (e.shiftKey ? 3 : 1))
	}
	const zoomOut = e => {
		e.stopPropagation()
		// L.DomEvent.stopPropagation(e)
		// L.DomEvent.disableClickPropagation(zoomOutButton)
		map.zoomOut(map.options.zoomDelta * (e.shiftKey ? 3 : 1))
	}
	return (
		<ItemG className="leaflet-control leaflet-bar">
			<ItemG container direction={'column'} style={{ background: 'rgba(0,0,0,0.2)' }}>
				<IconButton
					className={classes.fullscreenButton}
					style={{ margin: "0px 0px 2px 0px" }}
					onClick={zoomIn}
					// buttonRef={r => zoomInButton = r}
					color={'primary'}>
					<Add />
				</IconButton>
				<IconButton
					className={classes.fullscreenButton}
					onClick={zoomOut}
					// buttonRef={r => zoomOutButton = r}
					color={'primary'}>
					<Remove />
				</IconButton>
			</ItemG>
		</ItemG>
	)
}

export default ZoomControl