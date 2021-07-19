import WebSocket from 'ws';
import { v4 as uuid } from 'uuid';
import { IWebSocketExt } from '../../interfaces/interfaces';
import {
  onMessageSwitch,
  initNewClient,
  deleteClient
} from './websocket.memory_db';

export const websocketHandler = (ws: WebSocket): void => {
  const client: IWebSocketExt = {
    socket: ws,
    id: uuid(),
    opponent: null,
    name: 'player 1',
    readyToPlay: false
  };
  initNewClient(client);
  console.log(`user ${client.id} connected`);
  client.socket.on('message', (msg) => {
    onMessageSwitch(client, msg);
  });
  client.socket.on('close', () => {
    deleteClient(client.id);
    console.log('WebSocket was closed');
  });
};
