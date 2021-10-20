import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'

const CenterUpdater = (props) => {
	//Hooks
	const map = useMap

	//Redux

	//State

	//Const
	const { markers } = props

	//useCallbacks

	//useEffects
	useEffect(() => {
		map.setCenter(averageGeolocation(markers))
		return () => {

		}
	}, [map, markers])
	//Handlers

	const averageGeolocation = (coords) => {
		console.log('Bing', coords)
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

	return null
}

export default CenterUpdater
