const express = require('express')
const router = express.Router();

const {requireSignin,isAuth,isAdmin} = require("../controllers/auth")
const {userById} = require("../controllers/user")

// requireSignin - the user require to signin
// is auth specify that login user and the authnticated user must have same id to signin
// this prevent login users from accessing others profiles
// isAdmin - specify that the user must be an admin
router.get("/secret/:userId",requireSignin,isAuth,isAdmin,(req,res)=>{
    res.json({
        user: req.profile
    });
});
//create route methods
//to take the parameter the user id from the URL
router.param('userId',userById);


module.exports = router;