import { GET_CLIMBS, DELETE_CLIMB, ADD_CLIMB, CLIMB_ERROR } from "../actions/types";

const initialState = {
	climbs: [],
	climb: null,
	loading: true,
	error: {}
}

function climbReducer(state = initialState, action) {
	const {type, payload} = action;

	switch(type) {
		case GET_CLIMBS:
			return {
				...state,
				climbs: payload,
				loading: false
			}
		case ADD_CLIMB:
			return {
				...state,
				climbs: [payload, ...state.climbs],
				loading: false
			}
		case DELETE_CLIMB:
			return {
				...state,
				climbs: state.climbs.filter(climb => climb._id !== payload),
				loading: false
			}
		case CLIMB_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			}
		default:
			return state;
	}
};

export default climbReducer;