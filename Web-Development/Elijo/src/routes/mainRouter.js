const express = require('express');
const router = express.Router();
const path = require('path');
const mainController = require(path.join(__dirname, '../controllers/mainController.js'));


//HOME
router.get('/', mainController.home);

//MEET
router.get('/meet', mainController.meet);
router.get('/meet/detail/:ProfileId', mainController.detail);

//WHY
router.get('/why', mainController.why);

//POSTA
router.get('/posta', mainController.posta);


module.exports = router;