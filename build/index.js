"use strict";
exports.__esModule = true;
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
var routes_1 = require("./routes");
var auth_1 = require("./core/auth");
var errorHandler_1 = require("./core/errorHandler");
var databaseConfig = require("../config/database");
// import * as api from '../app/routes';
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        mongoose.connect(databaseConfig.url);
        this.initConfig();
        this.start();
        this.initAuth();
        this.initRoutes();
    }
    Server.prototype.initConfig = function () {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
        this.app.use(cors());
        // this.app.use('/api', api);
    };
    Server.prototype.initAuth = function () {
        new auth_1["default"]().init(this.app);
    };
    Server.prototype.initRoutes = function () {
        this.app.use('/api', routes_1["default"]);
        this.app.use(function (err, req, res, next) {
            if (!next) {
                errorHandler_1.handleError(err, res);
            }
            next(err, req, res);
        });
    };
    Server.prototype.start = function () {
        this.app.listen(process.env.PORT || 8080);
        console.log('App listening on port 8080');
    };
    return Server;
}());
exports["default"] = new Server().app;
