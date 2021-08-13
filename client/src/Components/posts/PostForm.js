import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'

const PostForm = ({addPost}) => {
	const [text, setText] = useState('')

	return (
		<div className="post-form">
        <form 
         autoComplete='off'
         onSubmit={e => {
					e.preventDefault();
					addPost({text});
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
                placeholder="Create a post"
                required
              />
            <button type="submit" className="post-bar-btn" value="Submit">
              <i className="fas fa-share"></i>
            </button>
          </div>
        </form>
      </div>
	)
}

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
}

export default connect(null, {addPost})(PostForm)
