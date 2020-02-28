
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
	/**
	 * TODO: Check if it is an admin
	 */
	return 1
}
// const setState = (key, payload, state) => Object.assign({}, state, { [key]: payload })

export const auth = (state = initialState, { type, payload }) => {
	switch (type) {

		case sAL:
			return Object.assign({}, state, {
				role: payload.role,
				isAdmin: checkIsAdmin(payload.role)
			})

		default:
			return state
	}
}