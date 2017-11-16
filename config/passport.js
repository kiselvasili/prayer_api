let passport = require('passport');
let User = require('../app/models/user');
let config = require('./auth');
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
let LocalStrategy = require('passport-local').Strategy;

let localOptions = {
    usernameField: 'email'
};

let localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({
        email: email
    }, (err, user) => {
        if(err) {
            return done(null, err);
        }
        if(!user) {
            return done(null, false, {error: 'Login failed. Please try again.'});
        }

        user.comparePassword(password, (err, isMatch) => {
            if(err) {
                return done(err);
            }
            if(!isMatch) {
                return done(null, false, {error: 'Login failed. Please try again'});
            }
            return done(null, user);
        });
    });
});

let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
};

let jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    user.findById(paiload._id, (err, user) => {
        if(err) {
            return done(err, false);
        }
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);