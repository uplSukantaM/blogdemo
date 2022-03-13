/* eslint-disable import/no-anonymous-default-export */
import * as types from "../../../redux/ActionTypes"

let initialState = {
	userDetails: [],
	isFetching: false,
	error: null,
}

export default (state = initialState, action: any) => {
	switch (action.type) {
		case types.userAction.GET_USERS_REQUEST:
			return {
				...state,
				isFetching: true
			}
		case types.userAction.GET_USERS_SUCCESS:
			return {
				...state,
				isFetching: false,
				userDetails: action.payload
			}
		case types.userAction.GET_USERS_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload
			}
		default:
			return state
	}
}