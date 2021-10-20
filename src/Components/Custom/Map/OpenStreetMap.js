import React, { Fragment, useEffect, useState } from 'react'
import {
	MapContainer, TileLayer, Marker, /*  Popup */
} from 'react-leaflet'
import L from 'leaflet'

import { useSelector } from 'react-redux'
import MarkerIcon from './MarkerIcon'
// import mapStyles from './mapStyles'
// import OpenPopup from './OpenPopup'

/**
 * Plugins
 */
import layers from 'variables/LeafletPlugins/leafletMaps.json'
import FullScreen from 'variables/LeafletPlugins/FullScreenV2'
import ZoomControl from 'variables/LeafletPlugins/ZoomControlV2'
// import CenterUpdater from 'variables/LeafletPlugins/CenterUpdater'
// import { useTheme } from '@material-ui/core'
// import HeatLayer from 'variables/LeafletPlugins/HeatLayer'
// import HeatMapLegend from 'variables/LeafletPlugins/HeatMapLegend'
// import MyLocationControl from 'variables/LeafletPlugins/MyLocationControl'

const OpenStreetMap = (props) => {
	//Hooks
	// const map = useMap()
	// const theme = useTheme()
	// const classes = mapStyles()
	//Redux
	const mapTheme = useSelector(s => s.appState.mapTheme)
	//State

	const [map, setMap] = useState(null)
	const [zoom, setZoom] = useState(props.markers.length === 1 ? 17 : 9)
	//Const
	const { markers } = props
	//useCallbacks

	//useEffects
	useEffect(() => {
		if (map)
			map.setView(averageGeolocation(markers), zoom)
	}, [map, markers, zoom])
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

	const averageGeolocation = (coords) => {
		// console.log('Bing', coords)
		if (coords.length === 1) {
			return coords[0]
		}

		let x = 0.0
		let y = 0.0
		let z = 0.0

		for (let coord of coords) {
			// console.log("coord", coord)
			let latitude = coord.lat * Math.PI / 180
			let longitude = coord.long * Math.PI / 180

			x += Math.cos(latitude) * Math.cos(longitude)
			y += Math.cos(latitude) * Math.sin(longitude)
			z += Math.sin(latitude)
		}

		let total = coords.length

		x = x / total
		y = y / total
		z = z / total

		let defaultLat = parseFloat(56.2639) //Denmark,
		let defaultLng = parseFloat(9.5018) //Denmark

		let centralLongitude = Math.atan2(y, x)
		let centralSquareRoot = Math.sqrt(x * x + y * y)
		let centralLatitude = Math.atan2(z, centralSquareRoot)

		return [centralLatitude ? centralLatitude * 180 / Math.PI : defaultLat,
			centralLongitude ? centralLongitude * 180 / Math.PI : defaultLng
		]
	}

	return (
		<Fragment>
			<MapContainer
				attributionControl={true}
				zoomControl={false}
				// ref={r => this.map = r}
				center={averageGeolocation([])}
				zoom={zoom}
				onzoomend={setZoom}
				maxZoom={layers[mapTheme].maxZoom}
				// className={classes.map}
				style={{ height: 'calc(100%)', width: '100%', padding: 8 }}
				whenCreated={setMap}
			>
				{/* <CenterUpdater markers={markers}/> */}
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
							 {/* <Popup className={theme.palette.type === 'dark' ? classes.popupDark : classes.popup}>
								{/* <OpenPopup dontShow={calibrate} m={m} noSeeMore={markers.length === 1} heatMap={heatMap} />
							</Popup> */}
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