const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    if('authorization' in req.headers ){
       const token = req.headers['authorization'].split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
            if(!err) {
                console.log(parseToken(token));
                next()}
            else unauthorized(err,res);
        })
    }
    else{
        unauthorized(res);
    }
}
function unauthorized(err,res){
    return res.status(403).send(err)
}

const generateToken = async (user) =>{
   return "Bearer "+ await jwt.sign({id: user._id,email: user.email ,role: user.role},process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXP});
}
const parseToken = (token) => jwt.decode(token,{complete:true,json:true});
module.exports = {verifyToken,generateToken,parseToken};