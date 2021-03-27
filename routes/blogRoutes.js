const express = require('express');
const blogController = require('../controllers/blogController');
//create a routeur to use it instead of app 
const router = express.Router();

router.get('/', blogController.blog_index);
router.get('/blogs/create', blogController.blog_create_get);
router.post('/blogs/create', blogController.blog_create_post);
router.get('/blogs/:id', blogController.blog_details)
router.delete('/blogs/:id', blogController.blog_delete)

module.exports = router;