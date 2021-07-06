import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost} from '../../actions/post'

const PostItem = ({
	deletePost,
	auth, 
	addLike, 
	removeLike, 
	showActions,
	post: { _id, text, name, avatar, user, date, comments, likes}}) => {
		
	return (
		<div className="posts">
        <div className="post bg-dark list-item my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="post-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
						</div>
						<div className='post-details'>
							<div className='post-text'>
								<p className="my-1">
									{text}
								</p>
								<p className="post-date">
										Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
								</p>
							</div>
							<div className='post-btns'>
								{showActions && 
								<Fragment>
									<button onClick={e => addLike(_id)} type="button" className="btn btn-light">
										<i className="fas fa-thumbs-up"></i>
										{likes.length > 0 && (
											<span> {likes.length}</span>
										)}
									</button>
									<button onClick={e => removeLike(_id)} type="button" className="btn btn-light">
										<i className="fas fa-thumbs-down"
												style={{backgroundColor: '#3f729b59'}}></i>
									</button>
									<Link to={`/posts/${_id}`} className="btn btn-primary">
										Discussion 
										{comments.length > 0 && (
										<span className='comment-count'>{comments.length}</span>
									)} 
									</Link>
								{!auth.loading && user === auth.user._id && (
									<button onClick={e => deletePost(_id)} type="button" className="btn btn-danger">
										<i className="fas fa-times"></i>
									</button>
								)}
								</Fragment>}
							</div>
          	</div>
				</div>
		</div>
	)
}

PostItem.defaultProps = {
	showActions: true
}

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem)
