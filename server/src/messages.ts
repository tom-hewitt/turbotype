import { PlayerAction } from "@turbotype/game";

export type ClientToServerMessage = KeyInputMessage;
export type KeyInputMessage = string;

export type ServerToClientMessage = WordListMessage | ActionMessage;
export enum ServerToClientMessageType {
  WORD_LIST,
  ACTION,
}
export type WordListMessage = [
  ServerToClientMessageType.WORD_LIST,
  ...string[]
];
export type ActionMessage = [
  ServerToClientMessageType.ACTION,
  PlayerAction,
  number
];
