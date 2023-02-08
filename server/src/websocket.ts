import { Server, ServerWebSocket } from "bun";
import { encode } from "@msgpack/msgpack";
import { MultiplayerGameSession } from "./game";
import {
  correctWordMessage,
  incorrectLetterMessage,
  wordListMessage,
} from "./messages/serverToClient";

type SocketData = {
  id: number;
};

const game = new MultiplayerGameSession();

console.log("Opening game server on port 8080");

Bun.serve({
  port: 8080,

  /**
   * Called when a HTTP requeset is recevied
   * @param req the HTTP request
   * @param server the HTTP server
   * @returns undefined if the request is successfully upgraded to a websocket, otherwise a response containing an error message
   */
  fetch(req: Request, server: Server) {
    // try upgrade the request to a websocket, using the "Sec-WebSocket-Key" header
    // assign each socket an ID
    if (
      server.upgrade<SocketData>(req, {
        data: { id: game.allocatePlayerSpot() },
      })
    ) {
      return;
    }

    // tell the client if the websocket connection could not be made
    return new Response("Expected a websocket connection", { status: 400 });
  },

  websocket: {
    /**
     * Called when a new websocket connection opens, i.e. when a new client connects.
     */
    open(socket: ServerWebSocket<SocketData>) {
      game.connectPlayer(socket.data.id, {
        onWordList(list) {
          socket.send(encode(wordListMessage(list)));
        },
        onWordCorrect(playerID) {
          socket.send(encode(correctWordMessage(playerID)));
        },
        onLetterIncorrect(playerID) {
          socket.send(encode(incorrectLetterMessage(playerID)));
        },
      });
    },

    /**
     * Called when a message from a client is received.
     * @param ws the websocket connection to the client
     * @param message the message
     */
    message(socket: ServerWebSocket<SocketData>, message) {
      game.handleKeyInput(socket.data.id, message as string);
    },

    /**
     * Called when a websocket connection closes, i.e. when a client disconnects.
     */
    close(socket: ServerWebSocket<SocketData>) {
      game.disconnectPlayer(socket.data.id);
    },
  },
});
