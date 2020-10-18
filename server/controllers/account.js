const mongoose = require("../model/db");

const User = mongoose.model("User");
const generateJWt = 
module.exports = {
  register: async (req, res,next) => {
      let user = new User();
    let {email,password,confirmpassword}=req.body;
    Object.keys(req.body).forEach(k=>{
        user[k]=req.body[k]
    })
    if(password === confirmpassword){
        user.save((err, doc) => {
            if (!err) res.send({token: user.generateJWt()});
            
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
  }
};
