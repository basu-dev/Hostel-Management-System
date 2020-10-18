const mongoose = require('mongoose');
mongoose.set("useCreateIndex",{sparse: true, unique: true});

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    },
    (err)=>{
        if(!err) console.log("MONgoDB setup")
        else console.log(JSON.stringify(err))
    });
    require("./user.js");
    require("./admin.js")
    module.exports = mongoose;