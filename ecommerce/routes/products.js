const express = require('express')
const router = express.Router();

// use to create new category
const {create} = require("../controllers/product")
//allowing only admin to create categories by giving 
const {requireSignin, isAuth, isAdmin} = require("../controllers/auth")
//get the user by id
const {userById} = require("../controllers/user")

//create route methods
router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create);

//use the router parameter
router.param('userId',userById)

module.exports = router;