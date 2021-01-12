const db = require('../database/models');

function hasCookie (req, res, next){
    if (req.cookies.Elijo != undefined && req.session.userSession == undefined){
        db.User.findByPk(req.cookies.Elijo)
        .then(function(usuario){
            if(req.cookies.Elijo == usuario.id){
                req.session.userSession = usuario.id;
            }
        })
    }

    next()
}

module.exports = hasCookie;