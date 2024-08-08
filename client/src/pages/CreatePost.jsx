import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Chip, Stack, IconButton, Box, Input, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

// Styled Components
const StyledDialog = styled(Dialog)({
  '& .MuiPaper-root': {
    borderRadius: 12,
    padding: 24,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
});

const StyledInput = styled(Input)({
  display: 'none',
});

const ImagePreview = styled('img')({
  maxWidth: '100%',
  maxHeight: '300px',
  borderRadius: 8,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
});

const CreatePost = ({ open, handleClose }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [comments, setComments] = useState('');
  const [image, setImage] = useState(null);

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = () => {
    // Handle post submission here
    console.log({
      title,
      author,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      comments: comments.split('\n').map(comment => ({ content: comment, date: new Date().toISOString().split('T')[0] })),
      image
    });
    handleClose(); // Close dialog after submission
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">
          Create a New Post
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 16, top: 16 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Author"
          type="text"
          fullWidth
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Content"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Tags (comma separated)"
          type="text"
          fullWidth
          variant="outlined"
          value={tags}
          onChange={handleTagsChange}
          sx={{ mb: 2 }}
        />
        <Box sx={{ mb: 2 }}>
          <StyledInput
            accept="image/*"
            id="image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span" color="primary" sx={{ textTransform: 'none' }}>
              Upload Image
            </Button>
          </label>
          {image && (
            <Box sx={{ mt: 2 }}>
              <ImagePreview src={image} alt="Uploaded preview" />
            </Box>
          )}
        </Box>
        <Box>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {tags.split(',').map((tag, index) => tag.trim() && (
              <Chip key={index} label={tag.trim()} color="primary" />
            ))}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Create Post
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default CreatePost;
