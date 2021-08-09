import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { GET_CLIMBS } from '../../actions/types'

const AboutChart = ({GET_CLIMBS}) => {
	
	const [chartOptions, setChartOptions] = useState({
    
  });

	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={chartOptions} />
		</div>
	)
}

AboutChart.propTypes = {

}

const mapStateToProps = state => ({
	// climbs: state.climbs
})

export default AboutChart
