import React from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import formatDate from '../../utils/formatDate'

const ProfileAbout = ({ profile: {
   profile: {
      climbing_type,
      preferred_belay_device,
      leads,
      follows,
      additional_info,
      best_time,
      climbing_since,
      user: {name}
   }
}}) => {
   
   return (
      <div className="profile-about bg-light p-2"> 
         <h2 className="text-primary text-center" style={{fontFamily: 'Quicksand'}}>Quick Glance</h2>
         <p>{climbing_since && (<span>Climbing Since: {formatDate(climbing_since)}</span>)}</p>
         <div className='climbing-type'>
            <b>Climbs:</b> 
            <div className='col'>
               {climbing_type.map((climb, index) => (
                  <div key={index} className='p'>
                     <i className='fas fa-check' /> {climb}
                  </div>
               ))}
            </div>
            {leads && (
            <Fragment>
               <div className='col'>
                  <div className='row'>
                     <b>Trad Lead: </b><span>{leads.tradLead}</span>
                  </div>
                  <div className='row'>
                     <b>Sport Lead: </b><span>{leads.sportLead}</span>
                  </div>
               </div>
            </Fragment>
            )}

            {follows && (
            <Fragment>
               <div className='col'>
                  <div className='row'>
                     <b>Trad Follow: </b><span>{follows.tradFollow}</span>
                  </div>
                  <div className='row'>
                     <b>Sport Follow: </b><span> {follows.sportFollow}</span>
                  </div>
               </div>
            </Fragment>
            )}  
         </div>

            {preferred_belay_device && (
               <Fragment>
                  <div>
                     <b>Belaying Device:</b> {preferred_belay_device}
                  </div>
               </Fragment>
            )}  

         <div className="line"></div>
         <div>
            {additional_info && (
               <Fragment>
                  <h2 className="text-primary" style={{fontFamily: 'Quicksand'}}>About {name.trim().split(' ')[0]}</h2>
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
