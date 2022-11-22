import { wbAPI } from './data'

export const getInstallations = async () => {
	const response = await wbAPI.get('/v4/installations').then(rs => rs.ok ? rs.data : rs.ok)
	return response
}

export const getDevices = async () => {
	const response = await wbAPI.get('/v4/devices').then(rs => rs.ok ? rs.data : rs.ok)
	return response
}

export const getDevice = async (uuid) => {
	let response = await wbAPI.get('/v4/device/' + uuid).then(rs => rs.ok ? rs.data : rs.ok)
	return response
}

// export const getDevicesDataCSV = async (config) => {
// 	let response = await wbAPI.post('/v4/export/csv', config)
// 	return response.ok ? response.data : []
// }

export const getExportData = async (config) => {
	let response = await wbAPI.post('/v4/export/data', config)
	if (response.ok)
		return response.data
	else {
		return false
	}
}

export const getWaterUsageByHour = async (from, to, uuids) => {
	let response

	if (uuids) {
		response = await wbAPI.post(`/v4/data/usagebyhour/${from}/${to}`, uuids)
	} else {
		response = await wbAPI.get(`/v4/data/usagebyhour/${from}/${to}`)
	}

	return response.ok ? response.data : []
}

export const getWaterUsageByDay = async (from, to, uuids) => {
	let response

	if (uuids) {
		response = await wbAPI.post(`/v4/data/usagebyday/${from}/${to}`, uuids)
	} else {
		response = await wbAPI.get(`/v4/data/usagebyday/${from}/${to}`)
	}

	return response.ok ? response.data : []
}

export const getReadingUsage = async (from, to, uuids) => {
	let response

	if (uuids) {
		response = await wbAPI.post(`/v4/data/volume/${from}/${to}`, uuids)
	}

	return response.ok ? response.data : []
}

export const getCachedReadingData = async (orgUUID, from, to, uuids) => {
	let response = {}
	if (uuids) {
		response = await wbAPI.post(`/v4/data/cachedreading`, {
			orgId: orgUUID,
			from: from,
			to: to,
			uuids: uuids
		})
	} else {
		response.ok = false
	}

	return response.ok ? response.data : []
}

export const getBenchmarkUsageByHour = async (orgUuid, from, to) => {
	const response = await wbAPI.get(`/v4/data/benchmarkbyhour/${orgUuid}/${from}/${to}`)
	return response.ok ? response.data : []
}

export const getBenchmarkUsageByDay = async (orgUuid, from, to) => {
	const response = await wbAPI.get(`/v4/data/benchmarkbyday/${orgUuid}/${from}/${to}`)
	return response.ok ? response.data : []
}

export const getBenchmarkUsageByUUIDs = async (deviceUUIDs, from, to) => {
	const response = await wbAPI.post(`/v4/data/benchmarkcustom`, {
		from: from,
		to: to,
		uuids: deviceUUIDs
	})
	return response.ok ? response.data : []
}

export const getCachedTotalVolumeData = async (orgUUID, from, to, uuids) => {
	const response = await wbAPI.post(`/v4/data/cachedtotalvolume`, {
		orgUUID: orgUUID,
		from: from,
		to: to,
		uuids: uuids
	})

	return response.ok ? response.data : []
}

export const getCachedMinWTemperatureData = async (orgUUID, from, to, uuids) => {
	const response = await wbAPI.post(`/v4/data/cachedtemeraturewmin`, {
		orgUUID: orgUUID,
		from: from,
		to: to,
		uuids: uuids
	})

	return response.ok ? response.data : []
}

export const getCachedMinATemperatureData = async (orgUUID, from, to, uuids) => {
	const response = await wbAPI.post(`/v4/data/cachedtemeratureamin`, {
		orgUUID: orgUUID,
		from: from,
		to: to,
		uuids: uuids
	})

	return response.ok ? response.data : []
}

export const getCachedMinFlowData = async (orgUUID, from, to, uuids) => {
	const data = await getCachedMinWTemperatureData(orgUUID, from, to, uuids) // ?? why is this the same
	return data
}

export const getCachedMaxFlowData = async (orgUUID, from, to, uuids) => {
	const response = await wbAPI.post(`/v4/data/cachedflowmax`, {
		orgUUID: orgUUID,
		from: from,
		to: to,
		uuids: uuids
	})

	return response.ok ? response.data : []
}

export const getPriceList = async (orgId) => {
	let data = await wbAPI.get(`/settings/price/${orgId}`).then(rs => rs.data)
	return data
}
