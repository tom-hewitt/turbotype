import { User } from "./matchmaker";
import {
  ServerToClientMessage,
  ConnectMessage,
  ServerToClientMessageType,
  ActionMessage,
  FinishedMessage,
} from "./messages";
import { WebSocket } from "ws";
import {
  applyKeyInput,
  PlayerAction,
  randomWords,
  TypingState,
} from "@turbotype/game";
import { encode } from "@msgpack/msgpack";
import { addSummaryToDatabase } from "./database";

const COUNTDOWN_SECONDS = 5;

const WORD_COUNT = 10;

export interface Player extends User {
  state: TypingState;
}

export class MultiplayerRace {
  players: Player[];

  // maps the indexes of the players that have finished to their finish time
  finishedPlayers: Map<number, number> = new Map();

  // the start time is the current time in ms + the countdown time in ms
  startTime = Date.now() + COUNTDOWN_SECONDS * 1000;

  // generate the random wordlist when the race is created
  wordList = randomWords(WORD_COUNT);

  constructor(users: User[]) {
    console.log(
      "creating a new race with players:",
      users.map((user) => user.id)
    );

    // convert the users to players by adding giving each one a typing state
    this.players = users.map((user) => ({
      ...user,
      state: {
        word: this.wordList[0]!,
        wordIndex: 0,
        characterIndex: 0,
        incorrectCharacterCount: 0,
        events: [],
      },
    }));

    // send the connect message to each player
    this.players.forEach((player, index) =>
      sendConnectMessage(
        player,
        index,
        this.startTime,
        this.players.length,
        this.wordList
      )
    );

    // listen for key input from each player
    this.players.forEach((player, index) => {
      player.socket.on("message", (message) =>
        this.handleKeyInput(message.toString(), index)
      );
    });
  }

  handleKeyInput = (key: string, index: number) => {
    console.log("received key input:", key);

    if (!this.hasStarted()) {
      return;
    }

    const player = this.players[index];
    if (!player) {
      throw new Error(`Can't find player ${index}`);
    }

    // work out the new state, and any new action that has occured
    const { state, action } = applyKeyInput(player.state, key, this.wordList);
    player.state = state;

    if (action !== undefined) {
      console.log(
        "action for player",
        index,
        ":",
        ["correct letter", "incorrect letter", "correct word"][action]
      );

      // if a new action occured, broadcast it to all the clients
      this.players.forEach((player) =>
        sendActionMessage(player, index, action)
      );
    }

    // check if the player has finished
    if (state === null) {
      // set the finish time
      this.finishedPlayers.set(index, Date.now() - this.startTime);

      // check if all the players have finished
      if (this.finishedPlayers.size === this.players.length) {
        this.endRace();
      }
    }
  };

  hasStarted = (): boolean => {
    return this.startTime !== null && this.startTime < Date.now();
  };

  endRace = async () => {
    const chars = this.wordList.reduce((sum, word) => sum + word.length, 0);
    const ids = this.players.map((player) => player.id);
    const times = this.players.map((_, index) =>
      this.finishedPlayers.get(index)
    );

    const raceID = await addSummaryToDatabase(chars, ids, times);

    console.log("sending race ID:", raceID);
    this.players.forEach((player) => sendFinishMessage(player, raceID));

    this.players.forEach((player) => player.socket.removeAllListeners());
  };
}

/**
 * encodes and sends a message to the given socket
 * @param socket
 * @param message
 */
const sendMessage = (socket: WebSocket, message: ServerToClientMessage) => {
  socket.send(encode(message));
};

const sendConnectMessage = (
  user: User,
  index: number,
  startTime: number,
  playerCount: number,
  wordList: string[]
) => {
  const message: ConnectMessage = [
    ServerToClientMessageType.CONNECT,
    index,
    startTime,
    playerCount,
    wordList,
  ];

  sendMessage(user.socket, message);
};

const sendActionMessage = (user: User, index: number, action: PlayerAction) => {
  const message: ActionMessage = [
    ServerToClientMessageType.ACTION,
    index,
    action,
  ];

  sendMessage(user.socket, message);
};

const sendFinishMessage = (user: User, raceID: string) => {
  const message: FinishedMessage = [ServerToClientMessageType.FINISHED, raceID];

  sendMessage(user.socket, message);
};
