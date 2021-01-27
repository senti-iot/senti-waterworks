import { OpenStreetMap } from 'Components'
import ItemG from 'Components/Containers/ItemG'
import { useLocalization } from 'Hooks'
import React /*, { useState } */ from 'react'

const MapContainer = () => {
	//Hooks
	const t = useLocalization()
	//Redux

	//State
	// const [markers, setMarkers] = useState([])
	//Const

	//useCallbacks

	//useEffects

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
					markers={[]}
				/>
			</ItemG>
		</ItemG>
	)
}

export default MapContainer
