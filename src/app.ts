import express from 'express';
import enableWs from 'express-ws';
import replays from './resources/moves/moves.controller';
import { websocketHandler } from './middleware/websocket/websocket.controller';

const appBase = express();
const wsInstance = enableWs(appBase);
const { app } = wsInstance;

app.use('/replays', replays);

app.ws('/echo', websocketHandler);

export default app;
