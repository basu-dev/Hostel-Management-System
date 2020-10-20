const jwt = require('jsonwebtoken');

const verifyToken = (req,res) => {
    let returnValue = false;
    if('authorization' in req.headers ){
       const token = req.headers['authorization'].split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET, (err,success)=>{
            if(!err) {
                let parsed = parseToken(token);
                returnValue = parsed;
            }
            else unauthorized(res,err);
        })
    }
    else{
        unauthorized(res);
    }
    return returnValue;
}
const verifyAdmin = (req,res,next) =>{
    const result = verifyToken(req,res);
   if( result && result.role == "admin"){
    next()
    }
    else{
        unauthorized(res);
    }

}
const verifyUser = (req,res,next) =>{
    const result = verifyToken(req,res);
    if( result && result.role == "user"){
     next()
     }
     else{
         unauthorized(res);
     }

}

function unauthorized(res,err){
    err=err?err:{message:"Unauthorized"};
    return res.status(403).send(err)
}

const generateToken = async (user) =>{
   return "Bearer "+ await jwt.sign({id: user._id,email: user.email ,role: user.role},process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXP});
}
const parseToken = (token) => jwt.decode(token,{complete:false,json:true});
module.exports = {verifyUser,generateToken,parseToken,verifyAdmin};