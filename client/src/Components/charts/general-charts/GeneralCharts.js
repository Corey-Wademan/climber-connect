import React from 'react'
import PropTypes from 'prop-types'
import LeadChart from './LeadChart'
import BoulderChart from './BoulderChart'

const GeneralCharts = ({climbs}) => {
	return (
		<div>
			<LeadChart climbs={climbs} />
			<BoulderChart climbs={climbs} />
		</div>
	)
}

GeneralCharts.propTypes = {
	climbs: PropTypes.array.isRequired,
}

export default GeneralCharts
