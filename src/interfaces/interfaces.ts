import WebSocket from 'ws';
import { ChessFigures, FigureColor } from '../enums/enums';

export interface IMoves {
  prevPosition: [x:number, y:number];
  position: [x:number, y:number];
  time: number;
  color: FigureColor;
  type: ChessFigures;
}

export interface IReplayMember {
  name: string;
  moves: IMoves[]
}

export interface IReplay {
  [FigureColor.BLACK]: IReplayMember;
  [FigureColor.WHITE]: IReplayMember;
}

export interface IWebSocketExt {
  socket: WebSocket;
  id: string;
  opponent:string | null;
  name: string;
  readyToPlay: boolean;
}
