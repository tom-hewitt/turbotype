import { encode } from "@msgpack/msgpack";
import { MultiplayerGameSession } from "./game";
import { WebSocketServer } from "ws";
import type { WebSocket } from "ws";
import {
  ActionMessage,
  ServerToClientMessage,
  ServerToClientMessageType,
  WordListMessage,
} from "./messages";

const webSocketServer = new WebSocketServer({ port: 8080 });
console.log("Opening game server on port 8080");

const game = new MultiplayerGameSession();

const sendMessage = (socket: WebSocket, message: ServerToClientMessage) => {
  socket.send(encode(message));
};

webSocketServer.on("connection", (socket) => {
  const playerID = game.connect({
    onWordList(list) {
      const message: WordListMessage = [
        ServerToClientMessageType.WORD_LIST,
        ...list,
      ];

      console.log(message);

      sendMessage(socket, message);
    },

    onAction(action, playerID) {
      const message: ActionMessage = [
        ServerToClientMessageType.ACTION,
        action,
        playerID,
      ];

      sendMessage(socket, message);
    },
  });

  socket.on("message", (data) => {
    const key = data.toString();

    game.handleKeyInput(playerID, key);
  });
});
