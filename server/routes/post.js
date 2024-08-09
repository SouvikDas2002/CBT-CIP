const express = require('express');
const Post = require('../models/post');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// POST /api/posts - Create a new post
router.post('/', async (req, res) => {
  try {
    const { id,title, author, content, tags, picture, comments, likes } = req.body;
    console.log(req.body);;
    
    const newPost = new Post({
        id,
        title,
        author,
        content,
        tags,
        picture,
        comments,
        likes,
        published_date: new Date(),
    });
    console.log(newPost);

    // Save the post to the database
    const savedPost = await newPost.save();

    // Respond with the saved post
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/posts - Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// myactivity
router.get('/userposts/:x',async(req,res)=>{
  try{
    const userId=req.params.x;
    const posts=await Post.find({id:userId});
    // console.log(posts);

    res.json(posts);
  }catch(error){
    console.log('Error fetching user posts');
    res.status(500).json({message:'server error'});
  }
})
// update
router.put('/:userid/:id',async(req,res)=>{
  try{
    const postId=req.params.id;
    const userId=req.params.userid;
    console.log(postId);
    console.log(userId);

    const post=await Post.findById(postId);

    if(!post){
      return res.status(404).json({message:'Post not found'})
    }
    if(post.id!==userId){
      return res.status(401).json({message:'User not authorized'})
    }

    const updatePost=await Post.findByIdAndUpdate(
      postId,
      {
        title:req.body.title,
        content:req.body.content,
        picture:req.body.picture
      },
      {new:true}
    )
    res.json(updatePost);
    
  }catch(err){
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
})

router.delete('/deletePost/:userid/:postid',async(req,res)=>{
  try{
    const postId=req.params.postid;
    const userId=req.params.userid;
    console.log(postId+" "+userId);

    const post=await Post.findById(postId);
    console.log(post);
    
    if(!post){
      return res.status(404).json({message:'Post not found'});
    }

    if(post.id!==userId){
      return res.status(401).json({message:'User not authorized'});
    }

    await Post.findByIdAndDelete(postId);

    res.json({message:'Post deleted successfully'})
    
  }catch(error){
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Server error' });
  }
})

module.exports = router;
