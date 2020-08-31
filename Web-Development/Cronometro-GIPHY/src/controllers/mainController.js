const timeCronometer = require('../externalModules/cronometerFormatter');

module.exports = {
    main: function(req, res){
        res.render('menu');
    },
    cronometer: function(req, res){
        let time = timeCronometer.format(req.body);
        let tag = req.body.tag;
        (typeof tag == 'undefined') ? res.render('cronometer', {time}) : res.render('cronometer', {time, tag}); 
    }
}