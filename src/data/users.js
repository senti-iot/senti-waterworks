import { api } from './data'

//#region GET User,Users
export const getAllUsers = async () => {
	var data = await api.get('core/users').then(rs => rs.data)
	data.forEach(d => {
		if (d.aux) {
			delete d.aux.favorites
			delete d.aux.settings
		}
	})
	return data
}
export const getValidSession = async (userId) => {
	var data = await api.get(`core/user/${userId}`).then(rs => rs)
	return data
}
export const getUser = async (userId) => {
	var data = await api.get(`core/user/${userId}`).then(rs => rs.data)
	return data
}
export const createUser = async (user) => {
	let response = await api.post(`core/user`, user).then(rs => rs)
	return response.data ? response.data : response.status
}



//#endregion