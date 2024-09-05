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
  Box,
  IconButton
} from '@mui/material';
import { ThumbUp, Comment, Telegram, NotificationAdd, HeartBroken, Favorite } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import io from 'socket.io-client';
import HeaderBox from '../components/HeaderBox';
import ParticleCanvas from '../components/ParticleCanvas';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [messaging, setMessaging] = useState(false);
  const [users, setUsers] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });


        if (response.status === 401 || response.status === 400) {
          localStorage.removeItem('token');
          localStorage.removeItem('persist:root');
          navigate('/login');
        } else if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        navigate('/login');
      }
    };

    checkTokenValidity();
    const interval = setInterval(checkTokenValidity, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

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

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/comments/${selectedPost._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          author: user.username,
          content: newComment
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const updatedPost = await response.json();
      setSelectedPost(updatedPost);
      setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleLikeToggle = async (postId, isLiked) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/posts/${isLiked ? 'unlike' : 'like'}/${postId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isLiked ? 'unlike' : 'like'} the post`);
      }

      const updatedPost = await response.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );

      if (selectedPost && selectedPost._id === updatedPost._id) {
        setSelectedPost(updatedPost);
      }
    } catch (error) {
      console.error(`Error ${isLiked ? 'unliking' : 'liking'} the post:`, error);
    }
  };

  const toggleMessagingDrawer = () => {
    setMessaging(!messaging);
  };


  localStorage.getItem("token") && useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (response.status === 401 || response.status === 400) {
          localStorage.removeItem('token');
          navigate('/login');
        } else if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        navigate('/login');
      }
    };

    fetchUsers();
  }, []);
  return (
    // <ParticleCanvas>
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4, position: "relative", zIndex: 999}}>
      <HeaderBox user={user.username} toggleMessagingDrawer={toggleMessagingDrawer} />
      <Grid container spacing={4}>
        {posts.map(post => (
          <Grid item key={post._id} xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {console.log(post)}
              <CardMedia
                component="img"
                height="140"
                image={`${import.meta.env.VITE_API_URL}${post.picture}`}
                alt={post.title}
                onClick={() => handleCommentsOpen(post)}
                sx={{ cursor: 'pointer' }}
              />
              <CardContent sx={{ flexGrow: 1 ,backgroundColor:'whitesmoke'}}>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  by {post.author} on {new Date(post.published_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                  mt: 1,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  textOverflow: 'ellipsis'
                }}>
                  {post.content}
                </Typography>
                <div style={{ marginTop: '8px' }}>
                  {post.tags.map(tag => (
                    <Chip key={tag} label={tag} size="small" style={{ marginRight: '4px', color: 'blue' }} />
                  ))}
                </div>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Likes: {post.likes} &nbsp; | &nbsp; Comments: {post.comments.length}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ddd',backgroundColor:'whitesmoke' }}>

                <Button
                  variant="contained"
                  color={post.likedBy.includes(user.id) ? 'secondary' : 'primary'}
                  startIcon={<Favorite />}
                  sx={{ textTransform: 'none', boxShadow: 2 }}
                  onClick={() => handleLikeToggle(post._id, post.likedBy.includes(user.id))}
                >
                  {post.likedBy.includes(user.id) ? '' : 'Like'}
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
          sx={{
            width: { xs: '100%', sm: 450 },
            p: 2,
            overflow: 'auto',
            maxHeight: 'calc(100vh - 16px)',
            boxSizing: 'border-box'
          }}
          role="presentation"
        >
          {selectedPost && (
            <>
              <CardMedia
                component="img"
                image={`${import.meta.env.VITE_API_URL}${selectedPost.picture}`}
                alt={selectedPost.title}
                sx={{ mb: 2, width: '100%', height: 'auto' }}
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
              <Box sx={{ marginBottom: '16px', display: 'flex', flexWrap: 'wrap' }}>
                {selectedPost.tags.map(tag => (
                  <Chip key={tag} label={tag} size="small" sx={{ marginRight: '4px', marginBottom: '4px' }} />
                ))}
              </Box>
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

      <MessageBox open={messaging} onClose={toggleMessagingDrawer} users={users} />
    </Container>
    // </ParticleCanvas>
  );
};

export default Dashboard;

