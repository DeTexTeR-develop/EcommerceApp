const User = require('../models/userModel');

const createUser = async(req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    console.log(findUser);
    if(!findUser){
        //create new user
        const newUser = await User.create(req.body);
        console.log(newUser);
        res.json(newUser);
    }else{
        //user already exists
        res.json({
            msg:"User already exists",
            success: false,
        });
    };
};

module.exports = {createUser};