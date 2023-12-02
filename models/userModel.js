const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
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
    refreshToken:{
        type:String
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpired:Date,

    address:[{type:mongoose.Schema.Types.ObjectId, ref:"Address"}],
    wishlist:[{type:mongoose.Schema.Types.ObjectId, ref:"Address"}]
},
{
    timestamps:true,
});

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    };
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password)
    next();
});

userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateResetToken = async function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex");
    this.passwordResetExpired=Date.now() + 60 * 30 * 1000;
    return resetToken;
}


//Export the model
module.exports = mongoose.model('User', userSchema);