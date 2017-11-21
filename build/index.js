"use strict";
exports.__esModule = true;
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
var databaseConfig = require("../config/database");
var api = require("../app/routes");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        mongoose.connect(databaseConfig.url);
        this.initConfig();
        this.start();
    }
    Server.prototype.initConfig = function () {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use('/api', api);
    };
    Server.prototype.start = function () {
        this.app.listen(process.env.PORT || 8080);
        console.log('App listening on port 8080');
    };
    return Server;
}());
exports["default"] = new Server().app;
