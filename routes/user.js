const express = require('express');

const router = express.Router();

const userContoller = require('../controllers/user')

router.get('/', userContoller.getIndex);

module.exports= router

