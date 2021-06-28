import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'

const CommentForm = ({postId, addComment}) => {
	const [text, setText] = useState('')
	return (
		<div className="post-form"> 
         <div className="lg-line"></div>
        <form 
          autoComplete='off'
          onSubmit={e => {
            e.preventDefault();
            addComment(postId, {text});
            setText('')}} 
					className="form my-1">
          <div className='post-bar'>
            <input
              className='post-bar-in'
              name="text"
              cols="30"
              rows="5"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Reply"
              required
            ></input>
            <button type="submit" className="post-bar-btn" value="Reply">
              <i className="fas fa-reply"></i>            
            </button>
          </div>
        </form>
      </div>
	)
}

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
}

export default connect(null, {addComment})(CommentForm)
