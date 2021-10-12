import React, { Fragment, useState } from 'react'
import {
	MapContainer, TileLayer, Marker, Popup
} from 'react-leaflet'
import L from 'leaflet'

import { useSelector } from 'react-redux'
import MarkerIcon from './MarkerIcon'
import mapStyles from './mapStyles'
// import OpenPopup from './OpenPopup'

/**
 * Plugins
 */
import layers from 'variables/LeafletPlugins/leafletMaps.json'
import FullScreen from 'variables/LeafletPlugins/FullScreenV2'
import ZoomControl from 'variables/LeafletPlugins/ZoomControlV2'
import { useTheme } from '@material-ui/core'
// import HeatLayer from 'variables/LeafletPlugins/HeatLayer'
// import HeatMapLegend from 'variables/LeafletPlugins/HeatMapLegend'
// import MyLocationControl from 'variables/LeafletPlugins/MyLocationControl'

const OpenStreetMap = (props) => {
	//Hooks
	// const map = useMap()
	const theme = useTheme()
	const classes = mapStyles()
	//Redux
	const mapTheme = useSelector(s => s.appState.mapTheme)
	//State
	const [zoom, setZoom] = useState(props.markers.length === 1 ? 17 : 13)

	//Const
	const { markers } = props
	//useCallbacks

	//useEffects

	//Handlers

	// const handleClick = (event) => {
	// 	const items = this.state.dataSet
	// 	items[event.target.id].visible = !items[event.target.id].visible

	// 	this.setState({
	// 		dataSet: items,
	// 	})
	// }

	const returnSvgIcon = (state) => {
		var CustomIcon = L.Icon.extend({
			options: {
				iconSize: [25, 41],
				// iconAnchor: [12, 20],
				popupAnchor: [1, -34],
			}
		})

		const icon = MarkerIcon(state)
		var iconUrl = 'data:image/svg+xml;base64,' + btoa(icon)
		return new CustomIcon({
			iconUrl: iconUrl
		})

	}

	// componentDidMount = () => {
	// 	if (this.props.markers.length > 1)
	// 		this.centerOnAllMarkers()
	// 	if (this.props.iRef) {
	// 		this.props.iRef(this.map)
	// 	}
	// 	this.map.leafletElement.on('popupopen', (e) => {
	// 		var px = this.map.leafletElement.project(e.popup._latlng) // find the pixel location on the map where the popup anchor is
	// 		// px.y -= e.popup._container.clientHeight * 2 // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
	// 		px.y -= 336 / 2 // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
	// 		this.map.leafletElement.flyTo(this.map.leafletElement.unproject(px)) // pan to new center

	// 	})
	// }
	// componentDidUpdate = (prevProps, prevState) => {
	// 	if (prevProps.mapTheme !== this.props.mapTheme)
	// 		this.map.leafletElement.setMaxZoom(layers[this.props.mapTheme].maxZoom)
	// 	if (this.props.calibrate) {
	// 		this.map.leafletElement.off("click")
	// 	}
	// }

	// const centerOnAllMarkers = () => {
	// 	let arr = this.props.markers.map(m => m.lat && m.long ? [m.lat, m.long] : null)
	// 	arr = arr.filter(x => !!x)
	// 	if (arr.length > 1)
	// 		this.map.leafletElement.fitBounds([arr])
	// 	else {
	// 		this.setState({ zoom: 6 })
	// 		this.map.leafletElement.fitBounds([this.getCenter()])
	// 		this.map.leafletElement.zoomOut(12)
	// 	}

	// }
	const getCenter = () => {
		let center = []
		let defaultLat = parseFloat(56.2639) //Denmark,
		let defaultLng = parseFloat(9.5018) //Denmark

		if (props.markers.length === 1)
			center = [props.markers[0].lat, props.markers[0].long]
		else {
			center = [defaultLat, defaultLng]

		}
		return center
	}

	return (
		<Fragment>
			<MapContainer
				attributionControl={true}
				zoomControl={false}
				// ref={r => this.map = r}
				center={getCenter()}
				zoom={zoom}
				onzoomend={setZoom}
				maxZoom={layers[mapTheme].maxZoom}
				// className={classes.map}
				style={{ height: 'calc(100%)', width: '100%', padding: 8 }}
			>
				<FullScreen position={'topleft'} />
				<ZoomControl position={'topleft'}/>
				{/* <PZtoMarkers markers={markers}/> */}
				{/* <MyLocationControl mapLayer={layer} /> */}
				<TileLayer /* ref={r => layer = r} */ url={layers[mapTheme].url} attribution={layers[mapTheme].attribution} />
				{layers[mapTheme].extraLayers ? layers[mapTheme].extraLayers.map(l => (
					<TileLayer url={l} />
				)) : null}
				{markers.map((m, i) => {
					if (m.lat && m.long) {
						return <Marker

							position={[m.lat, m.long]}
							key={i}
							icon={returnSvgIcon(m.liveStatus)}>
							 <Popup className={theme.palette.type === 'dark' ? classes.popupDark : classes.popup}>
								{/* <OpenPopup dontShow={calibrate} m={m} noSeeMore={markers.length === 1} heatMap={heatMap} /> */}
							</Popup>
						</Marker>
					}
					return null
				})}
			</MapContainer>
		</Fragment>
	)
}

export default OpenStreetMap

// class OpenStreetMap extends React.Component {

// 	render() {
// 		const { zoom } = this.state
// 		return

// 	}

// }
// const mapStateToProps = (state) => ({
// 	language: state.settings.language,
// 	mapTheme: state.settings.mapTheme

// })

// const mapDispatchToProps = {

// }
// export default withLeaflet(connect(mapStateToProps, mapDispatchToProps)(withStyles(mapStyles, { withTheme: true })(OpenStreetMap)))