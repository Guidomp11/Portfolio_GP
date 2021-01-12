const db = require('../database/models');

function isAdmin(req, res, next){
    if(req.session.userSession == undefined){
        res.redirect('/user/login')
    } else {
        db.User.findByPk(req.session.userSession)
        .then(user => {
            if(user.rol == 1 || user.rol == '1'){
                next();
            }else{
                return res.redirect('/user/login');
            }
        })
        
    }
}

module.exports = isAdmin;