import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Avatar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  TextField,
  Box
} from '@mui/material';
import { ThumbUp, Comment } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState('');

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Fetch posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  // handle comment box to open
  const handleCommentsOpen = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleCommentsClose = () => {
    setOpen(false);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  // handle comment submission
  const handleCommentSubmit = async(event) => {
    event.preventDefault();

    const response=await fetch(`${import.meta.env.VITE_API_URL}/api/posts/comments/${selectedPost._id}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        author:user.username,
        content:newComment
      })
    })
    if(!response.ok){
      throw new Error('Failed to submit comment');
    }
    const updatedPost=await response.json();
    setSelectedPost(updatedPost);
    setPosts(posts.map(post=>post._id===updatedPost._id?updatedPost:post));
    setNewComment('');
  };

  const handleLikeToggle = async (postId, isLiked) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/posts/${isLiked ? 'unlike' : 'like'}/${postId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }), // Send user ID in the request body
      });
  
      if (!response.ok) {
        throw new Error(`Failed to ${isLiked ? 'unlike' : 'like'} the post`);
      }
  
      const updatedPost = await response.json();
  
      // Update the local state with the new number of likes and likedBy
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
  
      // If the toggled post is currently selected, update it as well
      if (selectedPost && selectedPost._id === updatedPost._id) {
        setSelectedPost(updatedPost);
      }
    } catch (error) {
      console.error(`Error ${isLiked ? 'unliking' : 'liking'} the post:`, error);
    }
  };
  

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Hi, {user.username}
      </Typography>
      <Grid container spacing={4}>
        {posts.map(post => (
          <Grid item key={post._id} xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image={`${import.meta.env.VITE_API_URL}${post.picture}`}
                alt={post.title}
                onClick={() => handleCommentsOpen(post)}
                sx={{ cursor: 'pointer' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  by {post.author} on {new Date(post.published_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {post.content}
                </Typography>
                <div style={{ marginTop: '8px' }}>
                  {post.tags.map(tag => (
                    <Chip key={tag} label={tag} size="small" style={{ marginRight: '4px' }} />
                  ))}
                </div>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Likes: {post.likes} &nbsp; | &nbsp; Comments: {post.comments.length}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ddd' }}>
              <Button
  variant="contained"
  color={post.likedBy.includes(user.id) ? 'secondary' : 'primary'}
  startIcon={<ThumbUp />}
  sx={{ textTransform: 'none', boxShadow: 2 }}
  onClick={() => handleLikeToggle(post._id, post.likedBy.includes(user.id))} // Toggle like/unlike
>
  {post.likedBy.includes(user.id) ? 'Unlike' : 'Like'}
</Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Comment />}
                  sx={{ textTransform: 'none', boxShadow: 2 }}
                  onClick={() => handleCommentsOpen(post)}
                >
                  Comments
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleCommentsClose}
      >
        <Box
          sx={{ width: 350, p: 2 }}
          role="presentation"
        >
          {selectedPost && (
            <>
              <CardMedia
                component="img"
                image={`${import.meta.env.VITE_API_URL}${selectedPost.picture}`}
                alt={selectedPost.title}
                sx={{ mb: 2 }}
              />
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                {selectedPost.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                by {selectedPost.author} on {new Date(selectedPost.published_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedPost.content}
              </Typography>
              <div style={{ marginBottom: '16px' }}>
                {selectedPost.tags.map(tag => (
                  <Chip key={tag} label={tag} size="small" style={{ marginRight: '4px' }} />
                ))}
              </div>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Likes: {selectedPost.likes} &nbsp; | &nbsp; Comments: {selectedPost.comments.length}
              </Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Comments
              </Typography>
              {selectedPost.comments.length > 0 ? (
                <List>
                  {selectedPost.comments.map((comment, index) => (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar>{comment.author?.charAt(0)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.author}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {new Date(comment.date).toLocaleDateString()}
                            </Typography>
                            {" — " + comment.content}
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                  No comments yet.
                </Typography>
              )}
              <Divider sx={{ mt: 2 }} />
              <Box component="form" onSubmit={handleCommentSubmit} sx={{ mt: 2 }}>
                <Typography variant="h6" component="div">
                  Write a Comment
                </Typography>
                <TextField
                  fullWidth
                  label="Your Comment"
                  multiline
                  rows={4}
                  value={newComment}
                  onChange={handleCommentChange}
                  variant="outlined"
                  sx={{ mt: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </Container>
  );
};

export default Dashboard;
