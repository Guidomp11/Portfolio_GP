const fs = require('fs');
const path = require('path');   


module.exports = {
    home: function(req, res){
        res.render('home');
    },
    meet: function(req, res){
        res.render('meet')
    },
    detail: function(req, res, next) {
        res.render('detail')
    },
    why : function(req, res){
        res.render('why')
    },
    posta: function(req, res) {
        res.render('posta')
    }
};