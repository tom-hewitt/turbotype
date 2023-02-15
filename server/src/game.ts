import {
  PlayerClient,
  randomWords,
  WordState,
  applyKeyInput,
} from "@turbotype/game";

export class MultiplayerGameSession {
  wordList: string[] = randomWords(10);

  playerClients: PlayerClient[] = [];
  playerWordStates: WordState[] = [];
  playerInputs: (string | null)[] = [];

  playerCount = 0;

  /**
   * connects a new client to the game session
   * @param client the client to connect
   * @returns the player ID
   */
  connect = (client: PlayerClient): number => {
    const playerID = this.playerCount;

    this.playerClients.push(client);
    this.playerWordStates.push({
      word: this.wordList[0]!,
      wordIndex: 0,
      characterIndex: 0,
      incorrectCharacterCount: 0,
    });

    this.playerCount++;

    client.onWordList(this.wordList);

    return playerID;
  };

  handleKeyInput = (playerID: number, key: string) => {
    const { state, action } = applyKeyInput(
      this.playerWordStates[playerID]!,
      key,
      this.wordList
    );

    this.playerWordStates[playerID] = state;

    if (action === null) {
      return;
    }

    // broadcast the action to all the clients
    this.playerClients.forEach((client) => client.onAction(action, playerID));
  };
}
