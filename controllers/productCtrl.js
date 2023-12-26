const Product = require('../models/productModel');
const expressAsyncHandler = require('express-async-handler');
const validateMongoId = require('../utils/validateMongoDbid');
const slugify = require('slugify');
const User = require('../models/userModel');

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
	const queryObj = {...req.query};
	try{

		//filtering
		const excludedFields = ['page', 'sort', 'limit', 'fields'];
		excludedFields.forEach(el => delete queryObj[el]);
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , (match) => `$${match}`)

		let query = Product.find(JSON.parse(queryStr));
		
		//sorting

		if(req.query.sort){
			const sortBy = req.query.sort.split(',').join(' ');
			query = query.sort(sortBy);
		}else{
			query = query.sort('-createdAt')
		}

		//limiting the fields

		if(req.query.fields){
			const fields = req.query.fields.split(',').join(' ');
			query = query.select(fields);
		}else{
			query = query.select("-__v")
		}	

		//pagination

		const page = req.query.page;
		const limit = req.query.limit;
		const skip = (page - 1)*limit;

		query = query.skip(skip).limit(limit);
		if(req.query.page){
			const productCount = await Product.countDocuments();
			if(skip >= productCount)throw new Error('No Page available');
		}


		const products = await query;	
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
});

const addToWishlist = expressAsyncHandler(async(req, res) => {
	const { _id } = req.user;
	const { prodId } = req.body;
	try{
		const user = await User.findById(_id);
		const alreadyAddedToWishlist = user.wishlist.find((id) => id.toString() === prodId);
		if(alreadyAddedToWishlist){
			let user = await User.findByIdAndUpdate(_id, {
				$pull:{wishlist: prodId}
			}, {new: true});
			res.json(user);
		}else{
			let user = await User.findByIdAndUpdate(_id, {
				$push:{wishlist: prodId}
			}, {new: true});
			res.json(user);
		}
	}catch(err){
		throw new Error(err);
	}
});

const rating = expressAsyncHandler(async(req, res) => {
	const {_id} = req.user;
	const {star, prodId, comment} = req.body;
	try{
		const product = await Product.findById(prodId);
		const alreadyRated = product.rating.find((userId) => userId.postedBy.toString() === _id.toString());
		if(alreadyRated){
			const updateRating = await Product.updateOne({
				rating: {$elemMatch: alreadyRated},
			},{
				$set: {"rating.$.star": star, "rating.$.comment": comment}
			}, {
				new : true
			});
		}else{
			const product = await Product.findByIdAndUpdate(prodId, {
				$push: {rating: {star : star, postedBy: _id, comment: comment}}
			}, {new: true});
		}
		const getAllRatingOfProduct = await Product.findById(prodId);
		let totalRating = getAllRatingOfProduct.rating.length;
		let ratingSum = getAllRatingOfProduct.rating.map(item => item.star).reduce((curr, prev) => curr + prev, 0);
		let actualRating = Math.round(ratingSum/totalRating);
		const updatedRatedProduct = await Product.findByIdAndUpdate(prodId, {
			totalRatings : actualRating
		}, {new: true});
		res.json(updatedRatedProduct);

	}catch(err){
		throw new Error(err);
	}
});

module.exports = {createProduct, getProduct, getAllProducts, deleteProduct, updateProduct, addToWishlist, rating};