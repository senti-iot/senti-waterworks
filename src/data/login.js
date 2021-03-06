import { servicesCoreAPI } from './data'
import cookie from 'react-cookies'

/**
 *
 * @param {String} username
 * @param {String} password
 */
export const loginUser = async (username, password, organisationId) => {
	// var session = await loginApi.post('odeum/auth/organization', JSON.stringify({ username: username, password: password, orgNickname: organisationId })).then(rs => rs.data)
	var session = await servicesCoreAPI.post('/v2/auth/organisation', JSON.stringify({ username: username, password: password, orgNickname: organisationId })).then(rs => rs.data)
	return session
}
// export const loginUserViaGoogle = async (token) => {
// 	var session = await api.post('senti/googleauth', { id_token: token }).then(rs => rs.data)
// 	return session
// }
/**
 * Check if the session is valid
 */
export const getValidSession = async () => {
	let data = await servicesCoreAPI.get(`/v2/auth`).then(rs => rs)
	return data
}

/**
 * Get the logged in User
 */
export const getAuthUser = async (userId) => {
	var data = await servicesCoreAPI.get(`/v2/auth/user`).then(rs => rs.data)
	return data
}

/**
 * @function logOut Log out function
 */
export const logOut = async () => {
	// var session = cookie.load('SESSION')
	// var data = await loginApi.delete(`odeum/auth/${session.sessionID}`)
	cookie.remove('SESSION')
	// return data
}
/**
 *
 * @param {object} obj
 * @param {String} obj.email User's e-mail
 */
export const resetPassword = async (obj) => {
	let response = await servicesCoreAPI.post(`v2/entity/user/forgotpassword`, obj).then(rs => rs)
	return response.ok
}
/**
 *
 * @param {object} obj
 * @param {String} obj.newPassword New Password
 * @param {String} obj.passwordToken Confirm new password token
 */
export const confirmPassword = async (obj) => {
	let response = await servicesCoreAPI.post(`v2/entity/user/forgotpassword/set`, obj).then(rs => rs)
	return response.ok ? response.data : response.status
}
/**
 *
 * @param {object} obj
 * @param {String} obj.uuid User UUID
 * @param {String} obj.oldPassword Old Password - Not required
 * @param {String} obj.newPassword New Password
 */
export const setPassword = async (obj) => {
	let data = await servicesCoreAPI.post(`v2/entity/user/${obj.uuid}/setpassword`, obj).then(rs => rs.ok)
	return data
}
/**
 *
 * @param {object} user
 * @param {object} user.aux - Required
 * @param {object} user.aux.senti
 * @param {object} user.aux.sentiWaterworks
 */
export const saveSettings = async (user) => {
	// var data = await api.put(`/core/user/${user.id}`, user).then(rs => rs.data)
	// return data
	return true
}

/**
 * @param {Object} user.internal
 * @param {String} user.uuid
 */
export const saveInternal = async (s, uuid) => {
	let data = await servicesCoreAPI.put(`/v2/entity/user/${uuid}/internal`, s).then(rs => rs.ok)
	return data
}