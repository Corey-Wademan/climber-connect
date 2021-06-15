import React from 'react'

const Landing = () => {
    return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Climbing Connecter</h1>
          <p className="lead">
            Create a climbing profile, add your climbing stats and recent climbs, find climbing partners, share posts, message other climbers, share the stoke. 
          </p>
          <div className="buttons">
            <a href="register.html" className="btn btn-primary">Sign Up</a>
            <a href="login.html" className="btn btn-light">Login</a>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Landing
