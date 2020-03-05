import { waterworksAPI } from 'data/data'

/**
 * @param {String} orgIdent - org identifier
 * @param {String} installationId - installation identifier
 * @param {String} deviceIdent - device identifier
 */
export const getOnboardingData = async (orgIdent, installationId, deviceIdent) => {
	let data = await waterworksAPI.get(`/onboarding/installation/${orgIdent}/${installationId}/${deviceIdent}`).then(rs => rs.data)
	console.log(data)
	return data
}