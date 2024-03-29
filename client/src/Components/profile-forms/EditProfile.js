import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { states, grades, climbingTypes } from './ProfileSelectors';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({profile: {profile, loading}, createProfile, getCurrentProfile, history}) => {
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

   console.log(profile)

   useEffect(() => {
      getCurrentProfile();

      setFormData({
         age: loading || !profile.profile.age ? '' : profile.profile.age,
         location: loading || !profile.profile.location ? '' : profile.profile.location,
         gender: loading || !profile.profile.gender ? '' : profile.profile.gender,
         preferred_belay_device: loading || !profile.profile.preferred_belay_device ? '' : profile.profile.preferred_belay_device,
         best_time: loading || !profile.profile.best_time ? '' : profile.profile.best_time,
         climbing_since: loading || !profile.profile.climbing_since ? '' : profile.profile.climbing_since,
         climbing_type: loading || !profile.profile.climbing_type ? '' : profile.profile.climbing_type,
         tradLead: loading || !profile.profile.leads ? '' : profile.profile.leads.tradLead,
         sportLead: loading || !profile.profile.leads ? '' : profile.profile.leads.sportLead,
         tradFollow: loading || !profile.profile.follows ? '' : profile.profile.follows.tradFollow,
         sportFollow: loading || !profile.profile.follows ? '' : profile.profile.follows.sportFollow,
         additional_info: loading || !profile.profile.additional_info ? '' : profile.profile.additional_info,
         twitter: loading || !profile.profile.social ? '' : profile.profile.social.twitter,
         facebook: loading || !profile.profile.social ? '' : profile.profile.social.facebook,
         instagram: loading || !profile.profile.social ? '' : profile.profile.social.instagram,
         youtube: loading || !profile.profile.social ? '' : profile.profile.social.youtube,

      })

   }, [loading, getCurrentProfile]);

   const { age, location, gender, preferred_belay_device, best_time, climbing_type, climbing_since, sportLead, tradLead, sportFollow, tradFollow, additional_info, twitter, facebook, instagram, youtube } = formData;

   // Max Date Logic For Calendar Input
   let today = new Date();
   let dd = today.getDate();
   let mm = today.getMonth()+1; // January = 0
   let yyyy = today.getFullYear();
   if(dd<10){
         dd='0'+dd
      }  
      if(mm<10){
         mm='0'+mm
      } 
   today = yyyy + '-' + mm + '-' + dd;

   
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

   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

   const onSubmit = e => {
      e.preventDefault();
      createProfile(formData, history, true)
   }

   return (
      <Fragment>
         <h1 className="large text-primary">
        Edit Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Climbing harder? Update your profile
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
         <input type="text" placeholder="*Age" name='age' value={age} onChange={e => onChange(e)}/>
         <small className="form-text">* Helps for identifying & matching similarly aged users</small>
        </div>
            
         <div className='form-group'>
           <h1> Climbing Types</h1>
            {climbingTypes.map(climb => (
               <label key={climb.id}>
               <input
                  type="checkbox"
                  name={climb.name}
                  checked={climbing_type.includes(climb.name)}
                  value={climb.name}
                  onChange={() => updateClimbTypes(climb.name)}
                  /> {climb.name}
                  <br></br>
               </label>
               
            ))}
            <small className="form-text">Select your types of climbing</small>
         </div>
            
         <div className="form-group">
            <h1>Leads</h1>
               <small className="form-text">Trad Lead</small>
               <select
                  name="tradLead"
                  value={tradLead}
                  onChange={e => onChange(e)}>
               {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
               ))}
               </select>
               <br></br>
               <small className="form-text">Sport Lead</small>
               <select
                  name="sportLead"
                  value={sportLead}
                  onChange={e => onChange(e)}>
               {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
               ))}
               </select>
               <small className="form-text">Select the grades you can currently lead</small>
        </div>
        
        <div className="form-group">
            <h1>Follows</h1>
               <small className="form-text">Trad Follow</small>
               <select
                  name="tradFollow"
                  value={tradFollow}
                  onChange={e => onChange(e)}>
               {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
               ))}
               </select>
               <br></br>
               <small className="form-text">Sport Follow or Top Rope</small>
               <select
                  name="sportFollow"
                  value={sportFollow}
                  onChange={e => onChange(e)}>
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
         <small className="form-text">Your best availabilty to climb ie. (Weekends / Wednesdays after 5pm)</small>
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
       
      </form>
      </Fragment>
   )
}

const mapStateToProps = state => ({
   profile: state.profile
})

EditProfile.propTypes = {
   createProfile: PropTypes.func.isRequired,
   getCurrentProfile: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
}

export default connect(
   mapStateToProps,
   { createProfile, getCurrentProfile })
   (withRouter(EditProfile))
