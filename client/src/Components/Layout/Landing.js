import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
 
const Landing = ({ isAuth }) => {
  
  if (isAuth) {
   return <Redirect to="/dashboard" />
  }

    return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
         {/* <h1 className="x-large"></h1> */}
          <p className="lead">
            Create a profile, find climbing partners, add recent climbs, track and chart your progress, share posts and comments
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
    )
}

Landing.prototypes = {
  isAuth: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps)(Landing)
