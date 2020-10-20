const mongoose = require("../model/db");
const jwtHelper = require("../config/jwtHelper.js");
const _ = require("lodash");
const User = mongoose.model("User");
module.exports = {
  register: async (req, res,next) => {
      let user = new User();
    let {email,password,confirmpassword,type}=req.body;
    Object.keys(req.body).forEach(k=>{
        user[k]=req.body[k]
    })
    if(password === confirmpassword){
        user.save(async (err, doc) => {
            if (!err) res.send({token: await jwtHelper.generateToken(user)});
            else {
              if (err.code == 11000)
                res.status(422).send({message:"Duplicate Email or USN found."});
              else res.status(400).send({message:err.message})
            }
          });
    }
    else{
        return res.status(400).json({msg:"Two Passwords do not match"})
    }

  },
  list: (req,res)=>{
      User.find((err,result)=>{
          if(!err) res.json(result)
          else res.status(500).send(err)
      }).sort("descending");
  },
  listAdmin:(req,res)=>{
    User.find((err,users)=>{
      if(!err){
        let admins = [];
        users.forEach(x=>{
          if(x.role = "admin"){
            admins.push(x);
          }
          res.json(admins);
        })
      }
      else{
        res.status(404).send({message:"Not Found"});
      }
    })
  },
  prifile: (req, res) =>{
    User.findOne({email:req.email},async (err,result)=>{
      if(!err){ res.json({
        status: true,
        user: await _.pick(result, [ "email", "role"])
      });
    }
      else res.status(404).json({message:"User not found"})
    })
  }

};
