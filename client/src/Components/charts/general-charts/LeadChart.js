import React from 'react'
import PropTypes from 'prop-types'
import {ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LeadChart = ({climbs}) => {

	const leadArray = climbs.filter(climb =>  climb.style !== 'boulder').map(climb => climb.grade)
	console.log(leadArray)

	const data = [
		{ name: "5.0", amount: leadArray.filter(el => el == '5.0').length },
		{ name: "5.01", amount: leadArray.filter(el => el == '5.01').length },
		{ name: "5.02", amount: leadArray.filter(el => el == '5.02').length },
		{ name: "5.03", amount: leadArray.filter(el => el == '5.03').length },
		{ name: "5.04", amount: leadArray.filter(el => el == '5.04').length },
		{ name: "5.05", amount: leadArray.filter(el => el == '5.05').length },
		{ name: "5.06", amount: leadArray.filter(el => el == '5.06').length },
		{ name: "5.07", amount: leadArray.filter(el => el == '5.07').length },
		{ name: "5.08", amount: leadArray.filter(el => el == '5.08').length },
		{ name: "5.09", amount: leadArray.filter(el => el == '5.09').length },
		{ name: "5.10", amount: leadArray.filter(el => el == '5.10').length },
		{ name: "5.11", amount: leadArray.filter(el => el == '5.11').length },
		{ name: "5.12", amount: leadArray.filter(el => el == '5.12').length },
		{ name: "5.13", amount: leadArray.filter(el => el == '5.13').length },
		{ name: "5.14", amount: leadArray.filter(el => el == '5.14').length },
		{ name: "5.15", amount: leadArray.filter(el => el == '5.15').length },
	];

	
	
	return (
		<ComposedChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis 
				dataKey="name" 
				scale='auto'
				/>
      <YAxis 
				interval={1}
				type='number'
				domain={['dataMin', 'dataMax + 1']}
				/>
      <Tooltip />
      <Legend />
      <Bar dataKey="amount" barSize={20} fill="#413ea0" />
      <Line type="monotone" dataKey="amount" stroke="#ff7300" />
    </ComposedChart>
	)
}

LeadChart.propTypes = {
	climbs: PropTypes.array.isRequired,
}

export default LeadChart
