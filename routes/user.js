const express = require('express');

const router = express.Router();

const userContoller = require('../controllers/user')

router.get('/', userContoller.getIndex);

router.get('/blogs', userContoller.getBlogs)

router.get('/favourites', userContoller.getFavourites)

module.exports= router

