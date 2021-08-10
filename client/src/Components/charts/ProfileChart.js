import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import AboutChart from '../charts/AboutChart'


const ProfileChart = ({profile: {climbs}}) => {
	
	console.log(climbs)
	return (
		<div className='profile-chart-container'>
			<h1>Stats</h1>
			<AboutChart climbs={climbs} />
		</div>
	)
}

ProfileChart.propTypes = {
	profile: PropTypes.object.isRequired,
}


export default ProfileChart
