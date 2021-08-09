import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AboutChart from '../charts/AboutChart'


const ProfileChart = props => {
	
	
	
	return (
		<div className='profile-chart-container'>
			<h1>Stats</h1>
			<AboutChart />
		</div>
	)
}

ProfileChart.propTypes = {

}

export default ProfileChart
