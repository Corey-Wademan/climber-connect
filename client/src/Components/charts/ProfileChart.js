import React, {Fragment} from 'react'
import AboutChart from '../charts/AboutChart'


const ProfileChart = ({profile: {climbs}}) => {
	
	console.log(climbs)
	return (
		<div className='profile-chart-container'>
			<h1>Stats</h1>
			<AboutChart />
		</div>
	)
}


export default ProfileChart
