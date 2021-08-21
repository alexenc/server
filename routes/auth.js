//routes for auth users
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const a = require('../controllers/authController');
const auth = require('../middleware/auth')


//Create an user
//api/auth
router.post('/',
    
    a.authenticateUser
    
);

//Gets auth user

router.get('/',
    auth,
    a.userAuthenticated
)
module.exports = router;