// import React, { useEffect, useState } from 'react';
// import { Box, Button, Container, TextField, Typography, Avatar, Grid, Paper } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../redux/authSlice';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     dispatch(login({ email, password }));
//   };

//   return (
//     <Container component="main" maxWidth="xs" sx={{pt:10}}>
//       <Paper elevation={6} style={{ padding: 20, marginTop: 50 }}>
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="secondary"
//               sx={{ mt: 3, mb: 2 }}
//               disabled={loading}
//             >
//               Sign In
//             </Button>
//             {error && <Typography color="error">{error.message}</Typography>}
//             <Grid container>
//               <Grid item>
//                 <Button component={Link} to="/signup" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Button>
//                 <Button component={Link} to="/password-recovery" variant="caption" sx={{ fontSize: "10px" }}>
//                   Forget Your password? Change password
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default Login;
import backgroundImageUrl from '../assets/login-back.png'

import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography, Avatar, Grid, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';

// const backgroundImageUrl = "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fGNpdHklMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTY5MjM5NDkwMw&ixlib=rb-1.2.1&q=80&w=1080";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold",fontSize:'40px' ,fontFamily:'Dancing Script', color: 'white' }}>
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
              type="password"
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
                  // transform: 'scale(1.05)',
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
