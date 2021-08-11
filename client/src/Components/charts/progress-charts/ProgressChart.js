import React from 'react'
import PropTypes from 'prop-types'

const ProgressChart = ({climbs}) => {


	let g;
	const ropeGrades = 0
	const boulderGrades = climbs.filter(climb => climb.style === 'boulder').sort((a,b) => (g=s=>parseInt(s,32)%334+s)(a.grade)>g(b.grade)||-1)

	console.log(boulderGrades)
	 
	return (
		<div>
			
		</div>
	)
}

ProgressChart.propTypes = {
	climbs: PropTypes.array.isRequired,
}

export default ProgressChart
