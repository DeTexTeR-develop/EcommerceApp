const User = require('../models/userModel');
const jwt =  require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async(req, res, next) => {
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req.header.authorization.split(" ")[1];
        try{
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log(decided);
            }
        }catch(err){
            throw new Error('Authorization token expired. please login again!');
        }
    }else{
        throw new Error('There is no token in the header')
    }
});

module.exports = authMiddleware;