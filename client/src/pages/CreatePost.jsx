import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Chip, Stack, IconButton, Box, Input, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';

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
  const [imageFile, setImageFile] = useState(null);

  const user_id = useSelector((state) => state.auth.user);

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!title || !author || !content || !tags || !imageFile) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const uploadResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const uploadResult = await uploadResponse.json();

      if (!uploadResponse.ok) {
        console.error('Failed to upload image:', uploadResult.message);
        return;
      }

      const newPost = {
        id: user_id.id,
        title,
        author,
        content,
        tags: tags.split(',').map(tag => tag.trim()),
        comments: comments.split('\n').map(comment => ({ content: comment, date: new Date().toISOString().split('T')[0] })),
        picture: uploadResult.filePath,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        setTitle('');
        setAuthor('');
        setContent('');
        setTags('');
        setComments('');
        setImage(null);
        handleClose();
      } else {
        console.error('Failed to create post:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
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
