const mongoose = require('mongoose')
// hash the pw
const crypto = require('crypto')
//generate unique strings
const { v4: uuidv4 } = require('uuid');
const { timestamps } = require('console')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 128
    },
    description:{
        type:String,
        required: true,
        maxlength:2000
    },
    price:{
        type:Number,
        trim: true,
        required: true,
        maxlength:32
    }
}, {timestamps:true});

module.exports = mongoose.model("Product",productSchema)