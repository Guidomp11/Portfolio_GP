const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const userController = require('../controllers/userController');
const hasAcces = require('../middlewares/hasAcces');
const registerValidation = require('../validations/registerValidation');
const loginValidation = require('../validations/loginValidation');

let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/users'));
    },
    filename: function(req, file, cb){
        cb(null, req.body.email + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({storage:storage});


router.get('/register', userController.register);
router.post('/register', registerValidation, userController.addNewUser);

router.get('/joinCommunity', userController.joinCommunityForm);
router.post('/joinCommunity', userController.sendProposal);

router.get('/login', userController.login);
router.post('/login', loginValidation, userController.logUser);

router.get('/account/:userId', hasAcces, userController.account);
router.post('/account/edit/:userId', hasAcces, upload.any(), userController.editAccount);

router.get('/recoverPass', userController.recoverPassword);
router.post('/recoverPass', userController.sendMailToRecover);

router.get('/changeP', userController.changePassword);
router.post('/changeP', userController.saveNewPassword);

router.get('/logout', hasAcces, userController.logout);


module.exports = router;