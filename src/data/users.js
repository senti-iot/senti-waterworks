import { servicesCoreAPI } from './data'

//#region GET User,Users
export const getAllUsers = async () => {
	var data = await servicesCoreAPI.get('/v2/entity/users').then(rs => rs.data)
	if (data.length > 0) {
		data.forEach(d => {
			if (d.aux) {
				delete d.aux.favorites
				delete d.aux.settings
			}
		})
	}
	return data
}
// export const getValidSession = async (userId) => {
// 	var data = await api.get(`core/user/${userId}`).then(rs => rs)

// 	return data
// }

// export const getUser = async (userId) => {
// 	// var data = await api.get(`core/user/${userId}`).then(rs => rs.data)
// 	var data = await api.get(`core/user/${userId}`).then(rs => rs.data)
// 	return data
// }
// export const createUser = async (user) => {
// 	let response = await api.post(`core/user`, user).then(rs => rs)
// 	return response.data ? response.data : response.status
// }

//#endregion

//#region Senti CORE

/**
 * {{core_dev}}/v2/entity/user/{uuid}
 */
export const updateUser = async (user) => {
	var response = await servicesCoreAPI.put(`/v2/entity/user/${user.uuid}`, user).then(rs => rs)
	return response.ok
}
/**
 * /v2/entity/user/79451a34-62fa-4541-8599-a33774c70479/setpassword
 */
export const updatePassword = async (userId, obj) => {
	var response = await servicesCoreAPI.post(`/v2/entity/user/${userId}/setpassword`, obj).then(rs => rs.ok)
	return response
}

export const createUser = async (user) => {
	var res = await servicesCoreAPI.post(`/v2/entity/user`, user).then(rs => rs)
	return res
}
//#endregion
