import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth'

const Login = ({login, isAuth}) => {
    const [formData, setFormData] = useState( {
        email: '',
        password: ''
    } );

    const { email, password } = formData;

    // Variable handler that takes name att.(e.target.name) from input, sets its value as the key for the output
    const onChange = e => setFormData( { ...formData, [e.target.name]: e.target.value } );
    
    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    }

    // Redirect if loggin in
    if (isAuth) {
        return <Redirect to="/dashboard" />
    }

    return (
        <>
           <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={e => onChange( e )}
                    required
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
                    required
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p> 
        </>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuth: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);
