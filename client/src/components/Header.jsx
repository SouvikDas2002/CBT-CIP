import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CreatePost from '../pages/CreatePost';

const Header = ({ isAuthenticated, onLogout }) => {
  const [open,setOpen]=useState(false)


  const handleOpen=()=>{
    setOpen(true);
  }
  const handleClose=()=>{
    setOpen(false);
  }
  return (
    <AppBar position="fixed" style={{backgroundColor:"black"}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontFamily: "Dancing Script"}}>
          ConnectSphere
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit"  component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" onClick={handleOpen}>
              Create Post
            </Button>
            <CreatePost open={open} handleClose={handleClose}/>
            <Button color="inherit" component={Link} to="/myactivity">
              My Activity
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
