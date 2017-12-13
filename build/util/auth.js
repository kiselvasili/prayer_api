"use strict";
exports.__esModule = true;
// import * as express from 'express';
var passport = require("passport");
var passport_jwt_1 = require("passport-jwt");
// import * as User from '../../app/models/user';
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.prototype.configuration = function () {
        var opts = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretKey: 'helloKostya'
        };
        passport.use(new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
            // User.findOne()
            done(null, jwt_payload);
        }));
        passport.use('authenticate', new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
            done(null, jwt_payload);
        }));
    };
    Auth.prototype.authenticateRequest = function () {
    };
    Auth.prototype.authorizeRequest = function () {
    };
    Auth.prototype.loginRequest = function () {
    };
    Auth.prototype.init = function (app) {
        app.use(passport.initialize());
    };
    return Auth;
}());
exports["default"] = Auth;
