"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
const moves_controller_1 = __importDefault(require("./resources/moves/moves.controller"));
const websocket_controller_1 = require("./middleware/websocket/websocket.controller");
const appBase = express_1.default();
const wsInstance = express_ws_1.default(appBase);
const { app } = wsInstance;
app.use('/replays', moves_controller_1.default);
app.ws('/echo', websocket_controller_1.websocketHandler);
exports.default = app;
//# sourceMappingURL=app.js.map