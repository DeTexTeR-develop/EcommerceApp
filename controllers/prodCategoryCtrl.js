const Category = require('../models/prodCategoryModel');
const asyncExpressHandler = require('express-async-handler');
const validateMongoId = require('../utils/validateMongoDbid');

const createCategory = asyncExpressHandler(async(req, res) => {
    try{    
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    }catch(err){
        throw new Error(err);
    }
});

const getCategory = asyncExpressHandler(async(req,res) => {
    const {id} = req.params;
    validateMongoId(id);
    try{
        const foundCategory = await Category.findById(id);
        res.json(foundCategory);
    }catch(err){
        throw new Error(err);
    }
});

const getAllCategory = asyncExpressHandler(async(req,res) => {
    try{
        const foundCategorys = await Category.find();
        res.json(foundCategorys);
    }catch(err){
        throw new Error(err);
    }
})

const updateCategory = asyncExpressHandler(async(req, res) => {
    const { id } = req.params;
    validateMongoId(id)
    try{
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updatedCategory);
    }catch(err){
        throw new Error(err);
    }
});

const deleteCategory = asyncExpressHandler(async(req, res) => {
    const {id} = req.params;
    validateMongoId(id);
    try{
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.json(deletedCategory);
    }catch(err){
        throw new Error(err);
    }
});



module.exports = {createCategory, updateCategory, deleteCategory , getCategory, getAllCategory};