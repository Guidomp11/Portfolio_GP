const express = require('express');
const router = express.Router();
const multer = require('multer');
const isAdmin = require('../middlewares/isAdmin');
const adminController = require('../controllers/adminController');

let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/users'));
    },
    filename: function(req, file, cb){
        cb(null, req.body.email + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({storage:storage});

router.get('/', isAdmin, adminController.home);
router.get('/users', isAdmin, adminController.showUsers);

router.get('/addVideo', isAdmin, adminController.iframeForm);
router.post('/addVideo', isAdmin, adminController.addIframe);

router.get('/addAdmin', isAdmin, adminController.registerNewAdmin);
router.post('/addAdmin', isAdmin, upload.any(), adminController.addNewAdmin);

router.get('/videos', isAdmin, adminController.showVideos);
router.get('/removeVideo/:videoID', isAdmin, adminController.removeVideo);

router.delete('/article/delete/:articleID', isAdmin, adminController.deleteArticle);

module.exports = router;