import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import logo from '../../img/climb-logo.png'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth' 
 
const Navbar = ({ auth: { isAuth, loading }, logout }) => {

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          Climbers
        </Link>
      </li>
      <li>
        <Link to="/posts">
          Posts
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to='/' onClick={logout} href="#!">
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  )
  
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          Climbers
        </Link>
      </li>
      <li>
        <Link to="/posts">
          Posts
        </Link>
      </li>
      <li>
          <Link to="/register">Register</Link>
      </li>
      <li>
          <Link to="/login">Login</Link>
      </li>
    </ul>
  )

    return (
      <nav className="navbar">
        <h1>
          <Link to="/">
              <img alt='logo' className='logo' src={logo}/> 
              <span style={{fontWeight:'100'}}>Send Friends</span>
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
