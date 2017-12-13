"use strict";
exports.__esModule = true;
var index_1 = require("./../errorHandler/index");
var passport = require("passport");
var passport_jwt_1 = require("passport-jwt");
var passport_facebook_1 = require("passport-facebook");
var User_1 = require("../../db/models/User");
// import { handleError } from '../errorHandler';
// import * as User from '../../app/models/user';
var Auth = /** @class */ (function () {
    function Auth() {
        this.configuration();
    }
    Auth.prototype.configuration = function () {
        var jwtOpts = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'helloKostya'
        };
        var facebookOpts = {
            clientID: '2715098495442284',
            clientSecret: '2c23575238242597d931d398c3286fbe',
            callbackURL: 'http://localhost:8080/api/auth/facebook/callback'
            // profileURL    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
            // profileFields : ['id', 'email', 'name']
        };
        passport.use(new passport_jwt_1.Strategy(jwtOpts, function (jwt_payload, done) {
            User_1["default"].findOne({ _id: jwt_payload.id })
                .then(function (user) {
                console.log('--------------------------', user);
                if (!user) {
                    var err = new Error('in passport');
                    return done(err, false);
                }
                done(null, user);
            });
        }));
        passport.use('authenticate', new passport_jwt_1.Strategy(jwtOpts, function (jwt_payload, done) {
            done(null, jwt_payload);
        }));
        passport.use(new passport_facebook_1.Strategy(facebookOpts, function (token, refreshToken, profile, done) {
            User_1["default"].findOne({ 'facebook_id': profile.id }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, user);
                }
                else {
                    var newUser = new User_1["default"]();
                    newUser.facebook_id = profile.id;
                    newUser.save(function (err, user) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }
            });
        }));
    };
    Auth.prototype.authenticateRequest = function (req, res, next) {
        passport.authenticate('authenticate', { session: false }, function (err, user) {
            if (err) {
                return next(err);
            }
            req.user = user;
            next();
        })(req, res, next);
    };
    Auth.loginFacebookRequest = function (req, res, next) {
        passport.authenticate('facebook', { session: false }, function (err, user) {
            if (err) {
                return next(err);
            }
            req.user = user;
            next();
        })(req, res, next);
    };
    Auth.authorizeRequest = function () {
        return function (req, res, next) {
            console.log('req.user', req.user);
            if (!req.user) {
                console.log('error');
                return index_1.handleError(new Error('error'), res);
            }
            next();
        };
    };
    Auth.loginRequest = function (req, res, next) {
        passport.authenticate('jwt', { session: false }, function (err, user) {
            console.log('------------------------ddfd', user);
            if (user) {
                req.user = user;
            }
            next();
        })(req, res, next);
    };
    Auth.prototype.init = function (app) {
        app.use(passport.initialize());
        app.use(this.authenticateRequest);
    };
    return Auth;
}());
exports["default"] = Auth;
