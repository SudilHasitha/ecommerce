const User = require('../models/User')
const {errorHandler} = require("../helpers/dbErrorHandler")

exports.signup = (req,res) => {
    console.log("req.body",req.body)
    const user = new User(req.body)
    //save the user crreate and use callback function to handle that
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err:errorHandler(err)
            })
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json({
            user
        });
    });
};