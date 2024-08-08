import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Avatar, Paper, IconButton, Grid, Divider } from '@mui/material';
import {EmailOutlined, PhotoCamera} from '@mui/icons-material';
import { blueGrey } from '@mui/material/colors';

const Profile = () => {
  const [profilePic, setProfilePic] = useState('');
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert('Profile saved!');
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, bgcolor: blueGrey[50] }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              sx={{ width: 120, height: 120, mb: 2, border: '4px solid #3f51b5' }}
              src={profilePic || '/images/default-avatar.png'}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              sx={{ position: 'relative' }}
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleProfilePicChange}
              />
              <PhotoCamera />
            </IconButton>
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              {name || 'Your Name'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {email || 'Your Email'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {bio || 'Your Bio'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Edit Profile
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="bio"
                label="Bio"
                name="bio"
                multiline
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
