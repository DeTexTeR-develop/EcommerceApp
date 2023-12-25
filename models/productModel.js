const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	title:{
		type:String,
		required:true,
		trim:true,
	},
	slug:{
		type:String,
		required:true,
		unique:true,
		lowercase:true,
	},
	description:{
		type:String,
		required:true
	},
	price:{
		type:Number,
		required:true
	},
	category:{
		type:String,
		required:true
	},
	quantity:{
		type:Number,
	},
	images:{
		type:Array,
	},
	colour:{
		type:String,
		required:true
	},
	sold:{
		type:Boolean,
		default:0,
		select:false
	},
	rating:[
	{
		star:Number,
		postedBy:{type: mongoose.Schema.Types.ObjectId}
	}],
	brand:{
		type:String,
		required:true
	},
	totalRatings:{
		type:String, 
		default: 0
	}

}, {
	timestamps:true
});

module.exports = mongoose.model('product', productSchema);