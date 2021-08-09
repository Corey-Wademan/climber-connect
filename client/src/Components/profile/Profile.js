import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Spinner } from '../Layout/Spinner'
import { getProfileById } from '../../actions/profile'
import ProfileMain from './ProfileMain';
import ProfileAbout from './ProfileAbout'
import ProfileChart from '../charts/ProfileChart';

const Profile = ({
   getProfileById,
   profile: { profile, loading },
   auth,
   match
}) => {
   useEffect(() => {
      getProfileById(match.params.id);
   }, [getProfileById, match.params.id]);

   return (
      <Fragment>
         {profile === null || loading ? (<Spinner />) :
            (<Fragment>
               <Link to='/profiles' className='btn btn-dark'>
                  Back To Profiles
               </Link>
               {auth.isAuth && auth.loading === false && auth.user._id === profile.profile.user._id &&
                  (<Link 
                     to='/edit-profile' 
                     className='btn btn-dark'
                     style={{backgroundColor:'#3f729b'}}>
                        Edit Profile
                  </Link>)}
               <div className="profile-header my-1">
                  <ProfileMain profile={profile} />
                  <ProfileAbout profile={profile} />
               </div>
               <ProfileChart profile={profile}/>
            </Fragment>)}
      </Fragment>
   );
};

Profile.propTypes = {
   getProfileById: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
   profile: state.profile,
   auth: state.auth
})

export default connect(mapStateToProps, {getProfileById}) (Profile)
