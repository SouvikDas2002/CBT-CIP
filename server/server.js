const express=require('express')
const app=express();
const PORT=process.env.PORT||3000
const cors=require('cors');

app.use(cors({
    origin:'http://localhost:5173'
}));
app.use(express.json());

require('dotenv').config();

const mongoose=require('mongoose');
const authRoute=require("./routes/auth");
// const userRoute=require('./routes/users');
// const postRoute=require('./routes/post');
const multer=require('multer');
const path=require('path');

app.use(express.urlencoded({extended:true}));
app.use("/images",express.static(path.join(__dirname,"/images")))

// mongodb connection

mongoose
  .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to Mongodb"))
  .catch((err) => console.log(err));

// file uploads by multer

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})
const upload=multer({storage:storage});

app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded");
})


// Routes

app.use("/api/auth",authRoute);
// app.use("/api/users",userRoute);
// app.use("/api/posts",postRoute);


app.listen(PORT,(err)=>{
    if(err) console.log(err);
    else
    console.log(`server is running on port ${PORT}`);
    
})