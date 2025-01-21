//import jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token;

    //check if authorization header is provided
    if(req.headers && req.headers.authorization){

        //check if authorization header is in correct format (Bearer token)
        const authHeaders = req.headers.authorization.split(' ');

        if(authHeaders[0] !== 'Bearer' || !authHeaders[1]){
            return res.status(400).json({
                STATUS: 'INCORRECT AUTHORIZATION HEADER'
            });
        }

        //extract the token from authorization header
        token = authHeaders[1];
    }
    else{
        res.status(400).json({
            STATUS: 'MISSING AUTHORIZATION HEADER'
        })
    }

    //verify provided JSON Web Token
    try{
        jwt.verify(token, process.env.JWT_KEY);
        next();
    }
    catch(error){
        return res.status(401).json({
            STATUS: 'NO AUTHORIZATION'
        });
    }
}