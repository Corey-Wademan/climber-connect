import React from 'react';
import logo from '../../img/climb-logo.png'

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
      <h1>
        <a href="index.html"><img className='logo' src={logo}/> Climbing Connecter</a>
      </h1>
      <ul>
        <li><a href="profiles.html">Climbers</a></li>
        <li><a href="register.html">Register</a></li>
        <li><a href="login.html">Login</a></li>
      </ul>
    </nav>
    )
}

export default Navbar
