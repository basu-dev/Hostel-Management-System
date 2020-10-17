const mongoose = require('mongoose');

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
    }
});
mongoose.model("User",userSchema);