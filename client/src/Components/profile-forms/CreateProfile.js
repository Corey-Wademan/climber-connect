import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types' 
import { connect } from 'react-redux';
import { states, grades, climbingTypes } from './ProfileSelectors';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({createProfile, history}) => {
   const [formData, setFormData] = useState({
      age: '',
      location: '',
      gender: '',
      preferred_belay_device: '',
      best_time: '',
      climbing_since: '',
      climbing_type: [], 
      tradLead: '',
      sportLead: '',
      tradFollow: '',
      sportFollow: '',
      additional_info: '',
      twitter: '',
      facebook: '',
      instagram: '',
      youtube: ''
   });
   const [displaySocialInputs, toggleSocialInputs] = useState(false);

   const { age, location, gender, preferred_belay_device, best_time, climbing_type, climbing_since, sportLead, tradLead, sportFollow, tradFollow, additional_info, twitter, facebook, instagram, youtube } = formData;

   // Max Date Logic For Calendar Input
   // Fix format
   let today = new Date();
   let dd = today.getDate();
   let MM = today.getMonth()+1; // January = 0
   let yyyy = today.getFullYear();
   if(dd<10){
         dd='0'+dd
      } 
      if(MM<10){
         MM='0'+MM
      } 

   today = yyyy+'-'+MM+'-'+dd;

   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

   // Currently takes in the last of selected values
   // Change to take in all values
   const updateClimbTypes = e => {
      let selected = climbing_type
      let find = selected.indexOf(e)

      if (find > -1) {
         selected.splice(find, 1)
      } else {
         selected.push(e)
      }
      setFormData({
         ...formData,
         climbing_type: selected
      })
   };


   const onSubmit = e => {
      e.preventDefault();
      createProfile(formData, history)
   }

   return (
      <Fragment>
         <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's add some info to your climbing profile
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
         
        <div className="form-group">
               <select
                  required
                  name="location"
                  value={location}
                  onChange={e => onChange(e)}>
                  <option
                     value=""
                     disabled>
                     *Location
                  </option>
            {states.map(state => (
               <option
                  key={state}
                  value={state}>
                  {state}
               </option>
            ))}
         </select>
         <small className="form-text">* Your location to find other climbers near you </small>
        </div>
        
        <div className="form-group">
         <input type="text" placeholder="*Age" name="age" value={age} onChange={e => onChange(e)}/>
         <small className="form-text">* Helps for identifying & matching similarly aged users</small>
        </div>
            
         <div className='form-group'>
           <h1> Climbing Types</h1>
            {climbingTypes.map(climb => (
               <label key={climb.id}>
               <input
                  type="checkbox"
                  name={climb.name}
                  value={climb.name}
                  onChange={() => updateClimbTypes(climb.name)}
                  selected={climbing_type.includes(climb.id)}
                  /> {climb.name}
                  <br></br>
               </label>
               
            ))}
            <small className="form-text">Select your types of climbing</small>
         </div>
            
         <div className="form-group">
            <h1>Leads</h1>
               <select
                  name="tradLead"
                  value={tradLead}
                  onChange={e => onChange(e)}>
                  <option
                     value=""
                     disabled selected>Trad Lead</option>
               {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
               ))}
               </select>
               <br></br>
               <select
                  name="sportLead"
                  value={sportLead}
                  onChange={e => onChange(e)}>
                  <option
                     value=""
                     disabled selected>Sport Lead</option>
               {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
               ))}
               </select>
               <small className="form-text">Select the grades you can currently lead</small>
        </div>
        
        <div className="form-group">
            <h1>Follows</h1>
               <select
                  name="tradFollow"
                  value={tradFollow}
                  onChange={e => onChange(e)}>
                  <option
                     value=""
                     disabled selected>Trad Follow</option>
               {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
               ))}
               </select>
               <br></br>
               <select
                  name="sportFollow"
                  value={sportFollow}
                  onChange={e => onChange(e)}>
                  <option
                     value=""
                     disabled selected>Sport Follow</option>
               {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
               ))}
            </select>
            <small className="form-text">Select the grades you currently follow / clean</small>
         </div>
               
        <div className="form-group">
         <select type="text" name="preferred_belay_device" value={preferred_belay_device} onChange={e => onChange(e)}>
            <option value="" disabled>Belay Device</option>
            <option value='ATC'>ATC</option>
            <option value='Assisted Braking'>Assisted Braking</option>
            <option value='Figure Eight'>Figure Eight</option>
         </select>
         <small className="form-text">Select your preferred belay device</small>
        </div>

        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="additional_info" value={additional_info} onChange={e => onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself and what else you like to do</small>
        </div>
        
        <div className="form-group">
         <input type="text" placeholder="Best Availabilty to Climb" name="best_time" value={best_time} onChange={e => onChange(e)}/>
         <small className="form-text">ie. (Weekends / Wednesdays after 5pm)</small>
        </div>
        
        <div className="form-group">
         <select required type="text" placeholder="Gender" name="gender" value={gender} onChange={e => onChange(e)}>
            <option value="" disabled>*Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
         </select>
         <small className="form-text">* Helps for filtering potential climbing partners</small>
        </div>
        
        <div className="form-group">
         <label>Climbing Since:</label>
         <input type="date" id="climbing_since" name="climbing_since" max={today} value={climbing_since} onChange={e => onChange(e)}/>
        </div>

        <div className="my-2">
          <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
            </div>
            
         {displaySocialInputs &&
         <Fragment>
            <div className="form-group social-input">
               <i className="fab fa-twitter fa-2x"></i>
               <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)}/>
            </div>

            <div className="form-group social-input">
               <i className="fab fa-facebook fa-2x"></i>
               <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)}/>
            </div>

            <div className="form-group social-input">
               <i className="fab fa-youtube fa-2x"></i>
               <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)}/>
            </div>

            <div className="form-group social-input">
               <i className="fab fa-instagram fa-2x"></i>
               <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)}/>
            </div>
         </Fragment>}

        
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
      </Fragment>
   )
}

CreateProfile.propTypes = {
   createProfile: PropTypes.func.isRequired,
}

export default connect(null, {createProfile})(withRouter(CreateProfile))
