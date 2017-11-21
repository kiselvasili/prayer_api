let express = require('express');
let router = express.Router();
let passport = require('passport');
let AuthenticationController = require('../../controllers/authentication');

let requireAuth= passport.authenticate('jwt', {session: false});
let requireLogin = passport.authenticate('local', {session: false});

router.post('/register', AuthenticationController.register);
router.post('/login', AuthenticationController.login);

module.exports = router;