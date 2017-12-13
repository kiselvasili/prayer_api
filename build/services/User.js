"use strict";
exports.__esModule = true;
var Promise = require("bluebird");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.login = function (req) {
        var params = req.user;
        var user = {
            id: params._id
        };
        console.log('login', user);
        return Promise.resolve(user);
    };
    UserService.loginFacebook = function (req) {
        var params = req.user;
        console.log('facebook login');
        console.log(params);
        return Promise.resolve(params);
    };
    return UserService;
}());
exports["default"] = UserService;
