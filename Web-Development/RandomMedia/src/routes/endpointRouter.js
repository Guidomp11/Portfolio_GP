const express = require('express');
const router = express.Router();
const endpointController = require('../controllers/endpointsController');

router.get('/categories', endpointController.sendCategories);
router.get('/iframes', endpointController.sendIframes);
router.get('/news/article/:articleId', endpointController.viewArticle);
router.get('/news/:subcategory', endpointController.showPosts);
router.get('/tags', endpointController.getTags);
router.get('/test', endpointController.testing);

module.exports = router;