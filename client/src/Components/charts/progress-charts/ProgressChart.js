import React from 'react'
import PropTypes from 'prop-types'

const ProgressChart = ({climbs}) => {


	// Filter top rope climbs between <5.10 && >5.10 then sorts, then concat into totalRopeArr
	const sm = climbs.filter(climb => {
		return ( 
			climb.style !== 'boulder' 
			&& climb.grade === '5.0' || climb.grade === '5.1' || climb.grade === '5.2' || climb.grade === '5.3' || climb.grade === '5.4' || climb.grade === '5.5' || climb.grade === '5.6' || climb.grade === '5.6' || climb.grade === '5.7' || climb.grade === '5.8' || climb.grade === '5.9' 
			)
	})

	const lrg = climbs.filter(climb => {
		return ( climb.style !== 'boulder'
		&& climb.grade === '5.10' || climb.grade === '5.11' || climb.grade === '5.12' || climb.grade === '5.13' || climb.grade === '5.14' || climb.grade === '5.15'
		)
	}).sort((a,b) => a.grade-b.grade)

	const total = sm.concat(lrg)

	// Filter and sorts boulder climbs
	let g;
	const boulderArr = climbs.filter(climb => climb.style === 'boulder').sort((a,b) => (g=s=>parseInt(s,32)%334+s)(a.grade)>g(b.grade)||-1)

	// Finds hardest climb in an array
	const calcHighest = (arr, date) => {
		return arr.pop()
	}

	 
	return (
		<div>
			
		</div>
	)
}

ProgressChart.propTypes = {
	climbs: PropTypes.array.isRequired,
}

export default ProgressChart
