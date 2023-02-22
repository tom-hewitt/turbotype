import { encode } from "@msgpack/msgpack";
import type { WebSocket } from "ws";
import {
  ActionMessage,
  ServerToClientMessage,
  ServerToClientMessageType,
  ConnectMessage,
} from "./messages";
import { PlayerAction } from "@turbotype/game";
import { ClientConstructor } from "./race";

export const socketClientConstructor = (
  socket: WebSocket
): ClientConstructor => {
  return (handleKeyInput) => {
    // listen for key input messages
    socket.on("message", (data) => {
      const key = data.toString();
      console.log("received message:", key);
      handleKeyInput(key);
    });

    const sendMessage = (message: ServerToClientMessage) => {
      console.log("sending message:", message);
      socket.send(encode(message));
    };

    return {
      onConnect: (
        playerID: number,
        startTime: number,
        playerCount: number,
        list: string[]
      ) => {
        const message: ConnectMessage = [
          ServerToClientMessageType.CONNECT,
          playerID,
          startTime,
          playerCount,
          list,
        ];

        sendMessage(message);
      },
      onAction: (playerID: number, action: PlayerAction) => {
        const message: ActionMessage = [
          ServerToClientMessageType.ACTION,
          playerID,
          action,
        ];

        sendMessage(message);
      },
    };
  };
};
