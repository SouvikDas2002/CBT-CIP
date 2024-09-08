import backgroundImageUrl from '../assets/login-back.png';
import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography, Avatar, Grid, Paper, IconButton, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
        style={{
          padding: 30,
          borderRadius: 15,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          animation: `fadeInUp 1s ease-out`,
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
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', fontSize: '40px', fontFamily: 'Dancing Script', color: 'white' }}>
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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
              disabled={loading}
            >
              Sign In
            </Button>
            {error && <Typography color="error">{error.message}</Typography>}
            <Grid container justifyContent="center" flexDirection="column" textAlign="center">
              <Grid item>
                <Button component={Link} to="/signup" sx={{ textTransform: 'none', color: 'white' }}>
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
              <Grid item>
                <Button component={Link} to="/password-recovery" sx={{ fontSize: '0.8rem', textTransform: 'none', color: 'wheat' }}>
                  Forget Your password? Change password
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

export default Login;
