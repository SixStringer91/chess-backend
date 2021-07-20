import express, { Request, Response, NextFunction } from 'express';
import enableWs from 'express-ws';
import cors from 'cors';
import replays from './resources/moves/moves.controller';
import { websocketHandler } from './middleware/websocket/websocket.controller';
import {
  ErrorHandler, handleError, uncaughtException, unhandledRejection
} from './middleware/errors/error.handler';
import { logerRequests } from './middleware/loger/logger';

const appBase = express();
const wsInstance = enableWs(appBase);
const { app } = wsInstance;

app.use(cors());
app.use(express.json());

app.use(logerRequests);

app.use('/replays', replays);

app.ws('/echo', websocketHandler);
app.use((err:ErrorHandler, _req:Request, res:Response, next:NextFunction) => {
  handleError(err, res);
  next();
});

process.on('uncaughtException', uncaughtException);
process.on('unhandledRejection', unhandledRejection);

export default app;
