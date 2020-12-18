//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({min: 6})
    ], authController.authenticateUser);

router.get('/', auth, authController.usuarioAutenticado);

module.exports = router;