const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

//import routes
const userRoutes = require('./routes/users')

//App
const app = express()

// DataBase
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true
}).then(()=>console.log("DB connected"));

//Route middleware
app.use("/api",userRoutes)

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running ${port} updated`);
})