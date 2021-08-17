import React from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../../utils/formatDate'
import { sportUnits } from '../../profile-forms/ProfileSelectors'
import {  LineChart,Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const ProgressChart = ({climbs}) => {


	// Filter sport / trad climbs between <5.10 && >5.10 then sorts, then concat into totalRopeArr
	const total = climbs.filter(climb => {
		return ( 
			climb.style !== 'boulder' 
			&& climb.grade === '5.0' || climb.grade === '5.1' || climb.grade === '5.2' || climb.grade === '5.3' || climb.grade === '5.4' || climb.grade === '5.5' || climb.grade === '5.6' || climb.grade === '5.6' || climb.grade === '5.7' || climb.grade === '5.8' || climb.grade === '5.9' || climb.grade === '5.10' || climb.grade === '5.11' || climb.grade === '5.12' || climb.grade === '5.13' || climb.grade === '5.14' || climb.grade === '5.15'
		)
	})

	// Filter and sorts boulder climbs
	let g;
	const boulderTotal = climbs.filter(climb => climb.style === 'boulder').sort((a,b) => (g=s=>parseInt(s,32)%334+s)(a.grade)>g(b.grade)||-1)

	// Finds hardest climb in an array
	const calcHighest = (arr, date) => {
		return arr.pop()
	}
	

	

	const data = [
		{name: total.at(-1).date.slice(5,10), Grade: total.at(-1).grade},
		{name: total.at(-2).date.slice(5,10), Grade: total.at(-2).grade},
		{name: total.at(-3).date.slice(5,10), Grade: total.at(-3).grade},
		{name: total.at(-4).date.slice(5,10), Grade: total.at(-4).grade},
		{name: total.at(-5).date.slice(5,10), Grade: total.at(-5).grade}
	]

	 
	return (
		<div className='chart'>
			<h3>Recently Logged Sport Climbs</h3>
			<LineChart
				width={800}
				height={300}
				data={data}
				margin={{top: 5, right: 30, left: 20, bottom: 5}}
				>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis 
					dataKey='name'
					interval={0}
					label={{value: 'Date', position: 'insideBottom', offset: -5}}
					/>
				<YAxis
					interval={0}
					type='number'
					scale='linear'
					domain={['dataMin', 'dataMax']}
					tick={[5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 5.11, 5.12, 5.13, 5.14, 5.15]}
					reversed='true'
					dataKey='Grade'
					/>
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
