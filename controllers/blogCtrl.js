const Blog = require('../models/blogModel');
const validateMongoId = require('../utils/validateMongoDbid');
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');


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
})

module.exports = {createBlog, updateBlog};