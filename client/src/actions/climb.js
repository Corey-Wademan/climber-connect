import axios from 'axios';
import { setAlert } from './alert';
import { ADD_CLIMB, DELETE_CLIMB, GET_CLIMBS, CLIMB_ERROR } from './types';

// Get climbs
export const getClimbs = user_id => async dispatch => {
	try {
		const res =  await axios.get(`/api/climbs/${user_id}`);

		dispatch({
			type: GET_CLIMBS,
			payload: res.data
		})
	} catch (error) {
		dispatch({
			type: CLIMB_ERROR,
			payload: {msg: error.response.statusText, status: error.response.status}
		})
	}
};