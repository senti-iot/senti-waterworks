import { OpenStreetMap } from 'Components'
import ItemG from 'Components/Containers/ItemG'
import { useLocalization } from 'Hooks'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { customFilterItems } from 'variables/functions/filters'

const MapContainer = () => {
	//Hooks
	const t = useLocalization()
	//Redux
	const installations = useSelector(s => s.data.installations)
	const filters = useSelector(s => s.appState.filters.installations)
	const openTagFilter = useSelector(s => s.appState.openTagFilter)

	//State
	const [markers, setMarkers] = useState([])
	//Const

	//useCallbacks

	//useEffects
	useEffect(() => {
		if (installations.length > 0) {
			// console.log('Setting markers', installations)
			let markers = customFilterItems(installations, filters).map(i => ({
				...i,
				address: i.address,
				lat: i.lat,
				long: i.long
			}))
			setMarkers(markers.filter(f => f.lat && f.long))
		}

	}, [filters, installations])

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
			<ItemG xs style={{ height: `calc(100vh - ${openTagFilter ? '345px' : '288px' })` }}>
				<OpenStreetMap
					t={t}
					markers={markers}
				/>
			</ItemG>
		</ItemG>
	)
}

export default MapContainer
