import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';
import { Box, Button, Container, TextField, Typography, Avatar, Grid, Paper, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImageUrl from '../assets/login-back.png';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (username.length < 3 || username.length > 10 || !/^[a-zA-Z]+$/.test(username)) {
      newErrors.username = "Username must be 3-10 characters long and contain only alphabets.";
    }
    if (!/^[a-zA-Z0-9._%+-]+@(gmail\.com|chitkara\.edu\.in)$/.test(email)) {
      newErrors.email = "Email must be a valid @gmail.com or @chitkara.edu.in address.";
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      newErrors.password = "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!/^\d{10}$/.test(contact)) {
      newErrors.contact = "Contact number must be 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(register({ username, email, password, contact }));
      navigate('/');
    }
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
              error={!!errors.username}
              helperText={errors.username}
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
                '& .MuiInput-underline:before': { borderBottomColor: 'white' },
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
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
                '& .MuiInput-underline:before': { borderBottomColor: 'white' },
              }}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
                '& .MuiInput-underline:before': { borderBottomColor: 'white' },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
                '& .MuiInput-underline:before': { borderBottomColor: 'white' },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="contact"
              label="Contact Number"
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              error={!!errors.contact}
              helperText={errors.contact}
              sx={{
                input: { color: 'white' },
                label: { color: 'white' },
                '& .MuiInput-underline:before': { borderBottomColor: 'white' },
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
