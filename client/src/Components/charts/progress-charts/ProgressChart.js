import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {  LineChart,Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const ProgressChart = ({climbs}) => {
	const [currentView, setCurrentView] = useState('Lead')


	// Filter sport / trad climbs between <5.10 && >5.10 then sorts, then concat into totalRopeArr
	const sportTotal = climbs.filter(climb => climb.style !== 'boulder' ) 
	const boulderTotal = climbs.filter(climb => climb.style == 'boulder' )

	const handleView = e => {
		e.preventDefault();
		setCurrentView(e.target.value)
	}

	// Filter and sorts boulder climbs
	let g;
	// const boulderTotal = climbs.filter(climb => climb.style === 'boulder').sort((a,b) => (g=s=>parseInt(s,32)%334+s)(a.grade)>g(b.grade)||-1)

	// Finds hardest climb in an array
	const calcHighest = (arr, date) => {
		return arr.pop()
	}
	

	

	const sportData = [
		!sportTotal.at(-1) ? {name: '', Grade: ''} :	{name: sportTotal.at(-1).date.slice(5,10), Grade: sportTotal.at(-1).grade},
		!sportTotal.at(-2) ? {name: '', Grade: ''} : {name: sportTotal.at(-2).date.slice(5,10), Grade: sportTotal.at(-2).grade},
		!sportTotal.at(-3) ? {name: '', Grade: ''} : {name: sportTotal.at(-3).date.slice(5,10), Grade: sportTotal.at(-3).grade},
		!sportTotal.at(-4) ? {name: '', Grade: ''} : {name: sportTotal.at(-4).date.slice(5,10), Grade: sportTotal.at(-4).grade},
		!sportTotal.at(-5) ? {name: '', Grade: ''} : {name: sportTotal.at(-5).date.slice(5,10), Grade: sportTotal.at(-5).grade}
	]

	const boulderData = [
		!boulderTotal.at(-1) ? {name: '', Grade: ''} :	{name: boulderTotal.at(-1).date.slice(5,10), Grade: boulderTotal.at(-1).grade},
		!boulderTotal.at(-2) ? {name: '', Grade: ''} : {name: boulderTotal.at(-2).date.slice(5,10), Grade: boulderTotal.at(-2).grade},
		!boulderTotal.at(-3) ? {name: '', Grade: ''} : {name: boulderTotal.at(-3).date.slice(5,10), Grade: boulderTotal.at(-3).grade},
		!boulderTotal.at(-4) ? {name: '', Grade: ''} : {name: boulderTotal.at(-4).date.slice(5,10), Grade: boulderTotal.at(-4).grade},
		!boulderTotal.at(-5) ? {name: '', Grade: ''} : {name: boulderTotal.at(-5).date.slice(5,10), Grade: boulderTotal.at(-5).grade}
	]

	 
	return (
		<div>
			<div className='row'>
				<button className='btn btn-ocean' value='Lead' onClick={handleView}>Lead</button>
				<button className='btn btn-ocean' value='Boulder' onClick={handleView}>Boulder</button>
			</div>
			{
				currentView == 'Lead'
				? (
					<>
						<h3 style={{fontSize: '18px', textAlign: 'center'}}>Recent Lead Climbs</h3>
						<ResponsiveContainer height='100%' width={450} minWidth={300}>
							<LineChart
								data={sportData}
								margin={{top: 5, right: 30, left: 20, bottom: 5}}
							>
							<CartesianGrid strokeDasharray="3 3"/>
							<XAxis 
								dataKey='name'
								reversed='true'
								interval={0}
								label={{value: 'Date', position: 'insideBottom', offset: -5}}
								/>
							<YAxis
								interval={0}
								type='number'
								scale='linear'
								domain={['dataMin', 'dataMax']}
								tick={[5.0, 5.01, 5.02, 5.03, 5.04, 5.05, 5.06, 5.07, 5.08, 5.09, 5.10, 5.11, 5.12, 5.13, 5.14, 5.15]}
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
						</ResponsiveContainer>
					</>
				)
				: (
					<>
						<h3 style={{fontSize: '18px', textAlign: 'center'}}>Recent Boulder Climbs</h3>
						<ResponsiveContainer height='100%' width={450} minWidth={300}>
							<LineChart
								data={boulderData}
								margin={{top: 5, right: 30, left: 20, bottom: 5}}
							>
							<CartesianGrid strokeDasharray="3 3"/>
							<XAxis 
								dataKey='name'
								reversed='true'
								interval={0}
								label={{value: 'Date', position: 'insideBottom', offset: -5}}
								/>
							<YAxis
								interval={0}
								type='category'
								scale='auto'
								tick={["V0", "V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13", "V14", "V15", "V16", "V17"]}
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
						</ResponsiveContainer>	
					</>
				)
			}	
		</div>
		
		
	)
}

ProgressChart.propTypes = {
	climbs: PropTypes.array.isRequired,
}

export default ProgressChart
