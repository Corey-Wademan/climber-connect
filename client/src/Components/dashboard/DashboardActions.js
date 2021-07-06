import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


const DashboardActions = ({profile: {user: {_id}}}) => {
   return (
      <div className="dash-buttons">
         <Link to={`/profile/${_id}`} 
               className="btn btn-light"
               style={{backgroundColor:'#3f729b'}}>
            <i className="fas fa-user-circle text-primary"
               style={{color: 'white'}}></i> View Profile
         </Link>
         <Link to="edit-profile" className="btn btn-light">
            <i className="fas fa-user-circle text-primary"
               style={{color: 'white'}}></i> Edit Profile
         </Link>
      </div>
   )
}

DashboardActions.propTypes = {
   profile: PropTypes.object.isRequired,
}

export default DashboardActions
