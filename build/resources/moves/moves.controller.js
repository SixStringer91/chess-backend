"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_handler_1 = require("../../middleware/errors/error.handler");
const moves_service_1 = require("./moves.service");
const router = express_1.default.Router({ mergeParams: true });
router.get('/', async (_req, res, next) => {
    const model = await moves_service_1.getAll();
    if (model) {
        res.send(model);
    }
    else
        next(new error_handler_1.ErrorHandler(404));
});
router.post('/', async (req, res, next) => {
    const replay = await moves_service_1.addReplay(req.body);
    if (replay)
        res.send(replay);
    else
        next(new error_handler_1.ErrorHandler(404));
});
exports.default = router;
//# sourceMappingURL=moves.controller.js.map