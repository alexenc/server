const User = require('../models/User');
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');


exports.authenticateUser = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        
        return res.status(400).json({errors: errors.array()})
        
    }

    //extract email and password
    const {email, password} = req.body;
    

    try {        
        //check if user is already registered
        let user = await User.findOne({ email });
        
        if(!user) {            
            return res.status(400).json({msg: 'User does not exist'});
        }

        const correctPassword = await bcryptjs.compare(password, user.password)
        if(!correctPassword) {
            return res.status(400).json({msg: 'incorrect password'})
        }

        //si todo es correcto crear jwt
        const payload = {
            user: {
                id: user.id
            }
        }
        //sign jwt
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        },(error, token) => {
            if(error) throw error;

            res.json({token})

        })

    } catch (error) {

        console.log(error);

    }

}

exports.userAuthenticated = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select('-password')
        res.json({user})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'there was an error'})
    }
}