import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { states, grades } from './ProfileSelectors';

const CreateProfile = props => {
   const [formData, setFormData] = useState({
      age: '',
      location: '',
      gender: '',
      belay_device: '',
      type_climber: '',
      best_time: '',
      climbing_since: '',
      climbing_type: [],
      leads: [
         { sportLead: '' },
         { tradLead: '' }
      ],
      follows: [
         { sportFollow: '' },
         { tradFollow: '' }
      ],
      other_hobbies: [],
      additional_info: '',
      twitter: '',
      facebook: '',
      instagram: '',
      youtube: ''
   });
   const [displaySocialInputs, toggleSocialInputs] = useState(false);

   const { age, location, gender, belay_device, type_climber, best_time, climbing_type, climbing_since, sportLead, tradLead, sportFollow, tradFollow, other_hobbies, additional_info, twitter, facebook, instagram, youtube } = formData;

   return (
      <Fragment>
         <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's add some info to your climbing profile
      </p>
      <small>* = required field</small>
      <form className="form">
         
        <div className="form-group">
         <select required name="location">
            <option value="" disabled selected>Location</option>
            {states.map(state => (
               <option value={state}>{state}</option>
            ))}
         </select>
         <small className="form-text">* Your location to find other climbers near you </small>
        </div>
        
        <div className="form-group">
         <input type="text" placeholder="Age" name="age" />
         <small className="form-text">* Helps for identifying & matching similarly aged users</small>
        </div>
        
         {/*<div className="form-group">
            <select type="text" name="type_climber">
               <option value=""></option>
               <option value=""></option>
               <option value=""></option>
               <option value=""></option>
            </select>
            <small className="form-text">Your style of climbing</small>
         </div>*/}
        
        <div className="form-group">
         <input type="text" name="climbing_type" />
         <small className="form-text"
         >What types of climbing do you do</small>
        </div>

        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="additional_info"></textarea>
          <small className="form-text">Tell us a little about yourself and what else you like to do</small>
        </div>
        
        <div className="form-group">
         <select required type="text" placeholder="Gender" name="gender">
            <option value="" disabled selected>Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
         </select>
        </div>
        
        <div className="form-group">
         <label for="climbing_since">Climbing Since:</label>
         <input type="date" name="climbing_since" min="1900-01-01" max="2018-01-01" value=""/>
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
               <input type="text" placeholder="Twitter URL" name="twitter" />
            </div>

            <div className="form-group social-input">
               <i className="fab fa-facebook fa-2x"></i>
               <input type="text" placeholder="Facebook URL" name="facebook" />
            </div>

            <div className="form-group social-input">
               <i className="fab fa-youtube fa-2x"></i>
               <input type="text" placeholder="YouTube URL" name="youtube" />
            </div>

            <div className="form-group social-input">
               <i className="fab fa-linkedin fa-2x"></i>
               <input type="text" placeholder="Linkedin URL" name="linkedin" />
            </div>

            <div className="form-group social-input">
               <i className="fab fa-instagram fa-2x"></i>
               <input type="text" placeholder="Instagram URL" name="instagram" />
            </div>
         </Fragment>}

        
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
      </Fragment>
   )
}

CreateProfile.propTypes = {

}

export default connect()(CreateProfile)
