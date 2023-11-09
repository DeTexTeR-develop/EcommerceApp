const Product = require('../models/productModel');
const expressAsyncHandler = require('express-async-handler');
const validateMongoId = require('../utils/validateMongoDbid');

const createProduct = expressAsyncHandler(async(req, res) => {
	try{
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
		})

	}catch(err){
		throw new Error(err);
	}
})

const updateProduct = expressAsyncHandler(async(req, res) => {
	const {id} = req.params;
	validateMongoId(id);
	try{
		const product = await Product.findByIdAndUpdate(id, 
		{
			title: req?.body?.title,
            description: req?.body?.description,
            slug: req?.body?.slug,
            price: req?.body?.price,
            category: req?.body?.category,
            quantity: req?.body?.quantity,
            images: req?.body?.images,
            colour: req?.body?.colour,
            sold: req?.body?.sold,
            rating: req?.body?.rating,
            brand: req?.body?.brand,
		});
		res.json({
			message:"product updated"
		})
	}catch(err){
		throw new Error(err); 
	}
})

module.exports = {createProduct, getProduct, getAllProducts, deleteProduct, updateProduct};