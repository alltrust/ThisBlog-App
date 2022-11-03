const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')

router.get('/add-blog', adminController.getAddBlogs)
router.get('/blogs', adminController.getBlogs )
router.post('/add-blog', adminController.postAddBlogs)
router.get('/edit-blog/:blogId', adminController.getEditBlogs)
router.post('/edit-blog', adminController.postEditBlogs)
router.post('/delete-item', adminController.postDeleteBlog)

module.exports = router