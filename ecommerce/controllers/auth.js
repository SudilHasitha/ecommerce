const User = require('../models/user')
const {errorHandler} = require("../helpers/dbErrorHandler")
const jwt = require("jsonwebtoken"); //generate json web tokens
const expressJwt = require('express-jwt')//for authorization check

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

exports.signin = (req,res) => {
    //find the user based on email
    const {email,password} = req.body
    User.findOne({email},(err,user)=>{
        if(err ||!user){
            return res.status(400).json({
                error:'User with that email does not exist'
            });
        }
        //authenticate the user
        // create authnticate method in user model
        if(!user.authentication(password)){
            return res.status(401).json({
                error: 'Email Password combination do not exist.'
            });
        }

        //generate a signed token with user id and secret
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
        //persist the token as 't' in the cookie with expiry date
        res.cookie('t',token,{expire:new Date()+9999})
        // return the response with user and token to frontend client
        const {_id,name,email,role} = user
        return res.json({token,user:{_id,email,name,role}})
    })
};

// In signout we just have to clear the cookie
exports.signout = (req,res) => {
    res.clearCookie("t");
    res.json({message:"Signout Success"});
};

// give access only to the signin users
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

//create two methods to authnticate user and admin user
exports.isAuth = (req,res,next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if(!user){
        return res.status(403).json({
            error:"Access denied"
        });
    }
    next();
}

//
exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "Admin resource Access denied"
        })
    }
    next();
}