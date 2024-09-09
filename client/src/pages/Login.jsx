import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
  Link as MuiLink,
} from '@mui/material';
import { Google, Facebook, Twitter, Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';

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
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        marginTop:{xs: '70px',sm: '60px',md:'0px'}
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: 'flex',
          width: { xs: '90%', sm: '80%', md: '75%' },
          maxWidth: '1200px',
          height: { xs: 'auto', md: '80vh'},
          borderRadius: '24px',
          overflow: 'hidden',
          flexDirection: { xs: 'column', md: 'row' },
          marginTop:'70px'
        }}
      >
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
            // position:'relative'
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
            Not a member yet?{' '}
            <MuiLink href="/signup" underline="hover" sx={{ color: 'black', fontWeight: 'bold' }}>
              Register now
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
            // position:'relative',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', fontSize: '22px', mb: '30px' }}>
            Log in
          </Typography>
          <form onSubmit={handleLogin} noValidate>
            <TextField
              label="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              variant="standard"
              InputProps={{
                style: { color: 'black' },
              }}
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
              Log in now
            </Button>
          </form>
          {error && <Typography color="error">{error.message}</Typography>}
          <MuiLink href="/password-recovery" underline="hover" sx={{ mt: 2, color: '#3c3c3c', fontWeight: 'bold' }}>
            Forgot your password?
          </MuiLink>
          <Typography sx={{ mt: 5, color: '#5b5b5b', fontSize: '14px' }}>
            Or sign in with
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
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

export default Login;
