import { waterworksAPI } from 'data/data'

/**
 * Auto fill information that we already have regarding the user
 * @param {String} orgIdent - org identifier
 * @param {String} installationId - installation identifier
 * @param {String} deviceIdent - device identifier
 */
export const getOnboardingData = async (orgIdent, installationId, deviceIdent) => {
	let data = await waterworksAPI.get(`/onboarding/installation/${orgIdent}/${installationId}/${deviceIdent}`).then(rs => rs.data)
	console.log(data)
	return data
}

/**
 * Create a new basic user
 * @param {object} user
 */
export const createOnboardingUser = async (user) => {
	let data = await waterworksAPI.post('/onboarding/user', user).then(rs => rs)
	console.log(data)
	return data
}