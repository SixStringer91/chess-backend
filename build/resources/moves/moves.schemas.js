"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.Moves = exports.MovesSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enums_1 = require("../../enums/enums");
const figureMoves = {
    prevPosition: [Number, Number],
    position: [Number, Number],
    time: Number,
    color: String,
    type: String
};
exports.MovesSchema = new mongoose_1.default.Schema({
    [enums_1.FigureColor.BLACK]: { name: String, moves: [figureMoves] },
    [enums_1.FigureColor.WHITE]: { name: String, moves: [figureMoves] }
}, { typeKey: '$type' });
exports.Moves = mongoose_1.default.model('Moves', exports.MovesSchema);
const create = () => exports.Moves
    .create({
    [enums_1.FigureColor.BLACK]: {
        name: 'Player 1',
        moves: [
            {
                prevPosition: [0, 1],
                position: [1, 1],
                time: 2002020,
                color: enums_1.FigureColor.BLACK,
                type: enums_1.ChessFigures.HORSE
            }
        ]
    },
    [enums_1.FigureColor.WHITE]: {
        name: 'Player 2',
        moves: [
            {
                prevPosition: [0, 1],
                position: [1, 1],
                time: 2002020,
                color: enums_1.FigureColor.WHITE,
                type: enums_1.ChessFigures.ROOK
            }
        ]
    }
});
exports.create = create;
//# sourceMappingURL=moves.schemas.js.map