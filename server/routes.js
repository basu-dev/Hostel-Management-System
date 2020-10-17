const express = require('express');
const router = express.Router();
const account = require('./controllers/account.js');

router.post('/register' ,account.register),
module.exports = router;