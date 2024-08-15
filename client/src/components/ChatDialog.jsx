import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Box, Typography, Avatar, List, ListItem, ListItemText } from '@mui/material';
import { Send, Close } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const ChatDialog = ({ open, onClose, user, socket }) => {
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (socket) {
      socket.on('chatHistory', (messages) => {
        setMessages(messages);
      });
  
      return () => {
        socket.off('chatHistory');
      };
    }
  }, [socket]);
  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (message) => {
        console.log(message);
        
        console.log(currentUser.id); 
        
        if (message.sender === currentUser.id || message.receiver === currentUser.id) {
          setMessages(prevMessages => [...prevMessages, message]);
          console.log(messages);
          
        }
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [socket, currentUser]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const messageData = {
        sender: currentUser.id,
        receiver: user._id,
        content: newMessage,
        timestamp: new Date(),
      };
      console.log(messageData);
      
      socket.emit('sendMessage', messageData);
      // setMessages(prevMessages => [...prevMessages, messageData]);
      setNewMessage('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#00796b',
          color: '#fff',
          borderBottom: '1px solid #004d40',
        }}
      >
        <Avatar src={`${import.meta.env.VITE_API_URL}${user.profilePic}`} alt={user.username} sx={{ marginRight: 2, width: 40, height: 40 }} />
        <Typography>{user.username}</Typography>
        <IconButton onClick={onClose} edge="end" sx={{ marginLeft: 'auto', color: '#fff' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: 0, display: 'flex', flexDirection: 'column', backgroundColor: '#e0f2f1' }}>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '400px', p: 2 }}>
          <List>
            {messages.map((message, index) => (
              <ListItem
                key={index}
                sx={{
                  padding: 0,
                  marginBottom: 1,
                  justifyContent: message.sender === currentUser.id ? 'flex-end' : 'flex-start',
                }}
              >
                <Box
                  sx={{
                    maxWidth: '70%',
                    backgroundColor: message.sender === currentUser.id ? '#00796b' : '#ffffff',
                    color: message.sender === currentUser.id ? '#ffffff' : '#000000',
                    borderRadius: 2,
                    padding: 1.5,
                    boxShadow: 1,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ListItemText primary={message.content} />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 1, backgroundColor: 'whitesmoke' }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          sx={{ borderRadius: 20 }}
        />
        <IconButton color="primary" onClick={handleSend} sx={{ marginLeft: 1, color: '#00796b' }}>
          <Send />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

export default ChatDialog;
