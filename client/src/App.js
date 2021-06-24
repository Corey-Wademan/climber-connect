import './App.css';
import React, {useEffect, Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Landing from './Components/Layout/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Alert from './Components/Layout/Alert';
import Dashboard from './Components/dashboard/Dashboard';
import CreateProfile from './Components/profile-forms/CreateProfile';
import EditProfile from './Components/profile-forms/EditProfile';
import Profiles from './Components/profiles/Profiles';
import PrivateRoute from './Components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import { setAuthToken } from './utils/setAuthToken';
// Redux
import { Provider } from 'react-redux';
import store from './store'


if (localStorage.token) {
  setAuthToken(localStorage.token)
}
 
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  
  return (
  <Provider store={store}>
    <Router>
      <Fragment>  
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)}
    

export default App;
