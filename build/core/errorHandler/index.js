"use strict";
exports.__esModule = true;
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    ErrorHandler.prototype.handleError = function (error, res, code) {
        if (error instanceof Error) {
            if (!code) {
                this.errorCode = 500;
            }
            return res.status(this.errorCode).send(error.message);
        }
    };
    return ErrorHandler;
}());
exports.handleError = new ErrorHandler().handleError;
