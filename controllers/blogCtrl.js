const Blog = require('../models/blogModel');
const validateMongoId = require('../utils/validateMongoDbid');
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');

const getABlog = expressAsyncHandler(async(req,res) => {
    const {id} = req.params;
    validateMongoId(id);
    try{
        const blog = await Blog.findById(id);
        res.json(blog);
    }catch(err){
        throw new Error("error in finding a Blog", err)
    }
});

const getAllBlogs = expressAsyncHandler(async(req, res) => {
    try{
        const blogs = await Blog.find();
        res.json(blogs);
    }catch(err){
        throw new Error("error in loading blogs", err);
    }
});

const createBlog = expressAsyncHandler(async (req, res) => {
    try {
      const newBlog = await Blog.create(req.body);
      res.json(newBlog);
    } catch (err) {
        throw new Error("error in creating blog", err);
    }
});

const updateBlog = expressAsyncHandler(async(req, res) => {
    const {id} = req.params;
validateMongoId(id);
    try{
        const blog = await Blog.findByIdAndUpdate(id , req.body, { new:true });
        res.json({message:'successfully updated', blog});
    }catch(err){
        throw new Error("error in updating blog", err);
    }
});

const deleteBog = expressAsyncHandler(async(req, res)=> {
    const {id} = req.params;
    validateMongoId(id);
    try{
        const blog = await Blog.findByIdAndDelete(id, req.body);
        res.json({message:"successfully deleted", blog});
    }catch(err){
        throw new Error("error in deleting Blog", err);
    }
})

module.exports = {getABlog, getAllBlogs, createBlog, updateBlog, deleteBog};