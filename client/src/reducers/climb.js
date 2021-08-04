import { GET_CLIMBS, DELETE_CLIMB, ADD_CLIMB, CLIMB_ERROR } from "../actions/types";

const initialState = {
	climbs: [],
	climb: null,
	loading: true,
	error: {}
}