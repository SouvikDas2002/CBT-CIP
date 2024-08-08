import React, { useState } from 'react';
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
import PostsData from '../utils/PostsData';
import {useSelector} from 'react-redux';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedComments, setSelectedComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const user=useSelector((state)=>state.auth.user);


  const handleCommentsOpen = (comments) => {
    setSelectedComments(comments);
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
    // This is where you would typically handle the comment submission, such as updating the state or sending a request to the server.
    console.log('New Comment:', newComment);
    setNewComment('');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Hii, {user.username}
      </Typography>
      <Grid container spacing={4}>
        {PostsData.map(post => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
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
                  onClick={() => handleCommentsOpen(post.comments)}
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
          <Typography variant="h6" component="div" sx={{ mb: 2 }}>
            Comments
          </Typography>
          <Divider />
          <List>
            {selectedComments.map(comment => (
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{comment.author.charAt(0)}</Avatar>
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
        </Box>
      </Drawer>
    </Container>
  );
}

export default Dashboard;
