const jwt = require('jsonwebtoken');
const { decode } = require('punycode');
const JWT_SECRET = "your_jwt_secret_here";

const authmiddleware = (req , res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('bearer')){
        return res.status(403).json({message: "Authorization header missing"});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token , JWT_SECRET);
            req.userId = decoded.userId;
            next();
    }catch(err){
        return res.status(403).json({message: "Invalid or expired token"})
    }
};

module.exports = {
    authmiddleware
}

