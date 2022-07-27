const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin')

router.get('/blogs', adminController.getBlogs )

router.get('/add-blog', adminController.getAddBlogs)

module.exports = router