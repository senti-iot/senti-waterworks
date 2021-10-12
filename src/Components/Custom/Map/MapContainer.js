import { OpenStreetMap } from 'Components'
import ItemG from 'Components/Containers/ItemG'
import { useLocalization } from 'Hooks'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const MapContainer = () => {
	//Hooks
	const t = useLocalization()
	//Redux
	const installations = useSelector(s => s.data.installations)

	//State
	const [markers, setMarkers] = useState([])
	//Const

	//useCallbacks

	//useEffects
	useEffect(() => {
		if (installations.length > 0) {
			setMarkers(installations.map(i => ({
				...i,
				address: i.address,
				lat: 52.40659620271129,
				long: 7.965604486775992
			})))
		}

	}, [installations])
	//Handlers

	// const getLatLngFromMap = async (e) => {
	// 	let lat = e.target._latlng.lat
	// 	let long = e.target._latlng.lng
	// 	let address = await getAddressByLocation(lat, long)
	// 	let addressStr = address.vejnavn + ' ' + address.husnr + ', ' + address.postnr + ' ' + address.postnrnavn
	// 	setMarkers([{
	// 		...props.device,
	// 		address: addressStr,
	// 		lat,
	// 		long,
	// 		weather: props.weather
	// 	}])
	// }
	return (
		<ItemG container>
			<ItemG xs style={{ height: 'calc(100vh - 288px)' }}>
				<OpenStreetMap
					t={t}
					markers={markers}
				/>
			</ItemG>
		</ItemG>
	)
}

export default MapContainer
