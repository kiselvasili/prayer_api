let express = require('express');
let passportService = require('../../config/passport');
let passport = require('passport');

let auth = require('./auth');

let router = express.Router();

// Auth Routes
router.use('/auth', auth);


module.exports = router;