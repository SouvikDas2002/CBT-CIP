import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import backgroundImageUrl from '../assets/login-back.png'; // Assuming you have a background image here

const PassRecover = () => {
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleRecovery = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setStep('reset');
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/recover`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword }),
    });
    if (response.ok) {
      alert('Password reset successful');
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
          width: '100%',
          maxWidth: '400px', // Same width as login
          padding: 3,
          borderRadius: 15,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          animation: 'fadeInUp 1s ease-out',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: "bold", fontSize: '30px', fontFamily: 'Dancing Script', color: 'white' }}
          >
            Password Recovery
          </Typography>
          {step === 'request' ? (
            <Box component="form" onSubmit={handleRecovery} noValidate sx={{ mt: 1 }}>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2, backgroundColor: 'primary.main', color: '#fff' }}
              >
                Send Recovery Email
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handlePasswordReset} noValidate sx={{ mt: 1 }}>
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                autoFocus
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
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
                id="new-password"
                label="New Password"
                name="new-password"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                color="secondary"
                sx={{ mt: 3, mb: 2, backgroundColor: 'primary.main', color: '#fff' }}
              >
                Reset Password
              </Button>
            </Box>
          )}
          <Button href="/login" variant="body2" sx={{ color: 'white', textDecoration: 'underline' }}>
            {"Back to login page"}
          </Button>
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

export default PassRecover;
