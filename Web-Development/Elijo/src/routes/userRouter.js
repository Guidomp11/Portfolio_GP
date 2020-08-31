const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require(path.join(__dirname, '../controllers/userController.js'));


router.get('/account', userController.account);

//SHOW REGISTER FORM:
router.get('/register', userController.register);
//SAVE USER
router.post('/register', userController.save);

//LOGIN
router.get('/login', userController.login);



module.exports = router;