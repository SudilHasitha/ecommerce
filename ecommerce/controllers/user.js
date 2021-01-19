//create the method user by ID
const User = require('../models/user');

exports.userById = (req,res,next,id) => {
    //use the callback function
    User.findById(id).exec((err,user)=>{
        if(err||!user){
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};