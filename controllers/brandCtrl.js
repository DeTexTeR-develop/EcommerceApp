const Brand = require('../models/brandModel');
const asyncExpressHandler = require('express-async-handler');
const validateMongoId = require('../utils/validateMongoDbid');

const createBrand = asyncExpressHandler(async(req, res) => {
    try{    
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    }catch(err){
        throw new Error(err);
    }
});

const getBrand = asyncExpressHandler(async(req,res) => {
    const {id} = req.params;
    validateMongoId(id);
    try{
        const foundBrand = await Brand.findById(id);
        res.json(foundBrand);
    }catch(err){
        throw new Error(err);
    }
});

const getAllBrand = asyncExpressHandler(async(req,res) => {
    try{
        const foundBrands = await Brand.find();
        res.json(foundBrands);
    }catch(err){
        throw new Error(err);
    }
})

const updateBrand = asyncExpressHandler(async(req, res) => {
    const { id } = req.params;
    validateMongoId(id)
    try{
        const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {new: true});
        res.json(updatedBrand);
    }catch(err){
        throw new Error(err);
    }
});

const deleteBrand = asyncExpressHandler(async(req, res) => {
    const {id} = req.params;
    validateMongoId(id);
    try{
        const deletedBrand = await Brand.findByIdAndDelete(id);
        res.json(deletedBrand);
    }catch(err){
        throw new Error(err);
    }
});



module.exports = {createBrand, updateBrand, deleteBrand , getBrand, getAllBrand};