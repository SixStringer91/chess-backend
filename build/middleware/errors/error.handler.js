"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unhandledRejection = exports.uncaughtException = exports.handleError = exports.ErrorHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("../loger/logger");
const CODE = 500;
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode || CODE;
        if (message) {
            this.message = message;
        }
    }
}
exports.ErrorHandler = ErrorHandler;
const handleError = (err, res) => {
    const { statusCode, message } = err;
    logger_1.loggerErrors(statusCode, message);
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
};
exports.handleError = handleError;
const uncaughtException = (err, origin) => {
    fs_1.default.writeFileSync('./crash-data.log', `Caught exception: ${err}\nException origin: ${origin}`);
    logger_1.uncaughtExceptionLogger(err, origin);
    process.exit(1);
};
exports.uncaughtException = uncaughtException;
const unhandledRejection = (reason) => {
    fs_1.default.writeFileSync('./crash-data.log', `Caught exception: ${reason.message})`);
    logger_1.unhandledRejectionLogger(reason.message);
    process.exit(1);
};
exports.unhandledRejection = unhandledRejection;
//# sourceMappingURL=error.handler.js.map