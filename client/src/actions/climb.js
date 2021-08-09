import axios from 'axios';
import { setAlert } from './alert';
import { ADD_CLIMB, DELETE_CLIMB, CLIMB_ERROR } from './types';


// Add climb
export const addClimb = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	try {
		const res = await axios.post('/api/climbs', formData, config);

		dispatch({
			type: ADD_CLIMB,
			payload: res.data
		});
		dispatch(setAlert('Climb recorded', 'success'))
	} catch (error) {
		dispatch({
			type: CLIMB_ERROR,
			payload: {msg: error.response.statusText, status: error.response.status}
		});
	}
};

// Delete a climb
export const deleteClimb = climb_id => async dispatch => {
	try {
		await axios.delete(`/api/climbs/${climb_id}`);

		dispatch({
			type: DELETE_CLIMB,
			payload: climb_id
		})
		dispatch(setAlert('Climb Deleted', 'danger'))
	} catch (error) {
		dispatch({
			type: CLIMB_ERROR,
			payload: {msg: error.response.statusText, status: error.response.status}
		});
	}
};