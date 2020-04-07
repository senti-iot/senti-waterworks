import { servicesAPI, dataExportAPI, waterworksAPI } from './data'
import moment from 'moment'


/**
 * v2/devices - ALL devices
 * v2/devices/orgUUID - All devices under that org
 * v2/device/deviceUUID - get that device if you have access to it (403)
 */
export const getDevicesV2 = async () => {
	let response = await servicesAPI.get('/v2/devices').then(rs => rs.ok ? rs.data : rs.ok)
	return response
}

export const getDevices = async () => {
	let response = await servicesAPI.get('v1/138230100010117/devices').then(rs => rs)
	return response.ok ? response.data : []
}
/**
 */
export const getDevicesData = async (from, to, ) => {
	let startDate = moment(from).format('YYYY-MM-DD')
	let endDate = moment(to).format('YYYY-MM-DD')

	let response = await servicesAPI.get(`v1/deviceDataByCustomerID/138230100010117/${startDate}/${endDate}/-1`)

	return response.ok ? response.data : []
}

export const getDevicesDataCSV = async (config) => {
	let response = await dataExportAPI.post(`v1/export/csv`, config)
	return response.ok ? response.data : []
}

/**
 * Get water usage data
 * [uuid, uuid, uuid] to post(‘/v2/waterworks/data/usagebyday/:from/:to’)
 */
export const getWaterUsage = async (from, to, uuids) => {
	let startDate = moment(from).format('YYYY-MM-DD')
	let endDate = moment(to).format('YYYY-MM-DD')
	let response

	if (uuids) {
		response = await servicesAPI.post(`/v2/waterworks/data/usagebyday/${startDate}/${endDate}`, uuids)
	}
	else {
		response = await servicesAPI.get(`/v2/waterworks/data/usagebyday/${startDate}/${endDate}`)
	}
	return response.ok ? response.data : []
}


/**
 * Get Reading data
 */

export const getReadingUsage = async (from, to, uuids) => {
	let startDate = moment(from).format('YYYY-MM-DD')
	let endDate = moment(to).format('YYYY-MM-DD')
	let response
	if (uuids) {
		response = await servicesAPI.post(`/v2/waterworks/data/volume/${startDate}/${endDate}`, uuids)
	}
	else {
		response = await servicesAPI.get(`/v2/waterworks/data/volume/${startDate}/${endDate}`)
	}
	return response.ok ? response.data : []
}
/**
 * Get Benchmark usage from an Org
 * @param {string} orgUuid -  Organisation UUID
 * @param {Date} from - Start Date
 * @param {Date} to - End Date
 */
export const getBenchmarkUsage = async (orgUuid, from, to) => {
	let startDate = moment(from).format('YYYY-MM-DD')
	let endDate = moment(to).format('YYYY-MM-DD')
	let response = await servicesAPI.get(`/v2/waterworks/data/benchmark/${orgUuid}/${startDate}/${endDate}`)
	return response.ok ? response.data : []

}

/**
 * Get Price list for the org
 */
export const getPriceList = async (orgId) => {
	let data = await waterworksAPI.get(`/settings/price/${orgId}`).then(rs => rs.data)
	return data
}

/**
 * databroker/v2/waterworks/data/totalbyday/489043f8-16ef-4b56-8f66-0b0bfa55e0d4/volume/2020-02-26/2020-03-05
 * @param {String} orgUUId
 * @param {String} field
 * @param {String} from
 * @param {String} to
 */

export const getTotalVolumeData = async (orgUUID, from, to, uuids) => {
	let startDate = moment(from).format('YYYY-MM-DD')
	let endDate = moment(to).format('YYYY-MM-DD')
	let response
	if (uuids) {
		response = await servicesAPI.post(`/v2/waterworks/data/totalbyday/${orgUUID}/volume/${startDate}/${endDate}`, uuids)
	}
	else {
		response = await servicesAPI.get(`/v2/waterworks/data/totalbyday/${orgUUID}/volume/${startDate}/${endDate}`)
	}
	return response.ok ? response.data : []
}

/**
 * databroker/v2/waterworks/data/totalbyday/489043f8-16ef-4b56-8f66-0b0bfa55e0d4/volume/2020-02-26/2020-03-05
 * @param {String} orgUUId
 * @param {String} field
 * @param {String} from
 * @param {String} to
 */

export const getMinWTemperatureData = async (orgUUID, from, to, uuids) => {
	let startDate = moment(from).format('YYYY-MM-DD')
	let endDate = moment(to).format('YYYY-MM-DD')
	let response
	if (uuids) {
		response = await servicesAPI.post(`/v2/waterworks/data/minWTemp/${startDate}/${endDate}`, uuids)
	}
	else {
		response = await servicesAPI.get(`/v2/waterworks/data/minWTemp/${startDate}/${endDate}`)
	}
	return response.ok ? response.data : []
}
/**
 * databroker/v2/waterworks/data/totalbyday/489043f8-16ef-4b56-8f66-0b0bfa55e0d4/volume/2020-02-26/2020-03-05
 * @param {String} orgUUId
 * @param {String} from
 * @param {String} to
 * @param {Array} uuids*
 */

export const getMinATemperatureData = async (orgUUID, from, to, uuids) => {
	let startDate = moment(from).format('YYYY-MM-DD')
	let endDate = moment(to).format('YYYY-MM-DD')
	let response
	if (uuids) {
		response = await servicesAPI.post(`/v2/waterworks/data/minATemp/${startDate}/${endDate}`, uuids)
	}
	else {
		response = await servicesAPI.get(`/v2/waterworks/data/minATemp/${startDate}/${endDate}`)
	}
	return response.ok ? response.data : []
}

/**
 * databroker/v2/waterworks/data/totalbyday/489043f8-16ef-4b56-8f66-0b0bfa55e0d4/volume/2020-02-26/2020-03-05
 * @param {String} orgUUId
 * @param {String} field
 * @param {String} from
 * @param {String} to
 */

export const getMinFlowData = async (orgUUID, from, to, uuids) => {
	let startDate = moment(from).format('YYYY-MM-DD')
	let endDate = moment(to).format('YYYY-MM-DD')
	let response
	if (uuids) {
		response = await servicesAPI.post(`/v2/waterworks/data/minFlow/${startDate}/${endDate}`, uuids)
	}
	else {
		response = await servicesAPI.get(`/v2/waterworks/data/minFlow/${startDate}/${endDate}`)
	}
	return response.ok ? response.data : []
}

/**
 * databroker/v2/waterworks/data/totalbyday/489043f8-16ef-4b56-8f66-0b0bfa55e0d4/volume/2020-02-26/2020-03-05
 * @param {String} orgUUId
 * @param {String} field
 * @param {String} from
 * @param {String} to
 */

export const getMaxFlowData = async (orgUUID, from, to, uuids) => {
	let startDate = moment(from).format('YYYY-MM-DD')
	let endDate = moment(to).format('YYYY-MM-DD')
	let response
	if (uuids) {
		response = await servicesAPI.post(`/v2/waterworks/data/maxFlow/${startDate}/${endDate}`, uuids)
	}
	else {
		response = await servicesAPI.get(`/v2/waterworks/data/maxFlow/${startDate}/${endDate}`)
	}
	return response.ok ? response.data : []
}
