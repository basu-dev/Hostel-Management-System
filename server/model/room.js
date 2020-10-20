const mongoose = require('mongoose');
const roomSchema = mongoose.Schema({
    roomNo:{
        type:Number,
        required:true
    },
    totalCapacity:{
        type:Number,
        default:2
    },
    remainingCapacity:{
        type:Number,
        required:true,

    },
    tables:{
        type:Number,
        required:true
    },
    beds:{
        type:Number,
        required:true
    },
    chairs:{
        type:Number,
        required:true
    }
})

mongoose.model("Room",roomSchema);