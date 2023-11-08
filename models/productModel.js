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
		type:mongoose.Schema.Types.ObjectId,
		ref:"Category"
	},
	quantity:{
		type:Number,
	},
	images:{
		type:Array,
	},
	colour:{
		type:String,
		enum:["Black", "red", "voilet"],
	},
	sold:{
		type:Boolean,
	default:0
	}

});

module.exports = mongoose.model('product', productSchema);