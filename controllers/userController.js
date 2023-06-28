const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const createUser = expressAsyncHandler(async(req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser){
        //create new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    }else{
        //user already exists
        throw new Error("user already exists hoe hoe hoe");

    };
});

module.exports = {createUser};