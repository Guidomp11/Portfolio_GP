const db = require('../database/models');

function hasAccces(req, res, next){
    if(req.session.userSession == undefined){
        res.redirect('/user/login')
    } else {
        next()
    }
}

module.exports = hasAccces;