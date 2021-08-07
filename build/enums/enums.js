"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEvents = exports.ChessFigures = exports.FigureColor = void 0;
var FigureColor;
(function (FigureColor) {
    FigureColor["BLACK"] = "#FFC533";
    FigureColor["WHITE"] = "#E0ECF6";
})(FigureColor = exports.FigureColor || (exports.FigureColor = {}));
var ChessFigures;
(function (ChessFigures) {
    ChessFigures["HORSE"] = "HORSE";
    ChessFigures["KING"] = "KING";
    ChessFigures["ROOK"] = "ROOK";
    ChessFigures["BISHOP"] = "BISHOP";
    ChessFigures["QUEEN"] = "QUEEN";
    ChessFigures["PAWN"] = "PAWN";
})(ChessFigures = exports.ChessFigures || (exports.ChessFigures = {}));
var SocketEvents;
(function (SocketEvents) {
    SocketEvents["MOVE"] = "MOVE";
    SocketEvents["CHANGE_NAME"] = "CHANGE_NAME";
    SocketEvents["START"] = "START";
    SocketEvents["GAME_OWER"] = "GAME_OWER";
    SocketEvents["CLOSE"] = "CLOSE";
})(SocketEvents = exports.SocketEvents || (exports.SocketEvents = {}));
//# sourceMappingURL=enums.js.map