const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    try{
        const connection = mongoose.connect('mongodb://localhost:27017/ecommerceApp');
        console.log("database connected");
    }catch(err){
        console.log("Database error");
    }
}