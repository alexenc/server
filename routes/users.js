const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const {check} = require('express-validator')

//Create an user
//api/users
router.post('/',
    [
        check('name', 'name is required').not().isEmpty(),
        check('email', 'Add a valid email').isEmail(),
        check('password', 'Password must have at least 6 characters').isLength({min: 6})
    ],
    userController.createUser
);
module.exports = router