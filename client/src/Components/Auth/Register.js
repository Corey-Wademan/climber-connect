import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'


const Register = ({setAlert, register, isAuth}) => {
    const [formData, setFormData] = useState( {
        name: '',
        email: '',
        password: '',
        password2: ''
    } );

    const { name, email, password, password2 } = formData;

    // Variable handler that takes name att.(e.target.name) from input, sets its value as the key for the output
    const onChange = e => setFormData( { ...formData, [e.target.name]: e.target.value } );
    
    const onSubmit = async e => {
        e.preventDefault();
        if ( password !== password2 ) {
            setAlert('Passwords do not match', 'danger')
        } else {
            register({name, email, password})
        }
    }

    // Redirect to dashboard if user registers
    if (isAuth) {
        return (
            <Redirect to="/dashboard" />
        )
    }

    return (
        <>
           <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={e => onChange(e)}
                />
            </div>
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={e => onChange( e )}
                    
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={e => onChange( e )}
                    
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    value={password2}
                    onChange={e => onChange( e )}
                    
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p> 
        </>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuth: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {setAlert, register})( Register );
