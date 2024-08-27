const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const Message = require('./models/message');
const verifyToken = require('./middlewares/authMiddleware');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/post');
const multer = require('multer');
const path = require('path');

require('dotenv').config();

app.use(express.json({ limit: '10mb' }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
  },
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json('No file uploaded.');
  }
  res.status(200).json({ message: 'File has been uploaded', filePath: `/images/${req.file.filename}` });
});

app.use('/api/auth', authRoute);
app.use('/api/users', verifyToken, userRoute);
app.use('/api/posts', verifyToken, postRoute);

  // websocket configuration

 io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', async ({ currentUserId, selectedUserId }) => {
    const roomId = [currentUserId, selectedUserId].sort().join('-');
    socket.join(roomId);

    try {
      const messages = await Message.find({
        $or: [
          { sender: currentUserId, receiver: selectedUserId },
          { sender: selectedUserId, receiver: currentUserId },
        ],
      }).sort({ timestamp: 1 });
  
      socket.emit('chatHistory', messages);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  });
  
  socket.on('sendMessage', async (messageData) => {
    const { sender, receiver, content, timestamp } = messageData;
    const roomId = [sender, receiver].sort().join('-');

    const newMessage = new Message({
      sender,
      receiver,
      content,
      timestamp,
    });

    try {
      await newMessage.save();
      io.to(roomId).emit('receiveMessage', messageData);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});



server.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server is running on port ${PORT}`);
});
