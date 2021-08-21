const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    //read header token
    const token = req.header('x-auth-token')
    console.log(token)

    //check if no token
    if(!token) { return res.status(400).json({msg: 'no token'})}


    //validate token

    try {
        const cypher = jwt.verify(token, process.env.SECRET)
        req.user = cypher.user
        next();
    } catch (error) {
        res.status(401).json({msg: 'invalid token'});
    }
}