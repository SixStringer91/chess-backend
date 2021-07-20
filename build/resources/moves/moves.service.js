"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReplay = exports.getAll = void 0;
const moves_schemas_1 = require("./moves.schemas");
const getAll = async () => moves_schemas_1.Moves.find({});
exports.getAll = getAll;
const addReplay = async (body) => moves_schemas_1.Moves.create(body);
exports.addReplay = addReplay;
//# sourceMappingURL=moves.service.js.map