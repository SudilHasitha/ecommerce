//create the method user by ID
const { errorHandler } = require('../helpers/dbErrorHandler');
const Category = require('../models/category');

exports.create = (req,res) => {
    const category = new Category(req,res);
    category.save((err,data) => {
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        // no need to code data:data
        res.json({data})
    })
};