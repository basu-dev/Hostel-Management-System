const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        match:/.@[aA-zZ0-9]+\.[aA-zZ]+/,
        required:true
    },
    message:{
        type:String,
        required:true
    }

});

mongoose.model("Message",messageSchema);