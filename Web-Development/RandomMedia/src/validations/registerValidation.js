const {check, validationResult, body} = require('express-validator');

module.exports = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Ingresar un nombre'),
    check('lastname')
        .not()    
        .isEmpty()
        .withMessage('Ingresar un apellido'),
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Ingresar un email')
]