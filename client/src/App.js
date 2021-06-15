import './App.css';
import React, {Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Landing from './Components/Layout/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';

const App = () => (
    <Router>
      <Fragment>  
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className='container'>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
)
    

export default App;
