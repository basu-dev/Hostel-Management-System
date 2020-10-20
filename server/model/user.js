const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:" Eamail is required"
    },
    password: {
        type: String,
        required: true,
        minlength:[5, "Minimum 5 characters needed"]
    },
    role : {
        type: String,
        match: /^admin$|^user$|^staff$/,
        required: true
    },
    createdAt :{
        type: Date,
        default: Date.now()
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    }
});

//Custom Validations
userSchema.path("email").validate (val=> /.@[aA-zZ0-9]+\.[aA-zZ]+/.test(val),"Invalid Email Address");
//Events
    userSchema.pre('save',function (next){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(this.password,salt,(err,hash)=>{
                this.password=hash;
                this.saltSecret = salt;
                next();
            })
        })
    })
//methods
userSchema.method.verifyPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}
userSchema.method.generateJWT = function(){
    return jwt.sign({email: this.email, id: this._id},process.env.JWT_SECRET,process.env.JWT_EXP);
}

mongoose.model("User",userSchema);