const express = require('express')
const router = express.Router();

const {sayHi} = require("../controllers/user")

//create route methods
router.get('/',sayHi);
module.exports = router;