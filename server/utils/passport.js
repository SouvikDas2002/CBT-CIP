require('dotenv').config();
const passport=require('passport')
const express=require('express');
const app=express();
const crypto=require('crypto')
const GoogleStrategy=require('passport-google-oauth2').Strategy
const User=require('../models/user')

console.log(process.env.GOOGLE_CLIENT_ID)
console.log(process.env.GOOGLE_CLIENT_SECRET);
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"/api/auth/google/callback",
},async(accessToken,refreshToken,profile,done)=>{
    try{
        
        const { email, displayName, photos } = profile;
        let user = await User.findOne({ email });
        // console.log(profiles);
        
    
        if (!user) {
            user = new User({
              username: displayName+crypto.randomBytes(4).toString('hex'),
              email: email,       
              password: crypto.randomBytes(20).toString('hex'), 
              profilePic: photos[0]?.value || '',
              contact: '',        
              bio: '', 
            });
      await user.save();
    }
console.log("uuvvgg");

        done(null,user);
    }catch(err){
        done(err,false);
    }
}
))