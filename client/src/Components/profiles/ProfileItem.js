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
         <img src={avatar} alt="" className='profiles-img' />
            <div className='profile-col'>
               <h2>{name}</h2>
               <p>{location}</p>
               <p>{age}</p>
               <p>{gender}</p>
               <Link to={`/profile/${_id}`} className='btn btn-primary'>View Profile</Link>
            </div>
            <div className='profile-col'>
               <p>{climbing_type && <><b>Climbs:</b> {climbing_type.toString().split()}</>}</p>
               <p>{leads && leads.tradLead ? <> <b>Trad Leads:</b> {leads.tradLead} </>: <> </>}</p>
               <p>{leads && leads.sportLead ? <> <b>Sport Leads:</b> {leads.sportLead} </> : <> </>}</p>
               <p>{preferred_belay_device && <> <b>Preferred Belay Device:</b> {preferred_belay_device} </>}</p>
               <p>{best_time && <> <b>Best Time To Climb:</b> {best_time} </>}</p>
               <p>{additional_info && <> <b>About Me:</b> {additional_info} </>}</p>
            </div>
      </div>
   )
}

ProfileItem.propTypes = {
   profile: PropTypes.object.isRequired,
}

export default ProfileItem
