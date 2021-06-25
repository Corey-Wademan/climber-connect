import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile: {
   age,
   location,
   gender,
   social,
   climbing_since,
   user: {name, avatar}
}}) => {
   return (
      <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={avatar}
            alt=""
          />
         <h1 className="large">{name}</h1>
         <p>{age}</p>
         <p>{gender}</p>
         <p>{location}</p>
         {/* <p>{climbing_since && (<span>Climbing Since: {climbing_since}</span>)}</p> */}
         <div className="icons my-1">
            {social && social.twitter && (
               <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter fa-2x"></i>
               </a>
            )}
            {social && social.facebook && (
               <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook fa-2x"></i>
               </a>
            )}
            {social && social.youtube && (
               <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube fa-2x"></i>
               </a>
            )}
            {social && social.instagram && (
               <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram fa-2x"></i>
               </a>
            )}
         </div>
      </div>
   )
}

ProfileTop.propTypes = {
   profile: PropTypes.object.isRequired,
}

export default ProfileTop
