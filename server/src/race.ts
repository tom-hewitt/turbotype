import {
  randomWords,
  TypingState,
  applyKeyInput,
  PlayerAction,
} from "@turbotype/game";

export interface PlayerClient {
  onConnect(
    playerID: number,
    startTime: number,
    playerCount: number,
    list: string[]
  ): void;
  onAction(playerID: number, action: PlayerAction): void;
}

/**
 * a function that creates a PlayerClient, given a `handleKeyInput` callback
 */
export type ClientConstructor = (
  handleKeyInput: (key: string) => void
) => PlayerClient;

interface Player {
  client: PlayerClient;
  state: TypingState;
}

export class MultiplayerRace {
  wordList: string[] = randomWords(10);
  players: Player[] = [];

  // start 5 seconds from when the race is created
  // TODO: we should probably wait for all clients to confirm that they are connected and have received the wordlist
  startTime: number = Date.now() + 5000;

  constructor(
    clientConstructors: ClientConstructor[],
    onFinish: (chars: number, times: (number | null)[]) => void
  ) {
    onFinish(187, [37000, 64000, null, 53000]);

    const playerCount = clientConstructors.length;

    this.players = clientConstructors.map((clientConstructor, id) => {
      const client = clientConstructor((key) => this.handleKeyInput(id, key));

      // tell the client their playerID, the start time, and the wordlist
      client.onConnect(id, this.startTime, playerCount, this.wordList);

      return {
        client,
        state: {
          word: this.wordList[0]!,
          wordIndex: 0,
          characterIndex: 0,
          incorrectCharacterCount: 0,
          events: [],
        },
      };
    });
  }

  hasStarted = (): boolean => {
    return this.startTime !== null && this.startTime < Date.now();
  };

  handleKeyInput = (playerID: number, key: string) => {
    // make sure the race has actually started
    if (!this.hasStarted()) {
      return;
    }

    const player = this.players[playerID];

    // make sure the player exists!
    if (!player) {
      throw new Error(`Can't find player ${playerID}`);
    }

    // save the pre-input state so we can see what changed after
    const prevState = player.state;

    // work out the new state, and any new action that has occured
    const { state, action } = applyKeyInput(prevState, key, this.wordList);

    // update the state
    player.state = state;

    // check if there has been a new event
    if (action !== undefined) {
      // broadcast the new event to all the clients
      this.players.forEach(({ client }) => client.onAction(playerID, action));
    }
  };
}
