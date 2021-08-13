import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { getPosts } from '../../actions/post'
import { getCurrentProfile } from '../../actions/profile'
import {Spinner} from '../Layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({getPosts, getCurrentProfile, profile: {profile}, auth: {isAuth}, post: {posts, loading}}) => {
	useEffect(() => {
		getPosts()
		getCurrentProfile()
	}, [getPosts, getCurrentProfile])

	if (!isAuth) {
		return (
			<Fragment>
				<h3>
					Only users can view posts, please 
					<Link to='/login'> login </Link> or
					<Link to='/register'> create an account </Link>
					to create & view posts
				</h3>
			</Fragment>
		)
	}

	return loading 
	? <Spinner /> 
	: (
		<Fragment>
			<h1 className='large text-primary'>Posts</h1>
			<p className='lead'>
<<<<<<< HEAD
				<i className='fas fa-user'></i>Welcome to the climbing community
=======
				<i className='fas fa-user'></i>Welcome to the send community
>>>>>>> main
			</p>
			{profile && <PostForm /> }
			{!profile && (
				<p>You have not finished creating your profile, please 
					<Link to='/create-profile'> create one </Link>
					to join the discussion
				</p>
			)}
			<div className='posts'>
				{posts.map(post => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</Fragment>
	)
}

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	post: state.post,
	auth: state.auth,
	profile: state.profile
})

export default connect(mapStateToProps, {getPosts, getCurrentProfile})(Posts)
