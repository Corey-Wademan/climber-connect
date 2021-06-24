import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({
   profile: {
      user: { _id, name, avatar },
      age,
      location,
      climbing_type,
      best_time,
      leads,
      gender,
      preferred_belay_device,
      additional_info
}}) => {
   return (
      <div className='profile bg-light'>
         <img src={avatar} alt="" className='round-img' />
         <div>
            <h2>{name}</h2>
            <p></p>
         </div>
      </div>
   )
}

ProfileItem.propTypes = {
   profile: PropTypes.object.isRequired,
}

export default ProfileItem
