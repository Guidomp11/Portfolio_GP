require("dotenv").config();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

module.exports = {
    crearUsuario: async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {email, password} = req.body;

        try{
            let user = await User.findOne({email});

            if(user){
                return res.status(400).json({msg: 'El usuario ya existe'})
            }

            user = new User(req.body);

            //hash del password
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(password, salt);

            await user.save();

            //creo y firmo el JWT
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

                res.status(200).json({token});
            });

            
        }catch(error){
            console.log(error);
            res.status(400).send('hubo un error');
        }
    }
}