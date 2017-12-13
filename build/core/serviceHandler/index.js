"use strict";
exports.__esModule = true;
var Promise = require("bluebird");
var errorHandler_1 = require("../errorHandler");
var ServiceHandler = /** @class */ (function () {
    function ServiceHandler() {
        this.handleRequest = function (Service, cb) {
            return function (req, res) {
                var result = cb(req);
                result
                    .then(function (response) {
                    console.log('response', response);
                    res.send(response || {});
                })["catch"](function (err) {
                    return Promise.reject(errorHandler_1.handleError(err, res));
                });
            };
        };
    }
    return ServiceHandler;
}());
exports["default"] = new ServiceHandler().handleRequest;
