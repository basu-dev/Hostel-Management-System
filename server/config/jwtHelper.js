const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    if('authorization' in req.headers ){
        const token = req.headers['authorization'].split(' ')[1];
        if(!token){
            res.status(403).send({auth: false, message: "No Token Provided"})
        }
        else{
            jwt.verify(token, provess.env.JWT_SECRET, (err,decoded)=>{
                if(err){
                    res.status(500).send({auth: false , message: "Invalid Token PRovided"})
                }
                else{
                    req._id = decoded.id
                }
            })
        }
        return  res.status(500).send({auth: false, message: "Could not verify token."});
        
    }
}
module.exports = verifyToken;