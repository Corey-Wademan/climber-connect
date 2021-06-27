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

	console.log()
	return (
		<div className="post bg-white p-1 my-1">
			<div>
				<Link to={`/profile/${user}`}>
					<img
						className="round-img"
						src={avatar}
						alt=""
					/>
				</Link>
				<h4>{name}</h4>
			</div>
			<div>
				<p className="my-1">
					{text}
				</p>
				<p className="post-date">
					Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
				</p>
				{!auth.loading && user === auth.user._id && (
					<button
						onClick={e => removeComment(postId, _id)} 
						type='button' 
						className='btn btn-danger'>
							<i className='fas fa-times'></i>
					</button>
				)}
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
