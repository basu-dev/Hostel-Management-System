const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    if('authorization' in req.headers ){
       const token = req.headers['authorization'].split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
            if(!err) next();
            else unauthorized(res);
        })

    }
    else{
        unauthorized(res);
    }
}
function unauthorized(res){
    return res.status(403).send("Unauthorized")
}
module.exports = verifyToken;