const express = require('express')
const mongoose = require('mongoose')
const morgan = require("morgan")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
//https://stackoverflow.com/questions/56733975/express-validator-error-expressvalidator-is-not-a-function 
const expressValidator = require('express-validator');


require('dotenv').config()

//import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
//App
const app = express()

// DataBase
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=>console.log("DB connected"));

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//Route middleware
app.use("/api",authRoutes)
app.use("/api",userRoutes)

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running ${port} updated`);
})