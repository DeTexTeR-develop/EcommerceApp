const Blog = require('../models/blogModel');
const validateMongoId = require('../utils/validateMongoDbid');
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
const CloudinaryUplodImg = require('../utils/cloudinary');
const fs = require('fs');

const getABlog = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const blog = await Blog.findById(id).populate('likes');
        await Blog.findByIdAndUpdate(
            id,
            {
                $inc: { numViews: 1 }
            },
            {
                new: true
            }
        )
        res.json(blog);
    } catch (err) {
        throw new Error(err)
    }
});

const getAllBlogs = expressAsyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        throw new Error(err);
    }
});

const createBlog = expressAsyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.json(newBlog);
    } catch (err) {
        throw new Error(err);
    }
});

const updateBlog = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: 'successfully updated', blog });
    } catch (err) {
        throw new Error(err);
    }
});

const deleteBlog = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoId(id);
    try {
        const blog = await Blog.findByIdAndDelete(id, req.body);
        res.json({ message: "successfully deleted", blog });
    } catch (err) {
        throw new Error(err);
    }
});

const likeBlog = expressAsyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoId(blogId);
    const loginUserId = req?.user?._id;
    try {
        const blog = await Blog.findById(blogId);
        const isLiked = blog?.isLiked;

        const alreadyDisliked = blog?.dislikes?.find(
            (userId) => userId?.toString() === loginUserId?.toString()
        );

        if (alreadyDisliked) {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull: { dislikes: loginUserId },
                isDisliked: false
            },
                {
                    new: true
                });

            res.json(blog);
        };
        if (isLiked) {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull: { likes: loginUserId },
                isLiked: false
            },
                {
                    new: true
                });

            res.json(blog);
        } else {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $push: { likes: loginUserId },
                isLiked: true
            },
                {
                    new: true
                });

            res.json(blog);
        };
    } catch (err) {
        throw new Error(err);
    }
});

const dislikeBlog = expressAsyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoId(blogId);
    const loginUserId = req?.user?._id;
    const blog = await Blog.findById(blogId);
    const isDisliked = blog?.isDisliked;

    const alreadyLiked = blog?.likes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    );

    if (alreadyLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false
        },
            {
                new: true
            });
        res.json(blog);
    }
    if (isDisliked) {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { dislikes: loginUserId },
                isDisliked: false
            },
            {
                new: true
            })
        res.json(blog);
    } else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { dislikes: loginUserId },
            isDisliked: true
        }, {
            new: true
        })
        res.json(blog);
    }
});

const uploadimages = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const uploader = (path) => CloudinaryUplodImg(path, "images");
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path);
        }
        const foundBlog = await Blog.findByIdAndUpdate(id, {
            images: urls.map((file) => {
                return file;
            })
        }, { new: true })
        res.json(foundBlog);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { getABlog, getAllBlogs, createBlog, updateBlog, deleteBlog, likeBlog, dislikeBlog, uploadimages };