const db = require('../database/models');
const askCategories = require('../ownModules/askCategories');

module.exports = {
    sendCategories: async (req, res) => {
        let categories = await askCategories();
        return res.status(200).json(categories);     
    },
    sendIframes: async (req, res) => {
        let iframes = await db.Iframe.findAll()
        .catch(error => {
            return res.status(404).json(error)
        })
        return res.status(200).json(iframes);
    },
    viewArticle: async (req, res) => {
        let article = await db.Article.findOne({
            where: {
                id: req.params.articleId
            },
            include: [{association: 'user'}]
        });
        let articleUpdated = await db.Article.update({
            view: article.view + 1
        },{
            where: {   
                id: req.params.articleId 
            }
        })
        return res.status(200).json(article)
    },
    showPosts: async (req, res) => {
        let articles = await db.Article.findAll({
            include: [{
                model: db.Sub_category,
                as: 'article_subcategories',
                through: {
                  model: db.Article_sub_category
                },
                where: {
                    link: req.params.subcategory
                }
            }],
            order: [['createdAt', 'DESC']]
        })

        return res.status(200).json(articles)
    },
    getTags: async (req, res) => {
        let tags = await db.Tag.findAll();
        return res.status(200).json(tags);
    },
    testing: async (req,res) => {
        
        let test = await db.Article.findOne({
            include: [{
                model: db.Tag,
                as: 'article_tag',
                through: {
                  model: db.Article_tag
                }
            }]
        })
        .catch(error => {
            return res.status(404).json(error);    
        })
        return res.status(200).json(test);
    }
}