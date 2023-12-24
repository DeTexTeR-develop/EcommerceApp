const mongoose = require('mongoose');

const prodCategorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        uniques: true,
        index: true,
    }},
    {
        timestamps: true
    });

module.exports = mongoose.model('PCategory', prodCategorySchema);