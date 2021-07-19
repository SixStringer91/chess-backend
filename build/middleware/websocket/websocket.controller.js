"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.websocketHandler = void 0;
const uuid_1 = require("uuid");
const CLIENTS = [];
const onMessageSwitch = (id, msg) => {
    const recieved = JSON.parse(msg);
    const ind = CLIENTS.findIndex((client) => client.opponent === id);
    if (ind !== -1) {
        const opponent = CLIENTS[ind];
        switch (recieved.event) {
            case 'MOVE':
                opponent.socket.send('opponent disconnected');
                break;
            default:
                break;
        }
    }
};
const setOpponent = (ws) => {
    const applicant = ws;
    const oppIndex = CLIENTS.findIndex((el) => !el.opponent);
    if (oppIndex !== -1) {
        const partner = CLIENTS[oppIndex];
        partner.opponent = applicant.id;
        return partner.id;
    }
    return null;
};
const websocketHandler = (ws) => {
    const client = { socket: ws, id: uuid_1.v4(), opponent: null };
    console.log(`user ${client.id} connected`);
    client.opponent = setOpponent(client);
    CLIENTS.push(client);
    client.socket.on('message', (msg) => {
        onMessageSwitch(client.id, msg);
        console.log(msg);
    });
    client.socket.on('close', () => {
        const find = CLIENTS.findIndex((el) => el.id === client.id);
        CLIENTS.slice(find, 1);
        console.log('WebSocket was closed');
    });
};
exports.websocketHandler = websocketHandler;
//# sourceMappingURL=websocket.controller.js.map