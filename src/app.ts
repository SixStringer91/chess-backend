import express from 'express';
import WebSocket from 'ws';
import enableWs from 'express-ws';
import mongoose from 'mongoose';
import replays from './resources/moves/moves.controller';
import { DB_URL } from './common/config';

const appBase = express();
const wsInstance = enableWs(appBase);
const { app } = wsInstance;

mongoose
  .connect(
    <string>DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('connect success'))
  .catch((err) => console.log(err));

app.use('/replays', replays);

app.ws('/echo', (ws: WebSocket) => {
  ws.on('message', (msg) => {
    console.log(msg);
    ws.send(msg);
  });

  ws.on('close', () => {
    console.log('WebSocket was closed');
  });
});

export default app;
