const db = require('../database/models');

function hasCookie (req, res, next){
    if (req.cookies.userId != undefined && req.session.userSession == undefined){
        db.User.findByPk(req.cookies.userId)
        .then(function(usuario){
            if(req.cookies.userId == usuario.id){
                req.session.userSession = usuario.id;
            }
        })
    }

    next()
}

module.exports = hasCookie;