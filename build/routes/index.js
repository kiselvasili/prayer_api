"use strict";
exports.__esModule = true;
var express = require("express");
var Auth_1 = require("./Auth");
var User_1 = require("./User");
var BaseRoute = /** @class */ (function () {
    function BaseRoute() {
        this.router = express.Router();
        this.router.use('/auth', Auth_1["default"]);
        this.router.use('/user', User_1["default"]);
    }
    return BaseRoute;
}());
exports["default"] = new BaseRoute().router;
