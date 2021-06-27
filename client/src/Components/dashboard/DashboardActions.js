import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


const DashboardActions = ({profile: {user: {_id}}}) => {
   return (
      <div className="dash-buttons">
         <Link to={`/profile/${_id}`} className="btn btn-light">
            <i className="fas fa-user-circle text-primary"></i> View Profile
         </Link>
         <Link to="edit-profile" className="btn btn-light">
            <i className="fas fa-user-circle text-primary"></i> Edit Profile
         </Link>
      </div>
   )
}

DashboardActions.propTypes = {
   profile: PropTypes.object.isRequired,
}

export default DashboardActions
