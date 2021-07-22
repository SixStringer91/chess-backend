import WebSocket from 'ws';
import { FigureColor, SocketEvents } from '../../enums/enums';
import { IWebSocketExt } from '../../interfaces/interfaces';

const colors = [FigureColor.BLACK, FigureColor.WHITE];
const CLIENTS: IWebSocketExt[] = [];

const searchOpponent = (ws: IWebSocketExt): void => {
  const applicant = ws;
  const oppIndex = CLIENTS.findIndex(
    (el) => el.id !== applicant.id && !el.opponent && el.readyToPlay
  );
  if (oppIndex !== -1) {
    const partner = CLIENTS[oppIndex] as IWebSocketExt;
    const randomBoolean = !!Math.ceil(0.5 - Math.random());
    partner.opponent = applicant.id;
    applicant.opponent = partner.id;
    partner.socket.send(
      JSON.stringify({
        event: 'START',
        enemy_name: applicant.name,
        your_color: colors[+randomBoolean]
      })
    );
    applicant.socket.send(
      JSON.stringify({
        event: 'START',
        enemy_name: partner.name,
        your_color: colors[+!randomBoolean]
      })
    );
  } else applicant.socket.send(JSON.stringify({ event: 'WAITING' }));
};

export const deleteClient = (id: string): void => {
  console.log(CLIENTS);
  const findedInd = CLIENTS.findIndex((client) => client.id === id);
  const finded = findedInd !== -1 && (CLIENTS[findedInd] as IWebSocketExt);
  if (finded) {
    if (finded.opponent) {
      const findOpponentInd = CLIENTS.findIndex(
        (client) => client.opponent === finded.id
      );
      if (findOpponentInd !== -1) {
        const opponent = CLIENTS[findOpponentInd] as IWebSocketExt;
        opponent.socket.close();
        CLIENTS.splice(findOpponentInd, 1);
      }
    }
    finded.socket.close();
    CLIENTS.splice(findedInd, 1);
  }
};

export const initNewClient = (ws: IWebSocketExt): void => {
  const applicant = ws;
  CLIENTS.push(applicant);
};

export const onMessageSwitch = (
  ws: IWebSocketExt,
  msg: WebSocket.Data
): void => {
  const recieved = JSON.parse(msg as string);
  const sender = ws;
  try {
    const ind = CLIENTS.findIndex((client) => client.opponent === sender.id);
    switch (recieved.payload.event) {
      case SocketEvents.MOVE:
        if (ind !== -1) {
          (<IWebSocketExt>CLIENTS[ind]).socket.send(
            JSON.stringify(recieved.payload)
          );
        }
        break;
      case SocketEvents.CHANGE_NAME:
        sender.name = recieved.payload.name;
        sender.socket.send(`name changed to ${recieved.payload.name}`);
        break;
      case SocketEvents.START:
        sender.readyToPlay = true;
        searchOpponent(sender);
        break;
      case SocketEvents.GAME_OWER:
        if (ind !== -1) {
          (<IWebSocketExt>CLIENTS[ind]).socket.send(
            JSON.stringify(recieved.payload)
          );
        }
        break;
      case SocketEvents.CLOSE:
        deleteClient(sender.id);
        break;
      default:
        break;
    }
  } catch {
    deleteClient(sender.id);
  }
};
