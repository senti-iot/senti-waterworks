import { wbAPI } from './data'

/**
 * @desc v3/installations - ALL installations
 */
export const getInstallations = async (orgUUID) => {
	let response = await wbAPI.get(`/v3/installations/${orgUUID}`).then(rs => rs.ok ? rs.data : rs.ok)
	return response
}

/**
 * @desc PUT v3/installation
 */

export const putInstallation = async (installation) => {
	let response = await wbAPI.put(`/v3/installation`, installation).then(rs => rs.ok ? rs.data : rs.ok)
	console.log('Response PUT installation', response)
	return response
}

/**
 * @desc POST v3/installation
 */

export const postInstallation = async (installation) => {
	let response = await wbAPI.post(`/v3/installation`, installation).then(rs => rs.ok ? rs.data : rs.ok)
	console.log('Response POST installation', response)
	return response
}
/**
 * @desc POST v3/installation/device
 */
export const postDevice = async (device) => {
	let response = await wbAPI.post(`/v3/installation/device`, device).then(rs => rs.ok ? rs.data : rs.ok)
	console.log('Response POST device', response)
	return response
}
/**
 * @desc PUT v3/installation/device
 */
export const putDevice = async (device) => {
	let response = await wbAPI.put(`/v3/installation/device`, device).then(rs => rs.ok ? rs.data : rs.ok)
	console.log('Response PUT device', response)
	return response
}
/**
 * @desc GET v3/installation
 */

export const getInstallation = async (instUUID) => {
	let response = await wbAPI.get(`/v3/installation/${instUUID}`).then(rs => rs.ok ? rs.data : rs.ok)
	console.log('Response GET', response)
	return response
}

/**
 * @desc DELETE v3/installation
 */

export const deleteInstallation = async (instUUID) => {
	let response = await wbAPI.delete(`/v3/installation/${instUUID}`).then(rs => rs.ok)
	console.log('Response installation DELETE', response)
	return response
}

/**
 * @desc PUT /v3/installation/user
 */
export const putUser = async (user) => {
	let response = await wbAPI.put(`/v3/installation/user`, user).then(rs => rs.ok ? rs.data : rs.ok)
	console.log('Response PUT user', response)
	return response
}