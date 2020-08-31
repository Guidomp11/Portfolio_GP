const fs = require('fs');
const path = require('path');   

module.exports = {
    account: function(req, res){
        res.render('account');
    },
    register: function(req, res) {
        res.render('register');
    },
    save: function(req, res) {
        res.send('Usuario guardado!!!')
    },
    login: function(req, res) {
        res.render('login')
    }
};