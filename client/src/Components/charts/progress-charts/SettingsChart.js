import React from 'react'
import PropTypes from 'prop-types'
import {PieChart, Pie, Cell, Tooltip} from 'recharts'

const SettingsChart = ({climbs}) => {


	const indoor = climbs.filter(climb => climb.setting === 'gym');
	const outdoor = climbs.filter(climb => climb.setting === 'outdoors')
	console.log(indoor)

	const data = [
		{
			name: 'Indoor',
			value: indoor.length
		},
		{
			name: 'Outdoor',
			value: outdoor.length
		}
	]; 

	console.log(data)
	
	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<>
				<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
					{`${(percent * 100).toFixed(0)}%`}
				</text>
			</>
		);
	};


	return (
		<div className='chart'>
			<h6>🟦 = Gym</h6>
			<h6>🟩 = Outdoor</h6>
			<PieChart width={200} height={200}>	
				<Pie
					width="100%"
					height="100%"
					data={data}
					cx="50%"
					cy="50%"
					labelLine={false}
					label={renderCustomizedLabel}
					outerRadius={80}
					fill="#8884d8"
					dataKey="value"
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
			</PieChart>
		</div>
			
	)
}

SettingsChart.propTypes = {
	climbs: PropTypes.array.isRequired,
}

export default SettingsChart
