import { Server } from "bun";
import { GameServer } from "./game";

console.log("Opening game server on port 8080");

let game: GameServer;

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
    if (server.upgrade(req)) {
      return;
    }

    // tell the client if the websocket connection could not be made
    return new Response("Expected a websocket connection", { status: 400 });
  },

  websocket: {
    /**
     * Called when a new websocket connection opens, i.e. when a new client connects.
     */
    open(socket) {
      console.log("A player joined the race!");

      game = new GameServer({
        onNewWord(word) {
          console.log("sending new word:", word);
          socket.send(word);
        },
      });
    },

    /**
     * Called when a message from a client is received.
     * @param ws the websocket connection to the client
     * @param message the message
     */
    message(ws, message) {
      game.handleKeyInput(message as string);
    },

    /**
     * Called when a websocket connection closes, i.e. when a client disconnects.
     */
    close() {
      console.log("A player left the race!");
    },
  },
});
