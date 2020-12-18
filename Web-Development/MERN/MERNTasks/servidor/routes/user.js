const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const userController = require('../controllers/userController');

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({min: 6})
    ], userController.crearUsuario);

module.exports = router;