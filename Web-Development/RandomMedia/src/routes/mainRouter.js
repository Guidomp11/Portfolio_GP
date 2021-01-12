const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.get('/aboutUS', mainController.aboutUS);
router.get('/contact', mainController.contact);
router.post('/contact', mainController.sendMessage);
router.get('/searchArticle?', mainController.searchArticle);
router.get('/searchArticleByTag?', mainController.searchByTag);

module.exports = router;