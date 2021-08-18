import React from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate'

const ProfileMain = ({ profile: {
   profile: {
      age,
      location,
      gender,
      social,
      member_since,
      user: {name, avatar} 
   }
}}) => {
   return (
      <div className="profile-main bg-light p-2">
          <img
            className="round-img my-1"
            src={avatar}
            alt=""
          />
         <h1 className="large">{name}</h1>
         <p>{age}</p>
         <p>{gender}</p>
         <p>{location}</p>
         <p>Member Since: {formatDate(member_since)}</p>
         <div className="icons my-1">
            {social && social.twitter && (
               <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                  <i className="fab tran fa-twitter fa-2x"></i>
               </a>
            )}
            {social && social.facebook && (
               <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                  <i className="fab tran fa-facebook fa-2x"></i>
               </a>
            )}
            {social && social.youtube && (
               <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                  <i className="fab tran fa-youtube fa-2x"></i>
               </a>
            )}
            {social && social.instagram && (
               <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                  <i className="fab tran fa-instagram fa-2x"></i>
               </a>
            )}
         </div>
      </div>
   )
}

ProfileMain.propTypes = {
   profile: PropTypes.object.isRequired,
}

export default ProfileMain
