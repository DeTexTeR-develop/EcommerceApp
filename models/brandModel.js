const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        uniques: true,
        index: true,
    }},
    {
        timestamps: true
    });

module.exports = mongoose.model('brand', brandSchema);