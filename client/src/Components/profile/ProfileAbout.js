import React from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'

const ProfileAbout = ({ profile: {
   climbing_type,
   preferred_belay_device,
   leads,
   follows,
   additional_info,
   best_time,
   user: {name}
} }) => {
   
   return (
      <div className="profile-about bg-light p-2">
         <h2 className="text-primary">Climbing Profile</h2>
         <div className='climbing-type'>
            <b>Climbs: </b>
            {climbing_type.map((climb, index) => (
               <div key={index} className='p-1'>
                  <i className='fas fa-check' /> {climb}
               </div>
            ))}
         </div>

         <div className="line"></div>
         <div>
            {additional_info && (
               <Fragment>
                  <h2 className="text-primary">About {name.trim().split(' ')[0]}</h2>
                  <p>
                     {additional_info}
                  </p>
                  <div className='about-climb'>
                     {best_time && (
                        <p>
                           <b>Best Time To Climb:</b> {best_time}
                        </p>)}
                  </div>
               </Fragment>
            )}
         </div>
         
      </div>
   )
}

ProfileAbout.propTypes = {
   profile: PropTypes.object.isRequired,
}

export default ProfileAbout
