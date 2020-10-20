const express = require('express');
const router = express.Router();
const account = require('./controllers/account.js');
const jwtHelper = require("./config/jwtHelper.js");

router.post('/register' ,account.register),
router.get('/users',jwtHelper.verifyUser,account.list),
router.get('/admins',account.listAdmin)
router.get('/profile',jwtHelper.verifyUser,account.prifile)
module.exports = router;