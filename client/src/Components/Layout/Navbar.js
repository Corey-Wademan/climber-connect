import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import logo from '../../img/climb-logo.png'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth'
 
const Navbar = ({ auth: { isAuth, loading }, logout }) => {
  
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href="#!">
          <i className='fas.fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  )
  
  const guestLinks = (
    <ul>
      <li><a href="#!">Climbers</a></li>
      <li>
          <Link to="/register">Register</Link>
      </li>
      <li>
          <Link to="/login">Login</Link>
      </li>
    </ul>
  )

    return (
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
              <img className='logo' src={logo}/> Climbing Connecter
          </Link>
          </h1>
        {!loading &&
          (<Fragment>{isAuth ? authLinks : guestLinks}</Fragment>)}
      </nav>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar)
