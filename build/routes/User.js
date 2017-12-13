"use strict";
exports.__esModule = true;
var express = require("express");
var serviceHandler_1 = require("../core/serviceHandler");
var user_1 = require("../services/user");
var auth_1 = require("../core/auth");
var UserRoute = /** @class */ (function () {
    function UserRoute() {
        this.user = express.Router();
        this.user.get('/login', auth_1["default"].loginRequest, serviceHandler_1["default"](user_1["default"], user_1["default"].login));
    }
    return UserRoute;
}());
exports["default"] = new UserRoute().user;
