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
        const response = await fetch('http://localhost:3000/api/posts'); // Replace with your API endpoint
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
  }, []); // Empty dependency array ensures this runs only once when the component mounts

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

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    // Handle the comment submission, such as updating the state or sending a request to the server.
    console.log('New Comment:', newComment);
    setNewComment('');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                image={post.picture}
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
                  color="primary"
                  startIcon={<ThumbUp />}
                  sx={{ textTransform: 'none', boxShadow: 2 }}
                >
                  Like
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
          onClick={handleCommentsClose}
          onKeyDown={handleCommentsClose}
        >
          {selectedPost && (
            <>
              <CardMedia
                component="img"
                image={selectedPost.picture}
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
