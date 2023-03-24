// import { decode } from "@msgpack/msgpack";
import { config } from "dotenv";
import { WebSocket, WebSocketServer } from "ws";
import { authenticateWebsocket } from "./authentication";
import { findMatch } from "./matchmaker";

// configure the env variables
config();

// create the websocket server
const webSocketServer = new WebSocketServer({ port: 8080 });
console.log("Opening game server on port 8080");

const onConnection = async (socket: WebSocket) => {
  console.log("new connection");

  // authenticate the user
  const id = await authenticateWebsocket(socket);

  console.log("id:", id);

  // find a race match for the user
  findMatch({ id, socket });
};

webSocketServer.on("connection", onConnection);
