import { WebSocket, WebSocketServer } from "ws";
import { MultiplayerRace } from "./race";
import { socketClientConstructor } from "./websocket";

const SOCKETS_PER_SESSION = 2;

const webSocketServer = new WebSocketServer({ port: 8080 });
console.log("Opening matchmaking server on port 8080");

let sockets: WebSocket[] = [];

const onConnection = (socket: WebSocket) => {
  sockets.push(socket);

  if (sockets.length === SOCKETS_PER_SESSION) {
    const clientConstructors = sockets.map((socket) =>
      socketClientConstructor(socket)
    );

    new MultiplayerRace(clientConstructors);

    sockets = [];
  }
};

webSocketServer.on("connection", onConnection);
