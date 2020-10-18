const express = require('express');
const router = express.Router();
const account = require('./controllers/account.js');
const jwtHelper = require("./config/jwtHelper.js");

router.post('/register' ,account.register),
router.get('/users',jwtHelper.verifyToken,account.list)
module.exports = router;