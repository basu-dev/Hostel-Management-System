const express = require('express');
const cors = require('cors');
require('./config/config.js');
require("./model/db.js");
const router = require("./routes.js");

const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// const router = express.Router();
const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

//error handler
app.use((err,req,res,next)=>{
    if(err.name == 'Validation Error'){
        var errors = [];
        Object.entries(err).forEach((k,v)=>{
            errors.push({k,v});
        })
        console.log(err);
    }
})

app.use("/",router);
router.get("/",(req,res,next)=>{
    res.json({name:"basu", rollNO: 32})
})
app.listen(3000,"localhost",()=>{console.log("running on post 3000")})