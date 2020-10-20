const mongoose = require('mongoose');
const streamSchema = new mongoose.Schema({
    streamName:{
        type:String,
        required:true
    }
})
mongoose.model("Stream",streamSchema);