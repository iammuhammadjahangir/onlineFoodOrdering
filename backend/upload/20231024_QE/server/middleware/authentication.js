const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

exports.isAuthenticatedUser = async(req, res, next)=>{
     
const  {token} = req.cookies;
    if(!token){
        return next(res.status(402).json("Please login to acces this resource"))
        }
    const decodeData= jwt.verify(token, process.env.JWT_SECRET);
    req.user= await User.findById(decodeData.id);

    next();
}