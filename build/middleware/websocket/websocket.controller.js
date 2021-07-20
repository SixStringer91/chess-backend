"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.websocketHandler = void 0;
const uuid_1 = require("uuid");
const websocket_memory_db_1 = require("./websocket.memory_db");
const websocketHandler = (ws) => {
    const client = {
        socket: ws,
        id: uuid_1.v4(),
        opponent: null,
        name: 'player 1',
        readyToPlay: false
    };
    websocket_memory_db_1.initNewClient(client);
    console.log(`user ${client.id} connected`);
    client.socket.on('message', (msg) => {
        websocket_memory_db_1.onMessageSwitch(client, msg);
    });
    client.socket.on('close', () => {
        websocket_memory_db_1.deleteClient(client.id);
        console.log('WebSocket was closed');
    });
};
exports.websocketHandler = websocketHandler;
//# sourceMappingURL=websocket.controller.js.map