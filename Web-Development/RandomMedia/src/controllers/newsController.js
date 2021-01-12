const db = require('../database/models');
const getArticleComments = require('../ownModules/getArticleComments');
const askCategories = require('../ownModules/askCategories');

module.exports = {
    createArticle: async (req, res) => {
        let categories = await askCategories();
        
        res.render('createArticle', {categories});
    },
    publish: async (req, res) => {
        
        let article = await db.Article.create({
            title: req.body.title,
            sub_title: req.body.sub_title,
            content: req.body.editor,
            synopsis: req.body.synopsis,
            user_id: req.session.userSession,
            view: 0,
            cover_image: (req.files[0] == undefined) ? ''  : req.files[0].filename,
        })
        .catch(error => {
            return res.send(error);
        })

        if(Array.isArray(req.body.sub_category)){
            for(let i = 0; i < req.body.sub_category.length; i++){
                let article_sub_category = await db.Article_sub_category.create({
                    article_id: article.id,
                    sub_category_id: req.body.sub_category[i]
                });
            }
        }else{
            let article_sub_category = await db.Article_sub_category.create({
                article_id: article.id,
                sub_category_id: req.body.sub_category
            });
        }

        let tags = await db.Tag.findAll();

        let tags_name = tags.map(tag => {
            return tag.tag
        })
        
        if(req.body.tags){
            if(Array.isArray(req.body.tags)){

                for(let i = 0; i < req.body.tags.length; i++){

                    if(tags_name.length == 0 || !tags_name.includes(req.body.tags[i])){
                        await db.Tag.create({
                            tag: req.body.tags[i]
                        })
                    }

                    let tag_id = await db.Tag.findOne({
                        where: {tag: req.body.tags[i]}
                    })

                    let article_tag = await db.Article_tag.create({
                        article_id: article.id,
                        tag_id: tag_id.id
                    })
                    .catch(error => {
                        console.log(error);
                    })
                }

            }else{

                if(tags_name.length == 0 || !tags_name.includes(req.body.tags)){
                    await db.Tag.create({
                        tag: req.body.tags
                    })
                }

                let tag_id = await db.Tag.findOne({
                    where: {tag: req.body.tags}
                })

                let article_tag = await db.Article_tag.create({
                    article_id: article.id,
                    tag_id: tag_id.id
                })
                .catch(error => {
                    console.log(error);
                })
            }
        }
        
        res.redirect('/news/article/' + article.id);
    },
    viewArticle: async (req, res) => {
        let categories = await askCategories();
        let article = await db.Article.findOne({
            where: {
                id: req.params.articleId
            },
            include: [{association: 'user'}, {
                model: db.Tag,
                as: 'article_tag',
                through: {
                  model: db.Article_tag
                }
            },{
                model: db.Sub_category,
                as: 'article_subcategories',
                through: {
                  model: db.Article_sub_category
                }
            }]
        });
        let comments = await getArticleComments(article.id);
        let user = await db.User.findByPk(req.session.userSession);
        
        let articleUpdated = await db.Article.update({
            view: article.view + 1
        },{
            where: {   
                id: req.params.articleId 
            }
        })
        
        let topArticles = await db.Article.findAll({
            include: [{
                model: db.Sub_category,
                as: 'article_subcategories',
                through: {
                  model: db.Article_sub_category
                },
                where: {
                    category_id: article.article_subcategories[0].category_id
                }
            }],
            limit: 3,
            order: [['view', 'DESC']]
        });
        
        if(user){
            return res.render('article', {article, categories, comments, user, topArticles}); 
        }else{
            return res.render('article', {article, categories, comments, topArticles}); 
        
        }
    },
    showPosts: async (req, res) => {
        let categories = await askCategories();
        
        let posts = await db.Sub_category.findAll({
            where:{
                link: req.params.sub_category
            },
            include: [{association: 'category'}, {
                model: db.Article,
                as: 'subcategories_article',
                through: {
                  model: db.Article_sub_category
                }
            }]            
        })
        .catch(error => {
            console.log('error', error);
        })

        if(posts[0].subcategories_article.length > 0){
            res.render('posts', {posts, categories});      
        }else{
            res.render('posts', {categories});        
        }
        
    },
    createComment: (req, res) => {
        db.Comment.create({
            comment: req.body.newComment,
            user_id: req.session.userSession,
            article_id: req.params.articleId
        })
        .then(commentCreated => {
            res.redirect('/news/article/'+req.params.articleId);
        })
        .catch(err => {
            return res.send(err);
        });
    }
}