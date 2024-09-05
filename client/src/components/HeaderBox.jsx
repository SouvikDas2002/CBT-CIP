import React from 'react';
import { Box, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { NotificationAdd, Telegram } from '@mui/icons-material';

function HeaderBox({ user, toggleMessagingDrawer }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display={"flex"}
      textAlign={"center"}
      justifyContent={isSmallScreen ? "center" : "space-between"}
      flexDirection={isSmallScreen ? "column" : "row"}
      alignItems={"center"}
      padding={isSmallScreen ? "16px" : "24px"}
    >
      <Typography
        variant={isSmallScreen ? "h5" : "h4"}
        component="h1"
        gutterBottom
      >
        Start exploring,{" "}
        <span style={{ textTransform: 'uppercase' }}>
          {user}!
        </span>
      </Typography>
      <Typography
        variant={isSmallScreen ? 'body1' : 'h5'}
        component="h1"
        style={{
          fontFamily: "Dancing Script",
          marginTop: isSmallScreen ? "8px" : "0",
        }}
      >
        The world of stories is at your fingertips.
      </Typography>

      <Box
        marginTop={isSmallScreen ? "16px" : "0"}
        display={"flex"}
        justifyContent={isSmallScreen ? "center" : "flex-end"}
      >
        <IconButton size='large' color='primary'>
          <NotificationAdd />
        </IconButton>
        <IconButton
          size='large'
          color='secondary'
          onClick={toggleMessagingDrawer}
        >
          <Telegram />
        </IconButton>
      </Box>
    </Box>
  );
}

export default HeaderBox;
