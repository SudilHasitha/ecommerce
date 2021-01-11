const mongoose = require('mongoose')
// hash the pw
const crypto = require('crypto')
//generate unique strings
const { v4: uuidv4 } = require('uuid');
const { timestamps } = require('console')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 128
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    about:{
        type:String,
        trim:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    history:{
        type:Array,
        default:[]
    }
}, {timestamps:true});
//the salit will use to generate hashed password

//Add virtual fields
// sending passwword from the client side
userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuidv4()
    this.hashed_password = this.encryptPassword(password)

})
.get(function(){
    return this._password
})

//add method to user schema
userSchema.methods = {
    encryptPassword: function(password){
        if(!password) return '';
        try{
            return crypto.createHmac('sha1',this.salt)
            .update(password)
            .digest('hex')
        }catch(err){
            return '';
        }
    }
};

module.exports = mongoose.model("User",userSchema)