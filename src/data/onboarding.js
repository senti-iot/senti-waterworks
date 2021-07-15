import { waterworksAPI, servicesCoreAPI, wbAPI } from 'data/data'

/**
 * V3 Create Installation User
 */

export const createInstUser = async (instUser) => {
	let response = await wbAPI.post(`/v3/onboard/create-waterworks-user`, instUser).then(rs => rs)
	console.log(response.ok ? response.data : response.status)
	return response.ok ? response.data : response.ok
}


/**
 * V3 Create Senti User
 */

export const createSentiUser = async (user) => {
	let response = await wbAPI.post(`/v3/onboard/create-senti-user`, user).then(rs => rs)
	console.log(response.ok ? response.data : response.status)
	return response.ok ? response.data : response.ok
}

/**
 * V3 Waterworks Get Onboarding data
 */

export const getOnboardData = async (orgIdent, installationIdent, deviceIdent) => {
	let response = await wbAPI.post(`/v3/onboard/get-installation`, { deviceIndent: deviceIdent, installationIndent: installationIdent, orgIndent: orgIdent  }).then(rs => rs)
	console.log(response.ok ? response.data : response.status)
	return response.ok ? response.data : response.status
}

/**
 * Auto fill information that we already have regarding the user
 * @param {String} orgIdent - org identifier
 * @param {String} installationId - installation identifier
 * @param {String} deviceIdent - device identifier
 */
export const getOnboardingData = async (orgIdent, installationId, deviceIdent) => {
	let data = await waterworksAPI.get(`/onboarding/installation/${orgIdent}/${installationId}/${deviceIdent}`).then(rs => rs)
	return data.data ? data.data : data.status
}

/**
 * Create a new basic user
 * @param {object} user
 */
export const createOnboardingUser = async (user, authUUID) => {
	let data = await waterworksAPI.post(`/onboarding/user/${authUUID}`, user).then(rs => rs)
	return data
}


/**
 * Confirm Onboarding user
 * @param {object} token - confirm token
 */

export const confirmOnboardingUser = async (token, password) => {
	let data = await servicesCoreAPI.post(`/v2/entity/user/confirm`, { token: token, newPassword: password })
	return data
}