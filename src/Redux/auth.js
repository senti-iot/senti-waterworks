
const sAL = 'sAL'

export const setAccessLevel = (payload) => ({
	type: sAL,
	payload
})

const initialState = {
	role: {},
	privileges: [],
	isSuperUser: 0
}
const checkisSuperUser = (role) => {
	let isSuperUser = 0
	if (role.priority <= 10) {
		isSuperUser = 1
	}
	else {
		isSuperUser = 0
	}
	return isSuperUser
	/**
	 * TODO: Check if it is an admin
	 */
}
// const setState = (key, payload, state) => Object.assign({}, state, { [key]: payload })

export const auth = (state = initialState, { type, payload }) => {
	switch (type) {

		case sAL:
			return Object.assign({}, state, {
				role: payload.role,
				privileges: payload.privileges,
				isSuperUser: checkisSuperUser(payload.role)
			})

		default:
			return state
	}
}