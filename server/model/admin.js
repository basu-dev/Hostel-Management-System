const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminSchema = mongoose.Schema({
    $key: {
        type: String,
        primaryKey: true,


    },
    email: {
        type: String,
        required:[true,"Email Field Required"],
    },
    password:{
        type:String,
        required:[true,"Password Field Required"],
        minlength:5
    }
});
adminSchema.path("email").validate((input)=>/.@[aA-zZ]+\.[aA-zZ]/.test(input),"Invalid Email Address");

adminSchema.pre('save')=function(next){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password = hash;
            this.saltSecret = salt;
            next();
        })
    })
}
adminSchema.method.verifyPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}
adminSchema.method.generateJWT = function(){
    jwt.sign({id: this._id,email:this.email},process.env.JWT_SECRET,process.env.JWT_EXP,(err,val)=>{
        return val;
    })
}

mongoose.model("Admin",adminSchema);