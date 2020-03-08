import { waterworksAPI } from 'data/data'

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