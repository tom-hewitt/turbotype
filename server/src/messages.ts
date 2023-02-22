import { PlayerAction } from "@turbotype/game";

export type ClientToServerMessage = KeyInputMessage;
export type KeyInputMessage = string;

export type ServerToClientMessage = ConnectMessage | ActionMessage;
export enum ServerToClientMessageType {
  CONNECT,
  ACTION,
}

/**
 * `[type, playerID, startTime, playerCount, wordList]`
 */
export type ConnectMessage = [
  ServerToClientMessageType.CONNECT,
  number,
  number,
  number,
  string[]
];

/**
 * `[type, playerID, actionType]`
 */
export type ActionMessage = [
  ServerToClientMessageType.ACTION,
  number,
  PlayerAction
];
