import { dawaApi, weatherApi } from 'data/data'
import moment from 'moment'

/**
 * DAWA API GET address Lat Long
 * @param {String} street
 */
export const getLatLongFromAddress = async (street) => {
	//https://dawa.aws.dk/adgangsadresser?q=Kalkskraenten&husnr=28
	let response = await dawaApi.get(`/adgangsadresser?q=${street}`).then(rs => rs.ok ? rs.data : rs.ok)
	let coords = {
		lat: 0,
		long: 0
	}
	if (response) {
		if (response.length > 0) {
			let addressObj = response[0]
			if (addressObj.adgangspunkt)
				if (addressObj.adgangspunkt.koordinater) {
					coords.lat = addressObj.adgangspunkt.koordinater[1]
					coords.long = addressObj.adgangspunkt.koordinater[0]
				}
		}
	}
	return coords
}

/**
 * Senti API Core Weather Service
 * @param {Float} lat - Latitude
 * @param {Float} long - Longitude
 */
export const getWeather = async (date, lat, long) => {
	//https://api.senti.cloud/weather/v1/2018-05-11T00:00:00/57.0488/9.9217/da
	let startDate = moment(date).format('YYYY-MM-DDTHH:mm:ss')
	let response = await weatherApi.get(`${startDate}/${lat}/${long}/da`).then(rs => rs.ok ? rs.data : rs.ok)
	console.log('Weather', response)
	return response

	//https://api.senti.cloud/weather/v1/
}

