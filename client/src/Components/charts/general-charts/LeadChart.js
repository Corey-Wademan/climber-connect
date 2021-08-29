import React from 'react'
import PropTypes from 'prop-types'
import {ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LeadChart = ({climbs}) => {

	const leadArray = climbs.filter(climb =>  climb.style !== 'boulder').map(climb => climb.grade)

	const data = [
		{ name: "5.0", Total: leadArray.filter(el => el == '5.0').length },
		{ name: "5.01", Total: leadArray.filter(el => el == '5.01').length },
		{ name: "5.02", Total: leadArray.filter(el => el == '5.02').length },
		{ name: "5.03", Total: leadArray.filter(el => el == '5.03').length },
		{ name: "5.04", Total: leadArray.filter(el => el == '5.04').length },
		{ name: "5.05", Total: leadArray.filter(el => el == '5.05').length },
		{ name: "5.06", Total: leadArray.filter(el => el == '5.06').length },
		{ name: "5.07", Total: leadArray.filter(el => el == '5.07').length },
		{ name: "5.08", Total: leadArray.filter(el => el == '5.08').length },
		{ name: "5.09", Total: leadArray.filter(el => el == '5.09').length },
		{ name: "5.10", Total: leadArray.filter(el => el == '5.10').length },
		{ name: "5.11", Total: leadArray.filter(el => el == '5.11').length },
		{ name: "5.12", Total: leadArray.filter(el => el == '5.12').length },
		{ name: "5.13", Total: leadArray.filter(el => el == '5.13').length },
		{ name: "5.14", Total: leadArray.filter(el => el == '5.14').length },
		{ name: "5.15", Total: leadArray.filter(el => el == '5.15').length },
	]

	
	
	return (
		<>
			<h2 style={{textAlign: 'center', margin:'20px 0'}}>Lead</h2>
			<ComposedChart
				width={800}
				height={400}
				data={data}
				margin={{
					top: 20,
					right: 20,
					bottom: 20,
					left: 20
				}}>
			<CartesianGrid stroke="#f5f5f5" />
			<XAxis 
				dataKey="name" 
				scale='auto'/>
			<YAxis 
				interval={1}
				type='number'
				domain={['dataMin', 'dataMax + 1']}/>
			<Tooltip />
			<Legend />
			<Bar dataKey="Total" barSize={20} fill="#344b52" />
			<Line type="monotone" dataKey="Total" stroke="#6f91b4" />
			</ComposedChart>
		</>
	)
}

LeadChart.propTypes = {
	climbs: PropTypes.array.isRequired,
}

export default LeadChart
