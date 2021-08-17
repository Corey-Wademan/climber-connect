import React from 'react'
import PropTypes from 'prop-types'
import ProgressCharts from './progress-charts/ProgressCharts'
import GeneralCharts from './general-charts/GeneralCharts'


const ProfileCharts = ({profile: {climbs}}) => {

	const totalGrades = climbs.map(climb => climb.grade)
	const totalStyles = climbs.map(climb => climb.style)

	console.log(climbs)

	const calcMost = (arr) => {
    return arr.sort((a,b) =>
          arr.filter(val => val===a).length - arr.filter(val => val===b).length).pop();
	}
	
	return (
		<div className='profile-chart-container'>
			<div className='stats-top'>
				<h1>Stats</h1>
				<div className='qk-stats'>
					<h3>Routes Logged: {climbs.length}</h3>
					<h3>Most Frequent Climb: {calcMost(totalGrades)}</h3>
					<h3>Most Active In: {calcMost(totalStyles)}</h3>
				</div>
			</div>

			<ProgressCharts climbs={climbs} />
			<GeneralCharts climbs={climbs} />
		</div>
	)
}

ProfileCharts.propTypes = {
	profile: PropTypes.object.isRequired,
}


export default ProfileCharts
