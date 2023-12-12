const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	numViews: {
		type: Number,
		default: 0
	},
	isLiked: {
		type: Boolean,
		default: false
	},
	isDisliked: {
		type: Boolean,
		default: false
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	],
	dislikes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	],
	images: {
		type: String,
		default: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
	},
	author: {
		type: String,
		default: "Admin"
	}
}, {
	toJSON: {
		virtuals: true
	},
	toObject: {
		virtuals: true
	},
	timestamps: true,
}
);

module.exports = mongoose.model('blog', blogSchema);
