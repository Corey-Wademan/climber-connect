import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import SettingsChart from './SettingsChart'


const ProgressCharts = ({climbs}) => {

	return (
		<div className='charts-row'>
			<SettingsChart climbs={climbs} />
		</div>
	)
}

ProgressCharts.propTypes = {
	climbs: PropTypes.array.isRequired,
}



export default ProgressCharts
