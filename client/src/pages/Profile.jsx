import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Avatar, Paper, IconButton, Grid, Divider } from '@mui/material';
import {EmailOutlined, PhotoCamera} from '@mui/icons-material';
import { blueGrey } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { localUpdate } from '../redux/authSlice';
import axios from 'axios';

const Profile = () => {
  const [profilePic, setProfilePic] = useState('');
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');

  const user=useSelector((state)=>state.auth.user) 
  console.log(user);

  const dispatch=useDispatch();
  

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

  const handleSave = async() => {
    // alert('Profile saved!');
    const updatedProfile={
      username:name||user.username,
      bio:bio||user.bio,
      profilePic:profilePic||user.profilePic
    }
    // console.log(updatedProfile);
    
    dispatch(localUpdate(updatedProfile))

    try{
      const formData=new FormData();
      formData.append('username',updatedProfile.username);
      formData.append('bio',updatedProfile.bio);
      if(profilePic){
        const blob=await fetch(profilePic).then((r)=>r.blob());
        formData.append('profilePic',blob);
      }
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully!');
      console.log(response.data);
    }catch(err){

    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{pt:10, mt: 8 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, bgcolor: blueGrey[50] }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              sx={{ width: 120, height: 120, mb: 2, border: '4px solid #3f51b5' }}
              src={profilePic || user.profilePic || '/images/default-avatar.png'}
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
            <Typography variant="h6" sx={{ mt: 2}}>
              {name || user.username}
            </Typography>
            <Typography variant="caption" sx={{ mt: 1}}>
              {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {bio || user.bio}
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
