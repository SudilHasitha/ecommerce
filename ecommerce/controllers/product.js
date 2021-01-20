// create a product file with upload

const formidable = require('formidable')
const _ = require("lodash")
const fs = require('fs')
const Product = require("../models/product")

exports.create = (req,res) => {
    //here we need to handle form data
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err,fields,files) =>{
        if(err){
            return res.status(400).json({
                error:'Image could not be uploaded'
            })
        }
        //create product with form data
        let product = new Product(fields)

        //handle if there are any file uploads
        // the name photo depend on form name
        if(files.photo){
            // access the file system
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
    })
}