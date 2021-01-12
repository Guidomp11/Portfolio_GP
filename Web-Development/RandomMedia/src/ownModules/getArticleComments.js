const db = require('../database/models');

async function getArticleComments(articleId){
    console.log(articleId);
    let comments = await db.Comment.findAll({
        where: {
            article_id: articleId
        },
        
        include: [ 
            {association: 'user'}
        ],
        order: [['createdAt', 'DESC']]
    })
    .catch(err => {
        return err;
    })
    if(comments == null){
        return null;
    }else{
        return comments;
    }
}

module.exports = getArticleComments;