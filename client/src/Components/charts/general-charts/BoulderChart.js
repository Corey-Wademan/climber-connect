import React from 'react'
import PropTypes from 'prop-types'
import {ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BoulderChart = ({climbs}) => {

	const boulderArray = climbs.filter(climb =>  climb.style == 'boulder').map(climb => climb.grade)

	const data = [
		{ name: "V0", Total: boulderArray.filter(el => el == 'V0').length },
		{ name: "V1", Total: boulderArray.filter(el => el == 'V1').length },
		{ name: "V2", Total: boulderArray.filter(el => el == 'V2').length },
		{ name: "V3", Total: boulderArray.filter(el => el == 'V3').length },
		{ name: "V4", Total: boulderArray.filter(el => el == 'V4').length },
		{ name: "V5", Total: boulderArray.filter(el => el == 'V5').length },
		{ name: "V6", Total: boulderArray.filter(el => el == 'V6').length },
		{ name: "V7", Total: boulderArray.filter(el => el == 'V7').length },
		{ name: "V8", Total: boulderArray.filter(el => el == 'V8').length },
		{ name: "V9", Total: boulderArray.filter(el => el == 'V9').length },
		{ name: "V10", Total: boulderArray.filter(el => el == 'V10').length },
		{ name: "V11", Total: boulderArray.filter(el => el == 'V11').length },
		{ name: "V12", Total: boulderArray.filter(el => el == 'V12').length },
		{ name: "V13", Total: boulderArray.filter(el => el == 'V13').length },
		{ name: "V14", Total: boulderArray.filter(el => el == 'V14').length },
		{ name: "V15", Total: boulderArray.filter(el => el == 'V15').length },
		{ name: "V16", Total: boulderArray.filter(el => el == 'V16').length },
		{ name: "V17", Total: boulderArray.filter(el => el == 'V17').length },
	]

	return (
		<>
			<h2 style={{textAlign: 'center', margin:'20px 0'}}>Boulder</h2>
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
				domain={['dataMin', 'dataMax']}/>
			<Tooltip />
			<Legend />
			<Bar dataKey="Total" barSize={20} fill="#d4b5b2" />
			<Line type="monotone" dataKey="Total" stroke="#6f91b4" />
			</ComposedChart>
		</>
	)
}

BoulderChart.propTypes = {
	climbs: PropTypes.array.isRequired,
}

export default BoulderChart
