const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/',async(req,res)=>{
  try{
    const users=await User.find({});
    res.status(200).json(users);
  }catch(err){
    res.status(500).json({ error: 'Failed to fetch users' });
  }
})

router.put('/:id', upload.single('profilePic'), async (req, res) => {
  try {
    const { id } = req.params;
    const { username, bio, password } = req.body;
    console.log(req.body);
    console.log(req.params);
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (bio) user.bio = bio;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    if (req.file) {
      user.profilePic = `/images/${req.file.filename}`;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        bio: updatedUser.bio,
        profilePic: updatedUser.profilePic,
      }
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
