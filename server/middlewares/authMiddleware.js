const jwt=require('jsonwebtoken')

const verifyToken=async(req,res,next)=>{
    const token=req.headers['authorization'];

    if(!token){
        return res.status(403).json({message:'No token provided'});
    }
    jwt.verify(token.split(' ')[1],process.env.ACCESS_SECRET,(err,decode)=>{
        if(err){
            return res.status(401).json({message:'Failed to authenticate token'});
        }    
        req.userId=decode.id;
        next();
    })
}
module.exports=verifyToken