const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto=require('crypto')
const nodemailer=require('nodemailer');

const router = express.Router();

require('dotenv').config();

const transporter=nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS,
  }
})

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

    res.status(201).json({ token,userId:user._id,username:user.username,email:email,bio:user.bio,profilePic:user.profilePic });
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

    res.json({ token ,userId:user._id,username:user.username,email:email,bio:user.bio,profilePic:user.profilePic});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/reset-password',async(req,res)=>{
  const {email}=req.body;

  try{
    const user=await User.findOne({email});
    if(!user){
      return res.status(404).json({message:'User not found'});
    }
    const otp=crypto.randomBytes(3).toString('hex');
    user.resetPassToken=otp;
    user.resetPassExpire=Date.now()+3600000;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Recovery OTP',
      text: `Your OTP for password recovery is: ${otp}. It is valid for 1 hour.`,
    };

   await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to email' });
  }catch(err){
    console.error('Error handling password recovery:', err);
    res.status(500).json({ message: 'Server error' });
  }
})
// Reset Password
router.post('/recover', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP is valid and has not expired
    if (user.resetPassToken !== otp || Date.now() > user.resetPassExpire) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.password = newPassword;
    user.resetPassToken = undefined;
    user.resetPassExpire = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
