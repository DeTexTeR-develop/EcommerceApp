const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        index:true,
    },
    lastName:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user"
    },
    cart:{
        type:Array,
        default:[]
    },
    blocked:{
        type:Boolean,
        default:false
    },

    address:[{type:mongoose.Schema.Types.ObjectId, ref:"Address"}],
    wishlist:[{type:mongoose.Schema.Types.ObjectId, ref:"Address"}]
},
{
    timestamps:true,
});

userSchema.pre("save", async function (next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);