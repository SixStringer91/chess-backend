"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessageSwitch = exports.initNewClient = exports.deleteClient = void 0;
const enums_1 = require("../../enums/enums");
const colors = [enums_1.FigureColor.BLACK, enums_1.FigureColor.WHITE];
const CLIENTS = [];
const searchOpponent = (ws) => {
    const applicant = ws;
    const oppIndex = CLIENTS.findIndex((el) => el.id !== applicant.id && !el.opponent && el.readyToPlay);
    if (oppIndex !== -1) {
        const partner = CLIENTS[oppIndex];
        const randomBoolean = !!Math.ceil(0.5 - Math.random());
        partner.opponent = applicant.id;
        applicant.opponent = partner.id;
        partner.socket.send(JSON.stringify({
            event: 'START',
            enemy_name: applicant.name,
            your_color: colors[+randomBoolean]
        }));
        applicant.socket.send(JSON.stringify({
            event: 'START',
            enemy_name: partner.name,
            your_color: colors[+!randomBoolean]
        }));
    }
    else
        applicant.socket.send(JSON.stringify({ event: 'WAITING' }));
};
const deleteClient = (id) => {
    const findedInd = CLIENTS.findIndex((client) => client.id === id);
    const finded = findedInd !== -1 && CLIENTS[findedInd];
    if (finded) {
        if (finded.opponent) {
            const findOpponentInd = CLIENTS.findIndex((client) => client.opponent === finded.id);
            if (findOpponentInd !== -1) {
                const opponent = CLIENTS[findOpponentInd];
                opponent.socket.close();
                CLIENTS.slice(findOpponentInd, 1);
            }
        }
        finded.socket.close();
        CLIENTS.slice(findedInd, 1);
    }
};
exports.deleteClient = deleteClient;
const initNewClient = (ws) => {
    const applicant = ws;
    CLIENTS.push(applicant);
};
exports.initNewClient = initNewClient;
const onMessageSwitch = (ws, msg) => {
    const recieved = JSON.parse(msg);
    const sender = ws;
    try {
        const ind = CLIENTS.findIndex((client) => client.opponent === sender.id);
        switch (recieved.payload.event) {
            case enums_1.SocketEvents.MOVE:
                if (ind !== -1) {
                    CLIENTS[ind].socket.send(JSON.stringify(recieved.payload));
                }
                break;
            case enums_1.SocketEvents.CHANGE_NAME:
                sender.name = recieved.payload.name;
                sender.socket.send(`name changed to ${recieved.payload.name}`);
                break;
            case enums_1.SocketEvents.START:
                sender.readyToPlay = true;
                searchOpponent(sender);
                break;
            case enums_1.SocketEvents.GAME_OWER:
                if (ind !== -1) {
                    CLIENTS[ind].socket.send(JSON.stringify(recieved.payload));
                }
                break;
            case enums_1.SocketEvents.CLOSE:
                exports.deleteClient(sender.id);
                break;
            default:
                break;
        }
    }
    catch {
        exports.deleteClient(sender.id);
    }
};
exports.onMessageSwitch = onMessageSwitch;
//# sourceMappingURL=websocket.memory_db.js.map