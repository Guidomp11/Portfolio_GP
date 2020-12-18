require("dotenv").config();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');


exports.authenticateUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'El usuario no existe'});
        }
        
        const passwordConfirm = await bcryptjs.compare(password, user.password);
        
        if(!passwordConfirm){
            return res.status(400).json({msg: 'La contraseña es incorrecta'});
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        //firma del JWT
        jwt.sign(payload, 'secreto',{
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;

            return res.json({token});
        });

    }catch(error){
        console.log(error);
        res.status(400).json({msg: error});
    }
}

exports.usuarioAutenticado = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json({user})
    }catch(error){
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'})
    }
}