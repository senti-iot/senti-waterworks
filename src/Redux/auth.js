
const sAL = 'sAL'

export const setAccessLevel = (payload) => ({
	type: sAL,
	payload
})

const initialState = {
	role: {},
	isAdmin: 0
}
const checkIsAdmin = (role) => {
	let isAdmin = 0
	if (role.priority <= 100) {
		isAdmin = 1
	}
	else {
		isAdmin = 0
	}
	return isAdmin
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
				isAdmin: checkIsAdmin(payload)
			})

		default:
			return state
	}
}