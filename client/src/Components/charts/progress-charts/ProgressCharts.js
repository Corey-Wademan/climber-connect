import React from 'react'
import PropTypes from 'prop-types'
import SettingsChart from './SettingsChart'
import ProgressChart from './ProgressChart'


const ProgressCharts = ({climbs}) => {

	return (
		<div className='charts-row'>
			<SettingsChart climbs={climbs} />
			<ProgressChart climbs={climbs} />
		</div>
	)
}

ProgressCharts.propTypes = {
	climbs: PropTypes.array.isRequired,
}



export default ProgressCharts
