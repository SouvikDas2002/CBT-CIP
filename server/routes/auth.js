const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
      let user = await User.findOne({ email });
      
      if (user) {
          return res.status(400).json({ message: 'User already exists' });
        }
        
        user = new User({ username, email, password });
        console.log(user);
        await user.save();
        
        const payload = { userId: user._id };
        console.log(payload);
        const token = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token,userId:user._id,username:user.username });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1h' });

    res.json({ token ,userId:user._id,username:user.username});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
