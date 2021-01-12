const db = require('../database/models');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const {check, validationResult, body} = require('express-validator');
const askCategories = require('../ownModules/askCategories');

module.exports = {
    account: async (req, res) => {
        if(typeof req.session.userSession != 'undefined'){
            let categories = await askCategories();
            let user = await db.User.findByPk(req.session.userSession, {
                include: [{
                    model: db.Category,
                    as: 'categories',
                    through: {
                        model: db.User_category
                    }
                }]
            })
            .catch(error => {
                return res.send(error);
            })
            
            if(user != null){
                
                res.render('account', {user, categories});
            }else{
                res.redirect('/');
            }
        }else{
            res.redirect('/user/login');
        }
    },
    login: async (req, res) => {
        let categories = await db.Category.findAll({
            include: [{association: 'sub_category'}]
        })
        res.render('login', {categories});
    },
    logUser: async (req, res) => {

        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('login', {errors:errors.errors});
        }

        let user = await db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        .catch((error) => {
            return res.send(error);
        })
        if(bcrypt.compareSync(req.body.password, user.password)){
            if(req.body.remember != undefined) {
                res.cookie('userId', user.id, {maxAge: 60000 * 60 * 24 * 7});
            }
            req.session.userSession = user.id;
            res.redirect('/');
        }else{
            let errors = [
                {
                    msg: "La contraseña ingresada no es valida"
                }
            ]
            res.render('login', {errors});
        }
    },
    register: async (req, res) => {
        let categories = await db.Category.findAll({
            include: [{association: 'sub_category'}]
        })
        res.render('register', {categories});
    },
    addNewUser: async (req, res) => {

        let errors = validationResult(req);

        if(!errors.isEmpty()){
            let categories = await askCategories();
            return res.render('register', {categories, errors:errors.errors});
        }else{
            let validateUser = await db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .catch(error => {
                return res.send(error);
            })

            if(validateUser){
                let categories = await askCategories();
                let emailerror = {
                    header: 'exists',
                    msg: 'Usuario existente'
                };
                return res.render('register', {categories, errors:emailerror});
            }
        }

        let user = await db.User.create({
            rol: 0,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            image: 'defaultUser.png',
            created_at: Date.now(),
            updated_at: Date.now()
        })
        .catch((error) => {
            return res.send(error);
        });

        if(typeof req.body.category == 'undefined'){
            res.redirect('/user/login');
        }else{
            let category = [];
            if (req.body.category.length == 1){
                let categoryRow = {
                    category_id: req.body.category,
                    user_id: user.id
                }
                category.push(categoryRow);
            }else{
                for(let i = 0; i < req.body.category.length; i++){
                    category.push({
                        user_id: user.id,
                        category_id: req.body.category[i]
                    });
                }   
            }
            let user_categories = await db.User_category.bulkCreate(category)
            .catch((error) => {
                return res.send(error);
            });
        }
        
    },
    logout: (req, res) => {
        req.session.destroy();
        res.cookie('userId', '', {maxAge:-1});
        res.redirect('/');
    },
    editAccount: async (req, res) => {

        if(req.files[0] != undefined){
            let user = await db.User.update({
                image: req.files[0].filename
            }, {
                where: {
                    id: req.session.userSession
                }
            });
        }
        
        let user_categories = await db.User_category.findAll({
            where: {
                user_id: req.session.userSession
            }
        })
        if(user_categories.length == 0){
            let category = [];
            if(typeof req.body.category != 'undefined'){
                if (req.body.category.length == 1){
                    let categoryRow = {
                        category_id: req.body.category,
                        user_id: req.session.userSession
                    }
                    category.push(categoryRow);
                }else{
                    for(let i = 0; i < req.body.category.length; i++){
                        category.push({
                            user_id: req.session.userSession,
                            category_id: req.body.category[i]
                        });
                    }   
                }
                db.User_category.bulkCreate(category)
                .then(response => {
                    res.redirect('/user/account/' + req.session.userSession);
                })
                .catch(error => {
                    return res.send(error);
                })
            }else{
                res.redirect('/user/account/' + req.session.userSession);
            }
        }else{

            if(typeof req.body.category != 'undefined'){
                let user_categories_destroyed = await db.User_category.destroy({
                    where: {
                        user_id: req.session.userSession
                    }
                })

                let category = [];
                if (req.body.category.length == 1){
                    let categoryRow = {
                        category_id: req.body.category,
                        user_id: req.session.userSession
                    }
                    category.push(categoryRow);
                }else{
                    for(let i = 0; i < req.body.category.length; i++){
                        category.push({
                            user_id: req.session.userSession,
                            category_id: req.body.category[i]
                        });
                    }   
                }
                db.User_category.bulkCreate(category)
                .then(response => {
                    res.redirect('/user/account/' + req.session.userSession);
                })
            }else{
                db.User_category.destroy({
                    where: {
                        user_id: req.session.userSession
                    }
                })
                res.redirect('/user/account/' + req.session.userSession);
            }
        }
    },
    recoverPassword: async (req, res) => {
        let categories = await db.Category.findAll({
            include: [{association: 'sub_category'}]
        })

        res.render('recoverForm', {categories});
    },
    sendMailToRecover: async (req, res) => {
        
        let user = await db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        if(user != null){
            let transporter = nodemailer.createTransport({
            	host: "plesk.ar.conectemos.com",
            	port: 25,
            	auth: {
              		user: process.env.NODEMAILER_USER,
              		pass: process.env.NODEMAILER_PASS
            	}
        	});
            let mailOptions = {
                from: 'equipo@randomedios.com',
                to: req.body.email,
                subject: 'Recuperación de contraseña',
                text: `Hola ${user.name}! Haz solicitado un cambio de contraseña? Si es asi, haz click en el siguiente link:  \nwww.randomedios.com/user/changeP`,
                html: `<a href="randomedios.com/user/changeP">Cambiar contraseña</a>`
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            }); 
            res.redirect('/user/login');
        }
    },
    changePassword: async (req, res) => {
        let categories = await db.Category.findAll({
            include: [{association: 'sub_category'}]
        })

        res.render('changePassword', {categories});
    },
    saveNewPassword: (req, res) => {
        db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            let newPassword = bcrypt.hashSync(req.body.password, 10);

            db.User.update({password: newPassword}, {
                where: {
                    email: req.body.email
                }
            })
            .then(userUpdated => {
                res.redirect('/user/login');
            })
        })
        .catch(error => {
            return res.send(error);
        })
    },
    joinCommunityForm: async (req, res) => {
        let categories = await askCategories();
        res.render('joinCommunity', {categories});
    },
    sendProposal: async (req, res) => {
        let categories = await askCategories();
        let message;

        if(req.body.email == null || req.body.email == ''){
            message = {
                value: false,
                msg:'Por favor, completa todos los campos.'
            }
            return res.render('joinCommunity', {categories, message});
        }

        let transporter = nodemailer.createTransport({
            host: "plesk.ar.conectemos.com",
            port: 25,
            auth: {
                  user: process.env.NODEMAILER_USER,
                  pass: process.env.NODEMAILER_PASS
            }
        });
        let mailOptions = {
            from: req.body.email,
            to: 'equipo@randomedios.com',
            subject: 'Quiero sumarme a la comunidad',
            text: `Nombre: ${req.body.name} \n${req.body.proposal}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }); 
        
        message = {
            value: true,
            msg:'Muchas gracias! en breve responderemos a tu propuesta!'
        }
        res.render('joinCommunity', {categories, message});
    }
}