import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import {Spinner} from '../Layout/Spinner';
import DashboardActions from './DashboardActions';


const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {

   useEffect(() => {
      getCurrentProfile();
   }, [getCurrentProfile]); 

   return loading && profile === null ? <Spinner /> :
      <Fragment>
         <h1 className='large text-primary'>Dashboard</h1>
         <p className='lead'>
            <i className='fas fa-user'> Welcome, {user && user.name}</i>
         </p>
         {profile !== null ?
            <Fragment>
               <DashboardActions 
                  profile={profile} />
               <div className="my-2">
                  <button className="btn btn-danger" onClick={() => deleteAccount()}>
                     <i className="fas fa-user-minus"></i> Delete Account
                  </button>
               </div>
            </Fragment> :
            <Fragment>
               <p>You have not yet created a profile, join the community and add some info!</p>
               <Link to="/create-profile" className='btn btn-primary my-1'>Create Profile</Link>
            </Fragment>}
      </Fragment>;
};

Dashboard.propTypes = {
   getCurrentProfile: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
   deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
   auth: state.auth,
   profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard)
