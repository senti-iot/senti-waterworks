import { IconButton } from '@material-ui/core'
import FullscreenOutlined from '@material-ui/icons/FullscreenOutlined'
import { ItemG } from 'Components'
import React, { useState } from 'react'
import { useMap } from 'react-leaflet'
import pluginStyles from 'variables/LeafletPlugins/pluginStyles'
// import { useMap } from 'react-leaflet'
// const POSITION_CLASSES = {
// 	bottomleft: 'leaflet-bottom leaflet-left',
// 	bottomright: 'leaflet-bottom leaflet-right',
// 	topleft: 'leaflet-top leaflet-left',
// 	topright: 'leaflet-top leaflet-right',
// }


function MinimapControl({ position, zoom }) {
	//Hooks
	const map = useMap()
	const classes = pluginStyles()
	//Redux

	//State
	const [fullscreen, setFullscreen] = useState(false)

	//Const

	//useCallbacks

	//useEffects

	//Handlers
	const toggleFullscreen = (options) => {
		var container = map.getContainer()
		if (fullscreen) {
			if (options && options.pseudoFullscreen) {
				// disablePseudoFullscreen(container)
			} else if (document.exitFullscreen) {
				document.exitFullscreen()
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen()
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen()
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen()
			} else {
				// disablePseudoFullscreen(container)
			}
		} else {
			if (options && options.pseudoFullscreen) {
				// enablePseudoFullscreen(container)
			} else if (container.requestFullscreen) {
				container.requestFullscreen()
			} else if (container.mozRequestFullScreen) {
				container.mozRequestFullScreen()
			} else if (container.webkitRequestFullscreen) {
				container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
			} else if (container.msRequestFullscreen) {
				container.msRequestFullscreen()
			} else {
				// enablePseudoFullscreen(container)
			}
		}
		setFullscreen(!fullscreen)
	}
	// const enablePseudoFullscreen = (container) => {
	// 	// L.DomUtil.addClass(container, this.props.classes.pseudoFullscreen)
	// }

	// const disablePseudoFullscreen = (container) => {
	// 	// L.DomUtil.removeClass(container, this.props.classes.pseudoFullscreen)
	// }
	// Memoize the minimap so it's not affected by position changes

	return (
		<ItemG className="leaflet-control leaflet-bar" style={{ margin: '4px 0px' }}>
			<IconButton
				className={classes.fullscreenButton}
				onClick={() => toggleFullscreen(map.options)}
				color={'primary'}>
				<FullscreenOutlined />
			</IconButton>
		</ItemG>
	)
}

export default MinimapControl