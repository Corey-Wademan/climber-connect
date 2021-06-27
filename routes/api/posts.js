const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');

// POST api/posts 
//access Public 
//Make a post
router.post('/', [auth, [
    check('text', 'Text is required').notEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();
        res.json(post);
    } catch(err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
});

// GET api/posts //access public (add auth if only posts can be viewed from account) 
//Get all posts 
router.get('/', async (req, res) => { 

    try {
        const posts = await Post.find().sort({date: -1});
        res.json(posts);
    } catch(err) {
        console.log(err.message)
        res.status(500).send("Server Error");
    }

});

// GET api/posts/:id (postid)
//access public (add auth if only posts can be viewed from account) 
//Get post by id 
router.get('/:id', async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        // Check if post exists
        if (!post) {
            return res.status(404).json({msg: 'Post not found'});
        }
        res.json(post);
    } catch(err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).send("Server Error");
    }

});

// Delete a post api/posts/:id (postid)
//access PRIVATE
router.delete('/:id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        // Check if post exists 
        if (!post) {
            return res.status(404).json({msg: 'Post not found'});
        }

        // Check user
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "User not authorized"})
        } 

        await post.remove();
        res.json({msg: 'Post removed'})
    } catch (error) {
        console.log(error.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).send('Server Error')
    }
});

// PUT api/posts/like/:id (postid)
// LIKE a post 
//access PRIVATE
router.put('/like/:id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has been liked by user
        if(post.likes.filter(like =>  like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({msg: 'Post already liked'})
        }

        post.likes.unshift({user: req.user.id});
        await post.save();
        res.json(post.likes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
});

// PUT api/posts/unlike/:id (postid)
// UNLIKE a post 
//access PRIVATE
router.put('/unlike/:id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has been liked by user
        if(post.likes.filter(like =>  like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({msg: 'Post has not yet been liked'})
        }

        // Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
});

// POST api/posts/comment/:id (postid)
//access PRIVATE 
//Comment on a post
router.post('/comment/:id', [auth, [
    check('text', 'Text is required').notEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id)

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };
        
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    } catch(err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
     
    
});

// DELETE api/posts/comment/:id/:comment_id (postid)
//access PRIVATE 
//Delete a post
router.delete('/comment/:id/:comment_id', [auth], async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Grab comment
        const comment = await post.comments.find(comment => comment.id === req.params.comment_id);

        // Handle non existant comment
        if (!comment) return res.status(404).json({msg: 'Comment does not exist'})

        // Check user
        if (comment.user.toString() !== req.user.id) return res.status(401).json({msg: 'User not authorized'});

        // Get removal Index
        const removeIndex = post.comments.map(comment => comment.user.toString().indexOf(req.user.id));

        post.comments.splice(removeIndex, 1)
        await post.save()
        res.json(post.comments)
    } catch(err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
     
    
});

module.exports = router;