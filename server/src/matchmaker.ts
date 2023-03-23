import { WebSocket, WebSocketServer } from "ws";
import { addSummaryToDatabase } from "./database";
import { MultiplayerRace } from "./race";
import { socketClientConstructor } from "./websocket";

const SOCKETS_PER_SESSION = 1;

const webSocketServer = new WebSocketServer({ port: 8080 });
console.log("Opening matchmaking server on port 8080");

let sockets: WebSocket[] = [];

const onConnection = (socket: WebSocket) => {
  sockets.push(socket);

  if (sockets.length === SOCKETS_PER_SESSION) {
    const clientConstructors = sockets.map((socket) =>
      socketClientConstructor(socket)
    );

    new MultiplayerRace(clientConstructors, (chars, times) =>
      addSummaryToDatabase(
        chars,
        [
          "749a1282-8f8f-421c-bae7-5ef61251557a",
          null,
          "04e04175-9e2b-48d0-9c4f-0697cffaedc5",
        ],
        times
      )
    );

    sockets = [];
  }
};

webSocketServer.on("connection", onConnection);
