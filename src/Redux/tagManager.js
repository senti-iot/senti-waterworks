import { getAllTags } from 'data/tags'

//#region Actions
const getT = 'getTags'

//#endregion

//#region Middleware


export const getTags = async () => {
	return async (dispatch, getState) => {
		let tags = await getAllTags()
		dispatch({
			type: getT,
			payload: tags
		})
	}
}

//#endregion


//#region State & Reducer

const initialState = {
	tags: []
}

export const tagManager = (state = initialState, { type, payload }) => {
	switch (type) {

		case getT:
			return Object.assign({}, state, { tags: payload })

		default:
			return state
	}
}

//#endregion