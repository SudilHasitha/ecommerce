const express = require('express')
const router = express.Router();

const {signup,signin,signout,requireSignin} = require("../controllers/auth")
const {userSignupValidator} = require('../validator')

//create route methods
router.post('/signup',userSignupValidator,signup);
router.post('/signin',signin);
router.get('/signout',signout);

//use require sigin as a middleware
router.get('/hello',requireSignin,(req,res) => {
    res.send('hello There');
});

module.exports = router;