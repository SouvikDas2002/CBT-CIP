import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';
import { Box, Button, Container, TextField, Typography, Grid, Paper, IconButton, InputAdornment, Link as MuiLink } from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook, Twitter } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginTop:{xs: '200px',sm: '220px',md:'40px'}
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          width: { xs: '90%', sm: '80%', md: '75%' },
          maxWidth: '1200px',
          height: { xs: 'auto', md: '90vh' },
          borderRadius: '24px',
          overflow: 'hidden',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* left side */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: { xs: '20px', md: '40px' },
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: '10px', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
            Welcome! to
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            ConnectSphere
          </Typography>
          <Typography>
            Already a member?{' '}
            <MuiLink href="/login" underline="hover" sx={{ color: 'black', fontWeight: 'bold' }}>
              Log in here
            </MuiLink>
          </Typography>
        </Box>

        {/* Right Side*/}
        <Box
          sx={{
            flex: 1,
            padding: { xs: '20px', sm: '40px' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', fontSize: '22px', mb: '10px', mt: { xs: '20px', sm: '50px' } }}>
            Sign Up
          </Typography>
          <form onSubmit={handleSignup} noValidate>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              variant="standard"
              InputProps={{
                style: { color: 'black' },
              }}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              variant="standard"
              InputProps={{
                style: { color: 'black' },
              }}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { color: 'black' },
              }}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { color: 'black' },
              }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <TextField
              label="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              fullWidth
              margin="normal"
              variant="standard"
              InputProps={{
                style: { color: 'black' },
              }}
              error={!!errors.contact}
              helperText={errors.contact}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: 'black',
                color: 'white',
                height: '50px',
                borderRadius: '10px',
                '&:hover': { backgroundColor: '#333' },
              }}
              disabled={loading}
            >
              Sign Up
            </Button>
          </form>
          {error && <Typography color="error">{error.message}</Typography>}
          <Typography sx={{ mt: 5, color: '#5b5b5b', fontSize: '14px' }}>Or sign up with</Typography>
          <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center', mb: { xs: '30px', sm: '55px' } }}>
            <Grid item>
              <IconButton>
                <Google sx={{color:'red'}}/>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <Facebook sx={{color:'blue'}}/>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <Twitter sx={{color:'primary'}}/>
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;

