const expressAsyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel');

const createUser = expressAsyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        //create new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        //user already exists
        throw new Error("user already exists");

    };
});


const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        res.json(
            {
                id: findUser?._id,
                firstName: findUser?.firstName,
                lastName: findUser?.lastName,
                email: findUser?.email,
                mobile: findUser?.mobile,
                token: generateToken(findUser?._id)
            }
        );
    } else {
        throw new Error("Invalid Credentials");
    }
});

//to get all the users

const getAllUsers = expressAsyncHandler(async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (err) {
        throw new Error(err);
    }
});

//to get a single user

const getUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
        const foundUser = await User.findById(id);
        res.json({
            foundUser
        });
    } catch (err) {
        throw new Error(err);
    }
});

const deleteUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.json({
            deletedUser
        });
    } catch (err) {
        throw new Error(err);
    }
});

const updateUser = expressAsyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const updateUser = await User.findByIdAndUpdate(_id,
            {
                firstName: req?.body?.firstName,
                lastName: req?.body?.lastName,
                email: req?.body?.email,
                mobile: req?.body?.mobile
            },
            {
                new: true
            }
        );
        res.json(updateUser);

    } catch (err) {
        throw new Error(err);
    }

});

const blockUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try{
        const block = await User.findByIdAndUpdate(
            id,
            {
                blocked:true
            },
            {
                new: true
            });
            res.json({
                message:"user is blocked",
            })
    }
    catch(err){
        throw new Error("there was some error while blocking the user", err);
    }
});

const unblockUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try{
        const unblock =  await User.findByIdAndUpdate(
            id,
            {
                blocked:false
            },
            {
                new: true
            });
            res.json({
                message:"user is unblocked",
            })
    }
    catch(err){
        throw new Error("there was some error while unblocking the user", err);
    }
});
module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser
};