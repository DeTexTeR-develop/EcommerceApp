const Product = require('../models/productModel');
const expressAsyncHandler = require('express-async-handler');
const validateMongoId = require('../utils/validateMongoDbid');
const slugify = require('slugify');

const createProduct = expressAsyncHandler(async(req, res) => {
	try{
		if(req.body.title){
			req.body.slug = slugify(req.body.title);
		};
		const product = await Product.create(req.body);
		res.json(product);
	}catch(err){
		throw new Error(err);
	}	
});

const getProduct = expressAsyncHandler(async(req, res) => {
	const { id } = req.params; 
	validateMongoId(id);
	try{
		const foundProduct = await Product.findById(id);
		res.json({
			foundProduct
		});

	} catch(err){
		throw new Error(err)
	}
});

const getAllProducts = expressAsyncHandler(async(req, res) =>{
	try{
		const products = await Product.find();
		res.json({
			products
		});
	}catch(err){
		throw new Error(err);
	}
});

const deleteProduct = expressAsyncHandler(async(req, res) => {
	const {id} = req.params;
	validateMongoId(id);
	try{
		const product = await Product.findByIdAndDelete(id);
		res.json({
			message:"product deleted"
		});

	}catch(err){
		throw new Error(err);
	}
})

const updateProduct = expressAsyncHandler(async(req, res) => {
	const {id} = req.params;
	validateMongoId(id);
	try{
		if(req.body.title){
			req.body.slug = slugify(req.body.title);
		};
		const product = await Product.findByIdAndUpdate(id, req.body, {new:true});
		res.json({
			message:"product updated"
		});
	}catch(err){
		throw new Error(err); 
	}
})

module.exports = {createProduct, getProduct, getAllProducts, deleteProduct, updateProduct};