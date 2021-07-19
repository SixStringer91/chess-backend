"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moves_service_1 = require("./moves.service");
const router = express_1.default.Router({ mergeParams: true });
router.get('/test', async (_req, res) => {
    const model = await moves_service_1.createTest();
    res.send(model);
});
exports.default = router;
//# sourceMappingURL=moves.controller.js.map