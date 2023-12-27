const Coupan = require('../models/couponModel');
const expressAsyncHandler = require('express-async-handler');
const validateMongoDbid = require('../utils/validateMongoDbid');

const createCoupan = expressAsyncHandler(async (req, res) => {
    try {
        const newCoupan = await Coupan.create(req.body);
        res.json(newCoupan);
    } catch (err) {
        throw new Error(err);
    }
});

const getAllCoupan = expressAsyncHandler(async (req, res) => {
    try {
        const allCoupans = await Coupan.find();
        res.json(allCoupans);
    } catch (err) {
        throw new Error(err);
    }
});

const updateCoupan = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbid(id);
    try {
        const updatedCoupan = await Coupan.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.json(updatedCoupan);
    } catch (err) {
        throw new Error(err);
    }
});

const deleteCoupan = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbid(id);
    try {
        const deletedCoupan = await Coupan.findByIdAndDelete(id, req.body, {
            new: true
        });
        res.json(deletedCoupan);
    } catch (err) {
        throw new Error(err);
    }
});


module.exports = { createCoupan, getAllCoupan, updateCoupan, deleteCoupan };