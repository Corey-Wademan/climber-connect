import React from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../../utils/formatDate'
import { sportUnits } from '../../profile-forms/ProfileSelectors'
import {  LineChart,Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

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
	const boulderTotal = climbs.filter(climb => climb.style === 'boulder').sort((a,b) => (g=s=>parseInt(s,32)%334+s)(a.grade)>g(b.grade)||-1)

	// Finds hardest climb in an array
	const calcHighest = (arr, date) => {
		return arr.pop()
	}

	// Calculate topRope Units
	const tickFormatter = arr => {
		return arr.map(climb => climb)
	}
	
	

	const data = total.map((climb) => ({ name: formatDate(climb.date), Grade: climb.grade}));
	console.log(data)


	 
	return (
		<div className='chart'>
			<h3>Most Recent Climbs</h3>
			<LineChart
				width={500}
				height={300}
				data={data}
				margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 5
				}}
				>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis 
					type='category'
					domain={['dataMin', 'dataMax']} 
					ticks={['5.0', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10', '5.11', '5.12', '5.13', '5.14', '5.15']}
					dataKey="Grade"/>
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="Grade"
					stroke="#8884d8"
					activeDot={{ r: 8 }}
				/>
    	</LineChart>
		</div>
		
	)
}

ProgressChart.propTypes = {
	climbs: PropTypes.array.isRequired,
}

export default ProgressChart
