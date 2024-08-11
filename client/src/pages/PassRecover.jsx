import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';

const PassRecover = () => {
  const [email, setEmail] = useState('');

  const handleRecovery = (e) => {
    e.preventDefault();
    alert(`Password recovery link sent to ${email}`);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/images/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        pt:10
      }}
    >
      <Paper elevation={6} sx={{ padding: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Password Recovery
          </Typography>
          <Box component="form" onSubmit={handleRecovery} noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Recovery Email
            </Button>
            <Button href="/login" variant="body2">
                  {"Back to login page"}
                </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PassRecover;

