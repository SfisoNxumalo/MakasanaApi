const jwt = require("jsonwebtoken")
const config = require("../db/auth.config")

const validateToken = (async (req, res, next) =>{

    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];

        jwt.verify(token, config.secret, (error, decoded) => {
            if(error){
                return res.status(401).json({message:"Access Denied!"});
            }

            req.business = decoded.id
            next();
        })
    }
    else{
        return res.status(401).json({message:"Access Denied!"});
    }
});

module.exports = validateToken;