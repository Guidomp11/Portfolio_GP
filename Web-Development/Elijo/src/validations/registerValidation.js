const {check, validationResult, body} = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Ingresar un nombre'),
    check('last_name')
        .not()
        .isEmpty()
        .withMessage('Ingresar un apellido'),
    check('email')
        .not()
        .isEmpty()
        .withMessage('Ingresar un email')
        .isEmail()
        .withMessage('Ingresar un email valido'),
    check('password')
        .isLength({min: 8})
        .withMessage('La contrasenia debe tener un minimo de 8 caracteres'),
    check('telephone')
        .not()
        .isEmpty()
        .withMessage('Ingresar un numero de telefono'),
    check('rol')
        .not()
        .isEmpty()
        .withMessage('Seleccionar una categoria de estudiante'),
    body('email')
        .custom(async function(enteredEmail){
            let validationEmail = db.User.findOne({
                where: {
                    email: enteredEmail
                }
            })
            .then(function(result){
                if(result){
                    throw Error('Este mail ya esta ingresado')
                }else{
                    return true
                }
            })
            return validationEmail
        }).withMessage('Este mail ya esta ingresado')
    ]