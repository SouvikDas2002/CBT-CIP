import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const MyActivity = () => {
  const [posts, setPosts] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  const useId=useSelector(state=>state.auth.user.id)

  useEffect(() => {
    // Fetch posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/userposts/${useId}`); // Replace with your API endpoint
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
  }, []);

  const handleEditClick = (post) => {
    setCurrentPost(post);
    setUpdatedTitle(post.title);
    setUpdatedContent(post.content);
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setCurrentPost(null);
  };

  const handleUpdatePost = async () => {
    // Update post logic here
    try {
        console.log(currentPost._id);
        
      const response = await fetch(`http://localhost:3000/api/posts/${useId}/${currentPost._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      // Update the post in the local state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === currentPost._id
            ? { ...post, title: updatedTitle, content: updatedContent }
            : post
        )
      );

      handleEditClose();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    // Delete post logic here
    try {
      const response = await fetch(`http://localhost:3000/api/posts/deletePost/${useId}/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Remove the deleted post from the local state
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        My Activity
      </Typography>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} md={4}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image={post.picture}
                alt={post.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #ddd' }}>
                <IconButton color="primary" onClick={() => handleEditClick(post)}>
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDeletePost(post._id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdatePost} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyActivity;
