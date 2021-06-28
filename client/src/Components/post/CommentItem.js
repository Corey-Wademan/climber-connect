import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import {removeComment} from '../../actions/post'

const CommentItem = ({
	auth,
	postId, 
	comment: {_id, text, name, avatar, user, date},
	removeComment
}) => {

	return (
		<div className="comment p-1 my-1">
			<div className='col'>
				<Link to={`/profile/${user}`}>
					<img
						src={avatar}
						alt=""
					/>
				</Link>
				<h4>{name}</h4>
			</div>
			<div className='col'>
				<p className="my-1">
					{text}
				</p>
			</div>
			<div className='col'>
				{!auth.loading && user === auth.user._id && (
					<button
						onClick={e => removeComment(postId, _id)} 
						type='button' 
						className='small-btn btn-danger'>
							<i className='fas fa-times'></i>
					</button>
				)}
				<small className="post-date">
					Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
				</small>
			</div>
		</div>
	)
}

CommentItem.propTypes = {
	removeComment: PropTypes.func.isRequired,
	postId: PropTypes.number.isRequired,
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth,
})

export default connect(mapStateToProps, {removeComment})(CommentItem)
