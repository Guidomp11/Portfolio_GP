const db = require('../database/models');

async function createLocals(req, res, next) {
    if(req.session.userSession != undefined) {
        let user = await db.User.findByPk(req.session.userSession)
        if(user) {
            res.locals.userLoggedIn = {
                id: user.id,
                rol: user.rol
            }
        }
    }
    next()
}

module.exports = createLocals;