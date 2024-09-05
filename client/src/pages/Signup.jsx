import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';
import { Box, Button, Container, TextField, Typography, Avatar, Grid, Paper, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImageUrl from '../assets/login-back.png';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(register({ username, email, password }));
    navigate('/');
  };

  return (
    <Container
      component="main"
      maxWidth={false}
      disableGutters
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          animation: 'fadeInUp 1s ease-out',
          width: '100%',
          maxWidth: '500px',
          mx: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", fontSize: '40px', fontFamily: 'Dancing Script', color: 'white' }}>
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                borderRadius: '8px',
                input: { color: 'white' },
                label: { color: 'white' },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: 'white',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white',
                },
              }}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                borderRadius: '8px',
                input: { color: 'white' },
                label: { color: 'white' },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: 'white',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white',
                },
              }}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                borderRadius: '8px',
                input: { color: 'white' },
                label: { color: 'white' },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: 'white',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white',
                },
              }}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                borderRadius: '8px',
                input: { color: 'white' },
                label: { color: 'white' },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: 'white',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white',
                },
              }}
            />
            {loading ? (
              <CircularProgress color="primary.main" />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: 'primary.main',
                  color: '#fff',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.7)',
                  backgroundColor: 'linear-gradient(90deg, rgba(154, 59, 255, 1) 0%, rgba(99, 110, 255, 1) 100%)',
                  },
                }}
              >
                Sign Up
              </Button>
            )}
            {error && <Typography color="error">{error.message}</Typography>}
            <Grid container justifyContent="center" flexDirection="column" textAlign="center">
              <Grid item>
                <Button component={Link} to="/login" sx={{ textTransform: 'none', color: 'white' }}>
                  {"Already have an account? Sign In"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Container>
  );
};

export default Signup;
