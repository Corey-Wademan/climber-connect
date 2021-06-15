import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../img/climb-logo.png'

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
            <img className='logo' src={logo}/> Climbing Connecter
        </Link>
      </h1>
      <ul>
        <li><a href="profiles.html">Climbers</a></li>
        <li>
            <Link to="/register">Register</Link>
        </li>
        <li>
            <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
    )
}

export default Navbar
