import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import AboutChart from './AboutChart'
import ProgressCharts from './ProgressCharts'
import GeneralCharts from './GeneralCharts'


const ProfileCharts = ({profile: {climbs}}) => {

	
	console.log(climbs)
	return (
		<div className='profile-chart-container'>
			<h1>Stats</h1>
			<div>
				<h3>Routes Logged: {climbs.length}</h3>
			</div>

			<AboutChart climbs={climbs} />
			<ProgressCharts climbs={climbs} />
			<GeneralCharts climbs={climbs} />
		</div>
	)
}

ProfileCharts.propTypes = {
	profile: PropTypes.object.isRequired,
}


export default ProfileCharts
