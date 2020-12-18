const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    //leer token
    const token = req.header('x-auth-token');

    //revisar token
    if(!token){
        return res.status(401).json({msg: 'No hay token, permiso no valido'});
    }

    //validar token
    try{
        const cifrado = jwt.verify(token, 'secreto');
        req.user = cifrado.user;
        next();
    }catch(error){
        res.status(401).json({msg:'token no valido'})
    }
}