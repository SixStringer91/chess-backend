"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unhandledRejectionLogger = exports.uncaughtExceptionLogger = exports.loggerErrors = exports.logerRequests = void 0;
const winston_1 = require("winston");
const stream_1 = require("stream");
const logger = winston_1.createLogger({
    level: 'silly',
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.cli()),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({
            filename: 'error.log',
            level: 'error',
            format: winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.json())
        }),
        new winston_1.transports.File({
            filename: 'info.log',
            level: 'info',
            format: winston_1.format.combine(winston_1.format.uncolorize(), winston_1.format.json())
        })
    ]
});
const logerRequests = (req, res, next) => {
    const { method, url } = req;
    const body = JSON.stringify(req.body);
    const query = JSON.stringify(req.query);
    const start = Date.now();
    next();
    stream_1.finished(res, () => {
        const ms = Date.now() - start;
        const { statusCode } = res;
        logger.info(`\n METHOD: ${method}\n URL: ${url} \n STATUS: ${statusCode} \n QUERY: ${query} \n BODY: ${body} \n TIME: ${ms}`);
    });
};
exports.logerRequests = logerRequests;
const loggerErrors = (statusCode, message) => {
    logger.warn(`\n CODE: ${statusCode}\n MESSAGE: ${message}`);
};
exports.loggerErrors = loggerErrors;
const uncaughtExceptionLogger = (error, origin) => {
    logger.error(`${error} origin ${origin}`);
};
exports.uncaughtExceptionLogger = uncaughtExceptionLogger;
const unhandledRejectionLogger = (message) => {
    logger.error(`Unhandled rejection detected: ${message}`);
};
exports.unhandledRejectionLogger = unhandledRejectionLogger;
//# sourceMappingURL=logger.js.map