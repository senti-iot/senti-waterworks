/* eslint-disable indent */

// ACTION TYPES
const LOGIN_INFO = 'LOGIN_INFO'
const CONTACT_INFO = 'CONTACT_INFO'
const PROFILE_INFO = 'PROFILE_INFO'

/* ============================================================================================= */

// DISPATCHERS
export const handleLoginInfo = (name, value) => dispatch => {
	dispatch({ type: LOGIN_INFO, payload: { name, value } })
}

export const handleContactInfo = (name, value) => dispatch => {
	dispatch({ type: CONTACT_INFO, payload: { name, value } })
}

export const handleProfileInfo = (name, value) => dispatch => {
	dispatch({ type: PROFILE_INFO, payload: { name, value } })
}

/* ============================================================================================= */

// INITIAL STATE
const initialState = {
	login: {
		number: '',
		password: ''
	},
	contact: {
		name: '',
		surname: '',
		email: '',
		phone: '',
		address: '',
		postCode: '',
		country: ''
	},
	profile: {
		email: '',
		password: '',
		passwordRepeat: '',
		adults: '',
		children: '',
		acceptedTerms: false
	}
}

/* ============================================================================================= */

// REDUCER
export const mobileOnboarding = (state = initialState, { type, payload }) => {
	switch (type) {
		case "RESET_APP":
			return initialState
		case LOGIN_INFO:
			return {
				...state,
				login: {
					...state.login,
					[payload.name]: payload.value
				}
			}
		case CONTACT_INFO:
			return {
				...state,
				contact: {
					...state.contact,
					[payload.name]: payload.value
				}
			}
		case PROFILE_INFO:
			return {
				...state,
				profile: {
					...state.profile,
					[payload.name]: payload.value
				}
			}
		default:
			return state
	}
}