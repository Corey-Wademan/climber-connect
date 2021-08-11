import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import AboutChart from './AboutChart'
import ProgressCharts from './ProgressCharts'
import GeneralCharts from './GeneralCharts'


const ProfileCharts = ({profile: {climbs}}) => {

	const totalGrades = climbs.map(climb => climb.grade)
	const totalStyles = climbs.map(climb => climb.style)

	const calcMost = (arr) => {
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length - arr.filter(v => v===b).length
    ).pop();
}
	
	console.log()
	return (
		<div className='profile-chart-container'>
			<div className='stats-top'>
				<h1>Stats</h1>
				<div className='qk-stats'>
					<h3>Routes Logged: {climbs.length}</h3>
					<h3>Average Grade: {calcMost(totalGrades)}</h3>
					<h3>Most Active In: {calcMost(totalStyles)}</h3>
				</div>
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
