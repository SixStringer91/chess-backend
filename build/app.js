"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
const cors_1 = __importDefault(require("cors"));
const moves_controller_1 = __importDefault(require("./resources/moves/moves.controller"));
const websocket_controller_1 = require("./middleware/websocket/websocket.controller");
const error_handler_1 = require("./middleware/errors/error.handler");
const logger_1 = require("./middleware/loger/logger");
const appBase = express_1.default();
const wsInstance = express_ws_1.default(appBase);
const { app } = wsInstance;
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(logger_1.logerRequests);
app.use('/replays', moves_controller_1.default);
app.ws('/echo', websocket_controller_1.websocketHandler);
app.use((err, _req, res, next) => {
    error_handler_1.handleError(err, res);
    next();
});
process.on('uncaughtException', error_handler_1.uncaughtException);
process.on('unhandledRejection', error_handler_1.unhandledRejection);
exports.default = app;
//# sourceMappingURL=app.js.map