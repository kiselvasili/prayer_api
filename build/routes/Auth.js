"use strict";
exports.__esModule = true;
var express = require("express");
var Auth_1 = require("../services/Auth");
var serviceHandler_1 = require("../core/serviceHandler");
var auth_1 = require("../core/auth");
var AuthRoute = /** @class */ (function () {
    function AuthRoute() {
        this.auth = express.Router();
        // this.auth.get('/facebook', Auth.loginFacebookRequest);
        // this.auth.get('/facebook/callback', Auth.loginFacebookRequest, handleRequest(AuthService, AuthService.authorizeFacebook));
        this.auth.post('/', serviceHandler_1["default"](Auth_1["default"], Auth_1["default"].authorize));
        this.auth.post('/facebook', auth_1["default"].loginRequest, serviceHandler_1["default"](Auth_1["default"], Auth_1["default"].authorizeFacebook));
        this.auth.post('/register', serviceHandler_1["default"](Auth_1["default"], Auth_1["default"].register));
    }
    return AuthRoute;
}());
exports["default"] = new AuthRoute().auth;
