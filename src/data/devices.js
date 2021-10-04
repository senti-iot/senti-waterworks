import { servicesAPI, dataExportAPI, waterworksAPI, wbAPI } from './data'
import moment from 'moment'
/**
 * Benchmark by hour
 * /v2/waterworks/data/benchmark/byhour/:orguuid/:from/:to
 * Data by hour
 * https://dev.services.senti.cloud/databroker/v2/waterworks/data/usagebyhour/2020-06-13/2020-06-14
 */

/**
 * @desc v2/devices - ALL devices
 */
export const getDevicesV2 = async () => {
	let response = await servicesAPI.get('/v2/devices').then(rs => rs.ok ? rs.data : rs.ok)
	return response
}

export const getDevice = async (uuid) => {
	let response = await servicesAPI.get(`/v2/device/${uuid}`).then(rs => rs.ok ? rs.data : rs.ok)
	return response
}

export const getDevicesDataCSV = async (config) => {
	let response = await dataExportAPI.post(`v1/export/csv`, config)
	return response.ok ? response.data : []
}

export const getExportData = async (config) => {
	let response = await dataExportAPI.post(`v2/waterworks/export`, config)
	if (response.ok)
		return response.data
	else {
		return false
	}
}
/**
 * @desc Get total volume data
 * @desc databroker/v2/waterworks/data/totalbyday/:orgUUID/:field/:from/:to
 * @param {String} orgUUID
 * @param {String} from
 * @param {String} to
 * @param {Array} uuids
 */
export const getWaterUsageByHour = async (from, to, uuids) => {
	// v2/waterworks/data/usagebyhour/2020-06-13/2020-06-14
	let startDate = moment(from).format('YYYY-MM-DD HH:mm:ss')
	let endDate = moment(to).format('YYYY-MM-DD HH:mm:ss')
	let response

	if (uuids) {
		response = await servicesAPI.post(`/v2/waterworks/data/usagebyhour/${startDate}/${endDate}`, uuids)
	}
	else {
		response = await servicesAPI.get(`/v2/waterworks/data/usagebyhour/${startDate}/${endDate}`)
	}
	return response.ok ? response.data : []
}

/**
 * Get water usage data
 * [uuid, uuid, uuid] to post(‘/v2/waterworks/data/usagebyday/:from/:to’)
 */
export const getWaterUsageByDay = async (from, to, uuids) => {
	let startDate = moment(from).format('YYYY-MM-DD')
	let endDate = moment(to).format('YYYY-MM-DD')
	let response


	console.log('uuids', uuids)
	if (uuids) {
		response = await wbAPI.get(`/v3/usage/byday/${uuids[0]}/${startDate}/${endDate}/`)
		// response = await servicesAPI.post(`/v2/waterworks/data/usagebyday/${startDate}/${endDate}`, uuids)
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
	let startDate = moment(from).format('YYYY-MM-DD HH:mm:ss')
	let endDate = moment(to).format('YYYY-MM-DD HH:mm:ss')
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
 * Get Benchmark usage by hour from an Org
 * @param {string} orgUuid -  Organisation UUID
 * @param {Date} from - Start Date
 * @param {Date} to - End Date
 */
export const getBenchmarkUsageByHour = async (orgUuid, from, to) => {
	let startDate = moment(from).format('YYYY-MM-DD HH:mm:ss')
	let endDate = moment(to).format('YYYY-MM-DD HH:mm:ss')
	// /v2/waterworks/data/benchmark/byhour/:orguuid/:from/:to
	let response = await servicesAPI.get(`/v2/waterworks/data/benchmark/byhour/${orgUuid}/${startDate}/${endDate}`)
	return response.ok ? response.data : []

}

/**
 * Get Benchmark usage from an Org
 * @param {string} orgUuid -  Organisation UUID
 * @param {Date} from - Start Date
 * @param {Date} to - End Date
 */
export const getBenchmarkUsageByDay = async (orgUuid, from, to) => {
	let startDate = moment(from).format('YYYY-MM-DD')
	let endDate = moment(to).format('YYYY-MM-DD')
	let response = await servicesAPI.get(`/v2/waterworks/data/benchmark/${orgUuid}/${startDate}/${endDate}`)
	return response.ok ? response.data : []

}

/**
 * Get Benchmark for specific UUIDs
 * @url /v2/waterworks/data/custom-benchmark/:from/:to
 * @param {Array} deviceUUIDs
 * @param {Date} from - Start Date
 * @param {Date} to - End Date
 */
export const getBenchmarkUsageByUUIDs = async (deviceUUIDs, from, to) => {
	let startDate = moment(from).format('YYYY-MM-DD')
	let endDate = moment(to).format('YYYY-MM-DD')
	let response = await servicesAPI.post(`/v2/waterworks/data/custom-benchmark/${startDate}/${endDate}`, deviceUUIDs)
	return response.ok ? response.data : []
}
/**
 * Get Price list for the org
 * @param {string} orgId
 */
export const getPriceList = async (orgId) => {
	let data = await waterworksAPI.get(`/settings/price/${orgId}`).then(rs => rs.data)
	return data
}

/**
 * Get total volume data
 * databroker/v2/waterworks/data/totalbyday/:orgUUID/:field/:from/:to
 * @param {String} orgUUID
 * @param {String} from
 * @param {String} to
 * @param {Array} uuids
 */
export const getTotalVolumeData = async (orgUUID, from, to, uuids) => {
	let startDate = moment(from).format('YYYY-MM-DD')
	let endDate = moment(to).format('YYYY-MM-DD')
	let response
	if (uuids) {
		response = await servicesAPI.post(`/v2/waterworks/data/totalusagebyday/${startDate}/${endDate}`, uuids)
	}
	else {
		response = await servicesAPI.get(`/v2/waterworks/data/totalusagebyday/${orgUUID}/${startDate}/${endDate}`)
	}
	return response.ok ? response.data : []
}

/**
 * Get minimum water temperature
 * databroker/v2/waterworks/data/totalbyday/:orgUUID/:field/:from/:to
 * @param {String} orgUUID
 * @param {String} from
 * @param {String} to
 * @param {Array} uuids
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
 * Get minimum ambient temperature
 * databroker/v2/waterworks/data/totalbyday/:orgUUID/:field/:from/:to
 * @param {String} orgUUID
 * @param {String} from
 * @param {String} to
 * @param {Array} uuids
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
 * get minimum flow
 * databroker/v2/waterworks/data/totalbyday/:orgUUID/:field/:from/:to
 * @param {String} orgUUID
 * @param {String} from
 * @param {String} to
 * @param {Array} uuids
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
 * get maximum flow
 * databroker/v2/waterworks/data/totalbyday/:orgUUID/:field/:from/:to
 * @param {String} orgUUID
 * @param {String} from
 * @param {String} to
 * @param {Array} uuids
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
