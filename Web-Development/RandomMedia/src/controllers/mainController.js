const db = require('../database/models');
const { Op } = require("sequelize");
const nodemailer = require('nodemailer');
const askCategories = require('../ownModules/askCategories');



module.exports = {
    home: async (req, res) => {
        let categories = await askCategories();

        //const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
        const oneMonth = new Date(new Date().setDate(new Date().getDate() - 30));

        let topArticles = await db.Article.findAll({
            where:{
                created_at:{
                    [Op.gte]: oneMonth
                }
            },
            limit: 3,
            order: [['view', 'DESC']]
        });
        
        let lastestArticles = await db.Article.findAll({
            limit: 3,
            order: [['createdAt', 'DESC']]
        })
        
        res.render('home', {topArticles, lastestArticles, categories});
    },
    aboutUS: (req, res) => {
        db.Category.findAll({
            include: [{association: 'sub_category'}]
        })
        .then(categories => {
            db.User.findAll({
                where: {
                    rol: 1
                }
            })
            .then(journalists => {
                return res.render('aboutUS', {categories, journalists})
            })
            .catch(err => {
                return res.send(err);
            })
        })
        .catch(error => {
            return res.send(error);
        })
    },
    contact: async (req, res) => {
        let categories = await askCategories();
        res.render('contact', {categories});
    },
    sendMessage: async (req, res) => {
        let categories = await askCategories();        
        let success = true;

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
            subject: 'Contacto',
            text: req.body.message           
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                success = false;
                return res.render('contact', {categories, success});
            } else {
                success = true;
                return res.render('contact', {categories, success});
            }
        }); 
    },
    searchArticle: async (req, res) => {
        let categories = await askCategories();        
        let articles = await db.Article.findAll({
            where: {
                title: {
                    [Op.like]: '%' + req.query.articleTitle + '%'
                }
            }
        });

        if(articles.length > 0){
            return res.render('advanceSearch', {articles, categories});
        }else{
            return res.render('advanceSearch', {categories});
        }
    },
    searchByTag: async (req, res) => {
        let categories = await askCategories();        
        let articles = await db.Article.findAll({
            include: [{
                model: db.Tag,
                as: 'article_tag',
                through: {
                  model: db.Article_tag
                },
                where: {
                    tag: {
                        [Op.like]: '%' + req.query.articleTag + '%'
                    }
                }
            }]
        });

        if(articles.length > 0){
            return res.render('advanceSearch', {articles, categories});
        }else{
            return res.render('advanceSearch', {categories});
        }
    }
}