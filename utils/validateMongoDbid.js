const mongoose = require('mongoose');
const validateMongoId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid){
        throw new Error('Id is not valid');
    }
}

module.exports = validateMongoId;