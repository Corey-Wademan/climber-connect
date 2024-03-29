import React, {Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'
import { Spinner } from '../Layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({getPost, post:{post, loading}, match}) => {

	useEffect(() => {
		getPost(match.params.id)
	}, [getPost, match.params.id])

	return loading || post === null ? <Spinner /> :
		<Fragment>
			<Link to='/posts' className='btn btn-primary'>
				Back To Posts
			</Link>
			<PostItem 
				post={post}
				showActions={false}
			/>
			<CommentForm postId={post._id} />
			<div className='comments'>
				{post.comments.map(comment => (
				<div className='comment-container'>
					<i className="fas fa-flip-horizontal fa-comment" style={{fontSize: '5vw'}}></i>
					<CommentItem key={comment._id} comment={comment} postId={post._id} />
				</div>
				))}
			</div>
		</Fragment>
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	post: state.post
})

export default connect(mapStateToProps, {getPost})(Post)
