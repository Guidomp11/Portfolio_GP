const db = require('../database/models');
const askCategories = require('../ownModules/askCategories');
const bcrypt = require('bcryptjs');
const {check, validationResult, body} = require('express-validator');
const fs = require('fs');

module.exports = {
    home: async (req, res) => {
        let categories = await db.Category.findAll({
            include: [{association: 'sub_category'}]
        })
        res.render('adminHome', {categories});
    },
    showUsers: async (req, res) => {
        let categories = await db.Category.findAll({
            include: [{association: 'sub_category'}]
        })
        let users = await db.User.findAll({
            include: [{
                model: db.Category,
                as: 'categories',
                through: {
                    model: db.User_category
                }
            }]
        })
        res.render('admin', {users, categories});
    },
    iframeForm: async (req, res) => {
        let categories = await db.Category.findAll({
            include: [{association: 'sub_category'}]
        })
        res.render('iframeForm', {categories});
    },
    addIframe: async (req, res) => {
        let newIframe = await db.Iframe.create({
            iframe: req.body.Iframe
        })
        res.redirect('/admin/');
    },
    registerNewAdmin: async (req, res) => {
        let categories = await db.Category.findAll({
            include: [{association: 'sub_category'}]
        })
        res.render('adminRegister', {categories});
    },
    addNewAdmin: async (req, res) => {
        let user = await db.User.create({
            rol: 1,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            image: (req.files[0] == undefined) ? '/images/users/defaultUser.png'  : req.files[0].filename,
            created_at: Date.now(),
            updated_at: Date.now()
        })
        .catch((error) => {
            return res.send(error);
        });

        res.redirect('/admin/');
    },
    showVideos: async (req, res) => {
        let categories = await db.Category.findAll({
            include: [{association: 'sub_category'}]
        })
        res.render('pageVideos', {categories});
    },
    removeVideo: async (req, res) => {
        let videoRemoved = await db.Iframe.destroy({
            where: {
                id: req.params.videoID
            }
        })
        res.redirect('/admin/');
    },
    deleteArticle: (req, res) => {

        db.Article.findOne({
            where: {
                id: req.params.articleID
            }
        })
        .then(article => {
            let imagePath;
            if(article.cover_image != null && article.cover_image != ''){
                imagePath = ('public/images/articles/' + article.cover_image);
                fs.unlink(imagePath, (err) => {
                    if (err) throw err;
                    console.log(`${imagePath + article.cover_image} fue eliminado con éxito`);
                });
            }
            

            
            db.Article_sub_category.destroy({
                where:{
                    article_id: req.params.articleID
                }
            })
            .then(response => {

                db.Article_tag.destroy({
                    where: {
                        article_id: req.params.articleID
                    }
                })
                .then(article_tag_response => {
                    db.Article.destroy({
                        where:{
                            id: req.params.articleID
                        }
                    })
                    .then(response => {
                        res.redirect('/');
                    })
                    .catch(error => {
                        return res.send(error);
                    })
                })  
                .catch(error => {
                    return res.send(error);
                })              
            })
            .catch(error => {
                return res.send(error);
            })
        })
    }
}