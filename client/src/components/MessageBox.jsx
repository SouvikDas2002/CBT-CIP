import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton, Box, Typography, Avatar, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import ChatDialog from './ChatDialog';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const MessageBox = ({ open, onClose, users }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [socket, setSocket] = useState(null);

  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_API_URL);
    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  // useEffect(() => {
  //   if (currentUser && socket) {
  //     socket.on('receiveMessage', (message) => {
  //       // Handle incoming message
  //       console.log('Message received:', message);
  //     });

  //     return () => {
  //       socket.off('receiveMessage');
  //     };
  //   }
  // }, [currentUser, socket]);

  const handleOpenChat = (user) => {
    console.log(user._id);
    
    setSelectedUser(user);
    setChatOpen(true);

    if (currentUser && socket) {
      const roomId = [currentUser.id, user._id].sort().join('-');
      console.log(currentUser.id);
      console.log(user._id);
      
      
      socket.emit('joinRoom', {
        currentUserId: currentUser.id,
        selectedUserId: user._id,
      });
    }
  };

  const handleCloseChat = () => {
    setChatOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Drawer
        anchor='right'
        open={open}
        onClose={onClose}
        sx={{
          width: '400px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '400px',
            boxSizing: 'border-box',
            backgroundColor: '#2d1b4b'
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid #ddd',
          }}
        >
          <Typography variant="h6" color={"white"}>Chat Lists</Typography>
          <IconButton onClick={onClose} edge="end">
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ padding: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
        </Box>

        <List sx={{ width: '100%', maxWidth: 360 }}>
          {filteredUsers.map(user => (
            <React.Fragment key={user._id}>
              <ListItem button onClick={() => handleOpenChat(user)}>
                <Avatar
                  src={user.profilePic ? `${import.meta.env.VITE_API_URL}${user.profilePic}` : '/images/default-avatar.png'}
                  alt={user.username}
                />
                <ListItemText primary={user.username} sx={{ color: "white", marginLeft: "5px" }} />
              </ListItem>
              <Divider sx={{ backgroundColor: "white" }} />
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      {selectedUser && (
        <ChatDialog
          open={chatOpen}
          onClose={handleCloseChat}
          user={selectedUser}
          socket={socket}
        />
      )}
    </>
  );
};

export default MessageBox;
