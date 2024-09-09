import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Instafeed from 'instafeed';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    boxShadow: 'none',
    borderBottom: '1px solid #e0e0e0',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'Lobster, cursive',
    fontSize: '24px',
    color: '#262626',
  },
  videoContainer: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
    maxWidth: '500px',
    objectFit: 'cover',
  },
}));

const Videos = () => {
  const classes = useStyles();
  const [currentVideo, setCurrentVideo] = useState(0);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const userFeed = new Instafeed({
      get: 'user',
      target: 'instafeed-container',
      resolution: 'low_resolution',
      accessToken: 'YOUR_INSTAGRAM_ACCESS_TOKEN_GOES_HERE',
      after: function() {
        const videoElements = document.querySelectorAll('#instafeed-container video');
        const videoArray = Array.from(videoElements).map((video) => ({
          src: video.src,
        }));
        setVideos(videoArray);
      }
    });
    userFeed.run();

    return () => {
      const instafeedContainer = document.getElementById('instafeed-container');
      instafeedContainer.innerHTML = '';
    };
  }, []);

  // Scroll event handler for navigating videos
  const handleScroll = (e) => {
    if (e.deltaY > 0) {
      // Scroll down
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    } else if (e.deltaY < 0) {
      // Scroll up
      setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    } else if (e.key === 'ArrowUp') {
      setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [videos]);

  return (
    <div>
 
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.logo}>
            MyApp
          </Typography>
        </Toolbar>
      </AppBar>


      <Box className={classes.videoContainer}>
        {videos.length > 0 && (
          <video
            key={currentVideo}
            className={classes.video}
            src={videos[currentVideo].src}
            autoPlay
            muted
            loop
          />
        )}
        <div id="instafeed-container" style={{ display: 'none' }}></div> 
      </Box>
    </div>
  );
};

export default Videos;
