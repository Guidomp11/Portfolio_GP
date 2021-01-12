const fs = require('fs');
const path = require('path');   
const db = require('../database/models');
const bcrypt = require('bcryptjs');
const registerValidation = require('../validations/registerValidation');
const {check, validationResult, body} = require('express-validator');
const nodemailer = require('nodemailer');
const nodemailerMessenger = require('../ownModules/nodemailerMessenger');
const updateCalification = require('../ownModules/updateCalification');
const googleVerification = require('../ownModules/verifyWithGoogle');
const getGoogleID = require('../ownModules/getGoogleId');
const updateStats = require('../ownModules/updateStats');
const sequelize = db.sequelize;

module.exports = {
    account: async function(req, res){
        let universities = await db.University.findAll();
        let institutes = await db.Institute.findAll();
        let user = await db.User.findOne({
            where:{
                id: req.params.userID
            },
            include: [{association: 'User_careers'},{association: 'User_courses'}, {association: 'Interest'}]
        })
        let genres = await db.Genre.findAll();
        let user_careers = await db.User_career_study.findAll({
            where: {
                user_id: req.params.userID
            }
        })
        let user_courses = await db.User_course_study.findAll({
            where: {
                user_id: req.params.userID
            }
        })
        // return res.send(user)
        res.render('account', {universities, institutes, user, user_careers, user_courses, genres});
    },
    register: function(req, res) {
        res.render('register');
    },
    save: function(req, res) {

        let errors = validationResult(req)

        // return res.send(errors)

        if(errors.isEmpty()){
            
            let newUser = {
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                name: req.body.name,
                last_name: req.body.last_name,
                age: null, 
                telephone: req.body.telephone,
                experiences: " ",
                province: " ", 
                genre_id: 3, 
                photo: 'user.png',
                rol: req.body.rol,
                user_confirm: 0, 
                google_id: null,
                created_at: new Date,
                updated_at: new Date
            }

            db.User.create(newUser)
                .then(function(result){
                    req.session.userSession = result.id
                    res.locals.userLoggedIn = {
                        id: result.id,
                        rol: result.rol
                    }                
                    // let body = {
                    //     fromEmail: 'equipo@elijo.org',
                    //     toEmail: result.email,
                    //     affair: 'Confirmación de cuenta',
                    //     request: `Hola ${result.name}, bienvenido a Elijo. Te pedimos por favor que para poder usar tu cuenta hagas click en el siguiente link para confirmar tu cuenta:`,
                    //     htmlContent: `<a href="elijo.org/user/confirm/${bcrypt.hashSync(result.id, 10)}">Confirmar cuenta</a>`
                    // }
                    // nodemailerMessenger(body);
                    res.redirect('/user/account/' + result.id)
                })
                .catch(function(e){
                    res.send(e)
                })
        }else{
            res.render('register', {errors:errors.errors})
        }
    },
    login: function(req, res) {
        res.render('login')
    },
    enter: function(req, res){

        let errors = validationResult(req)

        if(errors.isEmpty()){
            db.User.findOne({
                where:{
                    email: req.body.email
                }
            })
            .then(function(foundUser){
                if(bcrypt.compareSync(req.body.password, foundUser.password)){
                    req.session.userSession = foundUser.id
                    if(req.body.remember != undefined){
                        res.cookie('Elijo', foundUser.id, {maxAge: 60000*60*24*7*30})
                    }
                    res.locals.userLoggedIn = {
                        id: foundUser.id,
                        rol: foundUser.rol
                    }
                    return res.redirect('/')
                } else {
                    return res.render('login')
                }
            })
            .catch(function(e){
                return res.send(e)
            })
        }else{
            return res.render('login', {errors:errors.errors})
        }
    },
    edit: async (req, res) => {

        let user = await db.User.findByPk(req.session.userSession)
        .catch(err => {
            return res.send(err);
        })
        
        //#region USER UPDATE
        let userUpdate = {
            name: req.body.name,
            email: req.body.email,
            last_name: req.body.last_name,
            age: (req.body.age == '')?null : req.body.age,
            telephone: req.body.telephone,
            province: req.body.province,
            genre_id: req.body.genre,
            photo: user.photo,
            experiences: req.body.experiences
        }
        if(req.files[0]){
            userUpdate.photo = req.files[0].filename;
        }

        let userUpdated = await db.User.update(userUpdate, {
            where: {
                id: req.session.userSession
            }
        })
        .catch(err => {
            return res.send(err);
        })
        //#endregion

        //#region INTERESTS
        if(req.body.interests){
            let interests = await db.Interest.findAll()//TRAIGO INTERESES
            .catch(err => {
                return res.send(err);
            })
    
            if(!Array.isArray(req.body.interests)){//SI NO ES UN ARRAY EL REQ DE INTERESES, LO HAGO ARRAY
                let tempInfo = req.body.interests;
                req.body.interests = [];
                req.body.interests.push(tempInfo);
            }
    
            let interestsToAdd = [];
            let tempInterestArr = [];
            tempInterestArr = req.body.interests;
    
            for(let i = 0; i < interests.length; i++){//SI EL INTERES INGRESADO NO EXITE EN LA DB, LO AGREGO A UN ARRAY
                for(let j = 0; j < req.body.interests.length; j++){
    
                    if(interests[i].interest_name == req.body.interests[j]){
                        interestsToAdd.push({
                            interest_id: interests[i].id,
                            user_id: req.session.userSession
                        });
                        tempInterestArr[j] = null;
                    }
                }
            }
    
            for(let i = 0; i < tempInterestArr.length; i++){//AGREGO A LA DB EL INTEREST QUE PREVIAMENTE REVISE QUE NO ESTABA
    
                if(tempInterestArr[i] != null && tempInterestArr[i] != ''){
                    console.log(tempInterestArr[i]);
                    let interestCreate = await db.Interest.create({
                        interest_name: tempInterestArr[i],
                        updated_at: Date.now()
                    })
                    .catch(err => {
                        return res.send(err);
                    })
                    interestsToAdd.push({
                        interest_id: interestCreate.id,
                        user_id: req.session.userSession
                    });
                }
            }
            
            let interestsDestroyed = await db.User_interest.destroy({
                where: {
                    user_id: req.session.userSession
                }
            });

            for(let i = 0; i < interestsToAdd.length; i++){//LE ASIGNO EL INTERES AL USUARIO
                let newUserInterests = await db.User_interest.create(interestsToAdd[i])
                .catch(err => {
                    return res.send(err);
                })
            }
        }
        
        //#endregion

        //#region User_career_study
        if(req.body.career){
            let destroyCareerStudies = await db.User_career_study.destroy({
                where: {
                    user_id: req.session.userSession
                }
            })
            for(let i = 0; i < req.body.career.length; i++){
                if(req.body.career[i] != "Selecciona una Carrera" && req.body.career[i] != '' && req.body.career[i] != null){
                    let newCareer = await db.User_career_study.create({
                        career_id: req.body.career[i],
                        user_id: req.session.userSession,
                        start_year: req.body.startDate[i],
                        updated_at: Date.now()
                    })
                }                    
            }
        }        
        //#endregion

        //#region User_course_study
        if(req.body.course){
            let destroyCourseStudies = await db.User_course_study.destroy({
                where: {
                    user_id: req.session.userSession
                }
            })
            for(let i = 0; i < req.body.course.length; i++){
                if(req.body.course[i] != "Selecciona un Curso" && req.body.course[i] != null && req.body.course[i] != ''){
                    let newCourse = await db.User_course_study.create({
                        course_id: req.body.course[i],
                        user_id: req.session.userSession,
                        start_year: req.body.courseStartDate[i],
                        updated_at: Date.now()
                    })
                }
            }
        }
        //#endregion

        return res.redirect('/user/account/'+req.session.userSession);
    },
    requestInstitution: (req, res) => {
        db.User.findByPk(req.session.userSession)
        .then( user => {
            return res.render('requestNewInstitution', {user});
        })
        .catch(error => {
            return res.send(error);
        })
        
    },
    sendRequest: (req, res) => {
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
            to: 'equipo@elijo.org',
            subject: (req.body.affair != '') ? 'Falta mi ' + req.body.affair : 'el usuario no determino que es lo que le falta',
            text: (req.body.request != null || req.body.request != '') ? req.body.request : 'El usuario no adjunto ningun comentario'
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        }); 
        //CAMBIAR ACA
        let mensaje = 'Gracias por ayudarnos a mejorar!'
        db.User.findByPk(req.session.userSession)
        .then( user => {

            return res.render('requestNewInstitution', {user, mensaje});
        })
        .catch(error => {
            return res.send(error);
        })
    },
    confirmUser: (req, res) => {
        db.User.findAll()
        .then(users => {
            for(let i = 0; i < users.length; i++){
                if(bcrypt.compareSync(users[i].id, users[i].password)){
                    let confirmMsg = {
                        msg: 'Gracias por verificar tu cuenta!'
                    }
                    users[i].user_confirm = 1;
                    db.User.update(users[i], {
                        where:{
                            id: users[i].id
                        }
                    })
                    .then(userUpdated => {
                        res.render('login', confirmMsg);
                    })
                    .catch(error => {
                        return res.send(error);
                    })
                }
            }
        })
        res.render('login');
    },
    showQualificationForm: (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.userID
            },
            include: [
                {
                    model: db.Career,
                    as: 'User_careers',
                    through: {
                        model: db.User_career_study
                    },
                    include: [{association: 'Universities'}]
                }, 
                {
                    model: db.Course,
                    as: 'User_courses',
                    through: {
                        model: db.User_course_study
                    },
                    include: [{association: 'Institutes'}]
                }
            ]
        })
        .then(user => {
            res.render('qualificationForm', {user});
        })
        .catch(err => {
            return res.send(err);
        })
    },
    showTipForm: (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.userID
            },
            include: [
                {
                    model: db.Career,
                    as: 'User_careers',
                    through: {
                        model: db.User_career_study
                    },
                    include: [{association: 'Universities'}]
                }, 
                {
                    model: db.Course,
                    as: 'User_courses',
                    through: {
                        model: db.User_course_study
                    },
                    include: [{association: 'Institutes'}]
                }
            ]
        })
        .then(user => {
            //return res.send(user.User_careers);
            res.render('tipForm', {user});
        })
        .catch(err => {
            return res.send(err);
        })
    },
    saveQualification: (req, res) => {
        let toQualify = req.body.toQualify;
        let success = true;
        toQualify = toQualify.split(',');
        
        let data = {
            calification: req.body.qualification,
            opinion: req.body.opinion,
            user_id: req.session.userSession,
            university_id: null,
            institute_id: null,
            career_id: null,
            course_id: null
        }
        switch(toQualify[1]){
            case 'University':
                data.university_id = Number(toQualify[0])
                break;
            case 'Institute':
                data.institute_id = Number(toQualify[0])
                break;
            case 'Career':
                data.career_id = Number(toQualify[0])
                break;
            case 'Course':
                data.course_id = Number(toQualify[0])
                break;
        }

        db.Calification.create(data)
        .then(response => {
            success = true;
            db.User.findOne({
                where: {
                    id: req.params.userID
                },
                include: [
                    {
                        model: db.Career,
                        as: 'User_careers',
                        through: {
                            model: db.User_career_study
                        },
                        include: [{association: 'Universities'}]
                    }, 
                    {
                        model: db.Course,
                        as: 'User_courses',
                        through: {
                            model: db.User_course_study
                        },
                        include: [{association: 'Institutes'}]
                    }
                ]
            })
            .then(user => {
                updateCalification(toQualify[1], Number(toQualify[0]));
                res.render('qualificationForm', {user, success});
            })
        })
        .catch(err => {
            success = false;
            db.User.findOne({
                where: {
                    id: req.params.userID
                },
                include: [
                    {
                        model: db.Career,
                        as: 'User_careers',
                        through: {
                            model: db.User_career_study
                        },
                        include: [{association: 'Universities'}]
                    }, 
                    {
                        model: db.Course,
                        as: 'User_courses',
                        through: {
                            model: db.User_course_study
                        },
                        include: [{association: 'Institutes'}]
                    }
                ]
            })
            .then(user => {
                //return res.send(user.User_careers);
                res.render('qualificationForm', {user, success});
            })
        })

    },
    saveTip: (req, res) => {
        let toQualify = req.body.toQualify;
        let success = true;
        toQualify = toQualify.split(',');
        
        let data = {
            tip: req.body.tip,
            user_id: req.session.userSession,
            university_id: null,
            institute_id: null,
            career_id: null,
            course_id: null
        }
        switch(toQualify[1]){
            case 'University':
                data.university_id = Number(toQualify[0])
                break;
            case 'Institute':
                data.institute_id = Number(toQualify[0])
                break;
            case 'Career':
                data.career_id = Number(toQualify[0])
                break;
            case 'Course':
                data.course_id = Number(toQualify[0])
                break;
        }

        db.Tip.create(data)
        .then(response => {
            success = true;
            db.User.findOne({
                where: {
                    id: req.params.userID
                },
                include: [
                    {
                        model: db.Career,
                        as: 'User_careers',
                        through: {
                            model: db.User_career_study
                        },
                        include: [{association: 'Universities'}]
                    }, 
                    {
                        model: db.Course,
                        as: 'User_courses',
                        through: {
                            model: db.User_course_study
                        },
                        include: [{association: 'Institutes'}]
                    }
                ]
            })
            .then(user => {
                res.render('tipForm', {user, success});
            })
        })
        .catch(err => {
            success = false;
            db.User.findOne({
                where: {
                    id: req.params.userID
                },
                include: [
                    {
                        model: db.Career,
                        as: 'User_careers',
                        through: {
                            model: db.User_career_study
                        },
                        include: [{association: 'Universities'}]
                    }, 
                    {
                        model: db.Course,
                        as: 'User_courses',
                        through: {
                            model: db.User_course_study
                        },
                        include: [{association: 'Institutes'}]
                    }
                ]
            })
            .then(user => {
                //return res.send(user.User_careers);
                res.render('tipForm', {user, success});
            })
        })
    },
    showStatsForm: (req, res) => {
        db.User.findOne({
            where: {
                id: req.params.userID
            },
            include: [
                {
                    model: db.Career,
                    as: 'User_careers',
                    through: {
                        model: db.User_career_study
                    }
                }, 
                {
                    model: db.Course,
                    as: 'User_courses',
                    through: {
                        model: db.User_course_study
                    }
                }
            ]
        })
        .then(user => {
            //return res.send(user.User_careers);
            res.render('statsForm', {user});
        })
        .catch(err => {
            return res.send(err);
        })
    },
    saveStats: (req, res) => {
        let toAddStats = req.body.toAddStats;
        console.log(toAddStats);
        let success = true;
        toAddStats = toAddStats.split(',');

        if(toAddStats[1] == 'Career'){
            let data = {
                career_id: toAddStats[0],
                difficulty_amount: req.body.difficulty,
                job_exit_amount: req.body.job_exit,
                study_hours_amount: req.body.study_hours
            }
            db.Career_stat.create(data)
            .then(response => {
                db.User.findOne({
                    where: {
                        id: req.params.userID
                    },
                    include: [
                        {
                            model: db.Career,
                            as: 'User_careers',
                            through: {
                                model: db.User_career_study
                            },
                            include: [{association: 'Universities'}]
                        }, 
                        {
                            model: db.Course,
                            as: 'User_courses',
                            through: {
                                model: db.User_course_study
                            },
                            include: [{association: 'Institutes'}]
                        }
                    ]
                })
                .then(user => {
                    updateStats(toAddStats[0], toAddStats[1]);
                    res.render('statsForm', {user, success});
                })
            })
        }else{
            let data = {
                course_id: toAddStats[0],
                difficulty_amount: req.body.difficulty,
                job_exit_amount: req.body.job_exit,
                study_hours_amount: req.body.study_hours
            }
            db.Course_stat.create(data)
            .then(response => {
                db.User.findOne({
                    where: {
                        id: req.params.userID
                    },
                    include: [
                        {
                            model: db.Career,
                            as: 'User_careers',
                            through: {
                                model: db.User_career_study
                            },
                            include: [{association: 'Universities'}]
                        }, 
                        {
                            model: db.Course,
                            as: 'User_courses',
                            through: {
                                model: db.User_course_study
                            },
                            include: [{association: 'Institutes'}]
                        }
                    ]
                })
                .then(user => {
                    updateStats(toAddStats[0], toAddStats[1]);
                    res.render('statsForm', {user, success});
                })
            })
        }
    },
    showAnswerForm: async (req, res) => {
        let user = await db.User.findOne({
            where: {
                id: req.params.userID
            },
            include: [
                {
                    model: db.Career,
                    as: 'User_careers',
                    through: {
                        model: db.User_career_study
                    },
                    include: [{association: 'Universities'}]
                }, 
                {
                    model: db.Course,
                    as: 'User_courses',
                    through: {
                        model: db.User_course_study
                    },
                    include: [{association: 'Institutes'}]
                }
            ]
        })
        .catch(err => {
            return res.send(err);
        })
        let questions = await db.Question.findAll({
            where: {
                state: 0
            },
            include: [
                {association: 'Univeristy'}, 
                {association: 'Career'}, 
                {association: 'Institute'}, 
                {association: 'Course'}
            ]
        })
        .catch(err => {
            return res.send(err);
        })

        let cleanQuestions = [];
        for(let i = 0; i < user.User_careers.length; i++ ){
            for(let j = 0; j < questions.length; j++){
                if(user.User_careers[i].id == questions[j].career_id || user.User_careers[i].Universities.id == questions[j].university_id){
                    cleanQuestions.push(questions[j]);
                }
            }
        }

        for(let i = 0; i < user.User_courses.length; i++ ){
            for(let j = 0; j < questions.length; j++){
                if(user.User_courses[i].id == questions[j].course_id || user.User_courses[i].Institutes.id == questions[j].institute_id){
                    cleanQuestions.push(questions[j]);
                }
            }
        }
        questions = cleanQuestions;
        
        res.render('answersForm', {user, questions});
    },
    uploadAnswer: async (req, res) => {
        let errors = validationResult(req)

        if(errors.isEmpty()){
            db.Answer.create({
                user_id: req.session.userSession,
                text: req.body.answer,
                question_id: req.body.question

            })
            db.Question.update({state:1}, {
                where: {
                    id: req.body.question
                }
            })
            .then(response => {
                res.redirect('/user/account/'+ req.session.userSession);
            })
        } else {
            let user = await db.User.findOne({
                where: {
                    id: req.params.userID
                },
                include: [
                    {
                        model: db.Career,
                        as: 'User_careers',
                        through: {
                            model: db.User_career_study
                        },
                        include: [{association: 'Universities'}]
                    }, 
                    {
                        model: db.Course,
                        as: 'User_courses',
                        through: {
                            model: db.User_course_study
                        },
                        include: [{association: 'Institutes'}]
                    }
                ]
            })
            .catch(err => {
                return res.send(err);
            })

            let questions = await db.Question.findAll({
                where: {
                    state: 0
                }
            })
            .catch(err => {
                return res.send(err);
            })
            res.render('answersForm', {errors:errors.errors, user:user, questions:questions})
        }
        
    },
    saveRegisterWithGoogle: async (req, res) => {

        let googleID = await getGoogleID(req.body.registerData.user_id);
        
        let newUser = {
            email: req.body.registerData.email,
            password: bcrypt.hashSync(req.body.registerData.user_id, 10),
            name: req.body.registerData.name,
            last_name: '',
            age: null, 
            telephone: '',
            experiences: " ",
            province: " ", 
            genre_id: 3, 
            photo: 'user.png',
            rol: 1,
            user_confirm: 0, 
            google_id: bcrypt.hashSync(googleID.payload.sub, 10),
            created_at: new Date,
            updated_at: new Date
        }
        
        db.User.create(newUser)
        .then(function(result){
            req.session.userSession = result.id;            
            return res.status(200).json(result);
        })
        .catch(function(e){
            return res.status(404).json(e);
        })        
    },
    renderCompleteGoogleRegister: (req, res) => {
        res.render('googleExtraInfo');
    },
    saveCompleteGoogleRegister: async (req, res) => {
        let user = await db.User.findOne({where: {id: req.session.userSession}})
        
        user.telephone = req.body.telephone; 
        user.rol = req.body.rol; 

        let userUpdated = await db.User.update({
            telephone: req.body.telephone,
            rol: req.body.rol
        },{
            where: {
                id: user.id
            }
        })
        .catch(function(e){
            return res.send(e);
        })
        
        res.locals.userLoggedIn = {
            id: user.id,
            rol: user.rol
        } 
        res.redirect('/user/account/' + user.id);
    },
    verifyUserWithGoogle: async (req, res) => {
        
        let googleResponse = await googleVerification(req.body.loginData.user_id).catch(err => console.log(err))

        let user = await db.User.findOne({
            where: {
                email: req.body.loginData.email
            }
        })
        .catch(err => {
            return res.status(404).json(null);
        })

        if(user == null) return res.status(404).json(null);

        if(!googleResponse.payload) return res.status(404).json(null);

        if(bcrypt.compareSync(googleResponse.payload.sub, user.google_id)){
            req.session.userSession = user.id;
            res.cookie('Elijo', user.id, {maxAge: 60000*60*24*7*30});
            res.locals.userLoggedIn = {
                id: user.id,
                rol: user.rol
            }
            return res.status(200).json('success');
        }
            
        return res.status(404).json(null);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.cookie('Elijo', '', {maxAge:-1});
        res.redirect('/');
    }
};