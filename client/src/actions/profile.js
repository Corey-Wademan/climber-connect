import axios from "axios";
import { setAlert } from "./alert";
import { CLEAR_PROFILE, DELETE_ACCOUNT, GET_PROFILE, GET_PROFILES, PROFILE_ERROR } from "./types";

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
   try {
      const res = await axios.get('/api/profile/me');

      dispatch({
         type: GET_PROFILE,
         payload: res.data
      });
   } catch (error) {
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            msg: error.response.statusText, status: error.response.status
         }
      })
   }
}

// Get all profiles
export const getProfiles = () => async dispatch => {
   dispatch({ type: CLEAR_PROFILE });

   try {
      const res = await axios.get('/api/profile/');

      dispatch({
         type: GET_PROFILES,
         payload: res.data
      });
   } catch (error) {
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            msg: error.response.statusText, status: error.response.status
         }
      })
   }
} 

// Get profile by ID
export const getProfileById = id => async dispatch => {
   try {
      const res = await axios.get(`/api/profile/user/${id}`);
      
      dispatch({
         type: GET_PROFILE,
         payload: res.data
      });
   } catch (error) {
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            msg: error.response.statusText, status: error.response.status
         }
      })
   }
}

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }

      const res = await axios.post('/api/profile', formData, config);
      dispatch({
         type: GET_PROFILE,
         payload: res.data
      });
      dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

      if (!edit) {
         history.push('/dashboard')
      }
      
   } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
         errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))
         );
      };

      dispatch({
         type: PROFILE_ERROR,
         payload: {
            msg: error.response.statusText, status: error.response.status
         }
      })
   }
}

// Delete account & profile
export const deleteAccount = () => async dispatch => {
   if (window.confirm('Are you sure you would like to delete your account?')) {
      try {
         await axios.delete('api/profile');
         
         dispatch({ type: CLEAR_PROFILE });
         dispatch({ type: DELETE_ACCOUNT });
         dispatch(setAlert('Your account has been permanantly deleted'))
      } catch (error) {
         dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
         });
      }
   }
}