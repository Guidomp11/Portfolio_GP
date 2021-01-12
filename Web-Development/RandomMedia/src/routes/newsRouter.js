const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const newsController = require('../controllers/newsController');


let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/articles'));
    },
    filename: function(req, file, cb){
        cb(null, 'image' + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({storage:storage});


router.get('/create', newsController.createArticle);
router.post('/publish', upload.any(), newsController.publish);
router.get('/article/:articleId', newsController.viewArticle);

router.get('/:sub_category', newsController.showPosts);

router.post('/comment/:articleId', newsController.createComment);

module.exports = router;