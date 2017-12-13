"use strict";
exports.__esModule = true;
var Promise = require("bluebird");
var jwt = require("jsonwebtoken");
var User_1 = require("../db/models/User");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.register = function (req) {
        var email = req.body.email;
        var password = req.body.password;
        if (!email) {
            return Promise.reject(new Error('You must enter an email address'));
        }
        if (!password) {
            return Promise.reject(new Error('You must enter a password'));
        }
        return User_1["default"].findOne({ email: email })
            .then(function (err, user) {
            console.log('user', user);
            if (err) {
                return Promise.reject(new Error('Finding error'));
            }
            if (user) {
                return Promise.reject(new Error('That email address is already in use'));
            }
            var newUser = new User_1["default"]({
                email: email,
                password: password
            });
            console.log('newUser', newUser);
            return newUser.save()
                .then(function (user) {
                return;
                // let token = jwt.sign(JSON.stringify({
                //     id: user._id
                // }), 'helloKostya');
                // console.log('token', token);
                // return {
                //     token: 'Bearer ' + token
                // };
            });
        });
    };
    AuthService.authorize = function (req) {
        var email = req.body.email;
        var password = req.body.password;
        return User_1["default"].findOne({ email: email })
            .then(function (user) {
            if (!user || user.password !== password) {
                return Promise.reject(new Error('error'));
            }
            var token = jwt.sign(JSON.stringify({
                id: user._id
            }), 'helloKostya');
            return {
                token: 'Bearer ' + token
            };
        });
    };
    // static authorizeFacebook(req) {
    //     let token = jwt.sign(JSON.stringify({
    //         id: req.user._id
    //     }), 'helloKostya');
    //     return Promise.resolve({
    //         token: 'Bearer ' + token
    //     });
    // }
    AuthService.authorizeFacebook = function (req) {
        var facebookID = req.body.id;
        if (!facebookID) {
            return Promise.reject(new Error('error'));
        }
        return User_1["default"].findOne({ facebook_id: facebookID })
            .then(function (user) {
            if (user) {
                var token = jwt.sign(JSON.stringify({
                    id: user._id
                }), 'helloKostya');
                return Promise.resolve({
                    token: 'Bearer ' + token
                });
            }
            else {
                var newUser = new User_1["default"]();
                newUser.facebook_id = facebookID;
                return newUser.save()
                    .then(function (user) {
                    // if (err) {
                    //     return Promise.reject(new Error('error'));
                    // }
                    var token = jwt.sign(JSON.stringify({
                        id: user._id
                    }), 'helloKostya');
                    return Promise.resolve({
                        token: 'Bearer ' + token
                    });
                });
            }
        });
    };
    return AuthService;
}());
exports["default"] = AuthService;
